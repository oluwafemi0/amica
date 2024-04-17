import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import tw from "twrnc";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firestore().collection("users").get();
        const fetchedUsers = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();

    // Clean up function
    return () => {};
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={tw`bg-[#fff] p-4 border border-[#332257]  w-1/2.1 h-60 rounded-lg`}
    >
      <Text>User ID: {item.id}</Text>
      <Text>Name: {item.data.name}</Text>
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
        numColumns={2} // Change the number of columns as needed
        contentContainerStyle={tw`flex gap-4`}
        columnWrapperStyle={{ justifyContent: "space-between" }} // Adjust spacing between rows
      />
    </View>
  );
};

export default UsersList;
