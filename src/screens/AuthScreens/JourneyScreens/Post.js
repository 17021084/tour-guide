import React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
// wildcard import
import * as firebase from "firebase";
import { connect } from "react-redux";
import { color } from "../../../config/appConfig";
import ButtonBox from "../../../components/common/ButtonBox";
import { changeCurrentJourneyPointList } from "../../../redux/actions/TrackAction";
import { JOURNEY_TRACK_SCREEN } from "../../ScreenName";

const windowWidth = Dimensions.get("window").width;
const containerPadding = 10;

function Post({ route, navigation, changeCurrentJourneyPointList }) {
  const { image, currentPosition } = route.params;
  const [caption, setCaption] = useState("");

  const saveToListPoint = () => {
    const newImage = { ...currentPosition, imageURI: image, caption: caption };
    changeCurrentJourneyPointList(newImage);
    navigation.navigate(JOURNEY_TRACK_SCREEN);
  };

  //fix keyboard hide in put field, search :KeyboardAvoidingView
  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(text) => {
          setCaption(text);
        }}
        value={caption}
        placeholder="Hãy đặt tiêu đề cho bức ảnh này"
        style={styles.input}
        multiline={true}
      />
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.button}>
        <ButtonBox onPress={saveToListPoint} title="Lưu" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: containerPadding,
  },
  image: {
    width: windowWidth - 2 * containerPadding,
    height: windowWidth,
    borderRadius: 30,
    marginVertical: 20,
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginVertical: 20,
    height: 150,
    borderColor: color.aqua,
    borderWidth: 1,
    borderRadius: 30,
  },
  button: {
    height: 80,
  },
});

export default connect(null, { changeCurrentJourneyPointList })(Post);
