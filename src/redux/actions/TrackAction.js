import * as firebase from "firebase";
import {
  CURRENT_JOURNEY_NAME_CHANGE,
  CURRENT_JOURNEY_POINTS_LIST_CHANGE,
  JOURNEY_RESET,
  TRACKING_STATUS_CHANGE,
  UPDATE_JOURNEY_LIST,
  ADD_CURRENT_TO_JOURNEY_LIST,
  JOURNEY_LIST_FETCHED,
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
        if (snapshot.docs.length > 0) {
          let newJouneyList = [];
          snapshot.forEach((doc) => {
            newJouneyList.push(doc.data());
          });
          dispatch(updateJourneyList(newJouneyList));
        }
        dispatch(journeyListFetched());
      });
  };
};

const journeyListFetched = () => {
  return {
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

export const saveCurrentJourney = () => {
  return (dispatch, getState) => {
    const currentJourney = getState().trackState.currentJourney;
    dispatch(updateJourneyList(currentJourney));
    dispatch(journeyReset());
  };
};
