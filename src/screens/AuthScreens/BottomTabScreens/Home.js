import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import ButtonBox from "../../../components/common/ButtonBox";
import ButtonIcon from "../../../components/common/ButtonIcon";
import HoriLine from "../../../components/common/HoriLine";
import InputBox from "../../../components/common/InputBox";
import Logo from "../../../components/Logo";
import * as Location from "expo-location";
import MapSearch from "../../../components/MapSearch";
import { PERSON_DETAIL_SCREEN } from "../../ScreenName";
import { regionSearchChange, markerSearchChange } from "../../../redux/actions";

import { color } from "../../../config/appConfig";

function Home({
  navigation,
  regionSearchChange,
  markerSearchChange,
  region,
  marker,
}) {
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const setMarkerToCurrentLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    let { latitude, longitude } = location.coords;
    markerSearchChange({ latitude, longitude });
  };

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
        <ButtonIcon
          onPress={() => {
            navigation.navigate(PERSON_DETAIL_SCREEN);
          }}
          name="location-history"
          size={50}
          color={color.aqua}
        />
        <ButtonIcon
          onPress={setMarkerToCurrentLocation}
          name="my-location"
          size={50}
          color={color.aqua}
        />
        <ButtonIcon
          onPress={currentMarker}
          name="not-listed-location"
          size={50}
          color={color.aqua}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  buttonBox: {
    position: "absolute",
    bottom: 80,
  },
});

const mapStateToProps = (state) => {
  return {
    region: state.searchState.region,
    marker: state.searchState.marker,
  };
};
export default connect(mapStateToProps, {
  markerSearchChange,
  regionSearchChange,
})(Home);
