import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import BookmarkCard from "../../../components/BookmarkCard";
import { PERSON_DETAIL_SCREEN } from "../../ScreenName";

function Bookmark({ bookmarkList, navigation }) {
  const renderBookmardCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate(PERSON_DETAIL_SCREEN, { person: item });
      }}
    >
      <BookmarkCard person={item} />
    </TouchableOpacity>
  );
  return (
    <View>
      <Button title={" Person Detail"} />
      <FlatList
        data={bookmarkList}
        renderItem={renderBookmardCard}
        keyExtractor={(item) => item.meta.pageID}
      />
    </View>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    bookmarkList: state.userState.bookmark,
  };
};
export default connect(mapStateToProps)(Bookmark);

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
