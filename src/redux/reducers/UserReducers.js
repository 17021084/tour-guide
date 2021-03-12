import { BOOKMARK_CHANGE, BOOKMARK_LOADED_CHANGE } from "../actions/type";
const initializeState = {
  bookmark: [],
  bookmarkLoaded: false,
};

export default (state = initializeState, action) => {
  switch (action.type) {
    case BOOKMARK_CHANGE:
      return { ...state, bookmark: action.payload };
    case BOOKMARK_LOADED_CHANGE:
      return { ...state, bookmarkLoaded: true };
    default:
      return state;
  }
};
