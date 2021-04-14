import {
  REGION_SEARCH_CHANGE,
  MARKER_SEARCH_CHANGE,
  STREET_SEARCH_CHANGE,
  PERSON_SEARCH_CHANGE,
} from "../actions/type";

const initializeState = {
  region: {
    latitude: 21.036749800350023,
    longitude: 105.78271411780531,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  },
  marker: {
    latitude: 21.036749800350023,
    longitude: 105.78271411780531,
  },
  streetName: "",
  person: "",
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
