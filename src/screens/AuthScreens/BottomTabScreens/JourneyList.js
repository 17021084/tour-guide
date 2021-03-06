import React from "react";
import { View, Text, Button } from "react-native";
import { JOURNEY_DETAIL_SCREEN, JOURNEY_TRACK_SCREEN } from "../../screenName";

export default function JourneyList({ navigation }) {
  return (
    <View>
      <Text>Journey List screen</Text>

      <Button
        title={"Tracking"}
        onPress={() => {
          navigation.navigate(JOURNEY_TRACK_SCREEN);
        }}
      />

      <Button
        title={" Journey Detail"}
        onPress={() => {
          navigation.navigate(JOURNEY_DETAIL_SCREEN);
        }}
      />
    </View>
  );
}
