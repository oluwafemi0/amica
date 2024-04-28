import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import * as Icon from "react-native-feather";

const CategoryList = () => {
  const navigation = useNavigation();
  const categories = [
    "Electrical",
    "Welder",
    "School",
    "Errand",
    "Cooking",
    "Plumber",
    "Cleaner",
    "Category 8",
    "Category 9",
    "Category 10",
    "Category 11",
    "Category 12",
    "Category 13",
    "Category 14",
    "Category 15",
  ];

  const navigateToCategoryPage = (category) => {
    navigation.navigate("CategoryPage", { category });
  };

  const navigateToAllCategoriesPage = () => {
    navigation.navigate("AllCategoriesPage", { categories });
  };

  return (
    <View style={tw`flex-1 justify-center items-center mx-auto mt--6 p-2`}>
      <View style={tw`flex-wrap gap-1 flex-row mx-auto `}>
        {categories.slice(0, 6).map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigateToCategoryPage(category)}
            style={tw`bg-[#fff] py-1 px-6 mt-2 rounded-lg w-0.97/3 items-center justify-center border border-[#332257]`}
          >
            <Icon.Users
              width={40}
              height={40}
              stroke="#332257"
              style={tw`mb-2`}
            />
            <Text style={tw`text-[#332257] text-center `}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={navigateToAllCategoriesPage}
        style={tw`mt-4 bg-[#332257] px-20 py-3 rounded-lg`}
      >
        <Text style={tw`text-white`}>See All Categories</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryList;
