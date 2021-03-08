import {
  MARKER_SEARCH_CHANGE,
  REGION_SEARCH_CHANGE,
  STREET_SEARCH_CHANGE,
} from "./type";

export const markerSearchChange = (marker) => {
  return (dispatch, getState) => {
    dispatch({
      payload: marker,
      type: MARKER_SEARCH_CHANGE,
    });
    // api cua geoxyz
  };
};

export const regionSearchChange = (region) => {
  return {
    payload: region,
    type: REGION_SEARCH_CHANGE,
  };
};
const streetSearchChange = (street) => {
  return {
    payload: street,
    type: STREET_SEARCH_CHANGE,
  };
};
