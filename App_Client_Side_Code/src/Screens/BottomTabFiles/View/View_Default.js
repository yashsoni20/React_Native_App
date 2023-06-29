//import liraries
import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
const { width, height } = Dimensions.get("screen");
import { AntDesign } from "react-native-vector-icons";
import AuthGlobal from "../../../Context/store/AuthGlobal";

// create a component
const View_Default = ({ navigation }) => {
  const context = useContext(AuthGlobal);
  const [logToken, setLogToken] = useState();
  const [tok, setValue] = useState("");

  return (
    <View style={styles.header}>
      <StatusBar backgroundColor="white" barStyle={"dark-content"} />
      <Image
        style={styles.banner}
        source={require("../../../Images/Looking.jpg")}
        resizeMode="contain"
      />
      <View style={styles.footer}>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 23,
            fontWeight: "800",
            color: "whitesmoke",
          }}
        >
          What Are You Looking For
        </Text>

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("V_Candidates")}
            style={{
              borderWidth: 1,
              borderColor: "white",
              padding: 20,
              paddingVertical: Platform.OS === "ios" ? 24 : 16,
              borderRadius: 10,
              marginVertical: 20,
              backgroundColor: "white",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 20, color: "#1c2b49", marginTop: 1 }}>
                View Candidates
              </Text>
              <AntDesign name="right" size={25} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("V_JD")}
            style={{
              borderWidth: 1,
              borderColor: "white",
              padding: 20,
              paddingVertical: Platform.OS === "ios" ? 24 : 16,
              borderRadius: 10,
              marginVertical: 20,
              backgroundColor: "white",
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 20, color: "#1c2b49", marginTop: 1 }}>
                View Job Descriptions
              </Text>
              <AntDesign name="right" size={25} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  header: {
    width: width,
    height: height * 0.5,
    backgroundColor: "white",
  },
  banner: {
    width: width + 270,
    height: "100%",
    marginTop: -30,
    alignSelf: "center",
  },
  footer: {
    marginTop: -30,
    backgroundColor: "#05375a",
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    padding: 20,
    paddingVertical: 50,
    height: "100%",
  },
});

//make this component available to the app
export default View_Default;
