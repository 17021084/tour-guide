import {
  FRIEND_JOURNEY_CHANGE,
  FRIEND_JOURNEY_FETCHED_CHANGE,
} from "../actions/type";

const initializeState = {
  friendJourneys: [],
  friendJourneyFetched: false,
};

export default (state = initializeState, action) => {
  switch (action.type) {
    case FRIEND_JOURNEY_CHANGE:
      return { ...state, friendJourneys: action.payload };
    case FRIEND_JOURNEY_FETCHED_CHANGE:
      return { ...state, friendJourneyFetched: true };
    default:
      return state;
  }
};
