import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import { SIGN_UP_SCREEN } from "../ScreenName";
import logo from "../../../assets/icon.png";
import ButtonBox from "../../components/common/ButtonBox";
import InputBox from "../../components/common/InputBox";
import { color } from "../../config/appConfig";
import { validateEmail } from "../../utils/validateEmail";
// will be remove in fuuture
import { Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SignIn({ navigation }) {
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const emailChange = (email) => {
    setError(null);
    setData({ ...data, email });
  };
  const passwordChange = (password) => {
    setError(null);
    setData({ ...data, password });
  };

  const signIn = () => {
    if (!validateEmail(data.email)) {
      setError("email ko chính xác");
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
      <View>
        <Image style={styles.image} source={logo} />
      </View>
      <Text style={styles.error}>{error}</Text>
      <View style={styles.infor}>
        <View style={styles.input}>
          <InputBox
            title="Email"
            placeholder="test1@gmail"
            value={data.email}
            onChangeText={emailChange}
          />
        </View>
        <View style={styles.input}>
          <InputBox
            title="Mật khẩu"
            placeholder="6ký tự trở lên"
            secureTextEntry={true}
            value={data.password}
            onChangeText={passwordChange}
          />
        </View>

        <Text style={styles.signUp}>
          Bạn đã có tài khoản chưa ?
          <TouchableOpacity
            onPress={() => navigation.navigate(SIGN_UP_SCREEN)}
            style={styles.signUpButton}
          >
            <Text style={styles.signUpText}> Đăng ký</Text>
          </TouchableOpacity>
        </Text>

        <View style={styles.button}>
          <ButtonBox title="Đăng nhập " onPress={signIn} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 35,
    paddingHorizontal: 10,
  },
  image: {
    alignSelf: "center",
    height: 197,
    width: 236,
  },
  button: {
    height: 100,
  },
  infor: {
    flex: 1,
    marginTop: 10,
  },
  error: {
    paddingTop: 30,
    alignSelf: "center",
    color: color.pink,
    fontWeight: "700",
  },
  signUp: {
    marginTop: 20,
    marginBottom: 100,
  },
  signUpButton: {
    paddingTop: 3,
  },
  signUpText: {
    color: color.orange,
    fontWeight: "900",
  },
  input: {
    height: 100,
    marginVertical: 5,
  },
});
