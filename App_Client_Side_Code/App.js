import * as React from "react";
import { View, Text, LogBox } from "react-native";
import Routes from "./src/Navigation/Routes";
import Toast from "react-native-toast-message";
import "react-native-gesture-handler";
// Context api
import NetInfo from "@react-native-community/netinfo";
import Auth from "./src/Context/store/Auth";
import { GestureHandlerRootView } from "react-native-gesture-handler";


//Avoid Warnings On App
LogBox.ignoreAllLogs(true);

// Check internet connection status
// const unsubscribe = NetInfo.addEventListener((state) => {
//   // console.log("Connection type", state.type);
//   // console.log("Is connected?", state.isConnected);
//   if (state.isConnected == false) {
//     alert("Turn On Your Mobile Network Or Wifi");
//   } else {
//     alert("Chalriyo Tharo net");
//   }
// });

// 1063311498529-p8kq3in7igsuim76vsno2btudmdln61g.apps.googleusercontent.com web cliwent
// 1063311498529-s7nfdd2jbm5jl4shu8cpnu4cd9tj7t1p.apps.googleusercontent.com android
const App = () => {
  return (
    <Auth>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Routes />
        <Toast forwardref={(ref) => Toast.setRef(ref)} />
        <GestureHandlerRootView />
        
      </View>
    </Auth>
  );
};

export default App;
