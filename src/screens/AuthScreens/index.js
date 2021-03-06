import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  BOTTOM_TAB_SCREEN,
  CAMERA_SCREEN,
  JOURNEY_DETAIL_SCREEN,
  JOURNEY_TRACK_SCREEN,
  PERSON_DETAIL_SCREEN,
  POST_SCREEN,
} from "../screenName";
import BottomTabScreens from "./BottomTabScreens";

import PersonDetails from "./PersonDetails";
import Camera from "./JourneyScreens/Camera";
import Post from "./JourneyScreens/Post";
import JourneyTrack from "./JourneyScreens/JourneyTrack";
import JourneyDetails from "./JourneyScreens/JourneyDetails";

const Stack = createStackNavigator();
const headerOption = { headerShown: true };

export default function AuthScreens() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={BOTTOM_TAB_SCREEN}>
        <Stack.Screen
          name={BOTTOM_TAB_SCREEN}
          component={BottomTabScreens}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={PERSON_DETAIL_SCREEN}
          component={PersonDetails}
          options={headerOption}
        />
        <Stack.Screen
          name={JOURNEY_TRACK_SCREEN}
          component={JourneyTrack}
          options={headerOption}
        />
        <Stack.Screen
          name={JOURNEY_DETAIL_SCREEN}
          component={JourneyDetails}
          options={headerOption}
        />
        <Stack.Screen
          name={CAMERA_SCREEN}
          component={Camera}
          options={headerOption}
        />
        <Stack.Screen
          name={POST_SCREEN}
          component={Post}
          options={headerOption}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
