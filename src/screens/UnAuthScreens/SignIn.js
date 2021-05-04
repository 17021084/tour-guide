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
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";
import "firebase/firestore";
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
    const { email, password } = data;
    if (!validateEmail(email)) {
      setError("email ko chính xác");
    }
    if (password.length < 6) {
      setError("Mật khẩu không < 6 ký tự");
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found":
            setError("Tài khoản không tồn tại");
            break;
          case "auth/wrong-password":
            setError("Mật khẩu ko chính xác ");
            break;
          case "auth/too-many-requests":
            setError("Tài khoản tạm thời bị khoá do đăng nhập quá nhiều ");
            break;
          default:
            setError("Lỗi mạng ");
            break;
        }
        console.log(error);
      });
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
      </ScrollView>
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
    marginBottom: 20,
  },
  signUpButton: {
    paddingTop: 3,
  },
  signUpText: {
    color: color.green,
    fontWeight: "900",
  },
  input: {
    height: 100,
    marginVertical: 5,
  },
});
