import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import tw from "twrnc";
import * as Icon from "react-native-feather";
import auth from "@react-native-firebase/auth";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const ChatsListScreen = () => {
  const [chats, setChats] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const currentUser = auth().currentUser;
        const chatsSnapshot = await firestore()
          .collection("chats")
          .doc(currentUser.uid)
          .get();
        const chatIds = Object.keys(chatsSnapshot.data() || {});

        const fetchedChats = await Promise.all(
          chatIds.map(async (chatId) => {
            const chatUserSnapshot = await firestore()
              .collection("users")
              .doc(chatId)
              .get();
            return {
              id: chatId,
              user: chatUserSnapshot.data(),
            };
          })
        );

        setChats(fetchedChats);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();

    return () => {};
  }, [isFocused]);

  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={tw`bg-[#fff]   w-1/2.1 h-60 rounded-lg`}
      onPress={() => navigation.navigate("Chat", { user: item })}
    >
      <Image
        style={tw`w-1/1 h-2.4/3 rounded-t-lg mx-auto `}
        source={{ uri: item.user.imageFilename }}
      />

      <View style={tw`bg-[#b2a1cd] p-2 flex h-0.6/3   rounded-b-lg`}>
        <View style={tw``}>
          <Text style={tw`text-[#fff] text-lg font-bold mx-auto `}>
            {item.user.categories}
          </Text>
        </View>
        <View style={tw`flex flex-row justify-between `}>
          <View>
            <Text style={tw`text-[#fff] font-bold`}>{item.user.category}</Text>
          </View>
          <View>
            <Text style={tw`text-[#fff] font-bold`}>{item.user.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`items-center py-6`}>
      <Text
        style={tw`text-white px-20 py-4 bg-[#332257] rounded-lg text-center mb-4`}
      >
        Chats
      </Text>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={tw`flex gap-4`}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        extraData={chats}
      />
    </View>
  );
};

export default ChatsListScreen;
