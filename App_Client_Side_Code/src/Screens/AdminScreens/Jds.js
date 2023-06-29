//import liraries
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  RefreshControl
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "react-native-vector-icons";
import base_url from "../../URL/base_URL";
base_url
const { width, height } = Dimensions.get("screen");

// create a component
const Jds = (props) => {
  //   const context = useContext(AuthGlobal);
  const [jdFilter, setJdFilter] = useState([]);
  const [token, setToken] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { navigation } = props;



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(`${base_url}Jds`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  };
  
  const handleRefresh = () => {
    fetchData();
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          style={[styles.container, { backgroundColor: "white" }]}
          onPress={() => navigation.navigate("Jdinside", { item })}
        >
          <View
            style={{
              marginVertical: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View>
              <Text
                style={{ fontSize: 20, fontWeight: "700" }}
                numberOfLines={1}
              >
                {item.Position}
              </Text>

              <Text
                style={{ fontSize: 18, fontWeight: "500" }}
                numberOfLines={1}
              >
                {item.JobTitle}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "lightblue",
                justifyContent: "center",
                paddingHorizontal: 8,
                width: 100,
                marginRight: 5,
                borderRadius: 8,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "500", textAlign: "center" }}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.BaseSalary}
              </Text>
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
          JDs
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
    width: 60,
    height: 60,
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
export default Jds;
