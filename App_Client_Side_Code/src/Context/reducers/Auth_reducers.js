import { SET_CURRENT_USER } from "../actions/Auth_actions";
import isEmpty from "../../URL/is-empty";

export default function (state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      // console.log(action.payload)
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        userProfile: action.userProfile,
      };
    default:
      return state;
  }
}
