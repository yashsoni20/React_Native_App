import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  Modal,
} from "react-native";
import { Icon } from "react-native-elements";
import { Entypo } from "react-native-vector-icons";
const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const JdCard = (props) => {
  const {
    Position,
    JobTitle,
    JobLocation,
    BaseSalary,
    BriefDescription,
    RoleType,
    WorkExperience,
  } = props;
  const navigation = useNavigation();

  const [modalVisible, setModalVisisble] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <View style={{ flexDirection: "row", width: "65%" }}>
        <View style={{justifyContent:"center"}}>
          <Image
            style={styles.cardLogo}
            source={require("../../../../Images/no_post.jpg")}
            resizeMode="contain"
          />
        </View>
        <View style={{ marginLeft: 10, width: "100%" }}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: "700",
              width: "80%",
              textTransform: "capitalize",
            }}
            numberOfLines={2}
          >
            {Position}
          </Text>
          <Text
            numberOfLines={1}
            style={{ fontSize: 18, fontWeight: "500", color: "grey" }}
          >
            {JobTitle}
          </Text>
          <Text style={styles.cardDesc} numberOfLines={2}>
            {BriefDescription}
          </Text>
        </View>   
      </View>

      <View
        horizontal
        style={{
          flexDirection: "row",
          marginVertical: 10,
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <View style={styles.keySpec}>
          <Text>{RoleType}</Text>
        </View>
        <View style={styles.keySpec}>
          <Text>Exp: {WorkExperience}</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 5,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            textTransform: "capitalize",
          }}
        >
          {JobLocation}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>
          $ {BaseSalary} /-
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => {
          setModalVisisble(true);
        }}
        style={styles.optionBtn}
      >
        <Entypo name="dots-three-vertical" size={20} />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisisble(false);
        }}
      >
        <TouchableOpacity
          style={styles.centerdView}
          onPress={() => {
            setModalVisisble(false);
          }}
        >
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor="#E8E8E8"
              onPress={() => {
                setModalVisisble(false);
              }}
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                top: 5,
                right: 10,
              }}
            >
              <Icon name="close" size={22} />
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  marginVertical: 5,
                  width: 100,
                }}
                onPress={() => [
                  props.delete(props._id),
                  setModalVisisble(false),
                  navigation.navigate("View_Default"),
                ]}
              >
                <Text
                  style={{ fontSize: 18, textAlign: "center", color: "white" }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Post_JD", { item: props })}
                style={{
                  backgroundColor: "steelblue",
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  marginVertical: 5,
                }}
              >
                <Text
                  style={{ fontSize: 18, color: "white", textAlign: "center" }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    marginBottom: 25,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "90%",
    alignSelf: "center",
    position: "relative",
    zIndex: 1,
  },
  keySpec: {
    backgroundColor: "#d4ebf2",
    margin: 5,
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  cardLogo: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  cardDesc: {
    width: "100%",
  },
  optionBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 5,
    backgroundColor: "#f4f8e8",
    padding: 10,
    borderRadius: 50,
  },
  centerdView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default JdCard;
