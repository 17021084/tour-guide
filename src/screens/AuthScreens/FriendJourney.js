import React from "react";
import { render } from "react-dom";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { connect } from "react-redux";
import ButtonIcon from "../../components/common/ButtonIcon";
import ButtonBox from "../../components/common/ButtonBox";
import HoriLine from "../../components/common/HoriLine";
import { color } from "../../config/appConfig";

function FriendJourney() {
  const renderItems = () => {
    return (
      <View style={styles.journeyBox}>
        <View style={styles.contentBox}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>Hành trình: </Text>
            <Text style={styles.titleValue}>Con đừơng không tên </Text>
          </View>
          <View style={styles.titleBox}>
            <Text style={styles.title}>Chủ nhân: </Text>
            <Text style={styles.titleValue}>Con đừơng không tên </Text>
          </View>
          <View style={styles.titleBox}>
            <Text style={styles.title}>Xuất phát ~ </Text>
            <Text style={styles.title}> Kết thúc :</Text>
          </View>
          <View style={styles.titleBox}>
            <Text style={styles.titleValue}>Chủ nhân </Text>
            <Text style={styles.titleValue}> ~ Con đừơng không tên </Text>
          </View>
        </View>
        <View style={styles.actionBox}>
          <View style={styles.buttonDetails}>
            <ButtonBox
              title={"Chi tiết"}
              // onPress={() => {
              //   navigation.navigate(JOURNEY_DETAIL_SCREEN, { journey: item });
              // }}
            />
          </View>
          <ButtonIcon
            name={"restore-from-trash"}
            size={35}
            color={color.orange}
            // onPress={() => createTwoButtonAlert(item)}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.headerTitle}> Hành trình được chia sẻ  </Text>
      </View>
      {/* <FlatList data />
       */}
      {renderItems()}
      {renderItems()}
    </View>
  );
}

export default connect()(FriendJourney);

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
