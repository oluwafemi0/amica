import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import tw from 'twrnc' 
import * as Icon from "react-native-feather"

export default function FilterScreen() {

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
            
            <View style={tw` bg-white`}>
            <Text style={tw` text-2xl font-bold`}>Filter</Text>
            </View>
        </View>
  )
}