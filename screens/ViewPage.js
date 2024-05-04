import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import * as Icon from "react-native-feather";

const ViewPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;

  const handleChatNavigation = () => {
    navigation.navigate("Chat", { user });
  };

  return (
    <View style={tw` justify-center items-center bg-white`}>
    <View style={tw`flex-row justify-between items-center mx-auto`}>
      <TouchableOpacity
        style={tw`bg-[#fff] rounded-md p-2 `}
        onPress={() => navigation.goBack()}
      >
        <View style={tw`flex flex-row items-center justify-center`}>
          <Icon.ArrowLeft strokeWidth={2} stroke={"#332257"} style={tw``} />
        </View>
      </TouchableOpacity>
      <View style={tw`flex-1 items-center p-2`}>
        <View style={tw``}>
          <Text style={tw`font-semibold text-lg text-center text-[#fff]`}>
            <Text
              style={tw`text-[#332257] text-center py-2 mb-2 font-bold text-lg`}
            >
              Amica
            </Text>
          </Text>
        </View>
      </View>
      <TouchableOpacity style={tw`bg-[#fff] rounded-md p-2`}>
        <View style={tw`flex flex-row items-center justify-center`}>
          <Icon.LogOut strokeWidth={2} stroke={"#fff"} style={tw``} />
        </View>
      </TouchableOpacity>
    </View>
      <View style={tw`  items-center mb-6`}>
        <Image
          style={tw`w-100 h-60 `}
          source={{
            uri: `https://firebasestorage.googleapis.com/v0/b/amica-577d1.appspot.com/o/${user.data.imageFilename}?alt=media&token=691eede7-bbda-48f8-a25c-1836bfc7cc1e`,
          }}
        />
        <View style={tw`flex flex-row gap-60 p-2`}>
        <View style={tw``}>
          <Text style={tw`text-lg font-bold`}>{user.data.categories}</Text>
          <Text style={tw`text-gray-500`}>{user.data.category}</Text>
        </View>
        <View>
        <TouchableOpacity
        style={tw`bg-blue-500 py-2 px-4 rounded`}
        onPress={handleChatNavigation}
      >
        <Text style={tw`text-white`}>Chat</Text>
      </TouchableOpacity>
        </View>
        </View>
        </View>

        <View>
        <Text style={tw`text-gray-500`}>{user.data.description}</Text>
        </View>
      
    </View>
  );
};

export default ViewPage;
