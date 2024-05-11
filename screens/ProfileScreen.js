import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Icon from "react-native-feather";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import firestore from "@react-native-firebase/firestore";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
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

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const goToUploadPage = () => {
    navigation.navigate("Upload", { user });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={tw` bg-transparent p-2 `}>
        <View style={tw`bg-transparent p-2  border-b-2 border-gray-200`}>
          <View style={tw`flex-row justify-between items-center mx-auto`}>
            <TouchableOpacity
              style={tw`bg-transparent p-2 `}
              onPress={() => navigation.goBack()}
            >
              <View style={tw`flex flex-row items-center justify-center`}>
                <Icon.ArrowLeft strokeWidth={2} stroke={"#333"} style={tw``} />
              </View>
            </TouchableOpacity>
            <View style={tw`flex-1 items-center p-2`}>
              <View style={tw``}>
                <Text style={tw`font-semibold text-lg text-center text-[#333]`}>
                  Profile
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={tw`bg-transparent p-2`}
              onPress={signOut}
            >
              <View style={tw`flex flex-row items-center justify-center`}>
                <Icon.LogOut strokeWidth={2} stroke={"#333"} style={tw``} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`mt--4`}>
          <View style={tw`bg-transparent p-4`}>
            <View style={tw`items-center `}>
              <Image
                style={tw`w-100 h-60 rounded-md bg-gray-300 `}
                source={{
                  uri: `https://firebasestorage.googleapis.com/v0/b/amica-577d1.appspot.com/o/${userDetails?.imageFilename}?alt=media&token=691eede7-bbda-48f8-a25c-1836bfc7cc1e`,
                }}
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: "#333",
                  marginTop: 12,
                }}
              >
                {userDetails?.categories[0]}
              </Text>
              <Text style={{ fontSize: 16, color: "#333", marginTop: 6 }}>
                {userDetails?.location}
              </Text>
            </View>
            <View
              style={tw`flex flex-row items-center justify-center gap-2 mt-8 `}
            >
              <Image
                style={tw`w-[100px] h-[100px] rounded-md bg-gray-300 border-2 border-gray-200`}
                source={{
                  uri: `https://firebasestorage.googleapis.com/v0/b/amica-577d1.appspot.com/o/${userDetails?.imageFilename}?alt=media&token=691eede7-bbda-48f8-a25c-1836bfc7cc1e`,
                }}
              />
              <Image
                style={tw`w-[100px] h-[100px] rounded-md bg-gray-300 border-2 border-gray-200`}
                source={{
                  uri: `https://firebasestorage.googleapis.com/v0/b/amica-577d1.appspot.com/o/${userDetails?.imageFilename}?alt=media&token=691eede7-bbda-48f8-a25c-1836bfc7cc1e`,
                }}
              />
            </View>
          </View>
          <View
            style={tw` flex flex-row items-center justify-center gap-2 mt-2 `}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Preferences")}
              style={tw`bg-[#333] rounded-md p-8 mb-3`}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("History")}
              style={tw`bg-[#333] rounded-md p-8 mb-3 `}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#fff",
                  textAlign: "center",
                }}
              >
                Work History
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
