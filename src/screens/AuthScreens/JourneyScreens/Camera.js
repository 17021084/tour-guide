import React from "react";
import { View, Text, Button } from "react-native";
import { POST_SCREEN } from "../../ScreenName";

export default function Camera({ navigation }) {
  return (
    <View>
      <Text>Camera </Text>
      <Button
        title={"Post"}
        onPress={() => {
          navigation.navigate(POST_SCREEN);
        }}
      />
    </View>
  );
}
