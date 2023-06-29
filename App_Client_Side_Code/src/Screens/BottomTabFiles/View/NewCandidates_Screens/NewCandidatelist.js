import React from "react";
import { TouchableOpacity, View, Text, Dimensions } from "react-native";
import NewCandidateCard from "./NewCandidateCard";
import axios from "axios";
import base_url from "../../../../URL/base_URL";

const width = Dimensions.get("window");
const NewCandidatelist = (props) => {
  const { item } = props;
  const { token } = props;
  const { ncfilter, setncfilter } = props;

  const deleteNC = (id) => {
    axios
      .delete(`${base_url}NewCandidates/${id}`, {
        headers: {
          Authoirization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const NCs = ncfilter.filter((item) => item.id !== id);
        setncfilter(NCs);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => {
          props.navigation.navigate("NcSingleProfile", { item: item });
        }}
      >
        <NewCandidateCard
          {...item}
          delete={deleteNC}
          item={props}
          navigation={props.navigation}
        />
      </TouchableOpacity>
    </View>
  );
};
export default NewCandidatelist;
