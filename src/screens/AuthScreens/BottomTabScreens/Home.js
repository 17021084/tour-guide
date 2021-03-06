import React from "react";
import { View, Text, Button } from "react-native";
import ButtonBox from "../../../components/common/ButtonBox";
import HoriLine from "../../../components/common/HoriLine";
import InputBox from "../../../components/common/InputBox";
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

      <ButtonBox
        onPress={() => {
          navigation.navigate(PERSON_DETAIL_SCREEN);
        }}
      />

      <InputBox />

      <HoriLine></HoriLine>
    </View>
  );
}
