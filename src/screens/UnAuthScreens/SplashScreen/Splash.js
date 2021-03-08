import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default function Splash({ content, image, button }) {
  const imageStyle = {
    width: image.dimension.width,
    height: image.dimension.height,
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Image style={imageStyle} source={image.image} />
      </View>
      <Text style={styles.content}> {content} </Text>
      <View style={styles.button}>{button}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 150,
  },
  imageBox: {
    paddingTop: 30,
    width: width,
    alignItems: "center",
  },
  content: {
    marginTop: 50,
    textAlign: "center",
    fontWeight: "800",
    fontFamily: "open-sans",
  },
  button: {
    marginTop: 10,
    height: 100,
  },
});
