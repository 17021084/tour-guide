import React, { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import { View, Text, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { CAMERA_SCREEN } from "../../ScreenName";
import * as TaskManager from "expo-task-manager";

const TRACKING_INTERVAL = 5 * 1000; // 10s
const DISTANCE_INTERVAL = 0; // meters

function JourneyTrack({ navigation }) {
  const [coord, setCoord] = useState([]);
  const [currentCoord, setCurrentCoord] = useState([]);
  const [shouldTrack, setShouldStrack] = useState(false);
  const list = useRef([]);
  useEffect(() => {
    let subscriber = null;

    const startTracking = async () => {
      try {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
        }
        subscriber = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 3000, //* 1s
            distanceInterval: 10, //* 10 meters
          },
          callback
        );
      } catch (err) {
        setError(err);
      }
    };
    if (shouldTrack) {
      startTracking();
    } else {
      if (subscriber) {
        subscriber.remove();
        console.log("remove");
      }
      subscriber = null;
    }

    return () => {
      if (subscriber) {
        console.log("remove in return");
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);

  const [coord2, setCoord2] = useState([]);

  TaskManager.defineTask("TRACK", ({ data: { locations }, error }) => {
    if (error) {
      // check `error.message` for more details.
      console.log("error-------------", error.message);
      return;
    }
    console.log("Received new locations", locations);
    setCoord2([...coord2, locations]);
  });

  const startRecord = () => {
    Location.startLocationUpdatesAsync("TRACK", { timeInterval: 3000 });
  };
  const stopRecord = () => {
    Location.stopLocationUpdatesAsync("TRACK");
  };

  const callback = (location) => {
    console.log(
      "dang track ============== at",
      new Date().toLocaleTimeString()
    );
    console.log(location);

    // newCoord.push(location);
    setCoord([...coord, location]);
  };

  // console.log("testCoord");
  // console.log(testCoord);
  // console.log("coord=====");
  // console.log(coord);
  // console.log("current Coord=====");
  // console.log(currentCoord);
  console.log("    - length  = ", coord2.length);

  return (
    <View>
      <Text>journey track: ten hanh trinh </Text>
      <Text>Trang thai: bat dau , dang khoi hanh, tam dung,ket thuc </Text>
      <Text>Trang thai: start , going, stop,end . 3 cais button </Text>

      <Text>Dia chi bat dau: </Text>
      <Text>Dia chi Hien tai: </Text>
      <Text>Button xem ong hien tai : </Text>
      <Button
        title={"bat trackking"}
        onPress={() => {
          setShouldStrack(true);
        }}
      />
      <Button
        title={"tat tracking"}
        onPress={() => {
          setShouldStrack(false);
        }}
      />
      <Button title={"recored"} onPress={startRecord} />
      <Button title={"tat record"} onPress={stopRecord} />

      <Text> Number : {coord.length} </Text>
      <Text> Number : {coord2.length} </Text>
      <Button
        title={" Person Detail"}
        onPress={() => {
          navigation.navigate(CAMERA_SCREEN);
        }}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    prop: state.prop,
  };
};

export default connect()(JourneyTrack);

const styles = StyleSheet.create({});
