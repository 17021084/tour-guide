import React from "react";
import Splash from "./Splash";
import Swiper from "react-native-swiper/src";

// will be remove in fuuture
import { Button } from "react-native";

import { SIGN_IN_SCREEN } from "../../ScreenName";

export default function SplashScreen({ navigation }) {
  const NavigateLogin = (
    <Button
      title={"Thu ngay"}
      onPress={() => {
        navigation.navigate(SIGN_IN_SCREEN);
      }}
    />
  );

  return (
    <Swiper loop={false} autoplay={false} showsButtons={false}>
      <Splash content={"splash1"}></Splash>
      <Splash content={"splash2"}></Splash>
      <Splash content={"splash3"} button={NavigateLogin}></Splash>
    </Swiper>
  );
}
