import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { PERSON_DETAIL_SCREEN } from "../screens/ScreenName";
import BookmarkCard from "./BookmarkCard";
import { useNavigation } from "@react-navigation/native";

export default function ListPerson({ listPerson, hadPerson  }) {
  const navigation = useNavigation();
  const renderBookmardCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          hadPerson
            ? navigation.navigate(PERSON_DETAIL_SCREEN, {
                person: item,
              })
            : navigation.navigate(PERSON_DETAIL_SCREEN, {
                personName: item.label,
              });
        }}
        // disabled={Object.keys(item.meta) == 0 ? true : false}
      >
        <BookmarkCard person={item} />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={listPerson}
      renderItem={renderBookmardCard}
      keyExtractor={(item) => item.meta.pageID}
    />
  );
}
const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
