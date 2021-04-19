import UseReducer from "./UserReducers";
import { combineReducers } from "redux";
import MapSearchReducers from "./MapSearchReducers";
import TrackReducers from "./TrackReducers";
import FriendReducers from "./FriendReducers";

export default combineReducers({
  userState: UseReducer,
  searchState: MapSearchReducers,
  trackState: TrackReducers,
  friendState: FriendReducers,
});
