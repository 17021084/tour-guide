import React from "react";
import { View, StyleSheet } from "react-native";

export default function HoriLine() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "black",
    borderBottomWidth: 0.9,
  },
});
