import { View, Text,ScrollView,TouchableOpacity,Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { categories } from '../constants'
import { useNavigation } from '@react-navigation/native'

const Categories = ({item}) => {

  const navigation = useNavigation();

    return (
        <View style={tw`mt-2  ml-4`}>
        <View style={tw`flex-row justify-between`}>
           <View>
                <Text style={tw`font-bold text-gray-400 text-lg mb-2`}>Popular Services</Text>
            </View>
            <TouchableOpacity onPress={() =>navigation.navigate('CategoriesAll', {...item})} style={tw`mr-4`}>
                <Text style={tw`text-pink-300 font-semibold`}>
                    See All
                </Text>
            </TouchableOpacity>
            </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`overflow-visible`} contentContainerStyle={{
            paddingHorizonal: 15
          }} >
    
    

            {
                categories.slice(0, 5).map((category, index) =>{
                        return (
                            <View key={index}  style={tw`flex justify-center item-center mr-3 p-1`}>
                                <TouchableOpacity
                                   onPress={() =>navigation.navigate('Categories', {...item})}
                                    
                                 style={tw`p-2 rounded-lg w-20 h-20 shadow shadow-gray-400 bg-gray-400`}>
                                 <View style={tw`ml-2`}>
                                    <Image style={{width: 45, height: 45, }}  source={category.image} /></View>
                                    <Text style={tw`text-sm font-bold text-white text-center`}>{category.name}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                })
            }
    
    
          </ScrollView>
        </View>
      )
    }

export default Categories