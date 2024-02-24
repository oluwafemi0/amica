import { View, Text,ScrollView,TouchableOpacity,Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { categories } from '../constants'

const Categories = () => {

    return (
        <View style={tw`mt-2  ml-4`}>
           <View>
                <Text style={tw`font-bold text-gray-400 text-lg mb-2`}>Popular Services</Text>
            </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`overflow-visible`} contentContainerStyle={{
            paddingHorizonal: 15
          }} >
    
    

            {
                categories.map((category, index) =>{
                        return (
                            <View key={index} style={tw`flex justify-center item-center mr-3 p-1`}>
                                <TouchableOpacity
                                    onPress={() => setActiveCategory(category.id)}
                                 style={tw`p-2 rounded-lg shadow shadow-gray-400 bg-white`}>
                                    <Image style={{width: 45, height: 45}} source={category.image} />
                                    <Text style={tw`text-sm text-gray-400 text-center`}>{category.name}</Text>
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