import React, { useState, useEffect } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
// import * as Location from "expo-location";
// import axios from "axios";
import { connect } from "react-redux";
import { markerSearchChange } from "../redux/actions";
const height = Dimensions.get("window").height;

const MapSearch = ({ region, marker, markerSearchChange }) => {
  const onDragEnd = (e) => {
    const coord = e.nativeEvent.coordinate;
    console.log(`cooord  ${coord.latitude}  ${coord.longitude}`);
    markerSearchChange(coord);
    // logic trong dispatch . kiểm tra xem marker có nằm trong region ko . ( có thì update region)
    //cập nhâp marker
  };

  return (
    <MapView style={styles.map} loadingEnabled={true} region={region}>
      <MapView.Marker
        draggable
        coordinate={marker}
        title={"Toạ độ hiện tại "}
        description={`kinh độ (long): ${marker.longitude} Vĩ độ (Lati): ${marker.latitude} `}
        onDragEnd={onDragEnd}
      ></MapView.Marker>
    </MapView>
  );
};

const mapStateToProps = (state) => {
  return {
    region: state.searchState.region,
    marker: state.searchState.marker,
  };
};
export default connect(mapStateToProps, { markerSearchChange })(MapSearch);

const styles = StyleSheet.create({
  map: {
    height: height,
  },
});
