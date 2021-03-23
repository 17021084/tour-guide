import * as firebase from "firebase";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { useState } from "react/cjs/react.development";
import { JOURNEY_DETAIL_SCREEN } from "../../ScreenName";

function JourneyList({
  navigation,
  trackingStatus,
  pointList,
  journeyName,
  journeyReset,
}) {
  const [saved, setSaved] = useState(null);

  //Handle waiting to upload each file using promise
  const uploadImageAsPromise = (point, name, index) => {
    return new Promise(async function (resolve, reject) {
      const { imageURI } = point;

      // get image by uri
      const response = await fetch(imageURI);
      // convert to blob - binary large object
      const blobImage = await response.blob();
      const path = `journeys/${
        firebase.auth().currentUser.uid
      }/${name}/${index}`;
      const storageRef = firebase.storage().ref(path);
      const task = storageRef.put(blobImage);

      //Update progress bar
      task.on(
        "state_changed",
        function progress(snapshot) {
          let percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        function error(err) {
          console.log("error when upload image");
          reject(err);
        },
        function complete() {
          task.snapshot.ref.getDownloadURL().then((snapshot) => {
            const newPoint = {
              downloadURL: snapshot,
              caption: point.caption,
              coords: point.coords,
              streetName: point.streetName,
              timestamp: point.timestamp,
            };
            resolve(newPoint);
          });
        }
      );
    });
  };

  const uploadJourneyToFireStore = (pointList) => {};

  const saveTripIntoFirebase = async () => {
    Promise.all(
      pointList.map((point) => {
        if (point.imageURI !== undefined) {
          return uploadImageAsPromise(
            point,
            journeyName,
            pointList.indexOf(point)
          );
        } else {
          return point;
        }
      })
    )
      .then((value) => {
        firebase
          .firestore()
          .collection("journeys")
          .doc(firebase.auth().currentUser.uid)
          .collection(journeyName)
          .add({
            journeyName:journeyName,
            pointList: value,
          })
          .then((res) => {
            console.log("Upload success");
          })
          .catch((error) => {
            console.log("Error occour in upload journey trips to fireStore");
          });
      })
      .catch((error) => {
        console.log("error when update image to storage", error);
      });
  };

  return (
    <View>
      <Text>Journey List screen</Text>
      <Text>Journey List screen</Text>
      <Text>Journey List screen</Text>
      <Text>Journey List screen</Text>
      <Text>Journey List screen</Text>
      <Text>Journey List screen</Text>

      <Text> Chuyen di hien tai </Text>
      <Text>Ten chuyen di: {journeyName || "chưa đặt"} </Text>
      <Text>Trạng thái: {trackingStatus ? "Đang theo dõi " : "Đang dừng"}</Text>
      <Text> Đi qua bao nhiêu con đường: </Text>
      <Text>luu hanh trinh </Text>

      <Text>Modal hien ra </Text>
      <Button
        title={"Lưu hành trình lên đám mây "}
        onPress={saveTripIntoFirebase}
      />
      <Button
        title={" Journey Detail"}
        onPress={() => {
          navigation.navigate(JOURNEY_DETAIL_SCREEN);
        }}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    trackingStatus: state.trackState.trackingStatus,
    pointList: state.trackState.currentJourney.pointList,
    journeyName: state.trackState.currentJourney.journeyName,
  };
};
export default connect(mapStateToProps)(JourneyList);

const styles = StyleSheet.create({
  container: {},
});
