import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SignIn, SignUp, SplashScreen } from "../Screens";
import TabRoutes from "./TabRoutes";
import AdminStack from "./AdminStack";
const Stack = createNativeStackNavigator();


function LoginStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Sign_In" component={SignIn} />
      <Stack.Screen name="Sign_Up" component={SignUp} />
      <Stack.Screen name="TabRoutes" component={TabRoutes} />
      <Stack.Screen name="AdminStack" component={AdminStack} />
      
    </Stack.Navigator>
  );
}

export default LoginStack;
