import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { FontAwesome } from "react-native-vector-icons";

export default function SplashScreen({ navigation }) {
  return (
    <View style={Styles.container}>
      <Image
        source={require("../../Images/bg2.jpg")}
        style={{
          position: "absolute",
          zIndex: 1,
          resizeMode: "cover",
          width: "100%",
          height: "100%",
        }}
      />

      <View style={Styles.header}></View>
      <Animatable.View style={Styles.footer} animation="fadeInUpBig">
        <Text style={Styles.title}>Future Is Here, Start Exploring Now.</Text>
        <Text style={Styles.text}>
          Aifetch automates candidate sourcing and outreach, giving you more
          bandwidth to focus on the human side of recruiting. That’s right.
          Ditch the databases for custom, curated batches of diverse, top
          talent.
        </Text>
        <Animatable.View
          style={Styles.button}
          animation="bounceInRight"
          duration={1500}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Sign_In")}
            style={Styles.textsign}
          >
            <FontAwesome
              name="angle-right"
              size={55}
              color="white"
            ></FontAwesome>
          </TouchableOpacity>
        </Animatable.View>
      </Animatable.View>
    </View>
  );
}

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    zIndex: 5,
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    zIndex: 5,
    backgroundColor: "#F4D35E",
    borderRadius: 30,
    borderTopRightRadius: 30,
    padding: 50,
    paddingBottom:80,
    margin: 20,
    marginBottom: 60,
  },
  logo: {
    width: height_logo - 80,
    height: height_logo - 80,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    color: "grey",
    marginTop: 10,
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    position: "absolute",
    bottom: "-11%",
    alignSelf: "center",
  },
  textsign: {
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2E4057",
    borderWidth: 7,
    borderColor: "white",
    width: 80,
    height: 80,
    borderRadius: 100,
  },
});
