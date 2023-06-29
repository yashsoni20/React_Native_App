import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Dimensions
} from "react-native";

const JdFilter = (props) => {
  return (
      <ScrollView bounces={true} horizontal={true} style = {{backgroundColor:'red' ,margin:10 , padding:10}}>
          <TouchableOpacity
            key={1}
            onPress={() => {
              props.jdfilter('all'), props.setActive(-1)
            }}
          >
            <View
              style={[
                styles.center,
                { margin: 10, borderRadius:10 },
                props.active == -1 ? styles.active : styles.inactive
              ]}
            >
              <Text style={{ color: "black", fontStyle: "italic",padding:5 }}>All</Text>
            </View>
          </TouchableOpacity>
          {props.jd.map((item) => (
            <TouchableOpacity
              key={item._id}
              onPress={() => {
                props.jdfilter(item._id),
                  props.setActive(props.jd.indexOf(item))
              }}
            >
              <View
                style={[
                  styles.center,
                  { margin: 10,borderRadius:10 , width: widths*0.5},
                  props.active == props.jd.indexOf(item)
                    ? styles.active
                    : styles.inactive,
                ]}
              >
                <Text style={{ color: "black", fontStyle: "italic" , padding:5}}>
                  {item.JobTitle}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    
  );
};


const { height, width } = Dimensions.get('screen');
const heights = height;
const widths = width;

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",

  },
  active: {
    backgroundColor: "#03bafc",
  },
  inactive: {
    backgroundColor: "#a0e1eb",
  },
});

export default JdFilter;
