import React, { useState, useEffect, useContext } from "react";
import { CommonActions } from "@react-navigation/native";
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
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Animatable from "react-native-animatable";
import { StatusBar } from "expo-status-bar";
import Error from "../../Shared/Error";
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginuser } from "../../Context/actions/Auth_actions";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { Toast } from "react-native-toast-message/lib/src/Toast";

WebBrowser.maybeCompleteAuthSession();

const SignIn = ({ navigation, props }) => {
  const [accessToken, setaccessToken] = useState(null);
  const [userinfo, setuserinfo] = useState(null);
  const [userToken, setUserToken] =useState("");

  const [request, response, promtAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "1063311498529-p8kq3in7igsuim76vsno2btudmdln61g.apps.googleusercontent.com",
    androidClientId:
      "1063311498529-s7nfdd2jbm5jl4shu8cpnu4cd9tj7t1p.apps.googleusercontent.com",
  });

  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (response?.type === "success") {
      setaccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
    }
    if (context.stateUser.isAuthenticated === true) {
      if (context.stateUser.user.isAdmin == true) {
        navigation.navigate("AdminStack");

        // Code For Prevent User To Go Back To Login After Login
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: "AdminStack" }],
        });

        navigation.dispatch(resetAction);
      } else {
        Toast.show({
          topOffset: 30,
          type: "success",
          text1: "Successfully Logged In !!",
          text2: "Please Login into your account",
        });
        setTimeout(() => {
          navigation.navigate("TabRoutes");
          
        }, 500);
        

        // Code For Prevent User To Go Back To Login After Login
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: "TabRoutes" }],
        });

        navigation.dispatch(resetAction);
      }
    }
  }, [context.stateUser.isAuthenticated, response, accessToken]);

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const useInfo = await response.json();
    setuserinfo(useInfo);
  }
 
  const handleSubmit = () => {
    const user = {
      email,
      password,
    };
    if (email === "" || password === "") {
      setError("Please fill in your credentials !!");
    } else {
      loginuser(user, context.dispatch);
    }
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

      <Animatable.View
        style={Styles.footer}
        animation="fadeInUpBig"
        duration={1500}
      >
        <Text style={Styles.textfooter}>Email</Text>
        {/* <Text style={{color:'white'}}></Text> */}
        <View style={Styles.action}>
          <FontAwesome name="user-o" color="grey" size={20} />
          <TextInput
            placeholder="Your Email"
            name={"email"}
            id={"email"}
            autoCapitalize='none'
            value={email}
            style={Styles.textinput}
            placeholderTextColor={"grey"}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <Text style={[Styles.textfooter, { marginTop: 30 }]}>Password</Text>
        <View style={Styles.action}>
          <FontAwesome name="user-o" color="grey" size={20} />
          <TextInput
            selectionColor={"green"}
            placeholder="Your Password"
            name={"password"}
            id={"password"}
            secureTextEntry={true}
            value={password}
            style={Styles.textinput}
            autoCapitalize="none"
            placeholderTextColor={"grey"}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <View style={Styles.button1}>
          {error ? <Error message={error} /> : null}
          <TouchableOpacity
            style={Styles.signin}
            onPress={() => handleSubmit()}
          >
            <Text style={Styles.textsign}>Sign In</Text>
          </TouchableOpacity>
        </View>



        <View style={{ alignSelf: "center", flexDirection: "row" }}>
          <Text style={{ color: "grey" }}>Don't have an Account/</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Sign_Up")}>
            <Text style={{ color: "white" }}> SignUp </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default SignIn;


const { height, width } = Dimensions.get("screen");
const height_logo = height * 0.28;
const heights = height;
const widths = width;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  textfooter: {
    color: "white",
    fontSize: 19,
    marginTop: -30,
  },
  footer: {
    backgroundColor: "#05375a",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 12,
  },
  logo: {
    width: height_logo - 80,
    height: height_logo - 80,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 30,
  },
  
  button1: {
    marginVertical: 40,
  },
  signIN: {
    width: widths - 30,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  textsign: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
  textinput: {
    color: "white",
    flex: 1,
    marginVertical: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
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
  signin: {
    width: widths - 60,
    height: heights * 0.05,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    borderColor: "grey",
    borderWidth: 1,
  },
  button2: {
    marginTop: 25,
  },
});
