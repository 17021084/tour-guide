import React, { useState, useEffect } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
// import * as Location from "expo-location";
// import axios from "axios";
import { connect } from "react-redux";
import {  searchStreet } from "../redux/actions";
const height = Dimensions.get("window").height;

const MapSearch = ({
  region,
  marker,
  streetName,
  searchStreet
}) => {
  const onDragEnd = async (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    console.log(`cooord  ${latitude}  ${longitude}`);
    let streetName = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    const address = {
      marker: { latitude, longitude },
      streetName: streetName[0].street,
    };
    searchStreet(address);

    // logic trong dispatch . kiểm tra xem marker có nằm trong region ko . ( có thì update region)
    //cập nhâp marker
  };
  return (
    <MapView style={styles.map} loadingEnabled={true} region={region}>
      <MapView.Marker
        draggable
        coordinate={marker}
        title={"Địa chỉ"}
        description={streetName}
        onDragS
        onDragEnd={onDragEnd}
      ></MapView.Marker>
    </MapView>
  );
};

const mapStateToProps = (state) => {
  return {
    region: state.searchState.region,
    marker: state.searchState.marker,
    streetName: state.searchState.streetName,
  };
};
export default connect(mapStateToProps, {
  searchStreet
})(MapSearch);

const styles = StyleSheet.create({
  map: {
    height: height,
  },
});
