import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const Welcome = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);
  const user = auth().currentUser;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetailsSnapshot = await firestore()
          .collection("users")
          .doc(user.uid)
          .get();

        if (userDetailsSnapshot.exists) {
          setUserDetails(userDetailsSnapshot.data());
        }
      } catch (error) {
        console.error("Error fetching user details: ", error);
      }
    };

    fetchUserDetails();
  }, []);

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={tw`bg-white p-4`}>
      <View style={tw`flex-row items-center justify-between`}>
        <Text style={tw`text-2xl font-semibold text-black`}>Explore</Text>

        <View style={tw`flex-row items-center`}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ChatsList")}
            style={tw`p-2 rounded-full bg-black`}
          >
            <Icon.Mail width={20} height={20} stroke="#fff" />
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToProfile} style={tw`ml-4`}>
            {user && user.photoURL ? (
              <Image
                style={tw`w-9 h-9 rounded-full border-2 border-black`}
                source={{
                  uri: `https://firebasestorage.googleapis.com/v0/b/amica-577d1.appspot.com/o/${userDetails?.imageFilename}?alt=media&token=691eede7-bbda-48f8-a25c-1836bfc7cc1e`,
                }}
              />
            ) : (
              <Icon.User width={20} height={20} stroke="#000" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
