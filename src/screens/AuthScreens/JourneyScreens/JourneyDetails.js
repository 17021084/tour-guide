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
import MapView, { Marker } from "react-native-maps";
import { connect } from "react-redux";
import { useState, useRef } from "react/cjs/react.development";
import ButtonIcon from "../../../components/common/ButtonIcon.js";
import { color, pointIcon } from "../../../config/appConfig.js";
import { PERSON_DETAIL_SCREEN } from "../../ScreenName.js";
import moment from "moment";

const width = Dimensions.get("window").width;

function JourneyDetails({ navigation, route }) {
  const { journey } = route.params;
  const { data } = journey;
  const pointList = data.pointList;
  const listPost = data.pointList.filter((post) => {
    if (post.downloadURL) {
      return post;
    }
  });

  const flatListRef = useRef();

  const Person = {
    thumbnail: "https://www.w3schools.com/w3css/img_lights.jpg",
    label: "label",
    termDescription: "abceasdfasdf",
  };
  const [region, setRegion] = useState({
    latitude: pointList[0].coords.latitude,
    longitude: pointList[0].coords.longitude,
    latitudeDelta: 0.008,
    longitudeDelta: 0.008,
  });

  const [growUp, setGrowUp] = useState(false);
  const growAni = useRef(new Animated.Value(100)).current;

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

  const renderItem = ({ item }) => (
    <View style={styles.pointCard}>
      <TouchableOpacity onPress={setGrow}>
        <Image style={styles.imagePoint} source={{ uri: item.downloadURL }} />
        <Text style={styles.postPoint}>{item.caption}</Text>
      </TouchableOpacity>
    </View>
  );
  const setCurrentRegion = () => {
    setRegion({
      latitude: 21.0281465,
      longitude: 105.7882117,
      latitudeDelta: 0.008,
      longitudeDelta: 0.008,
    });
  };
  return (
    <View style={styles.container}>
      <MapView region={region} style={styles.mapView}>
        {pointList.map((point) => {
          if (data.pointList.indexOf(point) > 0) {
            return (
              <TouchableOpacity>
                <MapView.Marker
                  coordinate={{
                    latitude: point.coords.latitude,
                    longitude: point.coords.longitude,
                  }}
                  image={
                    pointList.indexOf(point) == 1
                      ? pointIcon.start
                      : pointList.indexOf(point) == pointList.length - 1
                      ? pointIcon.current
                      : pointIcon.point
                  }
                />
              </TouchableOpacity>
            );
          }
        })}
      </MapView>

      <View style={styles.personDetail}>
        <View style={styles.streetName}>
          <Text style={styles.streetNameText}>
            Hành trình: {journey.data.journeyName}
          </Text>
          <Text style={styles.streetNameText}>Địa chỉ: Nguyễn Chí Thanh</Text>
          <Text style={styles.streetNameText}>
            Thời điểm:{moment(Date.now()).format("llll")}
          </Text>
        </View>
        <View>
          <ButtonIcon
            // style={}
            name={"location-history"}
            color={color.aqua}
            onPress={() => {
              // navigation.navigate(PERSON_DETAIL_SCREEN);
              flatListRef.current.scrollToIndex({ animated: true, index: 2 });
            }}
          />
          <ButtonIcon
            onPress={setCurrentRegion}
            name="not-listed-location"
            size={50}
            color={color.aqua}
          />
        </View>
      </View>
      <Animated.FlatList
        style={[
          styles.ScrollView,
          {
            height: growAni,
          },
        ]}
        horizontal={true}
        ref={(ref) => {
          flatListRef.current = ref;
        }}
        data={listPost}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      ></Animated.FlatList>
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
    textAlign: "left",
    marginTop: 20,
    padding: 10,
    flexWrap: "wrap",
  },
  ScrollView: {
    position: "absolute",
    bottom: 20,
  },
  personDetail: {
    paddingLeft: 10,
    position: "absolute",
    flexDirection: "row",
    // right: 0,
  },
  streetName: {
    flex: 1,
    height: 100,
    backgroundColor: "white",
    borderRadius: 30,
    padding: 20,
    // justifyContent: "center",
    // alignItems: "center",
  },
  streetNameText: {
    fontFamily: "open-sans-bold",
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop,
  };
};
export default connect()(JourneyDetails);
