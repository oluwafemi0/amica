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
51747
  const imageUrlPrefix =
    "https://firebasestorage.googleapis.com/v0/b/amica-577d1.appspot.com/o/";
  const imageUrlSuffix =
    "?alt=media&token=691eede7-bbda-48f8-a25c-1836bfc7cc1e";

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        tw` h-24 rounded-lg bg-[#000] flex flex-row border-2 border-[#000] p-1  `,
       ,
      ]}
      onPress={() => {
        navigation.navigate("ViewPage", { user: item });
      }}
    >
      <Image
        style={tw`w-1.2/3 h-full rounded-lg`}
        source={{
          uri: imageUrlPrefix + item.data.imageFilename + imageUrlSuffix,
        }}
      />

      <View style={tw`p-2 ml-2`}>
        <View style={tw`flex flex-row md:gap-20 gap-30 justify-between`}>
          <Text
            style={tw`text-lg font-bold text-white `}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.data.categories}
          </Text>
        <Text
          style={tw`text-sm text-white`}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.data.location}
        </Text>
          
        </View>
        
        <Text
          style={tw`text-blue-800 font-semibold `}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.data.category}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`py-2 `}>
      <Text style={tw`text-[#000] p-1 ml-1 text-lg font-semibold`}>
        Recommended
      </Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={1}
        contentContainerStyle={tw`flex gap-3 p-2 rounded-lg`}
      />
    </View>
  );
};

export default UserList;
