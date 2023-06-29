import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import AuthGlobal from "../../../Context/store/AuthGlobal";
import { logoutUser } from "../../../Context/actions/Auth_actions";
import base_url from "../../../URL/base_URL";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
  
const Profile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      props.navigation.navigate("Sign_In");
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        axios
          .get(`${base_url}Users/${context.stateUser.user.userId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${res}`,
            },
          })
          .then((user) => setUserProfile(user.data));
      })
      .catch((error) => console.log(error));
    return () => {
      setUserProfile();
    };
  }, [context.stateUser.isAuthenticated]);

  const [image, setImage] = useState(null);

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: image,
        name: "image.jpg",
        type: "image/jpg",
      });

      const response = await axios.put(
        `${base_url}Users/profile/${context.stateUser.user.userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

     
      // Handle the response from the backend
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (
    <View>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.linearGradient}
      >
        <Text
          style={{
            alignSelf: "center",
            fontSize: 22,
            marginVertical: -15,
            fontWeight: "800",
            color: "whitesmoke",
          }}
        >
          Profile
        </Text>
      </LinearGradient>
      <View style={styles.footer2}>
        <View>
          <Image
            style={styles.profile_pic}
            source={{
              uri: userProfile
                ? userProfile.image
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa0LMm4Yot5dK5mwbPF946vTnhxgO0wi4AZTsjgfVoVw&usqp=CAU&ec=48600113",
            }}
            resizeMode="contain"
          />

          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 0,
              alignSelf: "center",
              width: 150,
              backgroundColor: "rgba(225,225,225,0.8)",
              padding: 10,
              borderBottomEndRadius: 15,
              borderBottomLeftRadius: 15,
            }}
            // onPress={selectImage}
            onPress={() => props.navigation.navigate("EditProfile")}
          >
            <Text style={{ fontWeight: "900", textAlign: "center" }}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              color: "#1c2b49",
              fontSize: 24,
              fontWeight: "800",
              textAlign: "center",
              marginBottom: 6,
              textTransform: "capitalize",
              marginTop: 20,
            }}
          >
            {userProfile ? userProfile.name : ""}
          </Text>
          <Text
            style={{
              color: "#1c2b49",
              fontSize: 24,
              fontWeight: "600",
              textAlign: "center",
              marginBottom: 6,
            }}
          >
            {userProfile ? userProfile.email : ""}
          </Text>
        </View>
        <View>
          <View style={styles.Stats}>
            <Text style={{ fontSize: 26, fontWeight: "700" }}>0</Text>
            <Text style={{ fontSize: 18 }}>Job Description Uploaded</Text>
            <View style={styles.keyIcon}>
              <AntDesign name={"filetext1"} size={20} color={"#1c2b49"} />
            </View>
          </View>
          <View style={styles.Stats}>
            <Text style={{ fontSize: 26, fontWeight: "700" }}>0</Text>
            <Text style={{ fontSize: 18 }}>Candidates Selected</Text>
            <View style={styles.keyIcon}>
              <AntDesign name={"like2"} size={20} color={"green"} />
            </View>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            bottom: -20,
            backgroundColor: "#FFCCCB",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.removeItem("jwt"), logoutUser(context.dispatch);
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
              }}
            >
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    paddingTop: 50,
    paddingBottom: 10,
    height: 300,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    width: "100%",
  },
  footer2: {
    backgroundColor: "white",
    width: 300,
    height:Platform.OS === "ios" ? 400 : 370,
    alignSelf: "center",
    borderRadius: 20,
    marginTop: -130,
    paddingBottom: 50,
    zIndex: 5,
  },

  profile_pic: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginTop: -100,
    borderWidth: 2,
    borderColor: "lightgrey",
    borderRadius: 15,
  },
  Stats: {
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  keyIcon: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    shadowColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignContent: "center",
  },
});

export default Profile;
