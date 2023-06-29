//import liraries
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { AntDesign } from "react-native-vector-icons";

const { width, height } = Dimensions.get("screen");

// create a component
const Plus_Default = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <Image
        style={styles.banner}
        source={require("../../../Images/Plus.jpg")}
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
          What Do You Want To Post ?
        </Text>
        <View style={{ marginTop: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Post_NC")}
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
                Add New Candidates
              </Text>
              <AntDesign name="right" size={25} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Post_JD")}
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
                Add Job Descriptions
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
    marginTop: -40,
    backgroundColor: "#05375a",
    borderTopLeftRadius: 30,
    borderTopEndRadius: 30,
    height: "100%",
    padding: 20,
    paddingVertical: 50,
  },
});

//make this component available to the app
export default Plus_Default;
