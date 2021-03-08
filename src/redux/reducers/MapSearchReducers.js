import {
  REGION_SEARCH_CHANGE,
  MARKER_SEARCH_CHANGE,
  STREET_SEARCH_CHANGE,
} from "../actions/type";

const initializeState = {
  region: {
    latitude: 21.0281465,
    longitude: 105.7882117,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  },
  marker: {
    latitude: 21.0281465,
    longitude: 105.7882117,
  },
  street_name: "",
};

export default (state = initializeState, action) => {
  switch (action.type) {
    case REGION_SEARCH_CHANGE:
      console.log(REGION_SEARCH_CHANGE);
      return { ...state, region: action.payload };
    case MARKER_SEARCH_CHANGE:
      return { ...state, marker: action.payload };
    case STREET_SEARCH_CHANGE:
      return { ...state, street_name: action.payload };
    default:
      return state;
  }
};
