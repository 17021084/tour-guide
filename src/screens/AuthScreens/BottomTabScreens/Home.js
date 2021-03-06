import React from "react";
import { View, Text, Button } from "react-native";
import { PERSON_DETAIL_SCREEN } from "../../screenName";

export default function Home({ navigation }) {
  return (
    <View>
      <Text>Home Screen </Text>
      <Button
        title={" Person Detail"}
        onPress={() => {
          navigation.navigate(PERSON_DETAIL_SCREEN);
        }}
      />
    </View>
  );
}
