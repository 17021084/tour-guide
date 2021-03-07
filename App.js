import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import * as firebase from "firebase";
import { firebaseConfig } from "./src/config/appConfig";
import AuthScreens from "./src/screens/AuthScreens";
import UnAuthScreens from "./src/screens/UnAuthScreens";
import { ActivityIndicator, View } from "react-native";
import { useFonts } from "expo-font";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [isLoadFont] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans-Italic": require("./assets/fonts/OpenSans-Italic.ttf"),
  });

  if (!isLoadFont) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <UnAuthScreens />
    </Provider>
  );
}
