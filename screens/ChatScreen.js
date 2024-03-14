import { View, Text,TouchableOpacity,ScrollView  } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import tw from 'twrnc' 
import * as Icon from "react-native-feather"

export default function ChatScreen() {

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

            <View style={tw``}>
          <Text style={tw`font-bold text-2xl mx-auto top-10 `}>Chats</Text>

            </View>
            </View>
            
            
            
    <View style={tw`mt-12`}>
      <ScrollView contentContainerStyle={tw`p-4`}>
        <TouchableOpacity style={tw`bg-gray-200 p-4 mb-4 rounded`}>
          <Text style={tw`font-bold text-lg mb-1`}>User 1</Text>
          <Text style={tw`text-base`}  numberOfLines={1} ellipsizeMode="tail">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-gray-200 p-4 mb-4 rounded`}>
          <Text style={tw`font-bold text-lg mb-1`}>User 2</Text>
          <Text style={tw`text-base`}  numberOfLines={1} ellipsizeMode="tail">Praesent sit amet sapien eu lacus fermentum volutpat.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-gray-200 p-4 mb-4 rounded`}>
          <Text style={tw`font-bold text-lg mb-1`}>User 3</Text>
          <Text style={tw`text-base`}  numberOfLines={1} ellipsizeMode="tail">Fusce at magna condimentum, maximus turpis sed, malesuada elit.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`bg-gray-200 p-4 mb-4 rounded`}>
          <Text style={tw`font-bold text-lg mb-1`}>User 4</Text>
          <Text style={tw`text-base`}  numberOfLines={1} ellipsizeMode="tail">Fusce at magna condimentum, maximus turpis.</Text>
        </TouchableOpacity>
       
      </ScrollView>
    </View>
        </View>
  )
}