import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { CAMERA_SCREEN } from "../../ScreenName";

function JourneyTrack({ navigation }) {
  return (
    <View>
      <Text>journey track: ten hanh trinh  </Text>
      <Text>Trang thai:  bat dau , dang khoi hanh, tam dung,ket thuc  </Text>
      <Text>Trang thai:  start , going, stop,end . 3 cais button  </Text>
      
      <Text>Dia chi bat dau: </Text>
      <Text>Dia chi Hien tai: </Text>
      <Text>Button xem ong hien tai : </Text>


      <Button
        title={" Person Detail"}
        onPress={() => {
          navigation.navigate(CAMERA_SCREEN);
        }}
      />
      
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    prop: state.prop,
  };
}

export default connect()(JourneyTrack);

const styles = StyleSheet.create({});

// state. journey
//isTracking 
//journeyList. [  {id,journey:[{coord: {lat,long}, status , timestamp,post:{ image, posts}},....] , name:....}        ,.....]
