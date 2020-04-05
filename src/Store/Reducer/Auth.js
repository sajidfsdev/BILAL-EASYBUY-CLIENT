import * as Types from "./../Constants/Auth";
import AppConsts from "./../../Constants/Strings";

const initialState = {
  auth: false,
  resolved: false,
  token: null,
  name: "",
  email: "",
  type: ""
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.AUTH_PASS:
      sessionStorage.setItem(AppConsts.sessionStorage, action.payload.token);
      sessionStorage.setItem("name", action.payload.name);
      sessionStorage.setItem("email", action.payload.email);
      sessionStorage.setItem("type", action.payload.type);
      return {
        ...state,
        auth: true,
        resolved: true,
        token: action.payload.token,
        name: action.payload.name,
        email: action.payload.email,
        type: action.payload.type
      };
      break;
    case Types.AUTH_FAIL:
      sessionStorage.removeItem(AppConsts.sessionStorage);
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("type");
      return {
        ...state,
        auth: false,
        resolved: true,
        token: null,
        name: "",
        email: "",
        type: ""
      };
      break;
    default:
      return state;
  }
}; //..............................................

export default AuthReducer;
