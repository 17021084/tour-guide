import React from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";

var firebaseConfig = {
  apiKey: "AIzaSyC6IcCsOSlNDqeGIKUOvtpSjOANaDoeugg",
  authDomain: "tour-guide-a2e70.firebaseapp.com",
  projectId: "tour-guide-a2e70",
  storageBucket: "tour-guide-a2e70.appspot.com",
  messagingSenderId: "383628957928",
  appId: "1:383628957928:web:81f477dcf095ba8fd7115d",
  measurementId: "G-KBCSG9YQD1",
};

export default function App() {
  return <Provider store={store}></Provider>;
}
