import {
  BOOKMARK_CHANGE,
  BOOKMARK_FETCHED_CHANGE,
  USER_INFOR_CHANGE,
  USER_INFOR_FETCHED,
} from "../actions/type";
const initializeState = {
  bookmark: [],
  bookmarkFetched: false,
  userInfor: {},
  userInforFetched: false,
};

export default (state = initializeState, action) => {
  switch (action.type) {
    case BOOKMARK_CHANGE:
      return { ...state, bookmark: action.payload };
    case BOOKMARK_FETCHED_CHANGE:
      return { ...state, bookmarkFetched: true };
    case USER_INFOR_CHANGE:
      return { ...state, userInfor: action.payload };
    case USER_INFOR_FETCHED:
      return { ...state, userInforFetched: true };

    default:
      return state;
  }
};
