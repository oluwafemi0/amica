import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "./screens/OnboardingScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ChatScreen from "./screens/ChatScreen";
import PreferencesScreen from "./screens/PreferencesScreen";
import CategoryPage from "./screens/CategoryPage";
import CategoryList from "./components/CategoryList";
import AllCategoriesPage from "./screens/AllCategoriesPage";
import History from "./screens/History";
import ChatsListScreen from "./screens/ChatsListScreen";
import ViewPage from "./screens/ViewPage";
import JobFormScreen from "./components/JobFormScreen";
import BiddingSystem from "./components/BiddingSystem"

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const value = await AsyncStorage.getItem("onboardingCompleted");
        if (value === null) {
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunch ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Preferences" component={PreferencesScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
            <Stack.Screen name="ChatsList" component={ChatsListScreen} />
            <Stack.Screen name="CategoryList" component={CategoryList} />
            <Stack.Screen name="CategoryPage" component={CategoryPage} />
            <Stack.Screen
              name="AllCategoriesPage"
              component={AllCategoriesPage}
            />
            <Stack.Screen name="ViewPage" component={ViewPage} />
            <Stack.Screen name="History" component={History} />
            <Stack.Screen name="JobForm" component={JobFormScreen} />
            <Stack.Screen name="Bid" component={BiddingSystem} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
