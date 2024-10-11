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
import Welcome from "../components/Welcome";
import { useNavigation } from "@react-navigation/native";
import { featured } from "../constants";
import CategoryList from "../components/CategoryList";
import UsersList from "../components/UsersList";
import ActiveService from "../components/ActiveService";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex-1 bg-[#fff]`}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />

      <Welcome />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw``}
      >
        <View style={tw` bg-[#fff] `}></View>

        <View style={tw` bg-[#000]  `}>
          <ActiveService />
          <CategoryList />
          <UsersList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
