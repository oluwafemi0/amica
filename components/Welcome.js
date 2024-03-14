import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import * as Icon from 'react-native-feather';
import auth from '@react-native-firebase/auth';

const Welcome = () => {
  const navigation = useNavigation();

  const user = auth().currentUser; // Get the current user from Firebase auth

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={tw`p-2 bg-white`}>
      <View style={tw`bg-white`}>
        <View style={tw`flex-row justify-between`}>
          <View>
            <Text style={tw`text-gray-600 font-bold mt-1.5 ml-3 text-2xl`}>Amica</Text>
          </View>
          <View style={tw`flex-row`}>
            <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={tw`mr-3 mt-1.5`}>
              <Icon.Send strokeWidth={2} stroke="gray" />
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToProfile} style={tw`rounded-full mr-3 mt-0.5 `}>
              {user && user.photoURL ? ( 
                <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={{ uri: user.photoURL }} /> 
              ) : (
                <Image style={{ width: 30, height: 30, borderRadius: 15 }} source={require('../assets/images/feranmi.png')} /> 
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
