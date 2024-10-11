import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import PreferencesScreen from "./PreferencesScreen";
import HomeScreen from "./HomeScreen";
import tw from "twrnc";

const LoginScreen = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const navigation = useNavigation();

  GoogleSignin.configure({
    webClientId:
      "172024979808-lfl30bhtm6qv96b6e5tllvp4b3i0rsi8.apps.googleusercontent.com",
  });

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onAuthStateChanged = async (user) => {
    setUser(user);
    if (initializing) setInitializing(false);

    if (user) {
      const userRef = firestore().collection("users").doc(user.uid);
      const doc = await userRef.get();
      if (!doc.exists) {
        setIsNewUser(true);
      }
    }
  };

  const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    try {
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error("Google Sign In Error: ", error);
    }
  };

  if (initializing) return null;

  if (!user) {
    return (
      <SafeAreaView style={tw`flex-1 bg-[#000]`}>
        <View style={tw`flex-1 justify-center items-center `}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/1061623/pexels-photo-1061623.jpeg?auto=compress&cs=tinysrgb&w=600",
            }}
            style={tw`absolute top-0 left-0 w-full h-full`}
          />
          <Text style={tw`text-[#000] text-5xl mb-20 font-extrabold`}>
            Amica
          </Text>
          <View style={tw`absolute bottom-80 left-5 right-5`}>
            <GoogleSigninButton
              style={tw`w-full h-12  rounded-lg`}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={onGoogleButtonPress}
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
            style={tw`absolute bottom-30 left-5 right-5 items-center`}
          >
            <Text style={tw`text-white mt-2`}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (isNewUser) {
    return <PreferencesScreen />;
  } else {
    return <HomeScreen user={user} />;
  }
};

export default LoginScreen;
