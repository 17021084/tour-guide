import {
  REGION_SEARCH_CHANGE,
  MARKER_SEARCH_CHANGE,
  STREET_SEARCH_CHANGE,
  PERSON_SEARCH_CHANGE,
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
  streetName: "",
  person: null,
};

export default (state = initializeState, action) => {
  switch (action.type) {
    case REGION_SEARCH_CHANGE:
      return { ...state, region: action.payload };
    case MARKER_SEARCH_CHANGE:
      return { ...state, streetName: "", person: null, marker: action.payload };
    case STREET_SEARCH_CHANGE:
      return { ...state, streetName: action.payload };
    case PERSON_SEARCH_CHANGE:
      return { ...state, person: action.payload };
    default:
      return state;
  }
};
