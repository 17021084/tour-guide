import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { color } from "../../config/appConfig";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function ButtonBox({
  name,
  size = 50,
  color = "black",
  onPress,
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <MaterialIcons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
