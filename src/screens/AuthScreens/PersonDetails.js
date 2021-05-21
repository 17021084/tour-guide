import React from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { useEffect, useState } from "react/cjs/react.development";
import ButtonBox from "../../components/common/ButtonIcon";
import HoriLine from "../../components/common/HoriLine";
import ViewMoreText from "react-native-view-more-text";
import { color } from "../../config/appConfig";
import * as firebase from "firebase";
import { addBookmark, deleteBookmark } from "../../redux/actions/UserAction";
import { CONCERN_SCREEN } from "../ScreenName";
import ontologyAPI from "../../api/ontologyApi";
function PersonDetails({
  route,
  deleteBookmark,
  bookmarkList,
  addBookmark,
  navigation,
}) {
  const [isBooked, setIsBooked] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const { person, personName } = route.params;
  const [displayPerson, setDisplayPerson] = useState(null);
  useEffect(() => {
    const getPerson = async () => {
      if (personName) {
        // fetch person by name
        try {
          const personAPI = await ontologyAPI(personName);
          setDisplayPerson(personAPI.data[0]);
          setIsLoaded(true)
        } catch (error) {
          console.log("error when fetch person by name");
          setDisplayPerson(null);
          setIsLoaded(true)
        }
      } else {
        //already had this person, just display
        setDisplayPerson(person);
        setIsLoaded(true);
      }
    };
    getPerson();
  }, [personName]);

  //check bookmark
  useEffect(() => {
    if (displayPerson) {
      let exsist = false;
      for (let i = 0; i < bookmarkList.length; ++i) {
        if (bookmarkList[i].meta.pageID == displayPerson.meta.pageID) {
          exsist = true;
          break;
        }
      }
      if (exsist) {
        setIsBooked(true);
      } else {
        setIsBooked(false);
      }
    }
  }, [bookmarkList, displayPerson]);

  const onBookmark = () => {
    firebase
      .firestore()
      .collection("bookmarks")
      .doc(firebase.auth().currentUser.uid)
      .collection("listBookmarks")
      .doc(displayPerson.meta.pageID)
      .set(displayPerson)
      .then(() => {
        addBookmark(displayPerson);
      });
  };
  const onUnBookmark = () => {
    firebase
      .firestore()
      .collection("bookmarks")
      .doc(firebase.auth().currentUser.uid)
      .collection("listBookmarks")
      .doc(displayPerson.meta.pageID)
      .delete()
      .then(() => {
        deleteBookmark(displayPerson.meta.pageID);
      });
  };

  const renderViewMore = (onPress) => {
    return (
      <Text style={styles.viewMoreLess} onPress={onPress}>
        Xem Thêm
      </Text>
    );
  };
  const renderViewLess = (onPress) => {
    return (
      <Text style={styles.viewMoreLess} onPress={onPress}>
        Thu gọn{" "}
      </Text>
    );
  };

  const renderInforBoxObject = () => {
    let infoObj = displayPerson.infobox;
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

  const searchConcern = (typeName) => {
    navigation.navigate(CONCERN_SCREEN, { typeName });
  };

  if (!isLoaded) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator size="large" color={color.aqua} />
      </View>
    );
  }
  if (displayPerson == null) {
    return (
      <View
      style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
    >
      <Text style={{alignSelf:'center'}}>
        Không có thông tin hiển thị
      </Text>
    </View>
    );
  }
  if (displayPerson) {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Image
              style={styles.image}
              source={
                displayPerson.thumbnail
                  ? {
                      uri: displayPerson.thumbnail,
                    }
                  : require("../../../assets/noImage.png")
              }
            />
            <View style={styles.intro}>
              <Text style={styles.personName}> {displayPerson.label} </Text>
              <Text style={styles.shortDescrpition}>
                {displayPerson.termDescription}
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
              <Text style={styles.details}>{displayPerson.openingText}</Text>
            </ViewMoreText>
          </View>
          <HoriLine />

          <View>
            <Text style={styles.title}>Các thông tin liên quan: </Text>
            {displayPerson.types.map((typeName, idx) => (
              <TouchableOpacity
              key={idx}
                onPress={() => searchConcern(typeName)}
                style={styles.textTypes}
              >
                <Text>* {typeName}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {
            // renderInforBoxObject()
          }
        </ScrollView>
      </View>
    );
  }
}

// <ButtonBox name="bookmark-outline" />

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 15,
    paddingBottom: 40,
  },
  bookmark: {
    position: "absolute",
    height: 55,
    right: 0,
    top: 0,
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
    fontFamily: "open-sans",
  },
  details: {
    marginVertical: 10,
  },
  textTypes: {
    marginVertical: 2,
  },
  viewMoreLess: {
    fontSize: 20,
    paddingTop: 3,
    fontFamily: "open-sans",
  },
});

const mapStateToProps = (state) => {
  return {
    bookmarkList: state.userState.bookmark,
  };
};

export default connect(mapStateToProps, { deleteBookmark, addBookmark })(
  PersonDetails
);
