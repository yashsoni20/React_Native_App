import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  V_Candidates,
  V_JD,
  View_Options,
  View_JD,
  SingleProfile,
} from "../Screens";

import View_Default from "../Screens/BottomTabFiles/View/View_Default";

import Post_NC from "../Screens/BottomTabFiles/Plus/P_NewCandidate";
import JdSingleProfile from "../Screens/BottomTabFiles/View/JD_Screens/JdsingleProfile";
import NcSingleProfile from "../Screens/BottomTabFiles/View/NewCandidates_Screens/NcSingleProfile";
import Post_JD from "../Screens/BottomTabFiles/Plus/P_JD";
// import JdSingleProfile from "../Screens/BottomTabFiles/View/JD_Screens/JdsingleProfile";

const Stack = createStackNavigator();

export default function ViewStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="View_Default" component={View_Default} />
      <Stack.Screen name="V_Candidates" component={V_Candidates} />
      <Stack.Screen name="V_JD" component={V_JD} />
      <Stack.Screen name="Post_NC" component={Post_NC} />
      <Stack.Screen name="Post_JD" component={Post_JD} />
      <Stack.Screen name="JdSingleProfile" component={JdSingleProfile} />
      <Stack.Screen name="NcSingleProfile" component={NcSingleProfile} />
    </Stack.Navigator>
  );
}
