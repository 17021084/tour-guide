import React from "react";
import { render } from "react-dom";
import { View, Text, StyleSheet, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import ButtonIcon from "../../components/common/ButtonIcon";
import ButtonBox from "../../components/common/ButtonBox";
import HoriLine from "../../components/common/HoriLine";
import { color } from "../../config/appConfig";
import { deleteFriendJourneys } from "../../redux/actions";
import { JOURNEY_DETAIL_SCREEN } from "../ScreenName";

function FriendJourney({ deleteFriendJourneys, navigation, friendJourneys }) {
  const renderItems = ({ item }) => {
    const { journey } = item.data;
    return (
      <View style={styles.journeyBox}>
        <View style={styles.contentBox}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>Hành trình: </Text>
            <Text style={styles.titleValue}> {journey.journeyName}</Text>
          </View>
          <View style={styles.titleBox}>
            <Text style={styles.title}>Chủ nhân: </Text>
            <Text style={styles.titleValue}>{item.data.ownerEmail}</Text>
          </View>
          <View style={styles.titleBox}>
            <Text style={styles.title}>Xuất phát ~ </Text>
            <Text style={styles.title}> Kết thúc :</Text>
          </View>
          <View style={styles.titleBox}>
            <Text style={styles.titleValue}>
              {" "}
              {journey.pointList[0].streetName}{" "}
            </Text>
            <Text style={styles.titleValue}>
              {" "}
              ~ {
                journey.pointList[journey.pointList.length - 1].streetName
              }{" "}
            </Text>
          </View>
        </View>
        <View style={styles.actionBox}>
          <View style={styles.buttonDetails}>
            <ButtonBox
              title={"Chi tiết"}
              onPress={() => {
                navigation.navigate(JOURNEY_DETAIL_SCREEN, {
                  journey: {
                    data: {
                      pointList: journey.pointList,
                    },
                  },
                });
              }}
            />
          </View>
          <ButtonIcon
            name={"restore-from-trash"}
            size={35}
            color={color.orange}
            onPress={() => createTwoButtonAlert(item.id)}
          />
        </View>
      </View>
    );
  };
  const createTwoButtonAlert = (id) => {
    Alert.alert("Xoá hành trình", "Bạn thức sự muốn xoá ", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteFriendJourneys(id) },
    ]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}> Hành trình được chia sẻ </Text>
      </View>
      <FlatList
        data={friendJourneys}
        renderItem={renderItems}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    friendJourneys: state.friendState.friendJourneys,
  };
};

export default connect(mapStateToProps, {
  deleteFriendJourneys,
})(FriendJourney);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "open-sans-bold",
  },
  headerBox: {
    paddingTop: 10,
    height: 50,
    alignItems: "center",
  },
  journeyBox: {
    borderTopColor: color.green,
    borderTopWidth: 1,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    height: 130,
  },
  contentBox: {
    flex: 1,
  },
  titleBox: {
    flexDirection: "row",
    marginVertical: 2,
    // justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 15,
  },
  titleValue: {
    fontFamily: "open-sans",
    fontSize: 15,
  },
  buttonDetails: {
    height: 73,
    padding: 0,
  },
});
