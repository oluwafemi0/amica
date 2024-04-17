import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import firestore from "@react-native-firebase/firestore";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const Categories = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("categories")
      .onSnapshot((querySnapshot) => {
        if (querySnapshot) {
          const fetchedCategories = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.id,
          }));
          setCategories(fetchedCategories);
        } else {
          console.log("No categories found.");
        }
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={[tw`mt-2 ml-4`, { backgroundColor: "red" }]}>
      <View style={tw`flex-row justify-between mb-2`}>
        <Text style={tw`font-bold text-gray-400 text-lg`}>Categories</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => navigation.navigate("Categories", { category })}
            style={tw`flex-row h-4 p-2 items-center border-b border-gray-200`}
          >
            <Image
              style={tw`w-10 h-10 mr-2`}
              source={require("../assets/images/HANDS.png")}
            />
            <Text style={tw`text-black font-bold`}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;
