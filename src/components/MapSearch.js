import React, { useState, useEffect } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { geoAPI, ontologyAPI } from "../api";

// const height = Dimensions.get("window").height;

// const isMarkerOverRegion = (marker, region) => {
//   const longBorder = Math.abs(region.longitude - marker.longitude);
//   const latiBorder = Math.abs(region.latitude - marker.latitude);

//   if (region.longitudeDelta < longBorder) return true;
//   if (region.latitudeDelta < latiBorder) return true;
//   return false;
// };

const MapSearch = ({ navigation }) => {
  const onDragEnd = (e) => {
    const coord = e.nativeEvent.coordinate;
    console.log(`cooord  ${coord.latitude}  ${coord.longitude}`);

    // logic trong dispatch . kiểm tra xem marker có nằm trong region ko . ( có thì update region)
    //cập nhâp marker 

  };


  return (
    <MapView style={styles.map} loadingEnabled={true} region={region}>
      <MapView.Marker
        draggable
        coordinate={marker}
        title={"Toạ độ hiện tại "}
        description={
          desc
            ? desc
            : `kinh độ (long): ${marker.longitude} Vĩ độ (Lati): ${marker.latitude} `
        }
        onDragEnd={onDragEnd}
      ></MapView.Marker>
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    height: height,
  },
  buttonBox: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
