import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BOOKMARK_SCREEN,
  HOME_SCREEN,
  JOURNEY_LIST_SCREEN,
} from "../../screenName";

import Home from "./Home";
import Bookmark from "./Bookmark";
import JourneyList from "./JourneyList";

const BottomStack = createBottomTabNavigator();
export default function BottomTabScreens() {
  return (
    <BottomStack.Navigator initialRouteName={HOME_SCREEN}>
      <BottomStack.Screen name={BOOKMARK_SCREEN} component={Bookmark} />
      <BottomStack.Screen name={HOME_SCREEN} component={Home} />
      <BottomStack.Screen name={JOURNEY_LIST_SCREEN} component={JourneyList} />
    </BottomStack.Navigator>
  );
}
