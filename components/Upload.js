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
    <SafeAreaView  style={tw`mt--2`}>
      <View style={tw`h-55 m-2 mx-22 border border-[#333] rounded-lg`}>
      {imageURI && (
          <Image
            source={{ uri: imageURI }}
            style={tw`rounded-lg w-50 h-50 mx-auto my-2`}
          />
        )}
      </View>
      <View style={tw`flex mx-auto gap-2 flex-row pb-2`}>
      <TouchableOpacity
        style={tw`rounded-lg w-30 h-10  mx-auto p-2 mb-2 border border-[#333]`}
        onPress={pickImage}
      >
        <Text
          style={tw`text-md font-semibold text-[#333] text-center mx-auto my-auto`}
        >
          Select Picture
        </Text>
      </TouchableOpacity>

      <View>
       
        <TouchableOpacity
          style={tw`rounded-lg w-30 h-10  mx-auto p-2 border border-[#333]`}
          onPress={uploadMedia}
        >
          <Text
            style={tw`text-md font-semibold text-[#333] text-center mx-auto my-auto`}
          >
            Upload All
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default Upload;
