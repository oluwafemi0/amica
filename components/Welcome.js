import React from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import auth from "@react-native-firebase/auth";

const Welcome = () => {
  const navigation = useNavigation();

  const user = auth().currentUser; // Get the current user from Firebase auth

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={tw`bg-[#332257] p-2   relative `}>
      <View style={tw`flex-row justify-between items-center mx-auto`}>
        <TouchableOpacity onPress={navigateToProfile} style={tw``}>
          {user && user.photoURL ? (
            <Image
              style={tw`w-10 h-10 rounded-lg`}
              source={{ uri: user.photoURL }}
            />
          ) : (
            <Icon.User width={24} height={24} stroke="gray" />
          )}
        </TouchableOpacity>
        <View style={tw`flex-1 items-center p-2`}>
          <View
            style={tw`flex-row items-center border rounded-lg border-[#b2a1cd] `}
          >
            <TextInput
              placeholder="Search for Service"
              style={tw` text-center  flex-1 p-2`}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Chat")}
          style={tw`p-2 mx-auto bg-[#b2a1cd] rounded-lg`}
        >
          <Icon.Mail width={20} height={20} stroke="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
