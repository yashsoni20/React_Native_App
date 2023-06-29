import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { AntDesign } from "react-native-vector-icons";

import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {Toast} from "react-native-toast-message/lib/src/Toast";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthGlobal from "../../../Context/store/AuthGlobal";
import base_url from "../../../URL/base_URL";

const Post_JD = (props) => {
  const context = useContext(AuthGlobal);
  const [Position, setPosition] = useState();
  const [JobLocation, setJobLocation] = useState();
  const [JobTitle, setJobTitle] = useState();
  const [RoleType, setRoleType] = useState();
  const [BaseSalary, setBaseSalary] = useState(0);
  const [OTE, setOTE] = useState(0);
  const [WorkExperience, setWorkExperience] = useState(0);
  const [AgeLimit, setAgeLimit] = useState(0);
  const [GraduationYear, setGraduationYear] = useState();
  const [HighestQualification, setHighestQualification] = useState();
  const [BriefDescription, setBriefDescription] = useState();
  const [JobDescription, setJobDescription] = useState();
  const [RoleDescription, setRoleDescription] = useState();
  const [error, setError] = useState("");
  const [item, setItem] = useState(null);
  const [userProfile, setUserProfile] = useState();

  const [isClicked, setIsClicked] = useState(false);
  const [selectedrt, setselectedrt] = useState("RoleType");

  // Role Type Dropdown
  const data = [
    {
      id: 1,
      name: "Hybrid",
    },
    {
      id: 2,
      name: "Remote",
    },
    {
      id: 3,
      name: "Onsite",
    },
  ];

  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setPosition(props.route.params.item.Position.toString());
      setJobLocation(props.route.params.item.JobLocation.toString());
      setJobTitle(props.route.params.item.JobTitle.toString());
      setRoleType(props.route.params.item.RoleType.toString());
      setBaseSalary(props.route.params.item.BaseSalary.toString());
      setOTE(props.route.params.item.OTE.toString());
      setWorkExperience(props.route.params.item.WorkExperience.toString());
      setAgeLimit(props.route.params.item.AgeLimit.toString());
      setGraduationYear(props.route.params.item.GraduationYear.toString());
      setHighestQualification(props.route.params.item.HighestQualification.toString());
      setBriefDescription(props.route.params.item.BriefDescription.toString());
      setJobDescription(props.route.params.item.JobDescription.toString());
      setRoleDescription(props.route.params.item.RoleDescription.toString());
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
    if (
      Position === "" ||
      JobTitle === "" ||
      JobDescription === "" ||
      WorkExperience === ""
    ) {
      setError("Please fill all the required fields");
    }

    let user = {
      Position: Position,
      JobLocation: JobLocation,
      JobTitle: JobTitle,
      RoleType: selectedrt,
      BaseSalary: BaseSalary,
      OTE: OTE,
      WorkExperience: WorkExperience,
      AgeLimit: AgeLimit,
      GraduationYear: GraduationYear,
      HighestQualification: HighestQualification,
      BriefDescription: BriefDescription,
      JobDescription: JobDescription,
      RoleDescription: RoleDescription,
      userID: context.stateUser.user.userId,
    };

    if (item !== null) {
      axios
        .put(`${base_url}Jds/${item._id}`, user)
        .then((res) => {
          if (res.status == 200) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Successfully Updated JD",
            });
            setTimeout(() => {
              props.navigation.navigate("V_JD");
            }, 500);
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 30,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        });
    } else {
      axios
        .post(`${base_url}Jds/`, user)
        .then((res) => {
          if (res.status == 200) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Successfully Uploaded JD",
            });
            setTimeout(() => {
              props.navigation.navigate("V_JD");
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
    }
  };


  const Email = "hseth1312@gmail.com";

  const PostMail = () => {
    if (
      Position === "" ||
      JobLocation === "" ||
      JobTitle === "" ||
      JobDescription === ""
    ) {
      // setError("Please fill all the required fields");
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please fill all the required fields",
        text2: "Please try again",
      });
      return false;
    }
    let AdminMail = {
      SendEmail: Email,
      Position: Position,
      JobLocation: JobLocation,
      JobTitle: JobTitle,
      JobDescription: JobDescription,
      ClientName: userProfile.name,
      ClientEmail: userProfile.email,
      // userID:userID
    };

    axios.post(`${base_url}Jds/Email`, AdminMail).catch((error) => {
      console.log(error);
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View
        style={{
          margin: 40,
          backgroundColor: "grey",
          opacity: 0.5,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "500",
            fontSize: 20,
            padding: 10,
            color: "white",
          }}
        >
          ADD Job description
        </Text>
      </View>

      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.action, { paddingLeft: 10 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
              color: "white",
            }}
          >
            Position
          </Text>
          <TextInput
            placeholderTextColor={"grey"}
            placeholder="Type Your Position"
            name={"Position"}
            id={"Position"}
            color={"white"}
            value={Position}
            autoCapitalize="none"
            onChangeText={(text) => setPosition(text)}
          />
        </View>

        <View style={[styles.action, { paddingLeft: 10 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
              color: "white",
            }}
          >
            Job Location
          </Text>
          <TextInput
            placeholderTextColor={"grey"}
            placeholder="JobLocation"
            name={"JobLocation"}
            value={JobLocation}
            id={"JobLocation"}
            color={"white"}
            onChangeText={(text) => setJobLocation(text)}
          />
        </View>

        <View style={[styles.action, { paddingLeft: 10 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
              color: "white",
            }}
          >
            Job Title
          </Text>
          <TextInput
            placeholderTextColor={"grey"}
            placeholder="JobTitle"
            name={"JobTitle"}
            color={"white"}
            value={JobTitle}
            id={"JobTitle"}
            onChangeText={(text) => setJobTitle(text)}
          />
        </View>

        <View style={{ paddingLeft: 3 }}>
          <TouchableOpacity
            style={styles.dropdownselector}
            onPress={() => {
              setIsClicked(!isClicked);
            }}
          >
            <Text style={{ color: "white", alignSelf: "center" }}>
              {selectedrt}
            </Text>
            {isClicked ? (
              <AntDesign name="down" size={20} color={"white"} />
            ) : (
              <AntDesign name="up" size={20} color={"white"} />
            )}
          </TouchableOpacity>
          {isClicked ? (
            <View style={styles.dropdownarea}>
              <FlatList
                // ListEmptyComponent={}
                ListHeaderComponent={() => null}
                ListFooterComponent={() => null}
                data={data}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={styles.countryItem}
                      onPress={() => {
                        setselectedrt(item.name);
                        setIsClicked(false);
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          ) : null}
        </View>

        <View style={[styles.action, { paddingLeft: 10 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
              color: "white",
            }}
          >
            BaseSalary
          </Text>
          <TextInput
            placeholderTextColor={"grey"}
            placeholder="BaseSalary"
            name={"BaseSalary"}
            id={"BaseSalary"}
            value={BaseSalary}
            color={"white"}
            multiline={true}
            keyboardType="numeric"
            onChangeText={(text) => setBaseSalary(text)}
          />
        </View>

        <View style={[styles.action, { paddingLeft: 10 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
              color: "white",
            }}
          >
            OTE
          </Text>
          <TextInput
            placeholderTextColor={"grey"}
            placeholder="OTE"
            name={"OTE"}
            id={"OTE"}
            value={OTE}
            color={"white"}
            keyboardType="numeric"
            multiline={true}
            onChangeText={(text) => setOTE(text)}
          />
        </View>

        <View style={[styles.action, { paddingLeft: 10 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
              color: "white",
            }}
          >
            WorkExperience
          </Text>
          <TextInput
            placeholderTextColor={"grey"}
            placeholder="WorkExperience"
            name={"WorkExperience"}
            id={"WorkExperience"}
            value={WorkExperience}
            color={"white"}
            keyboardType="numeric"
            onChangeText={(text) => setWorkExperience(text)}
          />
        </View>

        <View style={[styles.action, { paddingLeft: 10 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
              color: "white",
            }}
          >
            AgeLimit
          </Text>
          <TextInput
            placeholderTextColor={"grey"}
            placeholder="AgeLimit"
            name={"AgeLimit"}
            id={"AgeLimit"}
            value={AgeLimit}
            color={"white"}
            keyboardType="numeric"
            onChangeText={(text) => setAgeLimit(text)}
          />
        </View>

        <View style={[styles.action, { paddingLeft: 10 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
              color: "white",
            }}
          >
            Graduation Year
          </Text>
          <TextInput
            placeholderTextColor={"grey"}
            placeholder="GraduationYear"
            name={"GraduationYear"}
            id={"GraduationYear"}
            value={GraduationYear}
            color={"white"}
            keyboardType="numeric"
            onChangeText={(text) => setGraduationYear(text)}
          />
        </View>

        <View style={[styles.action, { paddingLeft: 10 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
              color: "white",
            }}
          >
            Highest Qualification
          </Text>
          <TextInput
            placeholderTextColor={"grey"}
            placeholder="HighestQualification"
            name={"HighestQualification"}
            color={"white"}
            id={"HighestQualification"}
            value={HighestQualification}
            onChangeText={(text) => setHighestQualification(text)}
          />
        </View>

        <View style={[styles.action, { paddingLeft: 10, height: 110 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
              color: "white",
            }}
          >
            Brief Description
          </Text>
          <TextInput
            placeholderTextColor={"grey"}
            placeholder="BriefDescription"
            name={"BriefDescription"}
            multiline={true}
            style={{paddingTop:12}}
            color={"white"}
            id={"BriefDescription"}
            value={BriefDescription}
            onChangeText={(text) => setBriefDescription(text)}
          />
        </View>

        <View style={[styles.action, { paddingLeft: 10, height:110}]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
              color: "white",
            }}
          >
            Job Description
          </Text>
          <TextInput
            placeholderTextColor={"grey"}
            placeholder="JobDescription"
            name={"JobDescription"}
            color={"white"}
            id={"JobDescription"}
            style={{paddingTop:12}}
            value={JobDescription}
            multiline={true}
            onChangeText={(text) => setJobDescription(text)}
          />
        </View>

        <View style={[styles.action, { paddingLeft: 10, height:110 }]}>
          <Text
            style={{
              position: "absolute",
              top: -10,
              backgroundColor: "#05375a",
              marginLeft: 10,
              paddingRight: 20,
              paddingLeft: 10,
              color: "white",
            }}
          >
            Role Description
          </Text>
          <TextInput
            placeholderTextColor={"grey"}
            placeholder="RoleDesciption"
            color={"white"}
            name={"RoleDescription"}
            id={"RoleDescription"}
            multiline={true}
            value={RoleDescription}
            style={{paddingTop:12}}
            onChangeText={(text) => setRoleDescription(text)}
          />
        </View>

        <View style={styles.button}>
          {error ? <Error message={error} /> : null}
          <TouchableOpacity
            style={styles.signup}
            onPress={() => [Post(), PostMail()]}
          >
            <Text style={{ color: "white", fontWeight: "500" }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const { height, width } = Dimensions.get("screen");

const heights = height;
const widths = width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#05375a",
  },
  action: {
    marginVertical: 15,
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "gray",
    width: widths - 35,
    alignSelf: "center",
    height: heights * 0.06,
    justifyContent: "center",
  },
  signup: {
    width: widths - 30,
    height: heights * 0.06,
    justifyContent: "center",
    backgroundColor: "#05375a",
    alignItems: "center",
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "grey",
    marginTop: 20,
  },
  heading: {
    marginTop: 100,
    alignSelf: "center",
    fontWeight: "700",
    fontSize: 20,
  },
  dropdownselector: {
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: "gray",
    width: widths - 35,
    flexDirection: "row",
    height: heights * 0.08,
    justifyContent: "space-between",
    paddingLeft: 15,
    padding: 12,
    marginVertical: 15,
  },
  icon: {
    width: 20,
    height: 20,
    color: "white",
  },
  dropdownselector2: {
    width: "95%",
    height: 300,
    borderRadius: 10,
    marginTop: 40,
    // zIndex:999999,
    backgroundColor: "white",
    // elevation: 5,
    alignSelf: "center",
    // position: "absolute",
  },
  searchInput: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    alignSelf: "center",
    marginTop: 20,
    paddingLeft: 15,
  },

  countryItem: {
    width: "80%",
    height: 50,
    borderBottomWidth: 0.2,
    borderBottomColor: "#8e8e8e",
    alignSelf: "center",
    justifyContent: "center",
  },
  dropdownarea: {
    width: "90%",
    borderRadius: 10,
    marginVertical: 20,
    backgroundColor: "#fff",
    elevation: 5,
    alignSelf: "center",
  },
  searchInput: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    alignSelf: "center",
    marginTop: 20,
    paddingLeft: 15,
  },
});

export default Post_JD;
