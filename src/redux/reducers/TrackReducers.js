import {
  CURRENT_JOURNEY_NAME_CHANGE,
  CURRENT_JOURNEY_POINTS_LIST_CHANGE,
  FETCH_JOURNEY_LIST,
  TRACKING_STATUS_CHANGE,
  JOURNEY_RESET,
} from "../actions/type";

const initializeState = {
  currentJourney: {
    journeyName: "",
    pointList: [
      // {
      //   latitude: 111,
      //   longitude: 21,
      //   timestamp: "ss mm hh dd MM YY",
      //   status: "start", //start, going, stop,end,
      //   post: {
      //     image: "url",
      //     title: "title",
      //   },
      // },
    ],
  },

  trackingStatus: "start", //start, going, stop,end
  journeyList: [],
};

// export const

export default (state = initializeState, action) => {
  switch (action.type) {
    case JOURNEY_RESET:
      return { ...state, trackingStatus: "start", currentJourney: {} };
    case FETCH_JOURNEY_LIST:
      return { ...state, journeyList: action.payload };
    case TRACKING_STATUS_CHANGE:
      return { ...state, trackingStatus: action.payload };
    case CURRENT_JOURNEY_NAME_CHANGE:
      return {
        ...state,
        currentJourney: { ...currentJourney, journeyPoint: action.payload },
      };
    case CURRENT_JOURNEY_POINTS_LIST_CHANGE:
      return {
        ...state,
        currentJourney: { ...currentJourney, pointList: action.payload },
      };
    default:
      return state;
  }
};
