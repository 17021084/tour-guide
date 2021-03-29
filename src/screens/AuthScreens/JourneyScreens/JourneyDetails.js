import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import { useState, useRef } from "react/cjs/react.development";
import ButtonIcon from "../../../components/common/ButtonIcon.js";
import { color } from "../../../config/appConfig.js";
import { PERSON_DETAIL_SCREEN } from "../../ScreenName.js";

const width = Dimensions.get("window").width;

function JourneyDetails({ navigation }) {
  const Person = {
    thumbnail: "https://www.w3schools.com/w3css/img_lights.jpg",
    label: "label",
    termDescription: "abceasdfasdf",
  };
  const region = {
    latitude: 21.0281465,
    longitude: 105.7882117,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  };

  const [growUp, setGrowUp] = useState(false);
  const growAni = useRef(new Animated.Value(100)).current;

  // const fadeIn = () => {
  //   // Will change fadeAnim value to 1 in 5 seconds
  // };

  // const fadeOut = () => {
  //   // Will change fadeAnim value to 0 in 5 seconds
  //   Animated.timing(growAni, {
  //     toValue: 100,
  //     duration: 5000,
  //   }).start();
  // };

  const setGrow = () => {
    if (growUp) {
      Animated.timing(growAni, {
        toValue: 500,
        duration: 1000,
      }).start();
      setGrowUp(!growUp);
    } else {
      Animated.timing(growAni, {
        toValue: 100,
        duration: 1000,
      }).start();
      setGrowUp(!growUp);
    }
  };

  return (
    <View style={styles.container}>
      <MapView region={region} style={styles.mapView}></MapView>

      <View style={styles.personDetail}>
        <ButtonIcon
          name={"location-history"}
          color={color.aqua}
          onPress={() => {
            // navigation.navigate(PERSON_DETAIL_SCREEN);
          }}
        />
      </View>
      <Animated.ScrollView
        style={[
          styles.ScrollView,
          {
            height: growAni,
          },
        ]}
        horizontal={true}
        // ref={(ref)=>{
        //   ref.
        // }}
      >
        <View style={styles.pointCard}>
          <TouchableOpacity onPress={setGrow}>
            <Image
              style={styles.imagePoint}
              source={{ uri: "https://www.w3schools.com/w3css/img_lights.jpg" }}
            />
            <Text style={styles.postPoint}>
              https://www.w3schools.com/w3css/img_lights.jpg
              https://www.w3schools.com/w3css/img_lights.jpg
              https://www.w3schools.com/w3css/img_lights.jpg
              https://www.w3schools.com/w3css/img_lights.jpg
              https://www.w3schools.com/w3css/img_lights.jpg
              https://www.w3schools.com/w3css/img_lights.jpg
            </Text>
          </TouchableOpacity>
        </View>
        {/* ======================== */}

        <View style={styles.pointCard}>
          <TouchableOpacity>
            <Image
              style={styles.imagePoint}
              source={{ uri: "https://www.w3schools.com/w3css/img_lights.jpg" }}
            />
            <Text style={styles.postPoint}>
              https://www.w3schools.com/w3css/img_lights.jpg{" "}
            </Text>
          </TouchableOpacity>
        </View>
        {/* ======================== */}

        <View style={styles.pointCard}>
          <TouchableOpacity>
            <Image
              style={styles.imagePoint}
              source={{ uri: "https://www.w3schools.com/w3css/img_lights.jpg" }}
            />
            <Text style={styles.postPoint}>
              https://www.w3schools.com/w3css/img_lights.jpg{" "}
            </Text>
          </TouchableOpacity>
        </View>
        {/* ======================== */}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  title: {
    fontSize: 17,
    fontFamily: "open-sans",
    paddingVertical: 3,
  },
  mapView: {
    flex: 1,
    // height: 300,
    // width:300,
  },
  pointCard: {
    height: 500,
    width: 300,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 30,
    marginHorizontal: 20,
    borderColor: "white",
  },
  imagePoint: {
    alignSelf: "center",
    height: 300,
    width: 300,
    borderRadius: 30,
  },
  postPoint: {
    alignSelf: "center",
    marginTop: 20,
    flexWrap: "wrap",
  },
  ScrollView: {
    position: "absolute",
    bottom: 20,
  },
  personDetail:{
    position:'absolute',
    right:0
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop,
  };
};
export default connect()(JourneyDetails);
