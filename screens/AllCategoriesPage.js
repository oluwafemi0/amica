import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const AllCategoriesPage = ({ route }) => {
  const { categories } = route.params;
  const navigation = useNavigation();

  const navigateToCategoryPage = (category) => {
    navigation.navigate("CategoryPage", { category });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-gray-200`}>
      <View style={tw`bg-white p-4`}>
        <View style={tw`flex-row justify-between items-center mx-auto`}>
          <TouchableOpacity
            style={tw`rounded-md p-2`}
            onPress={() => navigation.goBack()}
          >
            <Icon.ArrowLeft strokeWidth={2} stroke={"#333"} />
          </TouchableOpacity>
          <View style={tw`flex-1 items-center`}>
            <View style={tw``}>
              <Text style={tw`font-semibold text-lg text-center text-[#333]`}>
                Categories
              </Text>
            </View>
          </View>
          <TouchableOpacity style={tw`rounded-md p-2`}>
            <Icon.LogOut strokeWidth={2} stroke={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`flex-wrap gap-1 flex-row p-4`}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigateToCategoryPage(category)}
            style={tw`bg-white py-10 px-6 rounded-lg w-0.97/3 shadow-md`}
          >
            <Text style={tw`text-gray-800 text-center`}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default AllCategoriesPage;
