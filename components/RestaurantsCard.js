import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import * as Icon from "react-native-feather"
import { useNavigation } from '@react-navigation/native'

export default function RestaurantsCard({item}) {
    const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
        onPress={() =>navigation.navigate('Restaurant', {...item})}
    >
      <View style={tw`mr-6 bg-white rounded-lg m-1 shadow-md shadow-gray-400`}>
        <Image style={tw`h-45 w-40 rounded-t-lg`} source={item.image} />
        <View style={tw`px-3 pb-4 `}>
            <Text style={tw`text-lg text-gray-500 font-bold pt-2`}>{item.name}</Text>
            <View style={tw`flex-row flex justify-between pt-2`}>
                
                <View style={tw`text-xs flex-row `}>
                <Image source={require('../assets/images/star.png')} style={tw`h-4 w-4`} />
                    <Text style={tw`text-gray-500 `}> {item.stars}</Text>
                </View>
                    
                    <View>
                      <Text style={tw`font-bold text-pink-300`}>{item.category}</Text>
                      </View>
                    
            </View>


            
            <View style={tw`flex-row flex justify-between pt-2`}>
                
                <View style={tw`text-xs flex-row `}>
            <Icon.MapPin height="14" width="14" stroke="gray"/>
                    <Text style={tw`text-gray-700 text-xs pl-0 `}> Nearby</Text>
                </View>
                    
                    <View>
            <Text style={tw`text-gray-700 text-xs pl-2`}> {item.address}</Text>
                      </View>
                    
            </View>

            
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}