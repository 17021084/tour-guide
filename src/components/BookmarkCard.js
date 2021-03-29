import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { color } from "../config/appConfig";

export default function BookmarkCard({ person }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={
            person.thumbnail
              ? {
                  uri: person.thumbnail,
                }
              : require("../../assets/noImage.png")
          }
        />

        <View style={styles.intro}>
          <Text style={styles.personName}> {person.label} </Text>
          <Text style={styles.shortDescription}>
            {person.termDescription ||
              "Hiện tại Chưa có thông tin chi tiết"}
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // borderBottomWidth: 1,
    // borderColor: color.green,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },

  personName: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
  intro: {
    flex: 4,
    margin: 10,
  },
  shortDescription: {
    fontFamily: "open-sans",
    fontSize: 14,
    paddingVertical: 3,
  },

  image: {
    flex: 2,
    height: 130,
    width: 100,
    borderRadius: 30,
  },
});
