import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import tw from 'twrnc' 
import * as Icon from "react-native-feather"
import DishRow from '../components/DishRow'
import CartIcon from '../components/cartIcon'

export default function ProfileScreen() {

    const {params} = useRoute();
    const navigation = useNavigation();
    let item = params;

  return (
    <View style={tw` bg-white shadow `}>

      

      <ScrollView>
        <View>
          <Image style={tw`w-35 h-35 mx-auto mt-15 `} source={require('../assets/images/feranmi.png')} />
          <TouchableOpacity
            onPress={()=> navigation.goBack()}
           style={tw`absolute top-26 left-4 bg-white p-2 rounded-full shadow`}>
            <Icon.ArrowLeft strokeWidth={3} stroke={'#F06292'} />
          </TouchableOpacity>
        </View>

         


        <View style={tw`h-138 m-2 mt-5 rounded-lg bg-gray-100 shadow shadow-gray-400`}>
        </View>

        <View style={tw`p-2 px-8`}>
      <TouchableOpacity style={tw`rounded-lg w-full h-12 bg-[#F06292] mx-auto mb-5`} >
        <Text >Log out</Text>
      </TouchableOpacity>
      </View>


      </ScrollView>
    </View>
  )
}