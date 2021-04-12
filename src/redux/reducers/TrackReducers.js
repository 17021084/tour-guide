import {
  CURRENT_JOURNEY_NAME_CHANGE,
  CURRENT_JOURNEY_POINTS_LIST_CHANGE,
  FETCH_JOURNEY_LIST,
  TRACKING_STATUS_CHANGE,
  JOURNEY_RESET,
  UPDATE_JOURNEY_LIST,
  JOURNEY_LIST_FETCHED,
  TRACKING_SETTING_CHANGE,
  DELETE_JOURNEY,
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
  trackingSetting: {
    distanceInterval: 10, //meter
    timeInterval: 2000, // ms ~ 2s
  },
  trackingStatus: false, //going : true ,false. stop
  journeyList: [],
  journeyListFetched: false,
};

// export const

export default (state = initializeState, action) => {
  switch (action.type) {
    case TRACKING_SETTING_CHANGE:
      return {
        ...state,
        trackingSetting: action.payload,
      };

    case JOURNEY_LIST_FETCHED:
      return {
        ...state,
        journeyListFetched: true,
        journeyList: action.payload,
      };
    case JOURNEY_RESET:
      return {
        ...state,
        trackingStatus: false,
        currentJourney: { journeyName: "", pointList: [] },
      };
    case UPDATE_JOURNEY_LIST:
      return { ...state, journeyList: [...state.journeyList, action.payload] };
    case FETCH_JOURNEY_LIST:
      return { ...state, journeyList: action.payload };
    case CURRENT_JOURNEY_NAME_CHANGE:
      return {
        ...state,
        currentJourney: {
          ...state.currentJourney,
          journeyName: action.payload,
        },
      };
    case CURRENT_JOURNEY_POINTS_LIST_CHANGE:
      return {
        ...state,
        currentJourney: {
          ...state.currentJourney,
          pointList: [...state.currentJourney.pointList, action.payload],
        },
      };
    case TRACKING_STATUS_CHANGE:
      return {
        ...state,
        trackingStatus: action.payload,
      };
    case DELETE_JOURNEY:
      let newJourneyList = state.journeyList.filter(
        (journey) => journey.id !== action.payload
      );
      return {
        ...state,
        newJourneyList,
      };
    default:
      return state;
  }
};
