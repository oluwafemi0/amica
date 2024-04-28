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
      style={tw`bg-[#fff] w-1/2.1 h-60 rounded-lg`}
      onPress={() => navigation.navigate("Chat", { user: item })}
    >
      <Image
        style={tw`w-1/1 h-2.4/3 rounded-t-lg mx-auto`}
        source={{
          uri: `https://firebasestorage.googleapis.com/v0/b/amica-577d1.appspot.com/o/${item.data.imageFilename}?alt=media&token=691eede7-bbda-48f8-a25c-1836bfc7cc1e`,
        }}
      />

      <View style={tw`bg-[#b2a1cd] p-2 flex h-0.6/3 rounded-b-lg`}>
        <View style={tw``}>
          <Text style={tw`text-[#fff] text-lg font-bold mx-auto `}>
            {item.data.categories}
          </Text>
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
    <View style={tw`bg-white p-4 shadow-md rounded-md `}>
      <View style={tw`flex-row justify-between items-center mx-auto`}>
        <TouchableOpacity
          style={tw`bg-[#fff] rounded-md p-2 `}
          onPress={() => navigation.goBack()}
        >
          <View style={tw`flex flex-row items-center justify-center`}>
            <Icon.ArrowLeft strokeWidth={2} stroke={"#332257"} style={tw``} />
          </View>
        </TouchableOpacity>
        <View style={tw`flex-1 items-center p-2`}>
          <View style={tw``}>
            <Text style={tw`font-semibold text-lg text-center text-[#fff]`}>
              <Text
                style={tw`text-[#332257] text-center py-2 mb-2 font-bold text-lg`}
              >
                {category}
              </Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity style={tw`bg-[#fff] rounded-md p-2`}>
          <View style={tw`flex flex-row items-center justify-center`}>
            <Icon.LogOut strokeWidth={2} stroke={"#fff"} style={tw``} />
          </View>
        </TouchableOpacity>
      </View>
      {filteredUsers.length > 0 ? (
        <FlatList
          data={filteredUsers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={tw`flex gap-4`}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      ) : (
        <Text style={tw`text-[#332257] text-center mt-4`}>No users found</Text>
      )}
    </View>
  );
};

export default CategoryPage;
