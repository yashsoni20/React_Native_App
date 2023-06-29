import React from "react";
import { StyleSheet, View, Text, Image , TouchableOpacity } from "react-native";

const SearchedNewC = (props) => {
  const { newcfiltered } = props;
  return (
    <View>
      {newcfiltered.length > 0 ? (
        newcfiltered.map((item) => (
          <TouchableOpacity
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              padding: 10,
              margin: 10,
              borderRadius: 10,
            }}
            onPress={() => {
              props.navigation.navigate("NcSingleProfile", { item: item });
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderWidth: 1,
                  borderColor: "grey",
                  borderRadius: 50,
                  marginRight: 10,
                }}
                source={{
                  uri: "https://aapicosteps.com/wp-content/uploads/2022/01/AapicoSteps-1-e1641994329725.png",
                }}
                resizeMode="contain"
              />
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    textTransform: "capitalize",
                  }}
                >
                  {item.FullName}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "500",
                    textTransform: "capitalize",
                  }}
                >
                  {item.JobTitle}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: "center" }}>
            No Candidates match the selected criteria{" "}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchedNewC;
