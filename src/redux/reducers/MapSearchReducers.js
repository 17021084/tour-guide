import { REGION_CHANGE } from "../actions/type";

const initializeState = {
  region: {
    latitude: 21.0281465,
    longitude: 105.7882117,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  },
  marker: {
    latitude: 21.0281465,
    longitude: 105.7882117,
  },
  street_name: "",
};

export default (state = initializeState, action) => {
  switch (action.type) {
    case REGION_CHANGE:
      return 
    case REGION_CHANGE:
      return 
    case REGION_CHANGE:
      return 
    default:
      break;
  }

  return {};
};
