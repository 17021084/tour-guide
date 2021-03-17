import geoAPI from "../../api/geoApi";
import ontologyApi from "../../api/ontologyApi";
import filterStreetName from "../../utils/filterStreetName";
import { updateRegion } from "../../utils/updateRegion";
import {
  MARKER_SEARCH_CHANGE,
  PERSON_SEARCH_CHANGE,
  REGION_SEARCH_CHANGE,
  STREET_SEARCH_CHANGE,
} from "./type";

export const searchStreet = (address) => {
  return async (dispatch, getState) => {
    const { marker, streetName } = address;
    dispatch(markerSearchChange(marker));
    dispatch(streetSearchChange(streetName));
    // bug do chua tinh toan dc dental l
    // const newRegion = updateRegion(marker, getState().searchState.region);
    // if (newRegion) {
    //   dispatch(regionSearchChange(newRegion));
    // }
    const newRegion = {
      ...getState().searchState.region,
      longitude: marker.longitude,
      latitude: marker.latitude,
    };
    dispatch(regionSearchChange(newRegion));

    try {
      let streetname = filterStreetName(streetName);
      console.log(streetname)
      const person = await ontologyApi(streetname);
      if (!person) {
        dispatch(personSearchChange(null));
        return;
      }
      dispatch(personSearchChange(person.data[0]));
    } catch (error) {
      console.log(error);
    }
  };
};

export const markerSearchChange = (marker) => {
  return {
    payload: marker,
    type: MARKER_SEARCH_CHANGE,
  };
};

export const regionSearchChange = (region) => {
  return {
    payload: region,
    type: REGION_SEARCH_CHANGE,
  };
};
export const streetSearchChange = (street) => {
  return {
    payload: street,
    type: STREET_SEARCH_CHANGE,
  };
};
const personSearchChange = (person) => {
  return {
    payload: person,
    type: PERSON_SEARCH_CHANGE,
  };
};
