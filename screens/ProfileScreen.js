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
      <View style={tw`bg-[#1a1a1a] p-4`}>
        <View style={tw`flex-row justify-between items-center`}>
          <TouchableOpacity style={tw`p-2`} onPress={() => navigation.goBack()}>
            <Icon.ArrowLeft width={30} height={20} stroke={"#fff"} />
          </TouchableOpacity>
          <Text style={tw`text-white text-lg font-semibold`}>Profile</Text>
          <TouchableOpacity style={tw`p-2`} onPress={signOut}>
            <Icon.LogOut width={30} height={20} stroke={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`flex-1 items-center p-4`}>
          <Image
            style={tw`w-50 h-50 rounded-full border-4 border-[#1a1a1a]`}
            source={{
              uri: `https://firebasestorage.googleapis.com/v0/b/amica-577d1.appspot.com/o/${userDetails?.imageFilename}?alt=media&token=691eede7-bbda-48f8-a25c-1836bfc7cc1e`,
            }}
          />

          <View style={tw`mt-4 bg-white w-full rounded-lg p-4 shadow`}>
            <Text style={tw`text-xl font-bold text-[#000]`}>
            {userDetails?.categories[0] || "User Category"}
            </Text>
            <Text style={tw`text-gray-600 text-sm`}>
              {userDetails?.location || "User Location"}
            </Text>
            <View style={tw`mt-2`}>
              <Text style={tw`text-[#000] font-semibold `}>Description</Text>
              <Text style={tw`text-gray-500`}>{userDetails?.description}</Text>
            </View>
          </View>

          <View style={tw`mt-4 bg-white w-full rounded-lg p-4 shadow`}>
            <Text style={tw`text-lg font-bold text-[#000]`}>
              Recent Comments
            </Text>
            {userDetails?.comments && userDetails.comments.length > 0 ? (
              userDetails.comments.map((comment, index) => (
                <View key={index} style={tw`p-2 border-b border-gray-200`}>
                  <Text style={tw`text-gray-500`}>{comment}</Text>
                </View>
              ))
            ) : (
              <Text style={tw`text-gray-500 text-center`}>
                No comments available
              </Text>
            )}
          </View>

          <View style={tw`mt-4 bg-white w-full rounded-lg p-4 shadow`}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Preferences")}
              style={tw`bg-[#1a1a1a] rounded-md py-2`}
            >
              <Text style={tw`text-center text-white font-semibold`}>
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("History")}
              style={tw`bg-[#1a1a1a] rounded-md py-2 mt-2`}
            >
              <Text style={tw`text-center text-white font-semibold`}>
                Work History
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
