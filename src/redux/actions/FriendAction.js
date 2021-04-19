import * as firebase from "firebase";
import { FRIEND_JOURNEY_CHANGE, FRIEND_JOURNEY_FETCHED_CHANGE } from "./type";

export const fetchFriendJourney = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("journeys")
      .doc(firebase.auth().currentUser.uid)
      .collection("friendJourneys")
      .onSnapshot((snapshot) => {
        let friendJourneys = [];
        if (snapshot.docs.length > 0) {
          snapshot.forEach((doc) => {
            friendJourneys.push({
              data: doc.data(),
              id: doc.id,
            });
          });
        }
        dispatch(friendJourneyChange(friendJourneys));
        dispatch(friendJourneyFetched());
      });
  };
};

export const friendJourneyChange = (friendJourneys) => {
  return {
    type: FRIEND_JOURNEY_CHANGE,
    payload: friendJourneys,
  };
};

export const deleteFriendJourneys = (journeyId) => {
  return (dispatch, getState) => {
    firebase
      .firestore()
      .collection("journeys")
      .doc(firebase.auth().currentUser.uid)
      .collection("friendJourneys")
      .doc(journeyId)
      .delete()
      .then(() => {
        console.log("delete document success");
        const newList = getState().friendState.friendJourneys.filter(
          (jn) => jn.id !== journeyId
        );
        dispatch(friendJourneyChange(newList));
      });
  };
};

export const friendJourneyFetched = () => {
  return {
    type: FRIEND_JOURNEY_FETCHED_CHANGE,
  };
};
