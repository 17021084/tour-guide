import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { color } from "../../config/appConfig";

export default function ButtonBox({ title = "Button", onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.aqua,
    borderRadius: 30,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#94ebcd",
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 1,
  },
  title: {
    color: color.pink,
    fontFamily: "open-sans-bold",
    fontSize: 20,
    fontWeight: "900",
  },
});
