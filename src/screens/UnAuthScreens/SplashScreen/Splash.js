import React from "react";
import { View, Text } from "react-native";

export default function Splash({ content, image, button }) {
  return (
    <View>
      <Text> Image o day </Text>
      <Text>this is splash screen {content} </Text>
      <View>{button}</View>
    </View>
  );
}
