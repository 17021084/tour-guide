import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet ,Image } from "react-native";
import { POST_SCREEN } from "../../ScreenName";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function AddPicture({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      setImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      console.log(result);
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera or gallery</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={(ref) => {
          setCamera(ref);
        }}
        style={styles.camera}
        type={type}
        ratio={"16:9"}
      ></Camera>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <MaterialCommunityIcons
            name="camera-retake-outline"
            size={50}
            color={"pink"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            takePicture();
          }}
        >
          <MaterialCommunityIcons
            name="checkbox-blank-circle-outline"
            size={100}
            color={"pink"}
          />
        </TouchableOpacity>
        {image && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate(POST_SCREEN, { image });
            }}
          >
            <MaterialCommunityIcons name="upload" size={30} color={"pink"} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            pickImage();
          }}
        >
          {(image && (
            <Image source={{ uri: image }} style={styles.previewPicture} />
          )) || (
            <MaterialCommunityIcons
              name="picture-in-picture-bottom-right"
              size={100}
              color={"pink"}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  // return (
  //   <View>
  //     <Text>Camera </Text>
  //     <Button
  //       title={"Post"}
  //       onPress={() => {
  //         navigation.navigate(POST_SCREEN);
  //       }}
  //     />
  //   </View>
  // );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  previewPicture: {
    height: 100,
    width: 100,
  },
});
