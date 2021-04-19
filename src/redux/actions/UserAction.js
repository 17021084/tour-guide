import * as firebase from "firebase";
import {
  BOOKMARK_CHANGE,
  BOOKMARK_FETCHED_CHANGE,
  USER_INFOR_CHANGE,
  USER_INFOR_FETCHED,
} from "./type";

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
        dispatch(bookmarkFetched());
      });
  };
};

//bookmarkFetched
export const bookmarkFetched = () => {
  return {
    type: BOOKMARK_FETCHED_CHANGE,
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

export const fetchUserInfor = () => {
  return (dispatch) => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        dispatch(userInforChange(snapshot.data()));
        dispatch({
          type: USER_INFOR_FETCHED,
        });
      })
      .catch((error) => console.log(error));
  };
};

const userInforChange = (userInfor) => {
  return {
    type: USER_INFOR_CHANGE,
    payload: userInfor,
  };
};

export const logOut = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(userInforChange({}));
      })
      .catch((error) => console.log(error));
  };
};
