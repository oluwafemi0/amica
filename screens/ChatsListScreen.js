import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import firestore from "@react-native-firebase/firestore";
import tw from "twrnc";
import auth from "@react-native-firebase/auth";
import * as Icon from "react-native-feather";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const ChatsListScreen = () => {
  const [chats, setChats] = useState([]);
  const isFocused = useIsFocused();
  const currentUser = auth().currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const chatsSnapshot = await firestore()
          .collection("chats")
          .where(`members.${currentUser.uid}`, "==", true)
          .get();

        const fetchedChats = chatsSnapshot.docs.map((doc) => {
          const otherUserId = Object.keys(doc.data().members).find(
            (memberId) => memberId !== currentUser.uid
          );
          return {
            id: doc.id,
            userId: otherUserId,
            user: doc.data().otherUser,
          };
        });

        setChats(fetchedChats);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();

    return () => {};
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[tw` flex flex-row w-96 h-20 rounded-lg border-2 border-[#36013f] p-1 mt-2`, ]}
      onPress={() =>
        navigation.navigate("Chat", {
          user: { id: item.userId, data: item.user },
        })
      }
    >
      <Image
        style={tw`w-24 h-16 mt-0.5 rounded-lg`}
        source={{
          uri: `https://firebasestorage.googleapis.com/v0/b/amica-577d1.appspot.com/o/${item.user.imageFilename}?alt=media&token=691eede7-bbda-48f8-a25c-1836bfc7cc1e`,
        }}
      />

      <View style={tw`p-2 w-70`}>
        <View style={tw`flex flex-row py-4 justify-between`}>
          <View>
            <Text style={tw`text-[#36013f] text-base font-bold`}>
              {item.user.categories}
            </Text>
          </View>
          <View>
            <Text style={tw`text-[#000] text-sm mt-0.5 font-bold`}>
              {item.user.category}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[tw`bg-[#000]`, ]}>
      <View style={[tw`bg-[#000] p-2 `,]}>
        <View style={tw`flex-row  justify-between items-center mx-auto`}>
          <TouchableOpacity
            style={[tw` rounded-md p-1 rounded-full`, { }]}
            onPress={() => navigation.goBack()}
          >
            <View style={tw`flex flex-row items-center justify-center`}>
              <Icon.ArrowLeft width={20} height={20} stroke={"#fff"} style={tw``} />
            </View>
          </TouchableOpacity>
          <View style={tw`flex-1 items-center p-2`}>
            <View style={tw``}>
              <Text
                style={tw`font-medium text-lg text-center text-[#fff]`}
              >
                Chat
              </Text>
            </View>
          </View>
          <TouchableOpacity style={[tw`bg-[#000] rounded-md p-2`,]}>
            <View style={tw`flex flex-row items-center justify-center`}>
              <Icon.LogOut strokeWidth={2} stroke={"#000"} style={tw``} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`bg-[#fff]`}>
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={1}
        contentContainerStyle={tw`p-1 bg-[#fff]`}
        extraData={chats}
      />
      </View>
    </View>
  );
};

export default ChatsListScreen;
