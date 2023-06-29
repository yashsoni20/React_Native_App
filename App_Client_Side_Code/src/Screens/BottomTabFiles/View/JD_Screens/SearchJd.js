import React from "react";
import { StyleSheet, View, Text ,TouchableOpacity} from "react-native";

const SearchJd = (props) => {
  const { jdfilter } = props;
  return (
    <View>
      {jdfilter.length > 0 ? (
        jdfilter.map((item) => (
          <TouchableOpacity
          onPress={() => {props.navigation.navigate("JdSingleProfile" , {item: item})}}
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              padding: 10,
              margin: 10,
              borderRadius: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View>
                <Text style={{ fontSize: 18, fontWeight: "700" }}>
                  {item.JobTitle}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  {item.JobLocation}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "#1c2b49",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "white",
                    fontWeight: "700",
                  }}
                >
                  {item.BaseSalary} $
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: "center" }}>
            No Jds match the selected criteria{" "}
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

export default SearchJd;
