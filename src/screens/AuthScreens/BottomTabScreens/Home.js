import React from "react";
import { View, Text, Button } from "react-native";
import ButtonBox from "../../../components/common/ButtonBox";
import HoriLine from "../../../components/common/HoriLine";
import InputBox from "../../../components/common/InputBox";
import Logo from "../../../components/Logo";
import { PERSON_DETAIL_SCREEN } from "../../ScreenName";

export default function Home({ navigation }) {
  
  const []
  // logic lay current state 


  //map dispach va state tu redux  

  
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
      <Logo />
      <InputBox />

      <HoriLine></HoriLine>
    </View>
  );
}
