import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import tw from 'twrnc' 
import RestaurantsCard from '../components/RestaurantsCard'
import { useNavigation } from '@react-navigation/native'

export default function FeaturedRow({title,restaurants,description,item}) {

  const navigation = useNavigation();

  return (
    <View>
      <View style={tw`flex-row justify-between place-items-center px-4`}>
            <View>
                <Text style={tw`font-bold text-gray-500 text-lg`}>{title}</Text>
                <Text style={tw`text-gray-400 text-xs`}>{description}</Text>
            </View>
            <TouchableOpacity onPress={() =>navigation.navigate('All', {...item})}>
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
                restaurants.slice(0, 5).map((restaurant, index) => {
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