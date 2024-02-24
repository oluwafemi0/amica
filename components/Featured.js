import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { restaurants } from '../constants/index.js'
import RestaurantsCard from '../components/RestaurantsCard'

export default function FeaturedRow({title,restaurants,description}) {
  return (
    <View>
      <View style={tw`flex-row justify-between place-items-center px-4`}>
            <View>
                <Text style={tw`font-bold text-gray-500 text-lg`}>{title}</Text>
                <Text style={tw`text-gray-400 text-xs`}>{description}</Text>
            </View>
            <TouchableOpacity>
                <Text style={tw`text-pink-300 font-semibold`}>
                    See All
                </Text>
            </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
            paddingHorizontal: 15,
      }}
      style={tw`overflow-visible py-2`}
      >
            {
                restaurants.map((restaurant, index) => {
                    return(
                        <RestaurantsCard 
                        item={restaurant}
                        key={index}
                        />
                    )
                }) 
            }
      </ScrollView>
    </View>
  )
}