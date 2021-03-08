import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import ButtonBox from "../../../components/common/ButtonBox";
import ButtonIcon from "../../../components/common/ButtonIcon";
import HoriLine from "../../../components/common/HoriLine";
import InputBox from "../../../components/common/InputBox";
import Logo from "../../../components/Logo";
import MapSearch from "../../../components/MapSearch";
import { PERSON_DETAIL_SCREEN } from "../../ScreenName";

import { regionSearchChange } from "../../../redux/actions";

import { color } from "../../../config/appConfig";

function Home({ navigation, regionSearchChange, region, marker }) {
  // const []
  // logic lay current state

  //map dispach va state tu redux

  const currentMarker = () => {
    const newRegion = {
      ...region,
      longitude: marker.longitude,
      latitude: marker.latitude,
    };
    regionSearchChange(newRegion);
  };

  return (
    <View>
      <MapSearch />
      <View style={styles.buttonBox}>
        <ButtonIcon name="my-location" size={50} color={color.aqua} />
        <ButtonIcon
          onPress={currentMarker}
          name="not-listed-location"
          size={50}
          color={color.aqua}
        />
        <ButtonIcon
          onPress={() => {
            navigation.navigate(PERSON_DETAIL_SCREEN);
          }}
          name="location-history"
          size={50}
          color={color.aqua}
        />
      </View>
    </View>
  );
}
// <Button
// title={" Person Detail"}
// onPress={() => {
//   navigation.navigate(PERSON_DETAIL_SCREEN);
// }}
// />

// <ButtonBox

// />

const styles = StyleSheet.create({
  container: {},

  buttonBox: {
    flexDirection: "row",
    position: "absolute",
    bottom: 100,
  },
});

const mapStateToProps = (state) => {
  return {
    region: state.searchState.region,
    marker: state.searchState.marker,
  };
};
export default connect(mapStateToProps, { regionSearchChange })(Home);
