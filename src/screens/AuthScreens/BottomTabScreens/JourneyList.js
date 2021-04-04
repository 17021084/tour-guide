import * as firebase from "firebase";
import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { useState } from "react/cjs/react.development";
import ButtonBox from "../../../components/common/ButtonBox";
import ButtonIcon from "../../../components/common/ButtonIcon";
import InputBox from "../../../components/common/InputBox";
import { color } from "../../../config/appConfig";
import {
  changeCurrentJourneyName,
  fetchJourneyList,
  saveCurrentJourney,
} from "../../../redux/actions/TrackAction";
import { JOURNEY_DETAIL_SCREEN } from "../../ScreenName";

function JourneyList({
  navigation,
  trackingStatus,
  pointList,
  journeyName,
  saveCurrentJourney,
  changeCurrentJourneyName,
  fetchJourneyList,
  journeyList,
}) {
  const [currentJourneyName, setCurrentJourneyName] = useState(journeyName);
  const [isSaving, setIsSaving] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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

  const saveTripIntoFirebase = async () => {
    if (journeyName.length == 0) {
      setModalVisible(true);
    } else {
      setIsSaving(true);
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
            .collection("userJourneys")
            .add({
              journeyName: journeyName,
              pointList: value,
            })
            .then((res) => {
              console.log("Upload success");
              setIsSaving(false);
              saveCurrentJourney();
            })
            .catch((error) => {
              setIsSaving(false);
              console.log("Error occour in upload journey trips to fireStore");
            });
        })
        .catch((error) => {
          console.log("error when update image to storage", error);
        });
    }
  };
  const setNameJourney = () => {
    setModalVisible(!modalVisible);
    changeCurrentJourneyName(currentJourneyName);
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

  const renderItem = ({ item }) => (
    <View style={styles.journeyBox}>
      <View style={styles.contentBox}>
        <View style={styles.inforBox}>
          <Text style={styles.title}>Tên hành trình: </Text>
          <Text style={styles.titleValue}>{item.data.journeyName}</Text>
        </View>
        <View style={styles.inforBox}>
          <Text style={styles.title}>Điểm bắt đầu : </Text>
          <Text style={styles.titleValue}>{item.data.pointList[0].streetName}</Text>
        </View>
        <View style={styles.inforBox}>
          <Text style={styles.title}>Điểm kết thúc : </Text>
          <Text style={styles.titleValue}>{item.data.pointList[item.data.pointList.length-1].streetName}</Text>
        </View>
      </View>
      <View style={styles.buttonDetail}>
        <ButtonBox
          title={"Chi tiết"}
          onPress={() => {
            navigation.navigate(JOURNEY_DETAIL_SCREEN ,{journey : item});
          }}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.hearderContainer}>
        <View style={styles.inforBox}>
          <Text style={styles.title}>Tên hành trình: </Text>
          <Text style={styles.titleValue}> {journeyName || "chưa đặt"} </Text>
          <ButtonIcon
            onPress={() => setModalVisible(true)}
            style={styles.changeButton}
            name={"drive-file-rename-outline"}
            color={color.aqua}
            size={35}
          />
        </View>
        <View style={styles.inforBox}>
          <Text style={styles.title}>Điểm bắt đầu : </Text>
          <Text style={styles.titleValue}>
            {" "}
            {pointList.length ? pointList[0].streetName : "Chưa đi"}
          </Text>
        </View>
        <View style={styles.inforBox}>
          <Text style={styles.title}>Điểm hiện tại : </Text>
          <Text style={styles.titleValue}>
            {" "}
            {pointList.length
              ? pointList[pointList.length - 1].streetName
              : "Chưa đi "}
          </Text>
        </View>
        <View style={styles.inforBox}>
          <Text style={styles.title}> Trạng thái : </Text>
          <Text style={styles.titleValue}>
            {trackingStatus ? "Đang theo dõi " : "Đang dừng"}
          </Text>
        </View>
        {isSaving ? (
          <ActivityIndicator size={"large"} color={color.aqua} />
        ) : (
          <Button
            title={"Lưu hành trình lên đám mây "}
            onPress={saveTripIntoFirebase}
          />
        )}
        <Button
          style={styles.button}
          onPress={fetchJourneyList}
          title="fet data"
        />
      </View>

      {_renderModalSetName()}
      <View style={styles.mainContainer}>
        <FlatList data={journeyList} 
        renderItem={renderItem}
        keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    trackingStatus: state.trackState.trackingStatus,
    pointList: state.trackState.currentJourney.pointList,
    journeyName: state.trackState.currentJourney.journeyName,
    journeyList: state.trackState.journeyList,
  };
};
export default connect(mapStateToProps, {
  saveCurrentJourney,
  changeCurrentJourneyName,
  fetchJourneyList,
})(JourneyList);

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 10,
  },
  titleValue: {
    flex: 2,
    fontSize: 17,
    fontFamily: "open-sans-bold",
    paddingVertical: 1,
  },
  title: {
    fontSize: 17,
    fontFamily: "open-sans",
    paddingVertical: 3,
  },
  hearderContainer: {
    borderBottomColor: color.green,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  inforBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  journeyBox: {
    borderBottomColor: color.green,
    borderBottomWidth: 1,
    paddingBottom: 10,
    flexDirection: "row",
  },
  contentBox: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    marginVertical: 20,
  },
  buttonDetail: {},
});
