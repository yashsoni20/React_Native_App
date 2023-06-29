import React from "react";
import { TouchableOpacity, View, Text, Dimensions, Image } from "react-native";
import { AntDesign } from "react-native-vector-icons";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");

const NewCandidateCard = (props, navigation) => {
  const { FullName, JobLocation, JobTitle, Status,image } = props;
  
  return (
    <View
      style={{
        backgroundColor: "white",
        marginHorizontal: 30,
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
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{
            width: 80,
            height: 80,
            borderWidth: 1,
            borderColor: "grey",
            borderRadius: 50,
            marginRight: 10,
          }}
          source={{
            uri: image ? image : "https://aapicosteps.com/wp-content/uploads/2022/01/AapicoSteps-1-e1641994329725.png",
          }}
          resizeMode="contain"
        />
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              textTransform: "capitalize",
            }}
          >
            {FullName.length > 20
              ? FullName.substring(0, 15, -3) + "..."
              : FullName}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              textTransform: "capitalize",
            }}
          >
            {JobTitle}
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              textTransform: "capitalize",
            }}
          >
            {JobLocation}
          </Text>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate("Post_NC", { item: props })
              }
              style={{
                backgroundColor: "steelblue",
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 8,
                marginTop: 10,
                marginRight: 10,
              }}
            >
              <Text
                style={{ fontSize: 18, color: "white", textAlign: "center" }}
              >
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "red",
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 8,
                marginTop: 10,
                marginRight: 10,
              }}
              onPress={() => [
                props.delete(props._id),
                props.navigation.navigate("View_Default"),
              ]}
            >
              <Text
                style={{ fontSize: 18, textAlign: "center", color: "white" }}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {Status === 0 ? null : Status === 1 ? (
        <View
          style={{
            position: "absolute",
            top: "52%",
            right: -18,
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
          }}
        >
          <AntDesign name={"like1"} size={20} color={"green"} />
        </View>
      ) : (
        <View
          style={{
            position: "absolute",
            top: "52%",
            right: -18,
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
          }}
        >
          <AntDesign name={"dislike1"} size={20} color={"red"} />
        </View>
      )}
    </View>
  );
};
export default NewCandidateCard;
