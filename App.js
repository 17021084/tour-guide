import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import { Text } from "react-native";
import * as firebase from "firebase";
import { firebaseConfig } from "./src/config/appConfig";
import AuthScreens from "./src/screens/AuthScreens";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <Provider store={store}>
      <AuthScreens />
    </Provider>
  );
}
