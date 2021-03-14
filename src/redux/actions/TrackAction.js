import {
  CURRENT_JOURNEY_NAME_CHANGE,
  CURRENT_JOURNEY_POINTS_LIST_CHANGE,
  JOURNEY_RESET,
  TRACKING_STATUS_CHANGE,
} from "./type";

export const journeyReset = () => {
  return {
    action: JOURNEY_RESET,
  };
};

export const fetchJourneyList = () => {
  return (dispatch) => {};
};

export const changeTrackingStatus = (status) => {
  return {
    type: TRACKING_STATUS_CHANGE,
    payload: status,
  };
};

export const changeCurrentJourneyName = (name) => {
  return {
    type: CURRENT_JOURNEY_NAME_CHANGE,
    payload: name,
  };
};

export const changeCurrentJournyPointList = (point) => {
  return {
    type: CURRENT_JOURNEY_POINTS_LIST_CHANGE,
    payload: point,
  };
};
