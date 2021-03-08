import React from "react";
import Splash from "./Splash";
import Swiper from "react-native-swiper/src";

import ButtonBox from "../../../components/common/ButtonBox";

import { SIGN_IN_SCREEN } from "../../ScreenName";
import splash1 from "../../../../assets/icons/decree.png";
import splash2 from "../../../../assets/icons/Search.png";
import splash3 from "../../../../assets/icons/Map-light.png";

const splashText1 = "Tìm hiểu lịch sử thông qua du lịch ";
const splashText2 = "Tìm Hiểu nhân vật lịch sử Việt Nam ";
const splashText3 =
  "Lưu lại hành trình trên những chuyến đường mang tên vĩ nhân đó ";

export default function SplashScreen({ navigation }) {
  const NavigateLogin = (
    <ButtonBox
      title={"Cùng Bắt đầu nào "}
      onPress={() => {
        navigation.navigate(SIGN_IN_SCREEN);
      }}
    />
  );

  return (
    <Swiper loop={false} autoplay={false} showsButtons={false}>
      <Splash
        content={"splash1"}
        content={splashText1}
        image={{
          image: splash1,
          dimension: {
            width: 230,
            height: 230,
          },
        }}
      ></Splash>
      <Splash
        content={"splash2"}
        content={splashText2}
        image={{
          image: splash2,
          dimension: {
            width: 354,
            height: 413,
          },
        }}
      ></Splash>
      <Splash
        content={"splash3"}
        content={splashText3}
        button={NavigateLogin}
        image={{
          image: splash3,
          dimension: {
            width: 369,
            height: 428,
          },
        }}
      ></Splash>
    </Swiper>
  );
}
