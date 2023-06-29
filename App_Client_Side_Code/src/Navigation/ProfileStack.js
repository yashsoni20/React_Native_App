import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../Screens/BottomTabFiles/Profile/Profile";
import EditProfile from "../Screens/BottomTabFiles/Profile/EditProfile";


const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
}
