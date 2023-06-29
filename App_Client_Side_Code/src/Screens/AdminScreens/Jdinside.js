import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image} from "react-native";
import { AntDesign } from "react-native-vector-icons";

import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import base_url from "../../URL/base_URL";

const Jdinside = (props ) => {
  const { route } = props;
  const { item } = route.params;
  const {token} = props;
  const {jdFilter , setJdFilter} = props;
 
  const [can, setCan] = useState(props.route.params.item);
  // const [rejected, setRejected] = useState(props.route.params.item);
  // const [selected, setSelected] = useState(props.route.params.item);

  useEffect(() => {
    axios
      .get(
        `${base_url}NewCandidates/NC/Count/${item._id}`
      )
      .then((res) => {
        return setCan(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteJds = (_id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`${base_url}Jds/${_id}`, config)
      .then((res) => {
        const Jds = jdFilter.filter((item) => item._id !== _id);
        setJdFilter(Jds);
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
            textTransform: "capitalize",
          }}
        >
          {item.Position}
        </Text>
      </LinearGradient>
      <View style={styles.container}>
        <View style={styles.img_wrapper}>
          <Image
            // source={require()}
            style={styles.img}
            // style={{  }}
            source={require("../../Images/no_post.jpg")}
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
            {item.RoleType} {item.JobLocation}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 20,
            }}
          >
            <View style={styles.keySpec}>
              <Text
                style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8 }}
              >
                {can.NCcount ? can.NCcount : 0}
              </Text>
              <Text style={{ fontSize: 18 }}>Sourced</Text>
              <View style={styles.keyIcon}>
                <AntDesign name={"user"} size={16} color={"black"} />
              </View>
            </View>
            <View style={styles.keySpec}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  marginBottom: 8,
                  color: "green",
                }}
              >
                {can.NCScount ? can.NCScount : 0}
              </Text>
              <Text style={{ fontSize: 18, color: "green" }}>Selected</Text>
              <View style={styles.keyIcon}>
                <AntDesign name={"like2"} size={16} color={"green"} />
              </View>
            </View>
            <View style={styles.keySpec}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  marginBottom: 8,
                  color: "red",
                }}
              >
                {can.NCRcount ? can.NCRcount : 0}
              </Text>
              <Text style={{ fontSize: 18, color: "red" }}>Rejected</Text>
              <View style={styles.keyIcon}>
                <AntDesign name={"dislike2"} size={16} color={"red"} />
              </View>
            </View>
          </View>
          <ScrollView
            style={{ height: 450 }}
            showsVerticalScrollIndicator={false}
          >
            {/* About Us */}
            <View style={styles.desc_wrap}>
              <Text style={styles.heading}>About Us</Text>
              <Text style={styles.desc}>{item.BriefDescription}</Text>
            </View>

            {/* Salary */}
            <View style={styles.desc_wrap}>
              <Text style={styles.heading}>Salary</Text>
              <Text style={styles.desc}>
                <Text style={{ color: "black" }}>Base Salary :</Text>{" "}
                {item.BaseSalary}
              </Text>
              <Text style={styles.desc}>
                <Text style={{ color: "black" }}>OTE :</Text> {item.OTE}
              </Text>
            </View>

            {/* JobDescription */}
            <View style={styles.desc_wrap}>
              <Text style={styles.heading}>Decription</Text>
              <Text style={styles.desc}>{item.JobDescription}</Text>
            </View>

            {/* Role Description */}
            <View style={styles.desc_wrap}>
              <Text style={styles.heading}>Roles & Responsibilities</Text>
              <Text style={styles.desc}>{item.RoleDescription}</Text>
            </View>

            <View style={styles.desc_wrap}>
              <Text style={styles.heading}>Work Experience</Text>
              <Text style={styles.desc}>
                <Text style={{ color: "black" }}>
                  Required Work Experience :
                </Text>{" "}
                {item.WorkExperience}
              </Text>
              <Text style={styles.desc}>
                <Text style={{ color: "black" }}>Required Age Limit :</Text>{" "}
                {item.AgeLimit}
              </Text>
              <Text style={styles.desc}>
                <Text style={{ color: "black" }}>
                  Required Graduating Year :
                </Text>{" "}
                {item.GraduationYear}
              </Text>
              <Text style={styles.desc}>
                <Text style={{ color: "black" }}>
                  Required Highest Qualification :
                </Text>{" "}
                {item.HighestQualification}
              </Text>
            </View>
            <View style={styles.desc_wrap}>
              <TouchableOpacity style ={{backgroundColor:'red',padding:10,borderRadius:5}} onPress={() => [deleteJds(item._id),props.navigation.navigate('Jds')] }>
                <Text style={{fontSize:20,fontWeight:'500',color:'white',alignSelf:'center'}}>Delete</Text>
              </TouchableOpacity>
            </View>

            {/* Spacer */}
            <View style={{ height: 200 }}></View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Jdinside;

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
    marginHorizontal: 10,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  keyIcon: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "white",
    padding: 6,
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
