import * as Types from "./../Constants/Register";
import axios from "axios";
import AppConsts from "./../../Constants/Strings";

export const handleShowSignin = () => {
  return {
    type: Types.SHOWSIGNIN
  };
};

export const handleShowRegister = () => {
  return {
    type: Types.SHOWREGISTER
  };
};

export const handleHideSignIn = () => {
  return {
    type: Types.HIDESIGNIN
  };
};

export const handleHideRegister = () => {
  return {
    type: Types.HIDEREGISTER
  };
};

export const handleRegistration = vendor => {
  const body = JSON.stringify({
    name: vendor.name,
    email: vendor.email,
    title: vendor.title,
    city: vendor.city,
    address: vendor.address,
    contact: vendor.contact,
    password: vendor.password
  });

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  return async dispatch => {
    try {
      const res = await axios.post(
        AppConsts.server + "/vendor/auth/register",
        body,
        config
      );
      if (res) {
        return dispatch({
          type: Types.REGISTERED_SUCCESS
        });
      } else {
        return dispatch({
          type: Types.REGISTERED_FAILED,
          errorMessage: "Network error"
        });
      }
    } catch (err) {
      if (err.response) {
        return dispatch({
          type: Types.REGISTERED_FAILED,
          payload: {
            errorMessage: err.response.data.errorMessage
          }
        });
      } else {
        return dispatch({
          type: Types.REGISTERED_FAILED,
          payload: {
            errorMessage: err.message
          }
        });
      }
    }
  };
}; //....................................Hand;e registratio
