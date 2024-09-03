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
      style={tw` w-1/2.1 h-60 rounded-lg bg-[#fff] border-2 border-[#36013f] p-1 m-1`}
      onPress={() => navigation.navigate("Chat", { user: item })}
    >
      <Image
        style={tw`w-full h-2/3 rounded-lg`}
        source={{
          uri: `https://firebasestorage.googleapis.com/v0/b/amica-577d1.appspot.com/o/${item.data.imageFilename}?alt=media&token=691eede7-bbda-48f8-a25c-1836bfc7cc1e`,
        }}
      />

        <View style={tw`p-1 flex flex-row justify-between my-4 border-t-2 border-[#36013f]`}>
                <View  style={tw`my-1`}>
                <Text
                  style={tw`text-xl font-bold text-[#36013f] `}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.data.categories}
                </Text>
                <Text
                  style={tw`text-sm text-[#36013f]`}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.data.location}
                </Text>
                </View>
                <View style={tw`my--3.5`}>
                <Text
                  style={tw`text-blue-800 font-semibold my-6`}
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
    <View style={tw`bg-[#fff]  flex-1`}>
      <View style={tw`p-4 bg-[#36013f] `}>
        <View style={tw`flex-row bg-[#36013f]  justify-between items-center mx-auto`}>
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
            <Icon.LogOut strokeWidth={2} stroke={"#36013f"} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw`p-2 bg-[#fff]`}>
      {filteredUsers.length > 0 ? (
        <FlatList
          data={filteredUsers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={tw`flex gap-4 `}
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
