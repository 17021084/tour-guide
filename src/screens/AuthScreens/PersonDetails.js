import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { useEffect, useState } from "react/cjs/react.development";
import ButtonBox from "../../components/common/ButtonIcon";
import HoriLine from "../../components/common/HoriLine";
import ViewMoreText from "react-native-view-more-text";
import { color } from "../../config/appConfig";
import * as firebase from "firebase";
import { addBookmark, deleteBookmark } from "../../redux/actions/UserAction";

function PersonDetails({ person, deleteBookmark, bookmarkList, addBookmark }) {
  const [isBooked, setIsBooked] = useState();
  useEffect(() => {
    let exsist = false;
    for (let i = 0; i < bookmarkList.length; ++i) {
      if (bookmarkList[i].meta.pageID == person.meta.pageID) {
        exsist = true;
        break;
      }
    }
    if (exsist) {
      setIsBooked(true);
    } else {
      setIsBooked(false);
    }
  }, [bookmarkList]);

  const onBookmark = () => {
    firebase
      .firestore()
      .collection("bookmarks")
      .doc(firebase.auth().currentUser.uid)
      .collection("listBookmarks")
      .doc(person.meta.pageID)
      .set(person)
      .then(() => {
        addBookmark(person);
      });
  };
  const onUnBookmark = () => {
    firebase
      .firestore()
      .collection("bookmarks")
      .doc(firebase.auth().currentUser.uid)
      .collection("listBookmarks")
      .doc(person.meta.pageID)
      .delete()
      .then(() => {
        deleteBookmark(person.meta.pageID);
      });
  };

  const renderViewMore = (onPress) => {
    return <Text onPress={onPress}>View more</Text>;
  };
  const renderViewLess = (onPress) => {
    return <Text onPress={onPress}>View less</Text>;
  };

  const renderInforBoxObject = () => {
    let infoObj = person.infobox;
    return (
      <View>
        {Object.entries(infoObj).map((key, value) => (
          <Text>
            {" "}
            {key} : {value}{" "}
          </Text>
        ))}
      </View>
    );
  };

  if (person == null) {
    return <Text> Ko có thông tin </Text>;
  }
  if (person) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.image}
            source={{
              uri:
                person.thumbnail ||
                "https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-valid-user-icon-png-image_3989945.jpg",
            }}
          />
          <View style={styles.intro}>
            <Text style={styles.personName}> {person.label} </Text>
            <Text style={styles.shortDescrpition}>
              {person.termDescription}
            </Text>
          </View>
        </View>
        <View style={styles.bookmark}>
          {isBooked ? (
            <ButtonBox
              name="bookmark"
              color={color.aqua}
              onPress={onUnBookmark}
            />
          ) : (
            <ButtonBox
              name="bookmark-outline"
              color={color.aqua}
              onPress={onBookmark}
            />
          )}
        </View>

        <HoriLine />
        <View style={styles.openText}>
          <Text style={styles.title}>Thông Tin chi tiết: </Text>
          <ViewMoreText
            style={styles.details}
            numberOfLines={10}
            renderViewMore={renderViewMore}
            renderViewLess={renderViewLess}
            textStyle={{ textAlign: "left" }}
          >
            <Text style={styles.details}>{person.openingText}</Text>
          </ViewMoreText>
        </View>
        <HoriLine />

        <View>
          <Text style={styles.title}>Các chức danh: </Text>
          {person.types.map((infor) => (
            <Text>* {infor}</Text>
          ))}
        </View>

        {
          //renderInforBoxObject()
        }
      </ScrollView>
    );
  }
}

// <ButtonBox name="bookmark-outline" />

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  bookmark: {
    position: "absolute",
    height: 55,
    right: 10,
    top: -20,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    marginVertical: 5,
  },
  personName: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
  },
  intro: {
    flex: 4,
    margin: 10,
  },
  shortDescrpition: {
    fontFamily: "open-sans",
    fontSize: 16,
    paddingVertical: 3,
  },
  image: {
    flex: 2,
    height: 130,
    width: 100,
    borderRadius: 30,
  },
  openText: {
    marginVertical: 20,
  },
  details: {
    marginVertical: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    person: state.searchState.person,
    bookmarkList: state.userState.bookmark,
  };
};

export default connect(mapStateToProps, { deleteBookmark, addBookmark })(
  PersonDetails
);
