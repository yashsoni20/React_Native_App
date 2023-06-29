import React, {  useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,

  Platform,
  TextInput,
} from "react-native";
import { FontAwesome, Ionicons } from "react-native-vector-icons";
import * as Animatable from "react-native-animatable";
import { StatusBar } from "expo-status-bar";
import Error from "../../Shared/Error";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import axios from "axios";
import base_url from "../../URL/base_URL.js";

const SignUp = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");

  const Register = () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "All Fields Are Required",
        text2: "Please fill in the form correctly !!",
      });
      setError("Please fill in the form correctly !!");
      return false;
    }
    if (confirmPassword !== password) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Password Does Not Match!!!",
        text2: "Confirm Password Should Be Same As Password",
      });
      setError("Confirm Password Should Be Same As Password");
      return false;
    }

    // const ys = /\S+@\S+\.\S+/.test(email);
    const validEmailRegx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email);
    if (validEmailRegx === false) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Invalid Email",
        text2: "Please Enter Correct Email Address",
      });
      setError("Enter Correct Email Address");
      return false;
    }

    const validPassRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
    if (validPassRegex === false) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Invalid Password",
        text2: "Password Must Contain 1 Upper Case, 1Special Character (!@#$&*) and should be of atleast 8 characters"
      });
      setError("Password Must Contain 1 Upper Case, 1Special Character (!@#$&*) and should be of atleast 8 characters");
      return false;
    }



    let user = {
      name: name,
      email: email,
      password: password,
      isAdmin: false,
  
    };

    axios
      .post(`${base_url}Users/register`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please Login into your account",
          });
          setTimeout(() => {
            props.navigation.navigate("Sign_In");
          }, 500);
        }
        if (res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Email Already Exist",
            text2: "Please Login With Different Email",
          });
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
    <View style={Styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />

      <View style={Styles.header}>
        <Image
          source={require("../../Images/login.jpg")}
          style={{
            resizeMode: "cover",
            marginTop: 30,
            width: 400,
            height: 400,
          }}
        />
      </View>
      <KeyboardAwareScrollView viewIsInsideTabBar={true} enableOnAndroid={true}>
        <Animatable.View
          style={Styles.footer}
          animation="fadeInUpBig"
          duration={1500}
        >
          <Text style={Styles.textfooter}>Full Name</Text>
          <View style={Styles.action}>
            <FontAwesome name="user-o" color="grey" size={20} />
            <TextInput
              placeholderTextColor={"grey"}
              placeholder="Type Your Full Name"
              name={"email"}
              id={"email"}
              style={Styles.textinput}
              autoCapitalize="none"
              onChangeText={(text) => setName(text)}
            />
          </View>

          <Text style={[Styles.textfooter, { marginTop: 30 }]}>Email</Text>
          <View style={Styles.action}>
            <FontAwesome name="envelope-o" color="grey" size={20} />
            <TextInput
              placeholderTextColor={"grey"}
              placeholder="Type Your Email Address"
              name={"email"}
              id={"email"}
              style={Styles.textinput}
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text.toLowerCase())}
            />
          </View>

          <Text style={[Styles.textfooter, { marginTop: 30 }]}>Password</Text>
          <View style={Styles.action}>
            <Ionicons name="key-outline" color="grey" size={20} />
            <TextInput
              placeholderTextColor={"grey"}
              placeholder="Create a Valid Password "
              name={"password"}
              id={"password"}
              style={Styles.textinput}
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <Text style={[Styles.textfooter, { marginTop: 30 }]}>
            Confirm Password
          </Text>
          <View style={Styles.action}>
            <Ionicons name="key-outline" color="grey" size={20} />
            <TextInput
              placeholderTextColor={"grey"}
              placeholder="Confirm Your Password"
              name={"confirmPassword"}
              id={"confirmPassword"}
              style={Styles.textinput}
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={(text) => setconfirmPassword(text)}
            />
          </View>

          <View style={Styles.button}>
            {error ? <Error message={error} /> : null}
            <TouchableOpacity style={Styles.signup} onPress={() => Register()}>
              <Text style={{ color: "white", fontWeight: "500" }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUp;

const { height, width } = Dimensions.get("screen");
const height_logo = height * 0.28;
const heights = height;
const widths = width;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flex: 1,
  },
  textheader: {
    color: "#89CFEF",
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 70,
    marginLeft: 20,
  },
  footer: {
    marginTop: 300,
    backgroundColor: "#05375a",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  textfooter: {
    color: "white",
    fontSize: 18,
    marginTop: -30,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: Platform.OS === "ios" ? 12 : 7,
  },
  textinput: {
    color: "white",
    flex: 1,
    marginVertical: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
  },
  button: {
    marginTop: 40,
  },
  signup: {
    width: widths - 60,
    height: heights * 0.05,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
  },
});
