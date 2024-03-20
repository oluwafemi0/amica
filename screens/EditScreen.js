import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import tw from 'twrnc' 
import * as Icon from "react-native-feather"
import Upload from '../components/Upload'

export default function EditScreen() {

    const {params} = useRoute();
    const navigation = useNavigation();
    let item = params;

  return (
    <View style={tw` flex mx-auto my-10`}>

        
            <View>
            <TouchableOpacity
                onPress={()=> navigation.goBack()}
            style={tw`absolute top-4 right-45 bg-white p-2 rounded-full shadow `}>
                <Icon.ArrowLeft strokeWidth={3} stroke={'#F06292'} />
            </TouchableOpacity>
            </View>
            
            <View >
            <Upload />
            </View>
        </View>
  )
}