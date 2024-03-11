import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc' 

export default function CartIcon() {
  return (
    <View style={tw`absolute bottom-5 w-full z-50`}>
      <TouchableOpacity style={tw`bg-[#F06292] flex-row justify-between items-center mx-5 rounded-full p-4 py-3 shadow-lg`}>
            <View style={tw`p-2 px-4 rounded-lg bg-[#f491cc]`}>
            <Text style={tw`font-extrabold text-white`}>
                3
            </Text>
            </View>

            <Text style={tw`font-extrabold text-center text-white flex-1 text-lg`}>
                    View cart
            </Text>
            <Text style={tw`font-extrabold  text-white  text-lg`}>
            ₦ {23}
            </Text>
      </TouchableOpacity>
    </View>
  )
}

