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
    <View style={[tw`flex-1 p-2 border-b border-[#CBC3E3]`, { backgroundColor: "rgba(255, 255, 255, 0.2)" }]}>
      <View style={tw`flex flex-row justify-between items-center `}>
        <Text style={tw`text-sm font-semibold text-gray-400`}>Categories</Text>
        <TouchableOpacity onPress={navigateToAllCategoriesPage} style={tw``}>
          <Text style={tw`text-blue-800 font-bold mb-1`}>See All </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={tw`ml--6`}
      >
        <View style={tw`flex-row p-2 ml-1`}>
          {categories.slice(0, 6).map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigateToCategoryPage(category)}
              style={[
                tw`py-1 px-6 ml-2 rounded-tl-lg w-26 items-center justify-center border `,
                { borderColor: colors[index], backgroundColor: colors[index] + "30", backdropFilter: 'blur(8px)' },
              ]}
            >
              <Icon
                name={categoryIcons[category]}
                size={35}
                style={[tw``, { color: colors[index] }]}
              />
              <Text
                style={[
                  tw`text-center font-semibold`,
                  { color: colors[index] },
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoryList;
