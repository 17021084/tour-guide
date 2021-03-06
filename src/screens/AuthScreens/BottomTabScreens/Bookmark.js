import firebase from "firebase";
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import BookmarkCard from "../../../components/BookmarkCard";
import ButtonBox from "../../../components/common/ButtonBox";
import ListPerson from "../../../components/ListPerson";
import { logOut } from "../../../redux/actions";
import { PERSON_DETAIL_SCREEN } from "../../ScreenName";

function Bookmark({ bookmarkList, navigation, logOut }) {
  return (
    <View style={styles.container}>
      <View style={styles.bookmarkList}>
        <ListPerson listPerson={bookmarkList} hadPerson={true} />
      </View>

      <View style={styles.buttonBox}>
        <ButtonBox title="Đăng xuất" onPress={logOut} />
      </View>
    </View>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    bookmarkList: state.userState.bookmark,
  };
};
export default connect(mapStateToProps, { logOut })(Bookmark);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  bookmarkList: {
    flex: 2,
  },
  buttonBox: {
    height: 75,
  },
});
