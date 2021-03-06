import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middlewares = applyMiddleware(ReduxThunk);
const store = createStore(rootReducer, initialState, middlewares);

export default store;
