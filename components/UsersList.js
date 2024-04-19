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

const UsersList = () => {
  const [users, setUsers] = useState([]);

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
        const filteredUsers = fetchedUsers.filter(user => user.id !== currentUser.uid);

        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    
    return () => {};
  }, []);

  const imageUrlPrefix = 'https://firebasestorage.googleapis.com/v0/b/amica-577d1.appspot.com/o/';
  const imageUrlSuffix = '?alt=media&token=691eede7-bbda-48f8-a25c-1836bfc7cc1e'; 

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={tw`bg-[#fff]   w-1/2.1 h-60 rounded-lg`}
    >
      <Image
        style={tw`w-1/1 h-2.4/3 rounded-t-lg mx-auto `}
        source={{ uri: imageUrlPrefix + item.data.imageFilename + imageUrlSuffix }}
      />

      <View
        style={tw`bg-[#b2a1cd] p-2 flex h-0.6/3   rounded-b-lg`}
      >
        <View style={tw``}>
          <Text style={tw`text-[#fff] text-lg font-bold mx-auto `}>{item.data.categories}</Text>
        </View>
        <View style={tw`flex flex-row justify-between `}>
        <View>
          <Text style={tw`text-[#fff] font-bold`}>{item.data.category}</Text>
        </View>
        <View>
          <Text style={tw`text-[#fff] font-bold`}>{item.data.location}</Text>
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

export default UsersList;
