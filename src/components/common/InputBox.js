import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import HoriLine from "./HoriLine";

export default function InputBox({
  title = "Input",
  placeholder = "placeholder",
  secureTextEntry = false,
  onChangeText,
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
      />
      <HoriLine />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: "open-sans",
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 5,
  },
  input: {
    borderRadius: 30,
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    marginBottom: 20,
  },
});
