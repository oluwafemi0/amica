import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";

const LoginScreen = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

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
      // Save user to Firestore if not exists
      const userRef = firestore().collection("users").doc(user.uid);
      const doc = await userRef.get();
      if (!doc.exists) {
        await userRef.set({
          email: user.email,
          displayName: user.displayName,
        });
      }
    }
  };

  const navigation = useNavigation();

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
      <View className="flex flex-col justify-center items-center h-full p-6 bg-white rounded-lg shadow-md">
        <Image
          source={require("../assets/images/HANDS.png")}
          style="w-48 h-48 mb-4"
        />
        <GoogleSigninButton
          style="w-48 h-12 mb-4"
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={onGoogleButtonPress}
        />
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style="text-blue-600 underline">
            Don't have an account? Sign up
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return <HomeScreen user={user} />;
};

export default LoginScreen;
