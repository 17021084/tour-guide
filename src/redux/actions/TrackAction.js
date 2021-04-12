import * as firebase from "firebase";
import {
  CURRENT_JOURNEY_NAME_CHANGE,
  CURRENT_JOURNEY_POINTS_LIST_CHANGE,
  JOURNEY_RESET,
  TRACKING_STATUS_CHANGE,
  UPDATE_JOURNEY_LIST,
  ADD_CURRENT_TO_JOURNEY_LIST,
  TRACKING_SETTING_CHANGE,
  JOURNEY_LIST_FETCHED,
  DELETE_JOURNEY,
} from "./type";

export const journeyReset = () => {
  return {
    type: JOURNEY_RESET,
  };
};

export const fetchJourneyList = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("journeys")
      .doc(firebase.auth().currentUser.uid)
      .collection("userJourneys")
      .onSnapshot((snapshot) => {
        let newJouneyList = [];
        if (snapshot.docs.length > 0) {
          snapshot.forEach((doc) => {
            newJouneyList.push({
              data: doc.data(),
              id: doc.id,
            });
          });
        }
        dispatch(journeyListFetched(newJouneyList));
      });
  };
};

const journeyListFetched = (list) => {
  return {
    payload: list,
    type: JOURNEY_LIST_FETCHED,
  };
};

export const changeTrackingStatus = (status) => {
  return (dispatch) => {
    dispatch({
      type: TRACKING_STATUS_CHANGE,
      payload: status,
    });
  };
};

export const changeCurrentJourneyName = (name) => {
  return {
    type: CURRENT_JOURNEY_NAME_CHANGE,
    payload: name,
  };
};

export const changeCurrentJourneyPointList = (pointList) => {
  return (dispatch) => {
    dispatch({
      type: CURRENT_JOURNEY_POINTS_LIST_CHANGE,
      payload: pointList,
    });
  };
};

const updateJourneyList = (journey) => {
  return {
    type: UPDATE_JOURNEY_LIST,
    payload: journey,
  };
};

export const saveCurrentJourney = (id) => {
  return (dispatch, getState) => {
    // const newJourneyList = {
    //   data: getState().trackState.currentJourney,
    //   id: id,
    // };
    // dispatch(updateJourneyList(newJourneyList));
    dispatch(journeyReset());
  };
};

export const changeTrackingSetting = (setting) => {
  return {
    type: TRACKING_SETTING_CHANGE,
    payload: setting,
  };
};

export const deleteJourney = (journey) => {
  return (dispatch) => {
    const userId = firebase.auth().currentUser.uid;
    firebase.firestore()
      .collection("journeys")
      .doc(userId)
      .collection("userJourneys")
      .doc(journey.id)
      .delete()
      .then(() => {
        console.log("delete document success");
        dispatch({
          payload: journey.id,
          type: DELETE_JOURNEY,
        });
        let path = `journeys/${userId.toString()}/${journey.data.journeyName}` ;
        deleteFolderContents(path);

      });
  };
};

//firebase doesnt support delete folder directly
function deleteFolderContents(path) {
  const ref = firebase.storage().ref(path);
  ref.listAll()
    .then(dir => {
      dir.items.forEach(fileRef => {
        deleteFile(ref.fullPath, fileRef.name);
      });
    })
    .catch(error => {
      console.log(error);
    });
}

function deleteFile(pathToFile, fileName) {
  const ref = firebase.storage().ref(pathToFile);
  const childRef = ref.child(fileName);
  childRef.delete()
}