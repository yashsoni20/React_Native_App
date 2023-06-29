import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import NewCandidatelist from "./NewCandidatelist";
import axios from "axios";
import { AntDesign } from "react-native-vector-icons";
import SearchedNewC from "./SearchedNewCandidate";
import { LinearGradient } from "expo-linear-gradient";
import base_url from "../../../../URL/base_URL";
import AuthGlobal from "../../../../Context/store/AuthGlobal";


const V_Candidates = (props) => {
  const context = useContext(AuthGlobal);

  const [NewCandidate, setNewCandidate] = useState([]);
  const [newcfiltered, setNewcfiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [jd, setJd] = useState([]);

  const [newjd, SetNewjd] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState({});


  useEffect(() => {
    setActive(-1);

    axios.get(`${base_url}NewCandidates`).then((res) => {
      const data = res.data;
      const userNcs = data.filter(
        (Nc) => Nc.userID === context.stateUser.user.userId && Nc.userID === context.stateUser.user.userId
      );
      setNewCandidate(userNcs);
      SetNewjd(userNcs);
      setNewcfiltered(userNcs);
      setFocus(false);
      setInitialState(userNcs);
    });

    // jd
    axios
      .get(`${base_url}Jds`)
      .then((res) => {
        setJd(res.data);
      })
      .catch((error) => {
        console.log("API ERROR");
      });
    return () => {
      setNewCandidate([]);
      setNewcfiltered([]);
      SetNewjd();
      setFocus();
      setJd([]);
      setActive();
      setInitialState();
    };
  }, []);

  // Search

  const SearchNew = (text) => {
    setNewcfiltered(
      NewCandidate.filter((i) => {
        const itemdata = i.FullName
          ? i.FullName.toUpperCase()
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

  // Jd
  const ChangeJd = (jd1) => {
    jd1 === "all"
      ? [SetNewjd(initialState), setActive(true)]
      : [
          SetNewjd(
            NewCandidate.filter((i) => i.JobTitle._id === jd1),
            setActive(true)
          ),
        ];
  };
  const deleteNC = (id) => {
    axios
      .delete(`${base_url}NewCandidates/${id}`, {
        headers: {
          Authoirization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const NCs = NewCandidate.filter((item) => item.id !== id);
        setNewcfiltered(NCs);
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
          Candidates
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
            onChangeText={(text) => SearchNew(text)}
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
        {/* there's styling of search bar  */}

        {focus == true ? (
          <ScrollView>
            <SearchedNewC
              navigation={props.navigation}
              newcfiltered={newcfiltered}
            />
          </ScrollView>
        ) : (
          <View>
            {newjd.length > 0 ? (
              <ScrollView>
                <View style={{ alignItems: "center" }}>
                  {newjd.map((item) => {
                    return (
                      <NewCandidatelist
                        navigation={props.navigation}
                        key={item._id}
                        item={item}
                        delete={deleteNC}
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
                  style={{ width: 200, height: 200,marginTop:-120 }}
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
                  onPress={() => props.navigation.navigate("Post_NC")}
                >
                  <Text style={{ fontSize: 22, color: "#1c2b49" }}>
                    + Add Candidates
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 22, marginTop: 10 }}>
                  No Candidates Found
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
export default V_Candidates;
