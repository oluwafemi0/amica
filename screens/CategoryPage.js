import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import * as Icon from "react-native-feather";

const CategoryPage = ({ route }) => {
  const { category } = route.params;
  const navigation = useNavigation();

  return (
    <View style={tw`bg-[#332257] p-4  `}>
      <View style={tw`flex-row justify-between items-center mx-auto`}>
        <TouchableOpacity
          style={tw`bg-white rounded-md p-2 `}
          onPress={() => navigation.goBack()}
        >
          <View style={tw`flex flex-row items-center justify-center`}>
            <Icon.ArrowLeft strokeWidth={2} stroke={"#332257"} style={tw``} />
          </View>
        </TouchableOpacity>
        <View style={tw`flex-1 items-center p-2`}>
          <View style={tw``}>
            <Text style={tw`font-semibold text-lg text-center text-[#fff]`}>
              <Text
                style={tw`text-[#fff] text-center py-2 mb-2 font-bold text-lg`}
              >
                {category}
              </Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity style={tw`bg-[#332257] rounded-md p-2`}>
          <View style={tw`flex flex-row items-center justify-center`}>
            <Icon.LogOut strokeWidth={2} stroke={"#332257"} style={tw``} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryPage;
