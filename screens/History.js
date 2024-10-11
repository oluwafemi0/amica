import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "twrnc";
import * as Icon from "react-native-feather";

export default function History() {
  const { params } = useRoute();
  const navigation = useNavigation();
  let item = params;

  return (
    <View>
      <View style={tw`bg-[#000] p-4   `}>
        <View style={tw`flex-row justify-between items-center mx-auto`}>
          <TouchableOpacity
            style={tw`bg-[#000] rounded-md p-2 `}
            onPress={() => navigation.goBack()}
          >
            <View style={tw`flex flex-row items-center justify-center`}>
              <Icon.ArrowLeft strokeWidth={2} stroke={"#fff"} style={tw``} />
            </View>
          </TouchableOpacity>
          <View style={tw`flex-1 items-center p-2`}>
            <View style={tw``}>
              <Text style={tw`font-semibold text-lg text-center text-[#fff]`}>
                History
              </Text>
            </View>
          </View>
          <TouchableOpacity style={tw`bg-[#000] rounded-md p-2`}>
            <View style={tw`flex flex-row items-center justify-center`}>
              <Icon.LogOut strokeWidth={2} stroke={"#000"} style={tw``} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={tw`mt-2`}>
        <ScrollView contentContainerStyle={tw`p-4`}>
          <TouchableOpacity style={tw`bg-white p-4 mb-4 rounded shadow-md`}>
            <Text style={tw`font-bold text-lg ml-2 mb-2`}>Date</Text>
            <View
              style={tw`bg-[#000] flex flex-row justify-between items-center rounded-lg p-4 mb-2 `}
            >
              <Text style={tw`text-xl font-bold text-white`}>Service name</Text>
              <Text style={tw`text-white`}>Service status</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={tw`bg-white p-4 mb-4 rounded shadow-md`}>
            <Text style={tw`font-bold text-lg ml-2 mb-2`}>Date</Text>
            <View
              style={tw`bg-[#000] flex flex-row justify-between items-center rounded-lg p-4 mb-2 `}
            >
              <Text style={tw`text-xl font-bold text-white`}>Service name</Text>
              <Text style={tw`text-white`}>Service status</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={tw`bg-white p-4 mb-4 rounded shadow-md`}>
            <Text style={tw`font-bold text-lg ml-2 mb-2`}>Date</Text>
            <View
              style={tw`bg-[#000] flex flex-row justify-between items-center rounded-lg p-4 mb-2 `}
            >
              <Text style={tw`text-xl font-bold text-white`}>Service name</Text>
              <Text style={tw`text-white`}>Service status</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={tw`bg-white p-4 mb-4 rounded shadow-md`}>
            <Text style={tw`font-bold text-lg ml-2 mb-2`}>Date</Text>
            <View
              style={tw`bg-[#000] flex flex-row justify-between items-center rounded-lg p-4 mb-2 `}
            >
              <Text style={tw`text-xl font-bold text-white`}>Service name</Text>
              <Text style={tw`text-white`}>Service status</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
