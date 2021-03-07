import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  SPLASH_SWIPER_SCREEN,
  SIGN_IN_SCREEN,
  SIGN_UP_SCREEN,
} from "../ScreenName";
import SplashScreen from "./SplashScreen";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

export default function UnAuthScreens() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SPLASH_SWIPER_SCREEN}>
        <Stack.Screen
          name={SPLASH_SWIPER_SCREEN}
          component={SplashScreen}
          options={screenOptions}
        />
        <Stack.Screen
          name={SIGN_IN_SCREEN}
          component={SignIn}
          options={screenOptions}
        />
        <Stack.Screen
          name={SIGN_UP_SCREEN}
          component={SignUp}
          options={screenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
