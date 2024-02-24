import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import tw from 'twrnc' 
import * as Icon from "react-native-feather"

export default function RestaurantScreen() {

    const {params} = useRoute();
    const navigation = useNavigation();
    let item = params;
    // console.log('restaurant:',item);

  return (
    <View>
      <ScrollView>
        <View>
          <Image style={tw`w-full h-72`} source={item.image} />
          <TouchableOpacity
            onPress={()=> navigation.goBack()}
           style={tw`absolute top-14 left-4 bg-white p-2 rounded-full shadow`}>
            <Icon.ArrowLeft strokeWidth={3} stroke={'#F06292'} />
          </TouchableOpacity>
        </View>

        <View style={tw`rounded-t-[10] bg-white -mt-12 pt-6`}>
          <View style={tw`px-5`}>
              <Text style={tw`text-2xl font-bold`}> {item.name} </Text>

              <View style={tw`flex-row flex justify-between  p-2`}>
                
            <View style={tw`flex-row flex justify-between pt-2`}>
                
                <View style={tw`text-xs flex-row `}>
                <Image source={require('../assets/images/star.png')} style={tw`h-4 w-4`} />
                    <Text style={tw`text-gray-500 `}> {item.stars}</Text>
                </View>
                    
                    <View>
                      <Text style={tw`font-bold text-pink-300 ml-2`}>{item.category}</Text>
                      </View>
                    
            </View>


            
            <View style={tw`flex-row flex justify-between pt-2`}>
                
                <View style={tw`text-xs flex-row `}>
            <Icon.MapPin height="14" width="14" stroke="gray"/>
                    <Text style={tw`text-gray-700 text-xs pl-0 `}> Nearby</Text>
                </View>
                    
                    <View>
            <Text style={tw`text-gray-700 text-xs font-bold pl-2`}> {item.address}</Text>
                      </View>
                    
            </View>
              </View>

              
            <Text style={tw`text-gray-500  mt-2 font-bold `}> {item.description}</Text>
              
          </View>

          
          
        </View>


        <View style={tw`pb-36 bg-white`}>
        <Text style={tw`px-4 py-4 text-2xl font-bold`}> {item.description}</Text>
        </View>
      </ScrollView>
    </View>
  )
}