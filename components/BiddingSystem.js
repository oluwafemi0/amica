import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import tw from "twrnc";
import JobCard from "./JobCard";
import BookingManagement from "./BookingManagement";
import * as Icon from "react-native-feather";
import { useNavigation } from "@react-navigation/native";

const BiddingSystem = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`bg-[#fff] flex-1`}>
      
      <View style={tw`bg-[#1a1a1a] p-2`}>
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
                Bidding & Booking
              </Text>
            </View>
          </View>
          <TouchableOpacity style={tw`bg-[#1a1a1a] rounded-md p-2`}>
            <View style={tw`flex flex-row items-center justify-center`}>
              <Icon.LogOut strokeWidth={2} stroke={"#1a1a1a"} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

     
      <ScrollView style={tw`flex-1`}>
        
        <View style={tw`p-4`}>
          <Text style={tw`text-lg font-semibold mb-2`}>Job Management</Text>
          <JobCard />
        </View>

        
        <View style={tw`p-4`}>
          <Text style={tw`text-lg font-semibold mb-2`}>Booking Management</Text>
          <BookingManagement />
        </View>
      </ScrollView>
    </View>
  );
};

export default BiddingSystem;
