import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import * as Icon from "react-native-feather"



export default function Welcome({item}) {
  
  const navigation = useNavigation();

  return ( 
  <View style={tw` p-2  bg-white `}>
  <View style={tw`bg-white `}>
    <View style={tw`flex-row flex justify-between`}>
        <View style={tw``}>
        <Text  style={tw`text-gray-600 font-bold mt-1.5 ml-3 text-2xl`}>Amica</Text>
        </View>
        <View style={tw`flex-row `}>
        <TouchableOpacity
        onPress={() =>navigation.navigate('Chat', {...item})}
                style={tw`mr-3 mt-1.5`}>
           <Icon.Send strokeWidth={2} stroke='gray' />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() =>navigation.navigate('Profile', {...item})}
                style={tw`rounded-full border-2 mr-3 mt-0.5 border-gray-500`}>
           <Image style={{width: 30, height: 30}} source={require('../assets/images/feranmi.png')} />
        </TouchableOpacity>
        </View>
    </View>
  </View>
  </View>
  )
}