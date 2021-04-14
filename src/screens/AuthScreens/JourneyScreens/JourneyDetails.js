import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";
import { connect } from "react-redux";
import { useState, useRef } from "react/cjs/react.development";
import ButtonIcon from "../../../components/common/ButtonIcon.js";
import { color, pointIcon } from "../../../config/appConfig.js";
import { PERSON_DETAIL_SCREEN } from "../../ScreenName.js";
import moment from "moment";
import MarkerTrack from "../../../components/MarkerTrack";
import filterStreetName from "../../../utils/filterStreetName";

const width = Dimensions.get("window").width;

const getStreetNameSet = (pointList) => {
  let streetNameSet = [];
  streetNameSet = pointList.map((point) => point.streetName);
  return Array.from(new Set(streetNameSet));
};

function JourneyDetails({ navigation, route }) {
  const { journey } = route.params;
  const { data } = journey;
  const pointList = data.pointList;
  const listPost = pointList.filter((post) => {
    if (post.downloadURL) {
      return post;
    }
  });
  const streetNameSet = getStreetNameSet(pointList);
  const [hightLight, setHightLight] = useState("");

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
  const growAni = useRef(new Animated.Value(0)).current;

  const setGrow = () => {
    if (growUp) {
      Animated.timing(growAni, {
        toValue: 400,
        duration: 1000,
      }).start();
      setGrowUp(!growUp);
    } else {
      Animated.timing(growAni, {
        toValue: 0,
        duration: 1000,
      }).start();
      setGrowUp(!growUp);
    }
  };
  const renderItem = ({ item }) => (
    <View style={styles.pointCard}>
      <TouchableOpacity
        onPress={() => {
          setCurrentRegionOfImage(item);
        }}
      >
        <Image style={styles.imagePoint} source={{ uri: item.downloadURL }} />
        <Text style={styles.postPoint}>{item.caption}</Text>
      </TouchableOpacity>
    </View>
  );

  const setCurrentRegionOfImage = (item) => {
    setRegion({
      latitude: item.coords.latitude,
      longitude: item.coords.longitude,
      latitudeDelta: 0.008,
      longitudeDelta: 0.008,
    });
    setHightLight(item.streetName)
  };

  const setCurrentRegion = () => {
    setRegion({
      latitude: pointList[0].coords.latitude,
      longitude: pointList[0].coords.longitude,
      latitudeDelta: 0.008,
      longitudeDelta: 0.008,
    });
  };

  const renderStreetName = ({ item }) => (
    <TouchableOpacity
      onPress={() => streetOnpress(item)}
      style={
        item === hightLight
          ? [styles.streetItem, { backgroundColor: color.green }]
          : styles.streetItem
      }
    >
      <Text style={styles.streetNameText}> {item} </Text>
    </TouchableOpacity>
  );

  const streetOnpress = (streetName) => {
    setHightLight(streetName);
    for (let i = 0; i < pointList.length; ++i) {
      if (pointList[i].streetName == streetName) {
        setRegion({
          latitude: pointList[i].coords.latitude,
          longitude: pointList[i].coords.longitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        });
        break;
      }
    }
  };

  const getPersonInfor = () => {
    if (hightLight) {
      const streetname = filterStreetName(hightLight);
      navigation.navigate(PERSON_DETAIL_SCREEN, { personName: streetname });
    }
  };

  return (
    <View style={styles.container}>
      <MapView region={region} style={styles.mapView}>
        {pointList.map((point, index) => {
          if (index >= 0) {
            return (
              <MarkerTrack
                point={point}
                indexOfPoint={index}
                journeyLength={pointList.length}
                hightlightName={hightLight}
              />
            );
          }
        })}
      </MapView>

      <View style={styles.personDetail}>
        <View style={styles.streetName}>
          <Text style={styles.title}>
            Hành trình: {journey.data.journeyName}
          </Text>
          <Text style={styles.title}>
            Bắt đầu: {pointList[0].streetName} -{" "}
            {moment(pointList[0].timestamp).format("hh:mm DD/MM")}{" "}
          </Text>
          <Text style={styles.title}>
            Kết thúc: {pointList[pointList.length - 1].streetName} -{" "}
            {moment(pointList[pointList.length - 1].timestamp).format(
              "hh:mm DD/MM"
            )}
          </Text>
          <Text style={styles.streetNameText}>
            {/* Thời điểm:{moment(Date.now()).format("llll")} */}
          </Text>
        </View>
      </View>
      <View style={styles.streetNameCarousel}>
        <FlatList
          style={{ width: "100%" }}
          horizontal={true}
          data={streetNameSet}
          keyExtractor={(item) => streetNameSet.indexOf("item")}
          renderItem={renderStreetName}
        />
      </View>

      <View style={styles.ScrollView}>
        <View style={styles.buttonBox}>
          <ButtonIcon
            // style={}
            name={"location-history"}
            color={color.aqua}
            onPress={getPersonInfor}
          />
          <ButtonIcon
            onPress={setCurrentRegion}
            name="not-listed-location"
            size={50}
            color={color.aqua}
          />
          {growUp ? (
            <ButtonIcon
              onPress={setGrow}
              name="arrow-upward"
              size={50}
              color={color.aqua}
            />
          ) : (
            <ButtonIcon
              onPress={setGrow}
              name="arrow-downward"
              size={50}
              color={color.aqua}
            />
          )}
        </View>
        <Animated.View
          style={[
            {
              height: growAni,
            },
          ]}
        >
          <FlatList
            horizontal={true}
            ref={(ref) => {
              flatListRef.current = ref;
            }}
            data={listPost}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </Animated.View>
      </View>
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
    height: 125,
    backgroundColor: "white",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    // justifyContent: "center",
    // alignItems: "center",
  },
  buttonBox: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "row",
  },
  streetNameText: {
    fontFamily: "open-sans-bold",
    fontSize: 17,
  },
  streetNameCarousel: {
    position: "absolute",
    top: 150,
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  streetItem: {
    backgroundColor: "white",
    marginHorizontal: 10,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 30,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop,
  };
};
export default connect()(JourneyDetails);
