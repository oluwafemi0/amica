import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, TextInput } from "react-native";
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
    <View style={[tw`bg-white p-1 border-b  border-b-[#D1D5DB]`, { backgroundColor: "#fff"}]}>
      <View style={tw`flex-row items-center`}>
        <View style={tw`flex-1 `}>
          <Image
            source={require("../assets/images/HANDS.png")}
            style={tw`w-20 h-14`}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("ChatsList")}
          style={[tw`p-1.6 rounded-lg mr-2`, { backgroundColor: "#fff", borderColor: "#D1D5DB", borderWidth: 1 }]}>
          <Icon.Mail width={20} height={20} stroke="#1565C0" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToProfile}
          style={[tw`rounded-lg`, { backgroundColor: "#D1D5DB", borderColor: "#D1D5DB", borderWidth: 1 }]}>
          {user && user.photoURL ? (
            <Image
              style={tw`w-9 h-9 rounded-lg`}
              source={{
                uri: `https://firebasestorage.googleapis.com/v0/b/amica-577d1.appspot.com/o/${userDetails?.imageFilename}?alt=media&token=691eede7-bbda-48f8-a25c-1836bfc7cc1e`,
              }}
            />
          ) : (
            <Icon.User width={20} height={20} stroke="#F5F5F5" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
