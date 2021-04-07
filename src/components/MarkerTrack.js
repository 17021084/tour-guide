import React, { useState } from "react";
import { useEffect } from "react";
import { View, Text } from "react-native";
import { Marker } from "react-native-maps";
import { pointIcon } from "../config/appConfig";

export default function MarkerTrack({
  point,
  indexOfPoint,
  journeyLength,
  hightlightName,
}) {
  const [icon, setIcon] = useState();

  useEffect(() => {
    if (indexOfPoint == 0) {
      setIcon(pointIcon.start);
      return;
    }
    if (indexOfPoint == journeyLength - 1) {
      setIcon(pointIcon.current);
      return;
    }
    if (hightlightName == point.streetName) {
      setIcon(pointIcon.hightlight);
      return;
    }
    setIcon(pointIcon.point);
  }, [hightlightName]);
  return (
    <Marker
      coordinate={{
        latitude: point.coords.latitude,
        longitude: point.coords.longitude,
      }}
      image={icon}
    ></Marker>
  );
}
