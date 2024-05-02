import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";

const ActiveService = () => {
  return (
    <View
      style={tw`bg-[#5859b5] h-50 flex flex-row justify-between items-center rounded-lg p-4  mb-4`}
    >
      <Text style={tw`text-xl font-bold text-white`}>Service name</Text>
      <Text style={tw`text-white`}>Service status</Text>
    </View>
  );
};

export default ActiveService;
