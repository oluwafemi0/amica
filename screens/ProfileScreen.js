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
           style={tw`absolute top-26 left-4 bg-white p-2 rounded-full `}>
            <Icon.ArrowLeft strokeWidth={3} stroke={'#F06292'} />
          </TouchableOpacity>
        </View>

         


        <View style={tw`h-135 m-2 mt-5 rounded-lg bg-white s`}>
          <View style={tw`h-1/5  roundedlg bg-green-100 flex flex-row `}>
              <View style={tw`w-4/6  rounded-l-lg opacity-85 bg-[#F06292]`}>
        <Text style={tw`text-xl font-semibold  text-white text-center mx-auto my-auto`}>name</Text>
            
              </View>
              <View style={tw`w-2/6  rounded-r-lg  bg-green-400`}>
        <Text style={tw`text-xl font-semibold text-white text-center mx-auto my-auto`}>balance</Text>
            
              </View>
          </View>
          <View style={tw`h-4/5  rounded-b-lg bg-white mt-4  `}>
              <TouchableOpacity style={tw`h-0.85/6 m-1 rounded-lg opacity-85 bg-[#F06292]`}>
        <Text style={tw`text-xl font-semibold text-white rounded-lg text-center mx-auto my-auto`}>Edit Profile</Text>
            
              </TouchableOpacity>
              <TouchableOpacity style={tw`h-0.85/6 m-1 rounded-lg opacity-85 bg-[#F06292]`}>
        <Text style={tw`text-xl font-semibold text-white rounded-lg text-center mx-auto my-auto`}>Address Book</Text>
            
              </TouchableOpacity>
              <TouchableOpacity style={tw`h-0.85/6 m-1 rounded-lg opacity-85 bg-[#F06292]`}>
        <Text style={tw`text-xl font-semibold text-white rounded-lg text-center mx-auto my-auto`}>Work History</Text>
            
              </TouchableOpacity>
              <TouchableOpacity style={tw`h-0.85/6 m-1  rounded-lg opacity-85 bg-[#F06292]`}>
        <Text style={tw`text-xl font-semibold text-white text-center mx-auto my-auto`}>Report</Text>
            
              </TouchableOpacity>
          
          </View>
        </View>

        <View style={tw`p-2 px-8`}>
      <TouchableOpacity style={tw`rounded-lg w-full h-12 bg-[#F06292] mx-auto mb-6`} >
        <Text style={tw`text-xl font-semibold text-white text-center mx-auto my-auto`}>Log out</Text>
      </TouchableOpacity>
      </View>


      </ScrollView>
    </View>
  )
}