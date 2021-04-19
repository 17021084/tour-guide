import React from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
const width = Dimensions.get("window").width;

export default function InputBox({
  title = "Input",
  placeholder = "placeholder",
  secureTextEntry = false,
  onChangeText,
  value,
  error,
  success,
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
      {error ?   <Text style={[styles.message,{color:'red'}]}>{error}</Text> :null}
      {success?   <Text style={[styles.message,{color:'green'}]}>{success}</Text> :null}
    
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
  message: {
    paddingTop: 2,
    fontWeight: "300",
  },
});
