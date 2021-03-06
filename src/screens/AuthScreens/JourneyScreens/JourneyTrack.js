import React from "react";
import { View, Text, Button } from "react-native";
import { CAMERA_SCREEN } from "../../ScreenName";

export default function JourneyTrack({ navigation }) {
  return (
    <View>
      <Text>journey track </Text>
      <Button
        title={" Person Detail"}
        onPress={() => {
          navigation.navigate(CAMERA_SCREEN);
        }}
      />
    </View>
  );
}
