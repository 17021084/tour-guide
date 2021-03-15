import React from "react";
import { View, Text, Button } from "react-native";
import { JOURNEY_DETAIL_SCREEN } from "../../ScreenName";

export default function JourneyList({ navigation }) {
  return (
    <View>
      <Text>Journey List screen</Text>
      <Text>Journey List screen</Text>
      <Text>Journey List screen</Text>
      <Text>Journey List screen</Text>
      <Text>Journey List screen</Text>
      <Text>Journey List screen</Text>
      <Text>Modal hien ra </Text>

      <Button
        title={" Journey Detail"}
        onPress={() => {
          navigation.navigate(JOURNEY_DETAIL_SCREEN);
        }}
      />
    </View>
  );
}
