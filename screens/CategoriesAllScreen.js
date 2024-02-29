import { View, Text,TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import tw from 'twrnc' 
import * as Icon from "react-native-feather"
import { categories } from '../constants'

export default function CategoriesAllScreen() {

    const {params} = useRoute();
    const navigation = useNavigation();
    let item = params;

  return (
    <View>

        
            <View>
            <TouchableOpacity
                onPress={()=> navigation.goBack()}
            style={tw`absolute top-8 left-4 bg-white p-2 rounded-full shadow`}>
                <Icon.ArrowLeft strokeWidth={3} stroke={'#F06292'} />
            </TouchableOpacity>
            </View>
            
            <View style={tw`mt-20 bg-white`}>
          <ScrollView  showsVerticalScrollIndicator={false} style={tw`overflow-visible`} contentContainerStyle={{
            paddingHorizonal: 15
          }} >
    
    

            {
                categories.map((category, index) =>{
                        return (
                            <View key={index}  style={tw`flex justify-center item-center mr-3 p-1`}>
                                <TouchableOpacity
                                   onPress={() =>navigation.navigate('Categories', {...item})}
                                    
                                 style={tw`p-2 rounded-lg  h-12 shadow shadow-gray-400 bg-white`}>
                                 <View style={tw`ml-2`}>
                                    </View>
                                    <Text style={tw`text-base ml-2 text-gray-400 text-left`}>{category.name}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                })
            }
    
    
          </ScrollView>
            </View>
        </View>
  )
}