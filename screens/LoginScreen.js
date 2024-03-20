import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,Image } from 'react-native';
import tw from 'twrnc' 
import 'expo-dev-client'
import { GoogleSignin,GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import HomeScreen from './HomeScreen';

const LoginScreen = () => {
  
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  GoogleSignin.configure({
    webClientId: '172024979808-lfl30bhtm6qv96b6e5tllvp4b3i0rsi8.apps.googleusercontent.com',
  });

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

    
    const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in.then((user) => {
      console.log(user);
    })

    .catch((error) => {
      console.log(error);
    });
  }

  if (initializing) return null;


  if (!user) {
    return(
      <View style={tw`p-2 my-auto px-8`}>
      <Image style={tw`w-35 h-35 mx-auto mb-30`} source={require('../assets/images/HANDS.png')} />
      
        <GoogleSigninButton style={tw`rounded-lg w-full px-2 h-12 mx-auto mb-30`}
          onPress={onGoogleButtonPress}
        />
      </View>
    )
  }

  return (
    <HomeScreen user={user} />
  )

};


export default LoginScreen;
