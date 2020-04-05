import * as Types from "./../Constants/RegisterBuyer";
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
  window.alert("Reached at action");
  const body = JSON.stringify({
    name: vendor.name,
    email: vendor.email,
    city: vendor.city,
    contact: vendor.contact,
    password: vendor.password
  });
  window.alert(body);

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  return async dispatch => {
    try {
      const res = await axios.post(
        AppConsts.server + "/buyer/auth/register",
        body,
        config
      );
      if (res) {
        window.alert("res has come");
        window.alert(res.data.successMessage);
        return dispatch({
          type: Types.REGISTERED_SUCCESS
        });
      } else {
        window.alert("ERROR COME");
        return dispatch({
          type: Types.REGISTERED_FAILED,
          errorMessage: "Network error"
        });
      }
    } catch (err) {
      window.alert("catched error");
      if (err.response) {
        window.alert("response");
        window.alert(err.response.data.errorMessage);
        window.alert(Types.REGISTERED_FAILED);
        return dispatch({
          type: Types.REGISTERED_FAILED,
          payload: {
            errorMessage: err.response.data.errorMessage
          }
        });
      } else {
        window.alert("error");
        window.alert(err.message);
        window.alert(Types.REGISTERED_FAILED);
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
