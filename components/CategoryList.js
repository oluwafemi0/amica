import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
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

  
  const colors = [
    "#FFB6C1", 
    "#87CEFA",
    "#98FB98",
    "#FFDAB9",
    "#FFA07A",
    "#FFD700",
    "#87CEEB",
    "#FF69B4",
    "#E0FFFF",
    "#DDA0DD", 
    "#F0E68C", 
    "#B0C4DE",
    "#FF6347", 
    "#20B2AA",
    "#7B68EE", 
    "#40E0D0",
  ];
  
  

  const navigateToCategoryPage = (category) => {
    navigation.navigate("CategoryPage", { category });
  };

  const navigateToAllCategoriesPage = () => {
    navigation.navigate("AllCategoriesPage", { categories });
  };

  return (
    <View style={tw`flex-1 justify-center items-center  mt--6 p-2`}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={tw`ml--6 `}>
        <View style={tw`flex-row p-2`}>
          {categories.slice(0, 6).map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigateToCategoryPage(category)}
              style={[
                tw`py-1 px-6 ml-1 rounded-lg w-26 items-center justify-center `,
                { backgroundColor: colors[index] }
              ]}
            >
              <Icon.Users
                width={40}
                height={40}
                stroke="#fff"
                style={tw`mb-2`}
              />
              <Text style={tw`text-[#fff] text-center `}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={navigateToAllCategoriesPage}
        style={tw`mt-0 bg-[#332257] px-20 py-3 rounded-lg`}
      >
        <Text style={tw`text-white`}>See All Categories</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryList;
