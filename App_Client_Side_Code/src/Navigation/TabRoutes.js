import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Entypo } from "react-native-vector-icons";
import PlusStack from "./PlusStack";
import ViewStack from "./ViewStack";
import ProfileStack from "./ProfileStack";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "PlusStack") {
            iconName = focused ? "plus" : "plus";
          } else if (route.name === "ViewStack") {
            iconName = focused ? "profile" : "profile";
          } else if (route.name === "ProfileStack") {
            iconName = focused ? "user" : "user";
          }

          // You can return any component that you like here!
          return <AntDesign name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: "#05375a",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="ViewStack" component={ViewStack} />
      <Tab.Screen name="PlusStack" component={PlusStack} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
}
