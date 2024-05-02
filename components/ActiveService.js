import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const ActiveService = () => {
  const navigation = useNavigation();

  
  const goToUploadPage = () => {
    navigation.navigate("Upload", { user });
  };

  return (
    <TouchableOpacity
      style={tw`bg-[#5859b5] h-50 flex flex-row justify-between items-center rounded-lg p-4  mb-4`}
      onPress={() => navigation.navigate("Preferences")}
    >
      <Text style={tw`text-xl font-bold text-white`}>Service name</Text>
      <Text style={tw`text-white`}>Service status</Text>
    </TouchableOpacity>
  );
};

export default ActiveService;
