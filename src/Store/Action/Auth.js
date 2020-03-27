import * as Types from "./../Constants/Auth";
import * as Regtypes from "./../Constants/Register";
import * as SignInTypes from "./../Constants/Register";
import axios from "axios";
import AppConsts from "./../../Constants/Strings";

export const handleLogin = (username, password) => {
  const body = JSON.stringify({
    email: username,
    password: password
  });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //return starts....
  return async dispatch => {
    try {
      const res = await axios.post(
        AppConsts.server + "/vendor/auth/login",
        body,
        config
      );

      if (res) {
        console.log(res.data);
        dispatch({
          type: Regtypes.HIDESIGNIN
        });
        return dispatch({
          type: Types.AUTH_PASS,
          payload: {
            token: res.data.token,
            name: res.data.name,
            email: res.data.email
          }
        });
      } else {
        dispatch({
          type: SignInTypes.SIGNIN_FAILED,
          payload: {
            errorMessage: "Network Error"
          }
        });
        return dispatch({
          type: Types.AUTH_FAIL
        });
      }
    } catch (err) {
      if (err.response) {
        dispatch({
          type: SignInTypes.SIGNIN_FAILED,
          payload: {
            errorMessage: err.response.data.errorMessage
          }
        });
        return dispatch({
          type: Types.AUTH_FAIL
        });
      } else {
        dispatch({
          type: SignInTypes.SIGNIN_FAILED,
          payload: {
            errorMessage: err.message
          }
        });
        return dispatch({
          type: Types.AUTH_FAIL
        });
      }
    }
  };
  //return ends......
}; //............................................Handle Login

export const handleAuthChecking = () => {
  return async dispatch => {
    const token = sessionStorage.getItem(AppConsts.sessionStorage);
    const name = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email");
    //window.alert(token);
    //window.alert(name);
    //window.alert(email);
    if (token) {
      //window.alert("App Auth Pass");
      return dispatch({
        type: Types.AUTH_PASS,
        payload: {
          token: token,
          name: name,
          email: email
        }
      });
    } else {
      //window.alert("App Auth Failed");
      return dispatch({
        type: Types.AUTH_FAIL
      });
    }
  };
}; //...................................