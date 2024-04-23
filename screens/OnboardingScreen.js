import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

const OnboardingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  const handleGetStarted = async () => {
    await AsyncStorage.setItem("onboardingCompleted", "true");
    navigation.navigate("Login");
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-white p-8`}>
      <StatusBar hidden={true} />
      <Image
        source={require("../assets/images/HANDS.png")}
        style={tw`w-48 h-48 mb-8`}
      />
      <Text style={tw`text-4xl font-bold text-gray-900 mb-8`}>Welcome!</Text>
      <Text style={tw`text-lg text-center text-gray-700 mb-8`}>
        This is the perfect app to find the right service for your needs.
      </Text>
      <TouchableOpacity
        style={tw`bg-black rounded-lg py-3 px-6`}
        onPress={handleGetStarted}
      >
        <Text style={tw`text-white font-bold text-lg`}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;
