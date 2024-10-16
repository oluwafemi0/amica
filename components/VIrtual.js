import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

const Virtual = () => {
  return (
    <View style={tw`flex-1 justify-center items-center bg-[#1a1a1a]`}>
      <Text style={tw`text-lg text-[#fff]`}>Coming Soon</Text>
    </View>
  );
};

export default Virtual;
