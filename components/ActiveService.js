import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

const ActiveService = () => {
  return (
    <View style={tw`bg-[#fff] p-4`}>
    <View style={[tw`bg-[#000] h-50  rounded-lg  border-2 border-[#000]`,]}>
      <View style={tw`bg-[#CBC3E3] flex flex-row justify-between items-center h-49 p-3 rounded-lg`}>
      <Text style={tw`text-[#000] font-bold `}>ghfhgchg</Text>
      <Text style={tw`text-[#000]`}>gvv</Text>
      </View>
    </View>
    </View>
  );
};

export default ActiveService;
