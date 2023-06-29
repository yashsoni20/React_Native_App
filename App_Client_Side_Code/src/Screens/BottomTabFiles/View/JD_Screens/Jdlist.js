import React from "react";
import { TouchableOpacity, View} from "react-native";
import JdCard from "./JdCard";
import axios from "axios";
import base_url from "../../../../URL/base_URL";

const Jdlist = (props) => {
  const { item } = props;
  const { token } = props;
  const { jdfilter, setJdfilter } = props;

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
      <TouchableOpacity
        style={{ width: "100%" }}
        onPress={() => {
          props.navigation.navigate("JdSingleProfile", { item: item });
        }}
      >
        <JdCard {...item} delete={deleteJd} item={props} />
      </TouchableOpacity>
    </View>
  );
};
export default Jdlist;
