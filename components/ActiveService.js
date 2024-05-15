import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

const ActiveService = () => {
  return (
    <View style={tw`bg-[#fff]  p-4 `}>
    <View style={[tw`bg-[#000] h-50 flex flex-row justify-between items-center rounded-lg p-4`,]}>
      <Text style={tw`text-[#fff] font-bold `}>Service name</Text>
      <Text style={tw`text-[#fff]`}>Service status</Text>
    </View>
    </View>
  );
};

export default ActiveService;
