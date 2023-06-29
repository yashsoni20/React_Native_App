import React, { useState, useEffect, useReducer } from "react";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Auth_reducers from "../reducers/Auth_reducers";
import { setCurrentUser } from "../actions/Auth_actions";
import AuthGlobal from "./AuthGlobal";

const Auth = (props) => {
  const [stateUser, dispatch] = useReducer(Auth_reducers, {
    isAuthenticated: null,
    user: {}
  });
  const [showChild, setshowChild] = useState(false);

  useEffect(() => {
    setshowChild(true);
    if (AsyncStorage.jwt) {
      const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : "";
      if (setshowChild) {
        dispatch(setCurrentUser(jwtDecode(decoded)));
      } 
    } 
    return () => setshowChild(false);
  }, []);

  if (!showChild) {
    return null;
  } else {
    return (
      <AuthGlobal.Provider
        value={{
          stateUser,
          dispatch,
        }}
      >
        {props.children}
      </AuthGlobal.Provider>
    )
  }
};

export default Auth;
