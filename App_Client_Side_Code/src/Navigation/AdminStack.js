import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Users from "../Screens/AdminScreens/Users";
import { AntDesign, Entypo } from "react-native-vector-icons";

import JdStack from "./JdStack";

import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator();

export default function AdminStack() {
  return (
      <Tab.Navigator 
        screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Users") {
            iconName = focused ? "user" : "user";
          } else if (route.name === "JdStack") {
            iconName = focused ? "folder1" : "folder1";
          } else if (route.name === "ProfileStack") {
            iconName = focused ? "setting" : "setting";
          }

          // You can return any component that you like here!
          return <AntDesign name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: "#05375a",
        tabBarInactiveTintColor: "gray",
      })}>
        <Tab.Screen name="Users" component={Users} />
        <Tab.Screen name="JdStack" component={JdStack}   />

        <Tab.Screen name="ProfileStack" component={ProfileStack} />
      </Tab.Navigator>
  );
}
