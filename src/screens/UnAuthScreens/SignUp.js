import React from "react";
import { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import logo from "../../../assets/icon.png";
import ButtonBox from "../../components/common/ButtonBox";
import InputBox from "../../components/common/InputBox";
import { color } from "../../config/appConfig";
import { validateEmail } from "../../utils/validateEmail";
import { SIGN_IN_SCREEN } from "../ScreenName";

export default function SignUp({ navigation }) {
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    email: "",
    password: "",
    retypePassword: "",
    name: "",
  });

  const emailChange = (email) => {
    setError(null);
    setData({ ...data, email });
  };
  const passwordChange = (password) => {
    setError(null);
    setData({ ...data, password });
  };
  const retypeChange = (retypePassword) => {
    setError(null);
    setData({ ...data, retypePassword });
  };
  const nameChange = (name) => {
    setError(null);
    setData({ ...data, name });
  };

  const signUp = () => {
    if (!validateEmail(data.email)) {
      setError("email ko chính xác");
    }

    if (data.retypePassword !== data.password) {
      setError("Mật khẩu nhập lại ko chính xác");
      return;
    }
    if (data.password.length < 6) {
      setError("Mật khẩu không < 6 ký tự");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView>
        <View>
          <Image style={styles.image} source={logo} />
        </View>
        <Text style={styles.error}>{error}</Text>

        <View style={styles.infor}>
          <InputBox
            title="Email"
            placeholder="test1@gmail"
            value={data.email}
            onChangeText={emailChange}
          />
          <InputBox
            title="Tên"
            placeholder="Quang Trung"
            value={data.name}
            onChangeText={nameChange}
          />
          <InputBox
            title="Mật khẩu"
            placeholder="6ký tự trở lên"
            secureTextEntry={true}
            value={data.password}
            onChangeText={passwordChange}
          />
          <InputBox
            title="Nhập lại mật khẩu "
            placeholder="6ký tự trở lên"
            secureTextEntry={true}
            value={data.retypePassword}
            onChangeText={retypeChange}
          />
        </View>
        <ButtonBox title="Đăng ký" onPress={signUp} />

        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.navigate(SIGN_IN_SCREEN)}
        >
          <Text style={styles.backText}> Trở lại màn đăng nhập </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  image: {
    alignSelf: "center",
    height: 197,
    width: 236,
  },
  infor: {
    marginTop: 10,
    marginBottom: 20,
  },
  error: {
    paddingTop: 20,
    alignSelf: "center",
    color: color.pink,
    fontWeight: "700",
  },
  back: {
    marginTop: 5,
    alignItems: "center",
  },
  backText: {
    color: color.green,
    fontWeight:"900"
  },
});
