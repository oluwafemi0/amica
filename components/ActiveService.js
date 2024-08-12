import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";

const ActiveService = () => {
  return (
    <View style={tw`bg-[#36013f] rounded-bl-3xl rounded-br-3xl`}>
    <View style={[tw` h-50  rounded-lg  m-2`,]}>
      <View style={tw`bg-[#fff] flex flex-row justify-between items-center h-49 rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-3xl`}>
      <Text style={tw`text-[#000] font-bold `}>ghfhgchg</Text>
      <Text style={tw`text-[#000]`}>gvv</Text>
      </View>
    </View>
    </View>
  );
};

export default ActiveService;
