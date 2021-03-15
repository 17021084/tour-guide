import React, { useEffect, useState, useRef } from "react";
import * as Location from "expo-location";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { connect } from "react-redux";
import { CAMERA_SCREEN, PERSON_DETAIL_SCREEN } from "../../ScreenName";
import * as TaskManager from "expo-task-manager";
import {
  changeCurrentJourneyName,
  changeCurrentJourneyPointList,
  changeTrackingStatus,
  journeyReset,
} from "../../../redux/actions/TrackAction";

import InputBox from "../../../components/common/InputBox.js";
import MapView from "react-native-maps";
import { updateRegion } from "../../../utils/updateRegion";

const TRACKING_INTERVAL = 20 * 1000; // 10s
const DISTANCE_INTERVAL = 0; // meters

function JourneyTrack({
  navigation,
  trackingStatus,
  pointList,
  journeyName,
  journeyReset,
  changeTrackingStatus,
  changeCurrentJourneyName,
  changeCurrentJourneyPointList,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  TaskManager.defineTask("TRACK", async ({ data: { locations }, error }) => {
    if (error) {
      console.log("error----", error.message);
      return;
    }
    if (new Date().getSeconds() % 2 == 0) {
      // console.log("Received new locations", locations);
      const { latitude, longitude } = locations[0].coords;
      const streetName = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      console.log(streetName[0].street);
      locations[0].streetName = streetName[0].street;
      console.log("======", locations[0]);
      changeCurrentJourneyPointList(locations[0]);
    }
  });
  const [currentJourneyName, setCurrentJourneyName] = useState(journeyName);

  const [region, setRegion] = useState({});

  useEffect(() => {
    if (pointList.length == 0) {
      setRegion({
        latitude: "37.32837938",
        longitude: "-122.02686219",
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      });
    } else {
      //check lai ki 
      let newRegion = updateRegion(pointList[pointList.length - 1], region);
      if (newRegion) {
        console.log('change region============')
        setRegion(newRegion);
      }
    }
  }, [pointList]);

  const startRecord = () => {
    if (!trackingStatus) {
      //if false it mean its not tracking
      Location.startLocationUpdatesAsync("TRACK", {
        deferredUpdatesInterval: TRACKING_INTERVAL,
      });
      changeTrackingStatus(true);
    }
  };

  const stopRecord = () => {
    if (trackingStatus) {
      //if true it mean its tracking. t
      Location.stopLocationUpdatesAsync("TRACK");
      changeTrackingStatus(false);
      // changeCurrentJourneyPointList(coord2);
    }
  };

  const saveJourney = () => {
    //save journey to the firebase firestore
  };

  const setNameJourney = () => {
    changeCurrentJourneyName(currentJourneyName);
    setModalVisible(!modalVisible);
  };

  const _renderStartOrResumeButton = () => {
    if (pointList.length == 0) {
      //start
      return <Button title={"Bắt đầu"} onPress={startRecord} />;
    } else {
      return <Button title={"Tiếp tục "} onPress={startRecord} />;
    }
  };

  const _renderModalSetName = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.inputName}>
            <InputBox
              onChangeText={(name) => setCurrentJourneyName(name)}
              title={"Tên Hành Trình"}
            />
          </View>

          <View style={styles.modalButtonBox}>
            <Button
              style={[styles.button, styles.buttonClose]}
              onPress={setNameJourney}
              title="Lưu"
            />
            <Button
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
              title="Huỷ"
            />
          </View>
        </View>
      </View>
    </Modal>
  );


  return (
    <View style={styles.container}>
      <Text>ten hanh trinh: {journeyName} </Text>

      {journeyName === "" ? (
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}> set Name </Text>
        </Pressable>
      ) : null}

      <Text>Trạng thái: {trackingStatus ? "Đang theo dõi " : "Đang dừng"}</Text>
      <Text>Số điểm : {pointList.length}</Text>

      <Text>
        Dia chi bat dau:{pointList.length ? pointList[0].streetName : ""}
      </Text>
      <Text>
        Dia chi Hien tai:
        {pointList.length ? pointList[pointList.length - 1].streetName : ""}
      </Text>
      <Text>Button xem ong hien tai : </Text>

      {_renderStartOrResumeButton()}
      <Button title={"tắt record"} onPress={stopRecord} />
      <Button title={"kết thúc hành trình"} onPress={saveJourney} />
      <Button
        title={"Chi tiết người đó "}
        onPress={() => {
          // navigation.navigate(PERSON_DETAIL_SCREEN, {person:null});
        }}
      />
      <Button
        title={"Chụp Ảnh"}
        onPress={() => {
          navigation.navigate(CAMERA_SCREEN);
        }}
      />
      <Text>======================+++++=============</Text>

      {_renderModalSetName()}
      <MapView style={{ height: 300 }} region={region}>
        {pointList.map((point) => (
          <MapView.Marker
            coordinate={{
              latitude: point.coords.latitude,
              longitude: point.coords.longitude,
            }}
          />
        ))}
      </MapView>
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

export default connect(mapStateToProps, {
  journeyReset,
  changeTrackingStatus,
  changeCurrentJourneyName,
  changeCurrentJourneyPointList,
})(JourneyTrack);

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
  },
  modalButtonBox: {
    flexDirection: "row",
  },
  inputName: {
    height: 100,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    height: 100,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
