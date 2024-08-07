import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

const ActiveService = () => {
  return (
    <View style={tw`bg-[#fff] `}>
    <View style={[tw` h-50  rounded-lg  `,]}>
      <View style={tw`bg-[#CBC3E3] flex flex-row justify-between items-center h-49 rounded-lg`}>
      <Text style={tw`text-[#000] font-bold `}>ghfhgchg</Text>
      <Text style={tw`text-[#000]`}>gvv</Text>
      </View>
    </View>
    </View>
  );
};

export default ActiveService;
