import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
  ];

  const colors = [
    "#FFB6C1",
    "#87CEFA",
    "#98FB98",
    "#FFDAB9",
    "#FFA07A",
    "#FFD700",
    "#87CEEB",
  ];

  const categoryIcons = {
    Electrical: "power-plug-outline",
    Welder: "fence-electric",
    School: "school-outline",
    Errand: "cart-variant",
    Cooking: "pot-mix-outline",
    Plumber: "pipe-valve",
    Cleaner: "broom",
  };

  const navigateToCategoryPage = (category) => {
    navigation.navigate("CategoryPage", { category });
  };

  const navigateToAllCategoriesPage = () => {
    navigation.navigate("AllCategoriesPage", { categories });
  };

  return (
    <View style={tw`flex-1   mt--4 p-2`}>
          <TouchableOpacity
            onPress={navigateToAllCategoriesPage}
            style={tw``}
          >
            <Text style={tw`text-[#FFA07A] font-bold ml-80 mb-1`}>See All </Text>
          </TouchableOpacity>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={tw`ml--6 `}>
        <View style={tw`flex-row p-2 ml-1`}>
          {categories.slice(0, 6).map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigateToCategoryPage(category)}
              style={[
                tw`py-1 px-6 ml-1 rounded-lg w-26 items-center justify-center border-2 `,
                { borderColor: colors[index] },
              ]}
            >
              <Icon
                name={categoryIcons[category]}
                size={35}
                style={[tw` `,
                { color: colors[index] }]}
              />
              <Text style={[tw` text-center font-semibold`,
                { color: colors[index] }]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryList;
