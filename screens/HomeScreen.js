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
    <SafeAreaView style={tw`flex-1 bg-[#fff]`}>
      <StatusBar backgroundColor="#fff" barStyle="light-content" />

      <Welcome />

      <View style={tw`bg-white mb-4`}></View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`p-2`}
      >
        <View style={tw``}>
          <ActiveService />
          <CategoryList />
          <UsersList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
