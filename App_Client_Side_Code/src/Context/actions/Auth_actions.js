import jwtDecode from "jwt-decode";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import base_url from "../../URL/base_URL";


export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginuser = (user, dispatch) => {
  fetch(`${base_url}Users/login`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Acccept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        const token = data.token;
        AsyncStorage.setItem("jwt", token);
        const decoded = jwtDecode(token);
        dispatch(setCurrentUser(decoded, user));
        console.log(token)
        const user_Id = Object.values(decoded)[0];
        AsyncStorage.setItem("user_Id", user_Id);

        // try {
        //   AsyncStorage.setItem("ystg", JSON.stringify(token));
        //   // AsyncStorage.setItem("yash", JSON.stringify(decoded));
        // } catch (error) {
        //   console.log(error);
        // }
      } else {
        logoutUser(dispatch);
      }
    })
    .catch((err) => {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please provide correct credentials",
        text2: " ",
      });
      logoutUser(dispatch);
    });
};

export const getUserProfile = () => {
  fetch(`${base_url}Users/${id}`, {
    method: "GET",
    body: JSON.stringify(user),
    headers: {
      Acccept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

export const logoutUser = (dispatch) => {
  AsyncStorage.removeItem("jwt");
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded, user) => {
  // console.log(decoded)
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};
