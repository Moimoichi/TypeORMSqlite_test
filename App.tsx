import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, TextInput, Button, Alert, FlatList } from "react-native";
import { DataSource } from "typeorm";
import { text } from "./entities/listitems";
import 'reflect-metadata';
import SQLiteStorage from "react-native-sqlite-storage"

const AppDataSource = new DataSource({
  type: "react-native",
  database: "sqlite_test",
  driver: SQLiteStorage,
  location: "default",
  logging: ["error"],
  entities: [text],
  synchronize:true,
});

AppDataSource.initialize ()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

  

  const App = () => {
    const [category, setCategory] = useState("");
    const [categories, setCategoriesState] = useState<{ id: any; name: string }[]>([]);

  
  
    const addCategory = async () => {
      if (!category) {
        Alert.alert("Enter Category");
        return false;
      }
    
      try {
        await AppDataSource
          .createQueryBuilder()
          .insert()
          .into(text)
          .values([{ name: category }])
          .execute();
        console.log(`${category} item added successfully`);
        getCategories();
        setCategory("");
      } catch (error) {
        console.log("Error on adding item", error);
      }
    };
    
    
    const getCategories = async () => {
      try {
        const categories = await AppDataSource
          .createQueryBuilder()
          .select(category)
          .from(text, category)
          .where({ id: 1 })
          .getMany();
        setCategories(categories);
      } catch (error) {
        console.log("Error on getting categories", error);
      }
    };
    const setCategories = (categories: text[]) => {
      const mappedCategories = categories.map((category) => ({
        id: category.id,
        name: category.name,
      }));
      setCategoriesState(mappedCategories);
    };
    
  useEffect(() => {
   
    getCategories();
  }, []);

  const renderCategory = ({ item }: { item: { id: number; name: string } }) => {
    return (
      <View style={{ flexDirection: "row", paddingVertical: 12, paddingHorizontal: 12, borderBottomWidth: 1, borderColor: "black" }}>
        <Text style={{ marginRight: 9 }}>{item.id}</Text>
        <Text>{item.name}</Text>
      </View>
    );
  };

  const handleCategoryChange = (text: React.SetStateAction<string>) => {
    setCategory(text);
  };

  return (
    <View>
      <StatusBar backgroundColor="green" />
      <TextInput
  placeholder="Enter Text"
  value={category}
  onChangeText={handleCategoryChange}
  style={{ marginHorizontal: 8 }}
    />
      <Button title="Submit" onPress={addCategory} />
      <FlatList data={categories} renderItem={renderCategory} keyExtractor={(item) => item.id.toString()}
/>

    </View>
  );
};

export default App;


