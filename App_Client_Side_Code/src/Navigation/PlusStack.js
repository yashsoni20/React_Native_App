import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Post_Jd from "../Screens/BottomTabFiles/Plus/P_JD";
import Post_NC from "../Screens/BottomTabFiles/Plus/P_NewCandidate";
import Plus_Default from "../Screens/BottomTabFiles/Plus/Plus_Default";

const Stack = createStackNavigator();

export default function PlusStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Plus_Default" component={Plus_Default} />
      <Stack.Screen name="Post_NC" component={Post_NC} />
      <Stack.Screen name="Post_JD" component={Post_Jd} />
    </Stack.Navigator>
  );
}
