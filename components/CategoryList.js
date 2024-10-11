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

  const colors = ["#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"];

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
    <View style={tw`flex-1 p-2 bg-[#000]`}>
      <View style={tw`flex flex-row justify-between items-center`}>
        <Text style={tw`text-lg font-semibold text-[#fff]`}>Categories</Text>
        <TouchableOpacity onPress={navigateToAllCategoriesPage}>
          <Text style={tw`text-[#899499] text-sm font-semibold mt-1`}>
            See All
          </Text>
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
                tw`py-1 px-6 ml-2 w-26 items-center justify-center border border-[#000] rounded-lg`,
                { backgroundColor: colors[index], backdropFilter: "blur(8px)" },
              ]}
            >
              <Icon
                name={categoryIcons[category]}
                size={28}
                color="#000"
                style={tw``}
              />
              <Text style={[tw`text-center text-[#000] font-semibold`]}>
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
