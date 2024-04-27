import React from "react";
import { View, Image, TouchableOpacity, TextInput } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import auth from "@react-native-firebase/auth";

const Welcome = () => {
  const navigation = useNavigation();
  const user = auth().currentUser;

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={tw`bg-white p-1 shadow-md rounded-md`}>
      <View style={tw`flex-row items-center`}>
        <View style={tw`flex-1 `}>
          <Image
            source={require("../assets/images/HANDS.png")}
            style={tw`w-20 h-14 `}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ChatsList")}
          style={tw`p-2 bg-[#332257] rounded-lg mr-2 `}
        >
          <Icon.Mail width={20} height={20} stroke="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToProfile}>
          {user && user.photoURL ? (
            <Image
              style={tw`w-10 h-10 rounded-lg mr-2`}
              source={{ uri: user.photoURL }}
            />
          ) : (
            <Icon.User width={20} height={20} stroke="#332257" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
