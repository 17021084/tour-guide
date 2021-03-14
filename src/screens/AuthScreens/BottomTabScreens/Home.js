import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import ButtonBox from "../../../components/common/ButtonBox";
import ButtonIcon from "../../../components/common/ButtonIcon";
import HoriLine from "../../../components/common/HoriLine";
import InputBox from "../../../components/common/InputBox";
import * as Location from "expo-location";
import MapSearch from "../../../components/MapSearch";
import { PERSON_DETAIL_SCREEN } from "../../ScreenName";
import { regionSearchChange, markerSearchChange } from "../../../redux/actions";

import { color } from "../../../config/appConfig";
import geoAPI from "../../../api/geoApi";
import { fetchBookmark } from "../../../redux/actions/UserAction";
import * as firebase from "firebase";
function Home({
  navigation,
  regionSearchChange,
  markerSearchChange,
  region,
  marker,
  person,
  streetName,
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

  const reverseGeoCode = async()=>{
      let address = await Location.reverseGeocodeAsync(marker);
    console.log(address);
  }


  const currentMarker = () => {
    const newRegion = {
      ...region,
      longitude: marker.longitude,
      latitude: marker.latitude,
    };
    regionSearchChange(newRegion);
  };

  // const getAddress = async () => {
  //   const data = await geoAPI(marker);
  //   console.log(data);
  // };

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
          onPress={reverseGeoCode}
          name="my-location"
          size={50}
          color={color.green}
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
    person: state.searchState.person,
    streetName: state.searchState.streetName,
  };
};
export default connect(mapStateToProps, {
  markerSearchChange,
  regionSearchChange,
})(Home);
