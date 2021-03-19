import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  BOTTOM_TAB_SCREEN,
  CAMERA_SCREEN,
  CONCERN_SCREEN,
  JOURNEY_DETAIL_SCREEN,
  JOURNEY_TRACK_SCREEN,
  PERSON_DETAIL_SCREEN,
  POST_SCREEN,
} from "../ScreenName";

import BottomTabScreens from "./BottomTabScreens";

import PersonDetails from "./PersonDetails";
import AddPicture from "./JourneyScreens/AddPicture";
import Post from "./JourneyScreens/Post";
import JourneyDetails from "./JourneyScreens/JourneyDetails";
import { connect } from "react-redux";
import { fetchBookmark } from "../../redux/actions/UserAction";
import Concern from "./Concern";

const Stack = createStackNavigator();
const headerOption = { headerShown: true };

function AuthScreens({ fetchBookmark, bookmarkLoaded }) {
  useEffect(() => {
    fetchBookmark();
  }, []);

  if (!bookmarkLoaded) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
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
          name={CONCERN_SCREEN}
          component={Concern}
          // options={{ headerShown: false }}
          options={headerOption}
        />
        <Stack.Screen
          name={JOURNEY_DETAIL_SCREEN}
          component={JourneyDetails}
          options={headerOption}
        />
        <Stack.Screen
          name={CAMERA_SCREEN}
          component={AddPicture}
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
const mapStateToProps = (state) => {
  return {
    bookmarkLoaded: state.userState.bookmarkLoaded,
  };
};
export default connect(mapStateToProps, { fetchBookmark })(AuthScreens);
