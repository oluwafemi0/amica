import { View, Text, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import tw from 'twrnc'
import { firebase } from '../config'
import * as FileSystem from 'expo-file-system'

const upload = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
      multiple: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadMedia = async () => {
    setUploading(true);

    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      const filename = image.substring(image.lastIndexOf('/') + 1);
      const ref = firebase.storage().ref().child(filename);

      await ref.put(blob);
      setUploading(false);
      Alert.alert('Picture Uploaded');
      setImage(null);

    } catch(error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={tw`flex mx-auto mt-60`}>
      <TouchableOpacity style={tw`rounded-lg w-full h-10 bg-[#F06292] mx-auto p-2 mb-5`} onPress={pickImage}>
        <Text style={tw`text-md font-semibold text-white text-center mx-auto my-auto`}>Select Picture</Text>
      </TouchableOpacity>

      <View>
        {image && <Image 
          source={{uri: image}}
          style={{width: 300, height: 300}}
        />}
        <TouchableOpacity style={tw`rounded-lg w-full h-10 bg-[#F06292] mx-auto p-2`} onPress={uploadMedia}>
          <Text style={tw`text-md font-semibold text-white text-center mx-auto my-auto`}>Upload Picture</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default upload;
