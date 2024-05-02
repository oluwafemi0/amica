import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
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
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={require("../assets/images/HANDS.png")}
            style={{ width: 150, height: 150, marginBottom: 20 }}
          />
          <GoogleSigninButton
            style={{ width: 200, height: 48, marginBottom: 20 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={onGoogleButtonPress}
          />
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
