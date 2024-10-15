import { View, Text,TouchableOpacity } from 'react-native'
import tw from "twrnc";
import JobCard from "./JobCard"
import React from 'react'
import * as Icon from "react-native-feather";
import { useNavigation, useIsFocused } from "@react-navigation/native";

const BiddingSystem = () => {

  
  const navigation = useNavigation();
  return (

    <View style={tw`bg-[#fff]`}>
    <View style={tw`bg-[#000] p-2`}>
      <View style={tw`flex-row justify-between items-center mx-auto`}>
        <TouchableOpacity
          style={tw`rounded-md p-1 rounded-full`}
          onPress={() => navigation.goBack()}
        >
          <View style={tw`flex flex-row items-center justify-center`}>
            <Icon.ArrowLeft width={20} height={20} stroke={"#fff"} />
          </View>
        </TouchableOpacity>
        <View style={tw`flex-1 items-center p-2`}>
          <View>
            <Text style={tw`font-medium text-lg text-center text-[#fff]`}>
              Chat
            </Text>
          </View>
        </View>
        <TouchableOpacity style={tw`bg-[#000] rounded-md p-2`}>
          <View style={tw`flex flex-row items-center justify-center`}>
            <Icon.LogOut strokeWidth={2} stroke={"#000"} />
          </View>
        </TouchableOpacity>
      </View>
    </View>


    <View style={tw`h-full `}>
     <JobCard />
    </View>

    </View>
  )
}

export default BiddingSystem