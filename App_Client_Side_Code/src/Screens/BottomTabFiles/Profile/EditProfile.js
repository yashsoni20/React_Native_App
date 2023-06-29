import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import AuthGlobal from "../../../Context/store/AuthGlobal";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import base_url from "../../../URL/base_URL";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";


const EditProfile = (props) => {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [item, setItem] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [phone, setPhone] = useState("");
  const [apartment, setApartment] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");

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

  const Post = () => {
    let user = {
      name: name,
      street: street,
      phone: phone,
      apartment: apartment,
      state: state,
      country: country,
      zip: zip,
      image: image,
    };
    axios
      .put(
        `${base_url}Users/profile/${context.stateUser.user.userId}`,
        user
      )
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 30,
            type: "success",
            text1: "Successfully Updated JD",
          });
          setTimeout(() => {
            props.navigation.navigate("Profile");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please Try Again",
        });
      });
  };
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

  const updateInfo = async () => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: image,
        name: "image.jpg",
        type: "image/jpg",
      });
      formData.append("name", name);
      formData.append("street", street);
      formData.append("phone", phone);
      formData.append("apartment", apartment);
      formData.append("state", state);
      formData.append("country", country);
      formData.append("zip", zip);

      const response = await axios.put(
        `${base_url}Users/profile/${context.stateUser.user.userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Toast.show({
        topOffset: 60,
        type: "success",
        text1: "Successfully Uploaded",
      });
      setTimeout(() => {
        props.navigation.navigate("Profile");
      }, 500);
    } catch (error) {
      console.log(error);
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
        text2: "Please try again",
      });
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
            marginVertical: 10,
            fontWeight: "800",
            color: "whitesmoke",
          }}
        >
          Edit Profile
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
          <Image
            style={[styles.profile_pic, { position: "absolute" }]}
            source={{
              uri: image,
            }}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 0,
              alignSelf: "center",
              width: 180,
              backgroundColor: "rgba(225,225,225,0.8)",
              padding: 10,
              borderBottomEndRadius: 15,
              borderBottomLeftRadius: 15,
            }}
            onPress={selectImage}
          >
            <AntDesign
              name={"edit"}
              size={22}
              style={{ textAlign: "center" }}
            />
          </TouchableOpacity>
        </View>
      
        <ScrollView style={{ height: Platform.OS === "ios" ? 500 : 400, }} automaticallyAdjustKeyboardInsets={true}>
       
          <View style={{ padding: 20 }}>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Name"
                value={name}
                style={{ width: "100%" }}
                onChangeText={(text) => setName(text)}
                name={"name"}
                id={"name"}
              />
              <Text style={styles.inputLabel}>Full Name</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Email"
                color={"gray"}
                value={userProfile ? userProfile.email : ""}
                style={{ width: "100%" }}
                editable={false}
                selectTextOnFocus={false}
              />
              <Text style={styles.inputLabel}>Email</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Phone No."
                value={phone}
                style={{ width: "100%" }}
                onChangeText={(text) => setPhone(text)}
                name={"phone"}
                id={"phone"}
              />
              <Text style={styles.inputLabel}>Phone No.</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Street"
                style={{ width: "100%" }}
                value={street}
                onChangeText={(text) => setStreet(text)}
                name={"street"}
                id={"street"}
              />
              <Text style={styles.inputLabel}>Street</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Apartment / House No."
                style={{ width: "100%" }}
                value={apartment}
                onChangeText={(text) => setApartment(text)}
                name={"apartment"}
                id={"apartment"}
              />
              <Text style={styles.inputLabel}>Apartment / House No.</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="State"
                style={{ width: "100%" }}
                value={state}
                onChangeText={(text) => setState(text)}
                name={"state"}
                id={"state"}
              />
              <Text style={styles.inputLabel}>State</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Country"
                style={{ width: "100%" }}
                value={country}
                onChangeText={(text) => setCountry(text)}
                name={"country"}
                id={"country"}
              />
              <Text style={styles.inputLabel}>Country</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder="Zip / Pin Code"
                style={{ width: "100%" }}
                value={zip}
                onChangeText={(text) => setZip(text)}
                name={"zip"}
                id={"zip"}
              />
              <Text style={styles.inputLabel}>Zip / Pin Code</Text>
            </View>
            {image !== null ? (
              <TouchableOpacity
                onPress={updateInfo}
                style={{
                  backgroundColor: "#FFCCCB",
                  padding: 15,
                  borderRadius: 10,
                  marginTop: 15,
                  marginBottom: 50,
                }}
              >
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                  Update
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => alert('Please Select Image')}
                style={{
                  backgroundColor: "#FFCCCB",
                  padding: 15,
                  borderRadius: 10,
                  marginTop: 15,
                  marginBottom: 50,
                }}
              >
                <Text style={{ fontSize: 18, textAlign: "center" }}>
                  Update
                </Text>
              </TouchableOpacity>
            )}
          </View>
        
        </ScrollView>
        

       
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    paddingTop: 20,
    paddingBottom: 10,
    height: 300,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    width: "100%",
  },
  footer2: {
    backgroundColor: "white",
    width: "100%",
    alignSelf: "center",
    borderRadius: 20,
    marginTop: -130,
    paddingBottom: 50,
    zIndex: 5,
  },

  profile_pic: {
    width: 180,
    height: 180,
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
  inputWrapper: {
    paddingTop: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 15,
  },
  inputLabel: {
    backgroundColor: "white",
    position: "absolute",
    top: -10,
    left: 14,
    paddingHorizontal: 5,
    fontSize: 13,
  },
});

export default EditProfile;
