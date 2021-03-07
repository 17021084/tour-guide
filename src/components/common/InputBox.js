import React from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;

export default function InputBox({
  title = "Input",
  placeholder = "placeholder",
  secureTextEntry = false,
  onChangeText,
  value,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}: </Text>
      <TextInput
        placeholder={placeholder}
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        style={styles.input}
        value={value}
        autoCapitalize={"none"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width * 0.7,
    marginVertical: 10,
  },
  title: {
    fontFamily: "open-sans",
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 2,
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    marginTop: 5,
  },
});
