import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "react-native-vector-icons";
import axios from "axios";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from "react-native";
import { openBrowserAsync } from "expo-web-browser";
import base_url from "../../../../URL/base_URL";
const NcSingleProfile = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [Status, setStatus] = useState(1);

  const S_status = 1;
  const R_status = 2;
  const Selected = () => {
    let Status = {
      Status: S_status,
    };
    axios
      .put(
        `${base_url}NewCandidates/status/${item._id}`,
        Status
      )
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Selected",
          });
          setTimeout(() => {
            props.navigation.navigate("V_Candidates");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  const Rejected = () => {
    let Status = {
      Status: R_status,
    };
    axios
      .put(
        `${base_url}NewCandidates/status/${item._id}`,
        Status
      )
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Rejected",
          });
          setTimeout(() => {
            props.navigation.navigate("View_Default");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };
  return (
    <View>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.linearGradient}
      ></LinearGradient>
      <View style={styles.container}>
        <View style={styles.img_wrapper}>
          <Image
      
            style={styles.img}
          
            source={{uri: item.image ? item.image : "https://aapicosteps.com/wp-content/uploads/2022/01/AapicoSteps-1-e1641994329725.png", }}
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            backgroundColor: "white",
            marginTop: -80,
            paddingTop: 100,
            paddingHorizontal: 30,
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 25,
              marginTop: 5,
              fontWeight: "800",
              color: "#1c2b49",
              textTransform: "capitalize",
            }}
          >
            {item.FullName}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 19,
              textTransform: "capitalize",
            }}
          >
            {item.JobTitle}
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "gray",
              fontSize: 18,
              textTransform: "capitalize",
            }}
          >
            {item.CompanyName} {item.JobLocation}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 20,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                openBrowserAsync("https://www.youtube.com/watch?v=9Ugw2b7HvVI")
              }
              style={styles.keySpec}
            >
              <Entypo name={"linkedin"} size={20} />
            </TouchableOpacity>
            <View style={styles.keySpec}>
              <Entypo name={"facebook"} size={20} />
            </View>
            <View style={styles.keySpec}>
              <Entypo name={"mail"} size={20} />
            </View>
          </View>
          <ScrollView
            style={{ height: 450 }}
            showsVerticalScrollIndicator={false}
          >
            {/* About Us */}
            <View style={styles.desc_wrap}>
              <Text style={styles.heading}>For Job Description</Text>
              <Text style={styles.desc}>{item.JobDescription}</Text>
              <Text style={styles.desc}>
                {item.Country} {item.City}
              </Text>
            </View>

            {/* Work Experience */}
            <View style={styles.desc_wrap}>
              <Text style={styles.heading}>Work Experience</Text>
              <Text style={styles.desc}>
                <Text style={{ color: "black" }}>Highest Qualification :</Text>{" "}
                {item.HighestQualification}
              </Text>
              <Text style={styles.desc}>
                <Text style={{ color: "black" }}>Graduated Year :</Text>{" "}
                {item.GraduationYear}
              </Text>
              <Text style={styles.desc}>
                <Text style={{ color: "black" }}>Current Salary :</Text>{" "}
                {item.Salary}
              </Text>
            </View>

            {/* Conatct */}
            <View style={styles.desc_wrap}>
              <Text style={styles.heading}>Conatct Information</Text>
              <Text style={styles.desc}>
                <Text style={{ color: "black" }}>Personal Email :</Text>{" "}
                {item.PersonalEmail}
              </Text>

              <Text style={styles.desc}>
                <Text style={{ color: "black" }}>Proffesional Email :</Text>{" "}
                {item.PersonalEmail}
              </Text>

              <Text style={styles.desc}>
                <Text style={{ color: "black" }}>Linkedin :</Text>{" "}
                {item.LinkedinLink}
              </Text>

              <Text style={styles.desc}>
                <Text style={{ color: "black" }}>Facebook :</Text>{" "}
                {item.FacebookLink}
              </Text>
            </View>

            {item.Status === 0 ? (
              <View style={{ flexDirection: "row", width: "95%" }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "red",
                    margin: 5,
                    padding: 8,
                    borderRadius: 10,
                    height: 50,
                    width: "50%",
                    justifyContent: "center",
                  }}
                  onPress={() => Rejected()}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 18,
                    }}
                  >
                    Rejected
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "green",
                    padding: 8,
                    margin: 5,
                    borderRadius: 10,
                    height: 50,
                    width: "50%",
                    justifyContent: "center",
                  }}
                  onPress={() => Selected()}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 18,
                    }}
                  >
                    Selected
                  </Text>
                </TouchableOpacity>
              </View>
            ) : item.Status === 1 ? (
              <View style={{ flexDirection: "row", width: "95%" }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "lightgray",
                    margin: 5,
                    padding: 8,
                    borderRadius: 10,
                    height: 50,
                    width: "50%",
                    justifyContent: "center",
                  }}
                  onPress={() => Rejected()}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "black",
                      fontSize: 18,
                    }}
                  >
                    Rejected
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "green",
                    padding: 8,
                    margin: 5,
                    borderRadius: 10,
                    height: 50,
                    width: "50%",
                    justifyContent: "center",
                  }}
                  onPress={() => Selected()}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 18,
                    }}
                  >
                    Selected
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ flexDirection: "row", width: "95%" }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "red",
                    margin: 5,
                    padding: 8,
                    borderRadius: 10,
                    height: 50,
                    width: "50%",
                    justifyContent: "center",
                  }}
                  onPress={() => Rejected()}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 18,
                    }}
                  >
                    Rejected
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: "lightgray",
                    padding: 8,
                    margin: 5,
                    borderRadius: 10,
                    height: 50,
                    width: "50%",
                    justifyContent: "center",
                  }}
                  onPress={() => Selected()}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "black",
                      fontSize: 18,
                    }}
                  >
                    Selected
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Spacer */}
            <View style={{ height: 240 }}></View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  linearGradient: {
    position: "absolute",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    paddingTop: 50,
    paddingBottom: 10,
    width: "100%",
    height: 180,
  },
  container: {
    marginTop: 180,
  },
  img_wrapper: {
    width: 150,
    height: 150,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: -70,
    backgroundColor: "white",
    zIndex: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  keySpec: {
    backgroundColor: "#d4ebf2",
    margin: 5,
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  desc: {
    fontSize: 17,
    color: "gray",
  },
  desc_wrap: {
    marginBottom: 25,
  },
});

export default NcSingleProfile;
