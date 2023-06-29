//import liraries
import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { AntDesign } from "react-native-vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Jdlist from "./Jdlist";
import { LinearGradient } from "expo-linear-gradient";
import base_url from "../../../../URL/base_URL";
import AuthGlobal from "../../../../Context/store/AuthGlobal";
import { useFocusEffect } from "@react-navigation/native";
import SearchJd from "./SearchJd";

// create a component
const V_JD = (props) => {
  const context = useContext(AuthGlobal);

  const [jdlist, setJdlist] = useState([]);
  const [jdfilter, setJdfilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [focus, setFocus] = useState();
  const [token, setToken] = useState();
  const [userToken, setUserToken] = useState("");
  const [user_Id, setUser_Id] = useState();


  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      AsyncStorage.getItem("user_Id").then((res) => {
        setUser_Id(res);
      });

      axios.get(`${base_url}Jds`).then((res) => {
        const data = res.data;
        const userJds = data.filter((Jd) => Jd.userID === context.stateUser.user.userId);
        setJdlist(userJds);
        setJdfilter(userJds);
        setLoading(false);
      });
      return () => {
        setJdlist([]);
        setJdfilter([]);
        setLoading(true);
      };
    }, [])
  );

  //   Searching
  const searchNew = (text) => {
    setJdfilter(
      jdlist.filter((i) => {
        const itemdata = i.JobTitle
          ? i.JobTitle.toUpperCase()
          : "".toUpperCase();
        const textdata = text.toUpperCase();
        return itemdata.indexOf(textdata) > -1;
      })
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const deleteJd = (id) => {
    axios
      .delete(`${base_url}Jds/${id}`, {
        headers: {
          Authoirization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const Jds = jdfilter.filter((item) => item.id !== id);
        setJdfilter(Jds);
      })
      .catch((error) => console.log(error));
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
          My Job Descriptions
        </Text>
        <View
          style={{
            borderWidth: 1,
            padding: 15,
            margin: 10,
            borderRadius: 10,
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            placeholder="Search"
            placeholderTextColor="#000"
            width="90%"
            onChangeText={(text) => searchNew(text)}
            onFocus={openList}
          />

          {focus == true ? (
            <AntDesign
              name="close"
              size={20}
              style={styles.close}
              onPress={onBlur}
            />
          ) : null}
        </View>
      </LinearGradient>

      <View style={styles.container}>
        {focus == true ? (
          <ScrollView>
            <SearchJd navigation={props.navigation} jdfilter={jdfilter} />
          </ScrollView>
        ) : (
          <View>
            {jdlist.length > 0 ? (
              <ScrollView>
                <View style={{ alignItems: "center" }}>
                  {jdlist.map((item) => {
                    return (
                      <Jdlist
                        navigation={props.navigation}
                        key={item._id}
                        item={item}
                        delete={deleteJd}
                      />
                    );
                  })}
                </View>
              </ScrollView>
            ) : (
              <View
                style={{
                  width: "100%",
                  height: 650,
                  justifyContent: "center",
                  backgroundColor: "white",
                  alignItems: "center",
                  marginTop: -50,
                }}
              >
                <Image
                  // source={require()}
                  style={{ width: 200, height: 200 , marginTop:-120}}
                  source={require("../../../../Images/no_post.jpg")}
                  resizeMode="contain"
                />
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: "#1c2b49",
                    padding: 10,
                    borderRadius: 10,
                  }}
                  onPress={() => props.navigation.navigate("Post_JD")}
                >
                  <Text style={{ fontSize: 22, color: "#1c2b49" }}>
                    + Add JD's
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 22, marginTop: 10 }}>
                  No Job Descriptions Found
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  linearGradient: {
    position: "absolute",
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    paddingTop: 50,
    paddingBottom: 10,
    width: "100%",
    zIndex: 99,
  },
  container: {
    marginTop: 200,
  },
});

//make this component available to the app
export default V_JD;
