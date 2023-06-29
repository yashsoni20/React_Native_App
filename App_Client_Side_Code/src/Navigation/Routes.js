import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabRoutes from "./TabRoutes";
import LoginStack from "./LoginStack";

import AdminStack from "./AdminStack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

export default function Routes() {
  // const [userToken, setUserToken] = useState("");

  // AsyncStorage.getItem("ystg")
  //   .then((data) => data)
  //   .then((value) => {
  //     // console.log("yourKey Value:  " + value);
  //     return setUserToken(value);
  //   })
  //   .catch((err) => console.log(err));

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {userToken !== null ? (
          <>
            <Stack.Screen name="TabRoutes" component={TabRoutes} />
            <Stack.Screen name="AdminStack" component={AdminStack} />
            <Stack.Screen name="LoginStack" component={LoginStack} />
          </>
        ) : (
          <>
            <Stack.Screen name="LoginStack" component={LoginStack} />
          </>
        )} */}

        <Stack.Screen name="LoginStack" component={LoginStack} />
        <Stack.Screen name="TabRoutes" component={TabRoutes} />
        <Stack.Screen name="AdminStack" component={AdminStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
