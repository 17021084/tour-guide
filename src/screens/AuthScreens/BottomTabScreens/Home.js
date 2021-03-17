import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import ButtonIcon from "../../../components/common/ButtonIcon";
import * as Location from "expo-location";
import MapSearch from "../../../components/MapSearch";
import { PERSON_DETAIL_SCREEN } from "../../ScreenName";
import { regionSearchChange, searchStreet } from "../../../redux/actions";

import { color } from "../../../config/appConfig";
function Home({
  navigation,
  regionSearchChange,
  region,
  marker,
  person,
  streetName,
  searchStreet,
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
    let streetName = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    const address = {
      marker: { latitude, longitude },
      streetName: streetName[0].street,
    };
    searchStreet(address);
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
        <Text> {streetName} </Text>
        {person ? (
          <ButtonIcon
            onPress={() => {
              navigation.navigate(PERSON_DETAIL_SCREEN, { person });
            }}
            // onPress={getAddress}
            name="location-history"
            size={50}
            color={color.aqua}
          />
        ) : null}
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
    person: state.searchState.person,
    streetName: state.searchState.streetName,
  };
};
export default connect(mapStateToProps, {
  regionSearchChange,
  searchStreet,
})(Home);
