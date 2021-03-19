import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react/cjs/react.development";
import ontologyAPI from "../../api/ontologyApi";
import ontologySearchTypeAPI from "../../api/ontologySearchTypeAPI";
import ButtonBox from "../../components/common/ButtonBox";
import ListPerson from "../../components/ListPerson";

export default function Concern({ route }) {
  const { typeName } = route.params;
  const [loaded, setLoaded] = useState(false);
  const [typesData, setTypesData] = useState([]);
  const Navigation = useNavigation();

  const getData = async () => {
    let typeList = await ontologySearchTypeAPI(typeName);
    setTypesData(typeList);
    setLoaded(true);
  };

  useEffect(() => {
    (async () => getData())();
  }, []);

  if (!loaded) {
    return <ActivityIndicator style={styles.displayNoneData} size={40} />;
  }
  if (typesData.length == 0) {
    return (
      <Text style={styles.displayNoneData}> Không có thông tin hiển thị </Text>
    );
  }
  return (
    <View style={styles.container}>
      <View>
        <ListPerson listPerson={typesData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  displayNoneData: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "800",
  },
  typeList: {
    flex: 2,
  },
  buttonBox: {
    height: 80,
  },
});
