import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

const ActiveService = () => {
  return (
    <View style={tw`  p-4 `}>
    <View style={[tw`bg-[#5859b5] h-50 flex flex-row justify-between items-center rounded-lg p-4 `, { backgroundColor: "#D1D5DB50", backdropFilter: 'blur(8px)', borderColor: "#D1D5DB", borderWidth: 1 }]}>
      <Text style={tw`text-xl font-bold text-white`}>Service name</Text>
      <Text style={tw`text-white`}>Service status</Text>
    </View>
    </View>
  );
};

export default ActiveService;
