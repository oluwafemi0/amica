import { View, Text,TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { StatusBar } from 'expo-status-bar'
import * as Icon from "react-native-feather"
import Categories from '../components/Categories'
import FeaturedRow from '../components/Featured'
import { featured } from '../constants'
import Welcome from '../components/Welcome'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white`}>
        <StatusBar barStyle="dark-content" />

        <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={{
            paddingBottom: 20
        }}>
       
       <Welcome />


       
        <View style={tw`flex-row items-center  py-1 px-4 pb-4`} >
            <View style={tw`flex-row items-center flex-1 p-3 rounded-lg border border-gray-300`}>
                <Icon.Search height="20" width="20" stroke="gray" />
                <TextInput placeholder="Search for Service " style={tw`ml-2 flex-1 `} />
                <TouchableOpacity onPress={() =>navigation.navigate('Filter')} style={tw`flex-row items-center  border-0 border-l-2 pl-2 border-l-gray-300`}>
                    <Icon.Sliders height="20" width="20" stroke="gray" />
                </TouchableOpacity>
            </View>

            
        </View>  



         
            <Categories />


            <View style={tw`mt-5`}>
           <View>
                <Text style={tw`font-bold text-gray-400 text-lg ml-4 mb-2`}>Based on recent services</Text>
            </View>

            {
                featured.map((item,index) =>{
                    return (
                        <FeaturedRow 
                            key={index}
                            title={item.title}
                            restaurants={item.restaurants}
                            description={item.description}

                        />
                    )
                })
            }

            </View>
        

        </ScrollView>



    </SafeAreaView>
  )
}