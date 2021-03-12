import * as firebase from "firebase";
import { BOOKMARK_CHANGE, BOOKMARK_LOADED_CHANGE } from "./type";

// fetch bookmar
export const fetchBookmark = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("bookmarks")
      .doc(firebase.auth().currentUser.uid)
      .collection("listBookmarks")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        dispatch(bookmarkChange(data));
        dispatch(bookmarkLoaded());
      });
  };
};

//bookmarkLoaded
export const bookmarkLoaded = () => {
  return {
    type: BOOKMARK_LOADED_CHANGE,
  };
};

export const deleteBookmark = (id) => {
  return (dispatch, getState) => {
    let newBookmarkList = getState().userState.bookmark.filter(
      (person) => person.meta.pageID !== id
    );
    dispatch(bookmarkChange(newBookmarkList));
  };
};
export const addBookmark = (person) => {
  return (dispatch, getState) => {
    let newBookmarkList = [...getState().userState.bookmark];
    newBookmarkList.push(person);
    dispatch(bookmarkChange(newBookmarkList));
  };
};
const bookmarkChange = (bookmarkList) => {
  return {
    type: BOOKMARK_CHANGE,
    payload: bookmarkList,
  };
};
