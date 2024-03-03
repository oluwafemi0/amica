import { View, Text,ScrollView,TouchableOpacity,SafeAreaView } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import tw from 'twrnc' 
import * as Icon from "react-native-feather"
import RestaurantsCard from '../components/RestaurantsCard'

export default function CategoriesScreen({title,restaurants,description,item}) {

    const {params} = useRoute();
    const navigation = useNavigation();

  return (
    

        <View>

        
            <View>
            <TouchableOpacity
                onPress={()=> navigation.goBack()}
            style={tw`absolute top-14 left-4 bg-white p-2 rounded-full shadow`}>
                <Icon.ArrowLeft strokeWidth={3} stroke={'#F06292'} />
            </TouchableOpacity>
            </View>
            
            <View style={tw` bg-white`}>
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
            </View>
        </View>


  )
}