import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import logo from "../../assets/logo.png";

export default function Logo() {
  return (
    <View>
      <Image style={styles.image} source={logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 300,
    width: 300,
  },
});
