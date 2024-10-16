import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CategoryList = () => {
  const navigation = useNavigation();
  const categories = [
    "Virtual",
    "Electrical",
    "Welder",
    "School",
    "Errand",
    "Cooking",
    "Plumber",
    "Cleaner",
  ];

  const colors = ["#FF6F20", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff"];

  const categoryIcons = {
    Virtual: "message-video",
    Electrical: "power-plug-outline",
    Welder: "fence-electric",
    School: "school-outline",
    Errand: "cart-variant",
    Cooking: "pot-mix-outline",
    Plumber: "pipe-valve",
    Cleaner: "broom",
  };

  const navigateToCategoryPage = (category) => {
    if (category === "Virtual") {
      navigation.navigate("Virtual");
    } else {
      navigation.navigate("CategoryPage", { category });
    }
  };

  const navigateToAllCategoriesPage = () => {
    navigation.navigate("AllCategoriesPage", { categories });
  };

  return (
    <View style={tw`flex-1 p-2 bg-[#1a1a1a]`}>
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
                tw`py-1 px-6 ml-2 w-26 items-center justify-center rounded-lg`,
                {
                  backgroundColor: colors[index],
                  borderColor: category === "Virtual" ? "#fff" : "#000", 
                  borderWidth: category === "Virtual" ? 1 : 1, 
                  backdropFilter: "blur(8px)",
                },
              ]}
            >
              <Icon
                name={categoryIcons[category]}
                size={28}
                color={category === "Virtual" ? "#fff" : "#000"} 
                style={tw``}
              />
              <Text style={[tw`text-center font-semibold`, { color: category === "Virtual" ? "#fff" : "#000" }]}>
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
