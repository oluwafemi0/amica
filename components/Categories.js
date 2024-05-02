import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import firestore from "@react-native-firebase/firestore";
import tw from "twrnc";
import * as Icon from "react-native-feather";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

const UserList = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firestore().collection("users").get();
        const fetchedUsers = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
          categories: [],
        }));

        const currentUser = auth().currentUser;
        const filteredUsers = fetchedUsers.filter(
          (user) => user.id !== currentUser.uid
        );

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    return () => {};
  }, []);

  const imageUrlPrefix =
    "https://firebasestorage.googleapis.com/v0/b/amica-577d1.appspot.com/o/";
  const imageUrlSuffix =
    "?alt=media&token=691eede7-bbda-48f8-a25c-1836bfc7cc1e";

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={tw`bg-white w-90 h-30 rounded-lg overflow-hidden flex flex-row `}
      onPress={() => {
        navigation.navigate("Chat", { user: item });
        const newChats = [...chats, { id: item.id, user: item.data }];
        setChats(newChats);
      }}
    >
      <Image
        style={tw`w-1.2/3 h-full`}
        source={{
          uri: imageUrlPrefix + item.data.imageFilename + imageUrlSuffix,
        }}
      />

      <View style={tw`p-2`}>
        <View style={tw`flex flex-row gap-30 justify-between`}>
          <Text
            style={tw`text-lg font-bold text-gray-600 mt-8`}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.data.categories}
          </Text>
          <Text
            style={tw`text-sm text-blue-800 font-semibold `}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.data.category}
          </Text>
        </View>
        <Text
          style={tw`text-sm text-gray-500 `}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.data.location}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw` py-2 `}>
      <Text style={tw`text-gray-600 p-1 text-lg font-semibold`}>
        Recommended
      </Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={1}
        contentContainerStyle={tw`flex gap-3 bg-gray-100 p-2 rounded-lg`}
      />
    </View>
  );
};

export default UserList;
