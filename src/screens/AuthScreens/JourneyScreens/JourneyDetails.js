import React from "react";
import { View, Text, Button } from "react-native";
import { PERSON_DETAIL_SCREEN } from "../../ScreenName.js";

export default function JourneyDetails({ navigation }) {
  return (
    <View>
      <Text>Journey Details s</Text>
      <Button
        title={" Person Detail"}
        onPress={() => {
          navigation.navigate(PERSON_DETAIL_SCREEN);
        }}
      />
    </View>
  );
}
