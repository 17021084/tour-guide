import UseReducer from "./UserReducers";
import { combineReducers } from "redux";
import MapSearchReducers from "./MapSearchReducers";
import TrackReducers from "./TrackReducers";

export default combineReducers({
  userState: UseReducer,
  searchState: MapSearchReducers,
  trackState: TrackReducers
});
