import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import firestore from "@react-native-firebase/firestore";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";

const UserList = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firestore().collection("users").get();
        const fetchedUsers = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        const currentUser = auth().currentUser;
        if (!currentUser) return;

        const filteredUsers = fetchedUsers.filter(
          (user) => user.id !== currentUser.uid
        );

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const imageUrlPrefix =
    "https://firebasestorage.googleapis.com/v0/b/amica-577d1.appspot.com/o/";
  const imageUrlSuffix =
    "?alt=media&token=691eede7-bbda-48f8-a25c-1836bfc7cc1e";

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        tw`flex-1 h-55 rounded-lg bg-[#fff] border border-[#fff]  m-1`,
      ]}
      onPress={() => {
        navigation.navigate("ViewPage", { user: item });
      }}
    >
      <Image
        style={tw`h-2/3 w-full rounded-lg `}
        source={{
          uri: imageUrlPrefix + item.data.imageFilename + imageUrlSuffix,
        }}
      />

      <View style={tw`p-2 flex flex-row justify-between bg-[#fff] border-t-4 border-[#fff]`}>
        <View  style={tw`my-1`}>
        <Text
          style={tw`text-xl font-bold text-[#000] `}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.data.categories}
        </Text>
        <Text
          style={tw`text-sm text-[#000]`}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.data.location}
        </Text>
        </View>
        <View style={tw`my--3.5`}>
        <Text
          style={tw`text-[#000] font-semibold my-6`}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.data.category}
        </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`py-2`}>
      <Text style={tw`text-[#fff] p-1 ml-1 text-lg font-semibold`}>
        Recommended
      </Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={tw`p-2`}
      />
    </View>
  );
};

export default UserList;
