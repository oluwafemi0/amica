import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import * as Icon from "react-native-feather";
import Categories from "../components/Categories";
import Welcome from "../components/Welcome";
import { useNavigation } from "@react-navigation/native";
import { featured } from "../constants";
import CategoryList from "../components/CategoryList";
import UsersList from "../components/UsersList";
import ActiveService from "../components/ActiveService";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex-1 bg-[#CBC3E3]`}>
      <StatusBar backgroundColor="#CBC3E3" barStyle="light-content" />

      <Welcome />


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw``}
      >
        <View style={tw` bg-[#CBC3E3] `}>
        
        </View>
        
        <View style={tw`p-1 bg-[#fff] `}>
          
          <CategoryList />
          <ActiveService />
          <UsersList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
