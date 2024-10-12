import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import tw from "twrnc";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";

const JobForm = ({ route }) => {
 
  const { user1, user2 } = route.params;
  const navigation = useNavigation();

  
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
  });

  const handleSubmit = async () => {
    const { title, description, location, price } = jobDetails;

    if (!title || !description || !location || !price) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    try {
     
      await firestore()
        .collection("jobs")
        .add({
          ...jobDetails,
          createdBy: user1.uid, 
          assignedTo: user2.uid, 
          createdAt: new Date(),
        });
      Alert.alert("Success", "Job successfully created!");
      navigation.goBack();
    } catch (error) {
      console.error("Error creating job:", error);
      Alert.alert("Error", "There was a problem creating the job.");
    }
  };

  return (
    <View style={tw`flex-1 p-4 bg-gray-50`}>
      <View style={tw`flex-row justify-between items-center mb-6`}>
        <TouchableOpacity
          style={tw`p-2 bg-[#000] rounded-full`}
          onPress={() => navigation.goBack()}
        >
          <Icon.ArrowLeft strokeWidth={2} stroke="#fff" />
        </TouchableOpacity>
        <Text style={tw`text-xl font-semibold text-[#000]`}>Job Form</Text>
        <View style={tw`w-10`}></View>
      </View>

      <TextInput
        style={tw`p-2 bg-gray-200 rounded-lg mb-4`}
        placeholder="Job Title"
        value={jobDetails.title}
        onChangeText={(text) => setJobDetails({ ...jobDetails, title: text })}
      />
      <TextInput
        style={tw`p-2 bg-gray-200 rounded-lg mb-4`}
        placeholder="Job Description"
        value={jobDetails.description}
        onChangeText={(text) =>
          setJobDetails({ ...jobDetails, description: text })
        }
      />
      <TextInput
        style={tw`p-2 bg-gray-200 rounded-lg mb-4`}
        placeholder="Location"
        value={jobDetails.location}
        onChangeText={(text) =>
          setJobDetails({ ...jobDetails, location: text })
        }
      />
      <TextInput
        style={tw`p-2 bg-gray-200 rounded-lg mb-4`}
        placeholder="Price"
        keyboardType="numeric"
        value={jobDetails.price}
        onChangeText={(text) => setJobDetails({ ...jobDetails, price: text })}
      />

      <TouchableOpacity
        style={tw`p-3 bg-[#000] rounded-lg`}
        onPress={handleSubmit}
      >
        <Text style={tw`text-center text-white font-semibold`}>Submit Job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default JobForm;
