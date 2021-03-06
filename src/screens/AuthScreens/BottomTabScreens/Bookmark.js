import React from "react";
import { View, Text, Button } from "react-native";

export default function Bookmark() {
  return (
    <View>
      <Text> Book mark screen</Text>
      <Button
        title={" Person Detail"}
        onPress={() => {
          navigation.navigate(PERSON_DETAIL_SCREEN);
        }}
      />
    </View>
  );
}
