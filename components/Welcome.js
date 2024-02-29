import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'



export default function Welcome() {
  return ( 
  <View style={tw` p-2 bg-gray-500 mb-2 `}>
  <View style={tw`bg-gray-500 p-2`}>
    <View style={tw`flex-row flex justify-between`}>
        <View style={tw`mt-7 `}>
        <Text  style={tw`text-gray-300 font-bold mb-2 text-2xl`}>Welcome Back!</Text>
        <Text style={tw`text-white font-bold text-5xl`}>Nurse Feranmi</Text>
        </View>
        <View style={tw`mt-8 `}>
        <TouchableOpacity
                style={tw`rounded-full border-2 border-pink-300`}>
                                    <Image style={{width: 65, height: 65}} source={require('../assets/images/feranmi.png')} />
                                </TouchableOpacity>
        </View>
    </View>
      <TouchableOpacity style={tw`mt-2 p-2`}>
      <Text  style={tw`text-white text-md text-center font-bold rounded-lg bg-gray-400 py-3 `}>Check out your weekly review</Text>
      
      </TouchableOpacity>
  </View>
  </View>
  )
}