import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import tw from "twrnc";
import { firebase } from "../config";

const Upload = ({ setImage, onUpload }) => {
  const [imageURI, setImageURI] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 2],
      quality: 1,
      multiple: true,
    });

    if (!result.cancelled) {
      setImageURI(result.assets[0].uri);
    }
  };

  const uploadMedia = async () => {
    try {
      const response = await fetch(imageURI);
      const blob = await response.blob();

      const filename = imageURI.substring(imageURI.lastIndexOf("/") + 1);
      const ref = firebase.storage().ref().child(filename);

      await ref.put(blob);

      onUpload(filename);

      Alert.alert("Picture Uploaded");
      setImageURI(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={tw`flex mx-auto  pb-2`}>
      <TouchableOpacity
        style={tw`rounded-lg w-full h-10 bg-[#F06292] mx-auto p-2 mb-2`}
        onPress={pickImage}
      >
        <Text
          style={tw`text-md font-semibold text-white text-center mx-auto my-auto`}
        >
          Select Picture
        </Text>
      </TouchableOpacity>

      <View>
        {imageURI && (
          <Image
            source={{ uri: imageURI }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <TouchableOpacity
          style={tw`rounded-lg w-full h-10 bg-[#F06292] mx-auto p-2`}
          onPress={uploadMedia}
        >
          <Text
            style={tw`text-md font-semibold text-white text-center mx-auto my-auto`}
          >
            Upload Picture
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Upload;
