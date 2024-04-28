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
      style={tw`bg-white w-1/2.1 h-64 rounded-lg overflow-hidden  border border-[#332257]`}
      onPress={() => {
        navigation.navigate("Chat", { user: item });
        const newChats = [...chats, { id: item.id, user: item.data }];
        setChats(newChats);
      }}
    >
      <Image
        style={tw`w-full h-2.2/3`}
        source={{
          uri: imageUrlPrefix + item.data.imageFilename + imageUrlSuffix,
        }}
      />

      <View style={tw`p-2`}>
        <View style={tw`flex flex-row justify-between`}>
          <Text
            style={tw`text-lg font-bold text-blue-800 mb-2`}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.data.categories}
          </Text>
          <Text
            style={tw`text-sm text-gray-600 mt-1`}
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
    <View style={tw`items-center py-6`}>
      <Text
        style={tw`text-white px-20 py-4 bg-[#332257] rounded-lg text-center mb-4`}
      >
        Users near you
      </Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={tw`flex gap-4`}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </View>
  );
};

export default UserList;
