import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, TextInput, Button, Alert, FlatList } from "react-native";
import { DataSource } from "typeorm";
import { Category } from "./entities/listitems";
import 'reflect-metadata';


const AppDataSource = new DataSource({
  type: "react-native",
  database: "./main.sqlite",
  location: "default",
  logging: ["error"],
  entities: [Category],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const App = () => {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<{ id: any; name: any }[]>([]);

  const addCategory = async () => {
    if (!category) {
      Alert.alert("Enter Category");
      return false;
    }

    try {
      await AppDataSource.query("INSERT INTO categories (name) VALUES (?)", [category]);
      console.log(`${category} item added successfully`);
      getCategories();
    } catch (error) {
      console.log("Error on adding item" + error);
    }
  };

  const getCategories = async () => {
    const results = await AppDataSource.query("SELECT * FROM categories");
    setCategories(results);
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
