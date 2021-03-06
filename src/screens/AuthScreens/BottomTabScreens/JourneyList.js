import * as firebase from "firebase";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Modal,
  Alert,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import ButtonBox from "../../../components/common/ButtonBox";
import ButtonIcon from "../../../components/common/ButtonIcon";
import InputBox from "../../../components/common/InputBox";
import { color } from "../../../config/appConfig";
import {
  changeCurrentJourneyName,
  fetchJourneyList,
  saveCurrentJourney,
  deleteJourney,
  fetchFriendJourney,
} from "../../../redux/actions";
import { JOURNEY_DETAIL_SCREEN, FRIEND_JOURNEY_LIST } from "../../ScreenName";

function JourneyList({
  navigation,
  trackingStatus,
  pointList,
  journeyName,
  saveCurrentJourney,
  changeCurrentJourneyName,
  fetchJourneyList,
  journeyList,
  deleteJourney,
}) {
  const [currentJourneyName, setCurrentJourneyName] = useState(journeyName);
  const [isSaving, setIsSaving] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalShare, setModalShare] = useState(false);
  const [findStatus, setFindStatus] = useState(null);
  const [friendMail, setFriendMail] = useState("");
  const [friend, setFriend] = useState();
  const [shareJourney, setShareJourney] = useState({});
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
              saveCurrentJourney(res.id);
              setIsSaving(false);
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
              title={"T??n H??nh Tr??nh"}
              placeholder={journeyName || "H??y nh???p t??n h??nh tr??nh m???i"}
            />
          </View>

          <View style={styles.modalButtonBox}>
            <Button
              style={[styles.button, styles.buttonClose]}
              onPress={setNameJourney}
              title="L??u"
            />
            <Button
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
              title="Hu???"
            />
          </View>
        </View>
      </View>
    </Modal>
  );

  const _renderModalShare = () => (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalShare}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalShare(!modalShare);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.inputName}>
            <InputBox
              onChangeText={(email) => {
                setFindStatus(null);
                setFriendMail(email);
              }}
              title={"Email c???a ng?????i nh???n"}
              placeholder={"Test2@gmail.com"}
              error={
                findStatus && !findStatus.exist ? findStatus.message : null
              }
              success={
                findStatus && findStatus.exist ? findStatus.message : null
              }
            />
            <View style={styles.searchButton}>
              <ButtonIcon
                onPress={checkEmail}
                name={"search"}
                color={color.aqua}
                size={35}
              />
            </View>
          </View>

          <View style={styles.modalButtonBox}>
            <Button
              disabled={findStatus == null ? true : false}
              style={[styles.button, styles.buttonClose]}
              onPress={shareJourneyToFriend}
              title="Chia s???"
            />
            <Button
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalShare(!modalShare)}
              title="Hu???"
            />
          </View>
        </View>
      </View>
    </Modal>
  );

  const checkEmail = () => {
    firebase
      .firestore()
      .collection("users")
      .where("email", "==", friendMail.trim())
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          let data = doc.data();
          let id = doc.id;
          return { id, ...data };
        });
        if (users.length) {
          setFindStatus({ exist: true, message: "Ng?????i d??ng t???n t???i " });
          const ownerEmail = firebase.auth().currentUser.email;
          if (ownerEmail == friendMail) {
            return setFindStatus({
              exist: false,
              message: "????y l?? email c???a ch??nh b???n",
            });
          }
          setFriend(users[0]);
        } else {
          setFindStatus({ exist: false, message: "Ng?????i d??ng ko t???n t???i" });
        }
      });
  };

  const shareJourneyToFriend = () => {
    const ownerEmail = firebase.auth().currentUser.email;
    if (ownerEmail == friendMail) {
      return setFindStatus({
        exist: false,
        message: "????y l?? email c???a ch??nh b???n",
      });
    }
    if (findStatus && findStatus.exist) {
      firebase
        .firestore()
        .collection("journeys")
        .doc(friend.id)
        .collection("friendJourneys")
        .add({
          ownerId: firebase.auth().currentUser.uid,
          ownerEmail,
          journey: shareJourney.data,
        })
        .then(() => {
          console.log("Shared!!");
          setFindStatus({ exist: true, message: "???? chia s???" });
          setTimeout(() => {
            setModalShare(!modalShare);
          }, 1000);
        });
    } else {
      setFindStatus({ exist: false, message: "Ng?????i d??ng ko t???n t???i" });
    }
  };

  const createTwoButtonAlert = (item) => {
    Alert.alert("Xo?? h??nh tr??nh", "B???n th???c s??? mu???n xo?? ", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteJourney(item) },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.journeyBox}>
      <View style={styles.contentBox}>
        <View style={styles.inforBox}>
          <Text style={styles.title}>T??n h??nh tr??nh: </Text>
          <Text style={styles.titleValue}>{item.data.journeyName}</Text>
        </View>
        <View style={styles.inforBox}>
          <Text style={styles.title}>??i???m b???t ?????u : </Text>
          <Text style={styles.titleValue}>
            {item.data.pointList[0].streetName}
          </Text>
        </View>
        <View style={styles.inforBox}>
          <Text style={styles.title}>??i???m k???t th??c : </Text>
          <Text style={styles.titleValue}>
            {item.data.pointList[item.data.pointList.length - 1].streetName}
          </Text>
        </View>
      </View>
      <View style={styles.buttonDetail}>
        <ButtonBox
          title={"Chi ti???t"}
          onPress={() => {
            navigation.navigate(JOURNEY_DETAIL_SCREEN, { journey: item });
          }}
        />
        <View style={styles.actionBox}>
          <ButtonIcon
            name={"restore-from-trash"}
            size={30}
            color={color.orange}
            onPress={() => createTwoButtonAlert(item)}
          />
          <ButtonIcon
            name={"share"}
            size={30}
            color={color.aqua}
            onPress={() => {
              setShareJourney(item);
              setFindStatus(null);
              setModalShare(true);
            }}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.hearderContainer}>
        <View style={styles.inforBox}>
          <Text style={styles.title}>T??n h??nh tr??nh: </Text>
          <Text style={styles.titleValue}> {journeyName || "ch??a ?????t"} </Text>
          <ButtonIcon
            onPress={() => setModalVisible(true)}
            style={styles.changeButton}
            name={"drive-file-rename-outline"}
            color={color.aqua}
            size={35}
          />
        </View>
        <View style={styles.inforBox}>
          <Text style={styles.title}>??i???m b???t ?????u : </Text>
          <Text style={styles.titleValue}>
            {" "}
            {pointList.length ? pointList[0].streetName : "Ch??a ??i"}
          </Text>
        </View>
        <View style={styles.inforBox}>
          <Text style={styles.title}>??i???m hi???n t???i : </Text>
          <Text style={styles.titleValue}>
            {" "}
            {pointList.length
              ? pointList[pointList.length - 1].streetName
              : "Ch??a ??i "}
          </Text>
        </View>
        <View style={styles.inforBox}>
          <Text style={styles.title}> Tr???ng th??i : </Text>
          <Text style={styles.titleValue}>
            {trackingStatus ? "??ang theo d??i " : "??ang d???ng"}
          </Text>
        </View>
        {isSaving ? (
          <ActivityIndicator size={"large"} color={color.aqua} />
        ) : (
          <Button title={"L??u h??nh tr??nh"} onPress={saveTripIntoFirebase} />
        )}
        <Button
          title={"Kh??m ph??"}
          onPress={() => navigation.navigate(FRIEND_JOURNEY_LIST)}
        />
      </View>

      {_renderModalSetName()}
      {_renderModalShare()}
      <View style={styles.mainContainer}>
        <FlatList
          data={journeyList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
  deleteJourney,
})(JourneyList);

const styles = StyleSheet.create({
  modalButtonBox: {
    flexDirection: "row",
  },
  inputName: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  searchButton: {
    width: 50,
    paddingTop: 40,
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
  actionBox: {
    flexDirection: "row",
    paddingRight: 10,
  },
});
