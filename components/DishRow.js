import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icon from "react-native-feather"
import tw from 'twrnc' 

export default function DishRow({item}) {
  return (
    <View style={tw`flex-row items-center bg-white p-3 rounded-lg shadow-md mb-3 mx-2`}>
      <Image style={tw` rounded-2xl h-30 w-25 `} source={item.image}/>
      <View style={tw``}>
      <View style={tw`pl-3 pb-5`}>
          <Text style={tw`text-xl`}>{item.name}</Text>
          <Text style={tw`text-gray-700`}>{item.description}</Text>
      </View>

      <View style={tw`pl-3 flex-row justify-between item-center`}>
          <Text style={tw`text-gray-700 text-lg font-bold`}>₦ {item.price}/hr</Text>
          <View style={tw`text-gray-700 flex-row ml-25`}>
            <TouchableOpacity style={tw`p-1 rounded-full bg-[#F06292]`}>
              <Icon.Minus strokeWidth={2} height={20} width={20} stroke={'white'} />
            </TouchableOpacity>

              <Text style={tw`px-3 pt-1.5`}>
                {2}
              </Text>

            <TouchableOpacity style={tw`p-1 rounded-full bg-[#F06292]`}>
              <Icon.Plus strokeWidth={2} height={20} width={20} stroke={'white'} />
            </TouchableOpacity>
          </View>
      </View>
      </View>
    </View>
  )
}