import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import ButtonIcon from "../../../components/common/ButtonIcon";
import * as Location from "expo-location";
import MapSearch from "../../../components/MapSearch";
import { PERSON_DETAIL_SCREEN } from "../../ScreenName";
import { regionSearchChange, searchStreet } from "../../../redux/actions";

import { color } from "../../../config/appConfig";
import { fetchUserInfor } from "../../../redux/actions/UserAction";
function Home({
  navigation,
  regionSearchChange,
  region,
  marker,
  person,
  streetName,
  searchStreet,
  userInfor,
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
      <View style={styles.nameBox}>
        <Text style={styles.address}> Xin chào:{userInfor.name} </Text>
      </View>
      <View style={styles.box}>
        <View style={styles.buttonBox}>
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
            onPress={fetchUserInfor}
            name="my-location"
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, position: "relative" },
  nameBox: {
    position: "absolute",
    // backgroundColor: "white",
    borderRadius: 30,
    top: 50,
    padding: 10,
    width: "100%",
    margin: "auto",
  },
  box: {
    position: "absolute",
    bottom: 80,
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    alignItems: "flex-end",
  },
  buttonBox: {
    marginLeft: 20,
    flexDirection: "row-reverse",
  },
  address: {
    textAlign: "center",
    fontWeight: "800",
    fontFamily: "open-sans",
    fontSize: 20,
  },
  addressBox: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    region: state.searchState.region,
    marker: state.searchState.marker,
    person: state.searchState.person,
    streetName: state.searchState.streetName,
    userInfor: state.userState.userInfor,
  };
};

export default connect(mapStateToProps, {
  regionSearchChange,
  searchStreet,
})(Home);
