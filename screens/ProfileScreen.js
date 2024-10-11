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
      <View style={tw` bg-transparent  `}>
        <View style={tw`bg-transparent  `}>
          <View style={tw`bg-[#000] p-6 `}>
        <View style={tw`flex-row  justify-between items-center mx-auto`}>
          <TouchableOpacity
            style={tw`bg-transparent rounded-md z-40  p-2 `}
            onPress={() => navigation.goBack()}
          >
            <View style={tw`flex flex-row items-center  p-2 rounded-full justify-center`}>
              <Icon.ArrowLeft width={40} height={20} stroke={"#fff"} style={tw`  `} />
            </View>
          </TouchableOpacity>
          <View style={tw`flex-1 items-center  ml-2`}>
          <Image
            style={tw`w-60 h-60 rounded-full  border-2 border-[#000] bg-white`}
            source={{
              uri: `https://firebasestorage.googleapis.com/v0/b/amica-577d1.appspot.com/o/${userDetails?.imageFilename}?alt=media&token=691eede7-bbda-48f8-a25c-1836bfc7cc1e`,
            }}
          />
          </View>
          <TouchableOpacity style={tw`bg-transparent rounded-md p-2`}  >
            <View style={tw`flex flex-row items-center justify-center`}>
            <TouchableOpacity
              style={tw`bg-transparent p-2 `}
              onPress={signOut}
            >
              <View style={tw`flex flex-row items-center  p-2 rounded-full justify-center `}>
                <Icon.LogOut  width={40} height={20} stroke={"#fff"} style={tw`  `} />
              </View>
            </TouchableOpacity>
              
            </View>
          </TouchableOpacity>
        </View>
      </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`mt--4`}>
          <View style={tw`bg-transparent p-3`}>
            <View style={tw`items-center flex flex-row gap-52 `}>
        <View style={tw`p-2 bg-white  h-15 rounded-md`}>
          <Text style={tw`text-[#000]  text-left uppercase  font-bold`}></Text>
          <View  style={tw` bg-white rounded-md `}>
              <Text style={tw`text-[#000] text-left text-2xl font-bold`}>{userDetails?.categories[0]}</Text>
          </View>
        </View>
        <View style={tw`p-2 bg-white  h-15 rounded-md mt-2`}>
          <Text style={tw`text-gray-300 text-base text-right uppercase  font-bold`}></Text>
          <View  style={tw` bg-white rounded-md  `}>
              <Text style={tw`text-black text-right font-semibold `}>{userDetails?.location}</Text>
          </View>
        </View>
            </View>
            <View style={tw`rounded-lg bg-[#fff] `}>
        <View style={tw`p-2 bg-[#000]   m-2  rounded-md `}>
          <Text style={tw`text-[#fff] text-sm text-left uppercase  font-bold`}>description</Text>
          <View  style={tw`p-2 bg-[#fff]  rounded-md  m-1`}>
              <Text style={tw`text-gray-500 text-left font-semibold`}>{userDetails?.description}</Text>
          </View>
        </View>
        </View>
        <View style={tw`mt-2`}>
        {userDetails && userDetails?.comments ? (
            
        <View style={tw`p-2 rounded-lg bg-[#000]  `}>
        <Text style={tw`text-[#fff] text-sm text-left uppercase  font-bold`}>most recent comment</Text>
        <View  style={tw`p-2 bg-[#fff]  rounded-md  m-1`}>
            <Text style={tw`text-gray-500 font-semibold`}>{userDetails?.comments[0]}</Text>
        </View>
        <View  style={tw`p-2 bg-[#fff]  rounded-md  m-1`}>
            <Text style={tw`text-gray-500 font-semibold`}>{userDetails?.comments[1]}</Text>
        </View>
        </View>
          ) : (
            <Text style={tw`text-gray-500 text-left font-semibold text-center mt-10`}>no comments available</Text>
          )}
        </View>

          </View>
          <View
            style={tw` items-center justify-center gap-2 mt-12 bg-[#fff]`}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Preferences")}
              style={tw`bg-[#fff] rounded-md px-27 py-3 mb-3 border-2 border-[#000]`}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#000",
                  textAlign: "center",
                }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("History")}
              style={tw`bg-[#fff] rounded-md  px-25 py-3 mb-3 border-2 border-[#000] `}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#000",
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
