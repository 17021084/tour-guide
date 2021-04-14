import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BOOKMARK_SCREEN,
  HOME_SCREEN,
  JOURNEY_TRACK_SCREEN,
  JOURNEY_LIST_SCREEN,
} from "../../ScreenName";

import Home from "./Home";
import Bookmark from "./Bookmark";
import JourneyList from "./JourneyList";
import JourneyTrack from "./JourneyTrack";

const BottomStack = createBottomTabNavigator();
export default function BottomTabScreens() {
  return (
    <BottomStack.Navigator initialRouteName={HOME_SCREEN}>
      <BottomStack.Screen name={BOOKMARK_SCREEN} component={Bookmark} />
      <BottomStack.Screen name={HOME_SCREEN} component={Home} />
      {/* <BottomStack.Screen
        name={JOURNEY_TRACK_SCREEN}
        component={JourneyTrack}
      />
      <BottomStack.Screen name={JOURNEY_LIST_SCREEN} component={JourneyList} /> */}
    </BottomStack.Navigator>
  );
}
