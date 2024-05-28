import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import * as Icon from "react-native-feather";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const CategoryPage = ({ route }) => {
  const { category } = route.params;
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const currentUser = auth().currentUser;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firestore().collection("users").get();
        const fetchedUsers = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
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

  const filteredUsers = users.filter((user) => user.data.category === category);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={tw`bg-gray-300 bg-opacity-70 w-1/2.1 h-60 rounded-lg shadow-md`}
      onPress={() => navigation.navigate("Chat", { user: item })}
    >
      <Image
        style={tw`w-full h-2.4/3 rounded-t-lg`}
        source={{
          uri: `https://firebasestorage.googleapis.com/v0/b/amica-577d1.appspot.com/o/${item.data.imageFilename}?alt=media&token=691eede7-bbda-48f8-a25c-1836bfc7cc1e`,
        }}
      />

      <View style={tw`bg-gray-600 bg-opacity-70 p-2 flex h-0.6/3 rounded-b-lg`}>
        <View style={tw``}>
          <Text style={tw`text-white text-lg font-bold mx-auto `}>
            {item.data.categories}
          </Text>
        </View>
        <View style={tw`flex flex-row justify-between `}>
          <View>
            <Text style={tw`text-white font-bold`}>{item.data.category}</Text>
          </View>
          <View>
            <Text style={tw`text-white font-bold`}>{item.data.location}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={tw`bg-[#fff]  flex-1`}>
      <View style={tw`p-4 bg-[#CBC3E3]`}>
        <View style={tw`flex-row bg-[#CBC3E3] justify-between items-center mx-auto`}>
          <TouchableOpacity
            style={tw`rounded-md p-2`}
            onPress={() => navigation.goBack()}
          >
            <Icon.ArrowLeft strokeWidth={2} stroke={"#fff"} />
          </TouchableOpacity>
          <View style={tw`flex-1 items-center`}>
            <View style={tw``}>
              <Text style={tw`font-semibold text-lg text-center text-white`}>
                {category}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={tw` p-2`}>
            <Icon.LogOut strokeWidth={2} stroke={"#CBC3E3"} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`p-4 bg-[#fff]`}>
      {filteredUsers.length > 0 ? (
        <FlatList
          data={filteredUsers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={tw`flex gap-4 p-4`}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      ) : (
        <Text style={tw`text-[#CBC3E3] text-center mt-10`}>No users found</Text>
      )}
      </View>
    </View>
  );
};

export default CategoryPage;
