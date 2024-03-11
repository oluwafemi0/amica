// Navigation.js

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from './screens/OnboardingScreen'; // Import your OnboardingScreen component
import LoginScreen from './screens/LoginScreen'; // Import your LoginScreen component
import HomeScreen from './screens/HomeScreen';
import RestaurantScreen from './screens/RestaurantScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import ProfileScreen from './screens/ProfileScreen';
import AllScreen from './screens/AllScreen';
import ChatScreen from './screens/ChatScreen';
import FilterScreen from './screens/FilterScreen';
import CategoriesAllScreen from './screens/CategoriesAllScreen';
// Import other screens

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        // Check if the app is launched for the first time
        const value = await AsyncStorage.getItem('onboardingCompleted');
        if (value === null) {
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  if (isLoading) {
    return null; // Render loading indicator or splash screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isFirstLaunch ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} /> 
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} /> 
        )}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="CategoriesAll" component={CategoriesAllScreen} />
        <Stack.Screen name="Filter" component={FilterScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen name="All" component={AllScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
