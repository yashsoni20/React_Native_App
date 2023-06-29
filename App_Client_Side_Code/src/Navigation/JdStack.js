import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Jds from "../Screens/AdminScreens/Jds";
import Jdinside from "../Screens/AdminScreens/Jdinside";
const Stack = createNativeStackNavigator();

function JdStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen  name="Jds" component={Jds}  />
      <Stack.Screen name="Jdinside" component={Jdinside} />
    </Stack.Navigator>
  );
}

export default JdStack;