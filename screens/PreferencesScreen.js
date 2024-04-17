import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";

const PreferencesScreen = () => {
  const [categories, setCategories] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const userName = route.params?.userName || "";

  const handleSavePreferences = async () => {
    const currentUser = auth().currentUser;

    if (currentUser) {
      const { uid } = currentUser;
      const userDoc = firestore().collection("users").doc(uid);
      const userDetailsDoc = userDoc.collection("details").doc("userDetails");

      try {
        await userDetailsDoc.set({
          categories: categories.split(",").map((category) => category.trim()),
          location,
          description,
          name: userName,
        });
        console.log("User details saved successfully!");

        const categoryCollection = firestore().collection("categories");
        const categoryDoc = categoryCollection.doc(categoryName.toLowerCase());

        await categoryDoc.collection("users").doc(uid).set({
          userName,
          location,
          description,
        });
        console.log("User added to category successfully!");

        navigation.navigate("Home");
      } catch (error) {
        console.error("Error saving user details: ", error);
      }
    }
  };

  const categoryList = [
    { id: "1", name: "Electrical" },
    { id: "2", name: "School" },
    { id: "3", name: "Cooking" },
    { id: "4", name: "Errand" },
    { id: "5", name: "Cleaner" },
    { id: "6", name: "Plumber" },
    { id: "7", name: "Welder" },
  ];

  return (
    <SafeAreaView style={tw`flex-1 bg-[#fff]`}>
      <View style={tw`bg-[#332257] p-4`}>
        <View style={tw`flex-row justify-between items-center`}>
          <TouchableOpacity
            style={tw`bg-white rounded-md p-2`}
            onPress={() => navigation.goBack()}
          >
            <Icon.ArrowLeft strokeWidth={2} stroke={"#332257"} />
          </TouchableOpacity>
          <Text style={tw`font-semibold text-lg text-white`}>
            Add Your Details
          </Text>
          <TouchableOpacity
            style={tw`bg-green-500 rounded-md p-2`}
            onPress={handleSavePreferences}
          >
            <Icon.Save strokeWidth={2} stroke={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`p-4`}>
        <View style={tw`bg-white rounded-lg p-4 mb-4`}>
          <Text style={tw`font-medium text-[#333] mb-2`}>Name</Text>
          <TextInput
            placeholder="Add Name"
            style={tw`h-12 border border-[#333] rounded-lg pl-2 text-gray-500`}
            onChangeText={(text) => setCategories(text)}
            value={categories}
          />
        </View>
        <View style={tw`bg-white rounded-lg p-4 mb-4`}>
          <Text style={tw`font-medium text-[#333] mb-2`}>Location</Text>
          <TextInput
            placeholder="Add Location"
            style={tw`h-12 border border-[#333] rounded-lg pl-2 text-gray-500`}
            onChangeText={(text) => setLocation(text)}
            value={location}
          />
        </View>
        <View style={tw`bg-white rounded-lg p-4 mb-4`}>
          <Text style={tw`font-medium text-[#333] mb-2`}>Description</Text>
          <TextInput
            placeholder="Add Description"
            style={tw`h-12 border border-[#333] rounded-lg pl-2 text-gray-500`}
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
        </View>
        <View style={tw`bg-white rounded-lg p-4 mb-4`}>
          <Text style={tw`font-medium text-[#333] mb-2`}>Category</Text>
          <TouchableOpacity
            style={tw`h-12 border border-[#333] rounded-lg justify-center pl-2`}
            onPress={() => setModalVisible(true)}
          >
            <Text style={tw`text-gray-500`}>
              {categoryName || "Select Category"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}
        >
          <View style={tw`bg-white p-4 w-80 rounded-lg`}>
            <FlatList
              data={categoryList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setCategoryName(item.name);
                    setModalVisible(false);
                  }}
                >
                  <Text style={tw`py-2 px-4 text-[#45B1E8]`}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PreferencesScreen;
