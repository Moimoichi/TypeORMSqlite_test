import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, TextInput, Button, Alert, FlatList } from "react-native";
import { DataSource} from "typeorm"
import { Category } from "./entities/listitems";

export const AppDataSource = new DataSource({
      type: "react-native",
      database: "./main.sqlite",
      location: "default",
      logging: ["error"],
      entities: [Category],
      synchronize: true,
      driver: require("typeorm-react-native-adapter").ReactNativeDriver,
})

 


const App = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<{ id: any; name: any; }[]>([]);


  useEffect(() => {
    async function setup() {
      await createTables();
      await getCategories();
    }
    setup();
  }, []);
  

  const createTables = async () => {
    (await db).transaction((txn: { executeSql: (arg0: string, arg1: never[], arg2: () => void, arg3: (error: any) => void) => void; }) => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL)",
        [],
        () => {
          console.log("Table created Succesfully");
        },
        (        error: string) => {
          console.log("Error on creating table" + error);
        }
      );
    });
  };

  const addCategory = async () => {
    if(!category){
      Alert.alert("Enter Category");
      return false;
    }
    (await AppDataSource).transaction (txn =>{
      return txn.executeSql(
        `INSERT INTO categories (name) VALUES (?)`,
        [category],
        () => {
          console.log(`${category}item added successfully `);
          getCategories();
        },
        (        error: string) => {
          console.log("Error on adding item" + error);
        }
      );
    })
  };

  const getCategories = async () => {
    (await db).transaction((txn: { executeSql: (arg0: string, arg1: never[], arg2: (txn: any, res: any) => void, arg3: (error: any) => void) => void; }) => {
      txn.executeSql(
        `SELECT * FROM categories ORDER BY Id DESC`,
        [],
        (txn: any, res: { rows: { length: any; item: (arg0: number) => any; }; }) => {
          console.log("Successfully retrieved ITEM");
          let len = res.rows.length;
  
          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({ id: item.id, name: item.name });
            }
            setCategories(results);
          }
        },
        (error: string) => {
          console.log("Error on getting ITEMS" + error);
        }
      );
    });
  };
  
const renderCategory = ({ item }: { item: { id: number; name: string } }) => {

    return(
      <View style={{flexDirection: "row",paddingVertical:12,paddingHorizontal:12,borderBottomWidth:1,borderColor:"black"}}>
        <Text style ={{marginRight:9}}>{item.id}</Text>
        <Text>{item.name}</Text>
      </View>
    )
  }

  return (
    <View>
      <StatusBar backgroundColor="green" />
      <TextInput
        placeholder="Enter Text"
        value={category}
        onChangeText={setCategory}
        style={{ marginHorizontal: 8 }}
      />
      <Button title="Submit" onPress={addCategory} />
      <FlatList data={categories} renderItem={renderCategory} />
    </View>
  );
};



export default App;
