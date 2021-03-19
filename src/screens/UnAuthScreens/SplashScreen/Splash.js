import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

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
      <View style={styles.content}>
        <Text style={styles.contentText}> {content} </Text>
      </View>
      <View style={styles.button}>{button}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 50,
    paddingBottom:50,
  },
  imageBox: {
    paddingTop: height * 0.1,
    width: width,
    alignItems: "center",
    height: height * 0.5,
  },
  contentText: {
    textAlign: "center",
    fontWeight: "800",
    fontFamily: "open-sans",
    fontSize:20
  },
  content: {
    height: height*0.1,
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    height: 100,
  },
});
