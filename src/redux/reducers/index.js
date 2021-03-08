import UseReducer from "./UserReducers";
import { combineReducers } from "redux";
import MapSearchReducers from "./MapSearchReducers";

export default combineReducers({
  userState: UseReducer,
  searchState: MapSearchReducers,
});
