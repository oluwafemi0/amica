import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";

const OnboardingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      handleGetStarted();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = async () => {
    await AsyncStorage.setItem("onboardingCompleted", "true");
    navigation.replace("Login");
  };

  return (
    <View style={tw`flex-1 justify-center items-center bg-white p-8`}>
      <Image
        source={require("../assets/images/HANDS.png")}
        style={tw`w-48 h-48 mb-8`}
      />
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
