import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";
import Upload from "../components/Upload";

const PreferencesScreen = () => {
  const [categories, setCategories] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  const handleSavePreferences = async (filename) => {
    const currentUser = auth().currentUser;

    if (currentUser) {
      const { uid } = currentUser;
      const userDoc = firestore().collection("users").doc(uid);

      try {
        await userDoc.set({
          categories: categories.split(",").map((category) => category.trim()),
          location,
          description,
          category: categoryName,
          imageFilename: filename,
        });

        console.log("User details saved successfully!");
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
    <SafeAreaView style={tw`flex-1 bg-[#fff] `}>
    <View style={tw` bg-[#CBC3E3] p-2 mb-2`}>
      <View style={tw`bg-[#CBC3E3] `}>
        <View style={tw`flex-row justify-between items-center mx-auto`}>
          <TouchableOpacity
            style={tw`bg-[#CBC3E3]  p-2 `}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate("Home");
              }
            }}
          >
            <View style={tw`flex flex-row items-center justify-center`}>
              <Icon.ArrowLeft
                strokeWidth={2}
                stroke={"#fff"}
                style={tw``}
              />
            </View>
          </TouchableOpacity>
          <View style={tw`flex-1 items-center p-2`}>
            <View style={tw``}>
              <Text
                style={tw`font-semibold mr-8 text-lg text-center text-[#fff]`}
              >
                Add Your Details
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
      <ScrollView style={tw`p-2 `}>

        <Upload setImage={setImage} onUpload={handleSavePreferences} />
        <View style={tw`bg-white rounded-lg p-2 `}>
          <Text style={tw`font-medium text-[#333] mb-1 text-left pl-2`}>
            Name
          </Text>
          <TextInput
            placeholder="Add Name"
            style={tw`h-10 border text-left pl-2 text-gray-500 border-[#333] rounded-lg`}
            onChangeText={(text) => setCategories(text)}
            value={categories}
          />
        </View>
        <View style={tw`bg-white rounded-lg p-2 `}>
          <Text style={tw`font-medium text-[#333] mb-1 text-left pl-2`}>
            Location
          </Text>
          <TextInput
            placeholder="Add Location"
            style={tw`h-10 border text-left pl-2 text-gray-500 border-[#333] rounded-lg`}
            onChangeText={(text) => setLocation(text)}
            value={location}
          />
        </View>
        <View style={tw`bg-white rounded-lg p-2 `}>
          <Text style={tw`font-medium text-[#333] mb-1 text-left pl-2`}>
            Description
          </Text>
          <TextInput
            placeholder="Add Description"
            style={tw`h-10 border text-left pl-2 text-gray-500 border-[#333] rounded-lg`}
            onChangeText={(text) => setDescription(text)}
            value={description}
          />
        </View>
        <View style={tw`bg-white rounded-lg p-2 `}>
          <Text style={tw`font-medium text-[#333] text-left pl-2 mb-1 `}>
            Category
          </Text>
          <TouchableOpacity
            style={tw`h-10 border border-[#333] rounded-lg justify-center`}
            onPress={() => setModalVisible(true)}
          >
            <Text style={tw`text-left pl-2 text-gray-500`}>
              {categoryName || "Select Category"}
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
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
                    <Text style={tw`py-2 px-4 text-center text-[#CBC3E3]`}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
};

export default PreferencesScreen;
