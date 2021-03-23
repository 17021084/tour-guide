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

import InputBox from "../../../components/common/InputBox";
import ButtonIcon from "../../../components/common/ButtonIcon";
import ButtonBox from "../../../components/common/ButtonBox";
import MapView from "react-native-maps";
import { updateRegion } from "../../../utils/updateRegion";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { color, pointIcon } from "../../../config/appConfig";
import { searchStreet } from "../../../redux/actions";
import filterStreetName from "../../../utils/filterStreetName";
import ontologyAPI from "../../../api/ontologyApi";

const TRACKING_INTERVAL = 20 * 1000; // 10s
const DISTANCE_INTERVAL = 10; // meters

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
searchStreet;
function JourneyTrack({
  navigation,
  searchStreet,
  person,
  trackingStatus,
  pointList,
  journeyName,
  journeyReset,
  changeTrackingStatus,
  changeCurrentJourneyName,
  changeCurrentJourneyPointList,
}) {
  const [currentJourneyName, setCurrentJourneyName] = useState(journeyName);
  const [region, setRegion] = useState({
    latitude: 37.32590459,
    longitude: -122.02587676,
    longitudeDelta: 0.02,
    latitudeDelta: 0.02,
  });

  //notification
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // searchStreet(address);
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []);

  // useEffect(() => {
  //   if (pointList.length == 0) {
  //     setRegion({
  //       latitude: "37.32837938",
  //       longitude: "-122.02686219",
  //       latitudeDelta: 0.009,
  //       longitudeDelta: 0.009,
  //     });
  //   } else {
  //     //check lai ki
  //     let newRegion = updateRegion(pointList[pointList.length - 1], region);
  //     if (newRegion) {
  //       console.log("change region============");
  //       setRegion(newRegion);
  //     }
  //   }
  // }, [pointList]);

  // const setCurrentRegion = ()=>{
  //   if (pointList.length != 0) {
  //     let newRegion = updateRegion(pointList[pointList.length - 1], region);
  //     if (newRegion) {
  //       console.log("change region============");
  //       setRegion(newRegion);
  //     }
  //   }
  // }

  const getPersonInfor = async () => {
    if (pointList.length) {
      const streetname = filterStreetName(
        pointList[pointList.length - 1].streetName
      );
      const person = await ontologyAPI(streetname);
      navigation.navigate(PERSON_DETAIL_SCREEN, { person: person.data[0] });
    }
  };

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

      //check change stree
      let length = pointList.length;
      if (
        length > 1 &&
        pointList[length - 2].streetName &&
        pointList[length - 2].streetName != locations[0].streetName &&
        Platform.OS === "android" &&
        Constants.isDevice
      ) {
        await schedulePushNotification(streetName[0].street);
        console.log(
          ` Đổi đường !!!!!! cũ ${pointList[length - 2].streetName} mới ==== ${
            locations[0].streetName
          }  `
        );
      }
      // if (new Date().getMinutes() % 2 == 0) {
      //   await schedulePushNotification(streetName[0].street);
      // }

      changeCurrentJourneyPointList(locations[0]);
    }
  });

  const startRecord = () => {
    if (!trackingStatus) {
      //if false it mean its not tracking
      Location.startLocationUpdatesAsync("TRACK", {
        distanceInterval: DISTANCE_INTERVAL,
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
      return <ButtonBox title={"Bắt đầu"} onPress={startRecord} />;
    } else {
      return <ButtonBox title={"Tiếp tục "} onPress={startRecord} />;
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
              placeholder={journeyName || "Hãy nhập tên hành trình mới"}
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

  const addPicture = () => {
    stopRecord();
    let currentPosition = pointList[pointList.length - 1];
    navigation.navigate(CAMERA_SCREEN, { currentPosition });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <View style={styles.inforBox}>
          <Text style={styles.title}>Tên hành trình: </Text>
          <Text style={styles.titleValue}> {journeyName} </Text>
          <ButtonIcon
            onPress={() => setModalVisible(true)}
            style={styles.changeButton}
            name={"drive-file-rename-outline"}
            color={color.aqua}
            size={35}
          />
        </View>

        <View style={styles.inforBox}>
          <Text style={styles.title}>Số điểm đã lưu : </Text>
          <Text style={styles.titleValue}>{pointList.length}</Text>
        </View>

        <View style={styles.inforBox}>
          <Text style={styles.title}>Địa chỉ bắt đầu :</Text>
          <Text style={styles.titleValue}>
            {pointList.length ? pointList[0].streetName : ""}
          </Text>
        </View>

        <View style={styles.inforBox}>
          <Text style={styles.title}>Địa chỉ hiện tại : </Text>
          <Text style={styles.titleValue}>
            {pointList.length ? pointList[pointList.length - 1].streetName : ""}
          </Text>
          <ButtonIcon
            onPress={getPersonInfor}
            // onPress={getAddress}
            name="location-history"
            size={35}
            color={color.aqua}
          />
        </View>

        <View style={styles.inforBox}>
          <View>
            <Text style={styles.title}>Trạng thái:</Text>
          </View>
          <Text style={styles.titleValue}>
            {trackingStatus ? "Đang theo dõi " : "Đang dừng"}
          </Text>
        </View>
      </View>

      <View style={styles.buttonBox}>
        {_renderStartOrResumeButton()}

        <ButtonBox title={"tắt"} onPress={stopRecord} />
        <ButtonBox title={"kết thúc"} onPress={saveJourney} />
        <ButtonIcon
          onPress={addPicture}
          name="camera-alt"
          size={50}
          color={color.aqua}
        />
      </View>
      {_renderModalSetName()}

      <MapView style={{ height: "100%" }} region={region}>
        {pointList.map((point) => {
          if (pointList.indexOf(point) > 0) {
            return (
              <MapView.Marker
                coordinate={{
                  latitude: point.coords.latitude,
                  longitude: point.coords.longitude,
                }}
                image={
                  pointList.indexOf(point) == 1
                    ? pointIcon.start
                    : pointList.indexOf(point) == pointList.length - 1
                    ? pointIcon.current
                    : pointIcon.point
                }
              />
            );
          }
        })}
      </MapView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    trackingStatus: state.trackState.trackingStatus,
    pointList: state.trackState.currentJourney.pointList,
    journeyName: state.trackState.currentJourney.journeyName,
    person: state.searchState.person,
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
    paddingTop: 50,
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
  title: {
    fontSize: 17,
    fontFamily: "open-sans",
    paddingVertical: 3,
  },
  inforBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerBox: {
    paddingHorizontal: 20,
  },
  changeButton: {
    flex: 1,
  },
  titleValue: {
    flex: 2,
    fontSize: 17,
    fontFamily: "open-sans-bold",
    paddingVertical: 1,
  },
  buttonBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  mapView: {
    flex: 1,
    height: 300,
  },
});

// notification services
async function schedulePushNotification(streetName) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "tracking app 📬",
      body: streetName,
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const {
      status: existingStatus,
    } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    // alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    // Notifications.setNotificationChannelAsync("default", {
    //   name: "default",
    //   importance: Notifications.AndroidImportance.MAX,
    //   vibrationPattern: [0, 250, 250, 250],
    //   lightColor: "#FF231F7C",
    // });
    alert("This function isnt avaliabel in android 11 and 10 .");
  }

  return token;
}
