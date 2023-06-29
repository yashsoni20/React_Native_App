//import liraries
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
  FlatList,
  RefreshControl,
} from "react-native";
import axios, { Axios } from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "react-native-vector-icons";
import base_url from "../../URL/base_URL";

const { width, height } = Dimensions.get("window");

// create a component
const Users = (props) => {
  const [token, setToken] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${base_url}Users`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  };

  const deleteUsers = (_id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`${base_url}Users/${_id}`)
      .then((response) => {
        setData(data.filter((item) => item._id !== _id));
      })
      .catch((error) => console.log(error));
  };

  const handleRefresh = () => {
    fetchData();
  };

  const renderItem = ({ item }) => {
    const ChangeAdmin = (_id) => {
      axios
        .put(`${base_url}Users/isAdmin/${item._id}`)
        .then((response) => {
          setData(data.filter((item) => item._id !== _id));
        })
        .catch((error) => console.log(error));
    };
    return (
      <View>
        <TouchableOpacity
          style={[styles.container, { backgroundColor: "white" }]}
        >
          <View style={{ justifyContent: "center" }}>
            <Image
              source={{
                uri: item.image
                  ? item.image
                  : "https://affinitysteps.com/assets/images/111affinity.png",
              }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={{ marginLeft: 10, justifyContent: "center" }}>
            <Text style={{ fontSize: 22, fontWeight: "700" }} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: "500" }} numberOfLines={1}>
              {item.email}
            </Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              {item.isAdmin === true ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: "lightblue",
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    marginVertical: 5,
                  }}
                  onPress={() => ChangeAdmin()}
                >
                  <Text>Remove Admin</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "lightblue",
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    borderRadius: 8,
                    marginVertical: 5,
                  }}
                  onPress={() => ChangeAdmin()}
                >
                  <Text>Make Admin</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={{
                  backgroundColor: "#ff726f",
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  margin: 5,
                }}
                onPress={() => deleteUsers(item._id)}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
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
          Users
        </Text>
        <TouchableOpacity style={{position:"absolute",bottom:15,right:20,width:40,height:40,justifyContent:'center',alignItems:"center"}} onPress={()=>handleRefresh()}>
          <FontAwesome name={"refresh"} size={20} color={"white"} />
        </TouchableOpacity>
      </LinearGradient>
      <View style={styles.listWrapper}>
        {data && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={handleRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    alignSelf: "center",
    width: width - 30,
    borderRadius: 10,
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
  image: {
    borderRadius: 50,
    width: 80,
    height: 80,
    margin: 2,
  },

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
  listWrapper: {
    marginTop: 110,
  },
});

//make this component available to the app
export default Users;
