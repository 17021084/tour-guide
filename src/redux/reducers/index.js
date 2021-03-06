import UseReducer from "./UserReducers";
import { combineReducers } from "redux";

export default combineReducers({
  userState: UseReducer,
});
