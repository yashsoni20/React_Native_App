import React from "react";
import { StyleSheet, View, Text, SafeAreaView,Button } from "react-native";

export default function LogoScreen({ navigation }) {
  setTimeout(() => {
    navigation.navigate("Splash");
  },3500);
  return (
    <View>
      <SafeAreaView style={Styles.layout}>
        <Text style={{fontSize:40,fontWeight:'900',color:'blue'}}>Aifetch</Text>
      </SafeAreaView>
    </View>
  );
}
const Styles = StyleSheet.create({
  layout: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width:"100%",
    height:'100%'
  },
});
