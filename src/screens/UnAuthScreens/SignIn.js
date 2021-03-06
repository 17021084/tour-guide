import React from "react";
import { View, Text } from "react-native";
import { SIGN_UP_SCREEN } from "../ScreenName";

// will be remove in fuuture
import { Button } from "react-native";

export default function SignIn({ navigation }) {
  return (
    <View>
      <Text>Sign screen </Text>
      <Button
        title={"dang ky"}
        onPress={() => {
          navigation.navigate(SIGN_UP_SCREEN);
        }}
      />
    </View>
  );
}
