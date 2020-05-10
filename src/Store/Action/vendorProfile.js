import * as Constants from "./../Constants/vendorProfile";
import axios from "axios";
import AppConsts from "./../../Constants/Strings";

export const handleLoadProfileData = (token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-eptoken-vendor": token,
    },
  };

  const body = JSON.stringify({
    action: "Get all profile data",
  });
  return async (dispatch) => {
    try {
      const res = await axios.post(
        AppConsts.server + "/vendor/auth/get",
        body,
        config
      );

      if (res) {
        return dispatch({
          type: Constants.LOADED_SUCCESS,
          payload: {
            profile: res.data.data,
          },
        });
      } else {
        return dispatch({
          type: Constants.LOADED_FAILED,
          payload: {
            errorMessage: "Failed To Load Resources Due To Network Error",
          },
        });
      }
    } catch (err) {
      if (err.response) {
        return dispatch({
          type: Constants.LOADED_FAILED,
          payload: {
            errorMessage: err.response.data.errorMessage,
          },
        });
      } else {
        return dispatch({
          type: Constants.LOADED_FAILED,
          payload: {
            errorMessage: err.message,
          },
        });
      }
    }
  };
}; //..........................Handle load profile Data

export const handleEditProfileData = (profile, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-eptoken-vendor": token,
    },
  };

  const body = JSON.stringify(profile);
  return async (dispatch) => {
    try {
      const res = await axios.post(
        AppConsts.server + "/vendor/auth/edit",
        body,
        config
      );

      if (res) {
        dispatch({
          type: Constants.LOADED_SUCCESS,
          payload: {
            profile: { ...profile },
          },
        });
        dispatch({
          type: Constants.EDITING_SUCCESS,
        });
        return dispatch({
          type: Constants.CLOSE_DIALOGUR,
        });
      } else {
        return dispatch({
          type: Constants.EDITING_FAILED,
          payload: {
            errorMessage: "Failed To Load Resources Due To Network Error",
          },
        });
      }
    } catch (err) {
      if (err.response) {
        return dispatch({
          type: Constants.EDITING_FAILED,
          payload: {
            errorMessage: err.response.data.errorMessage,
          },
        });
      } else {
        return dispatch({
          type: Constants.EDITING_FAILED,
          payload: {
            errorMessage: err.message,
          },
        });
      }
    }
  };
}; //..........................Handle Edit profile Data

export const handleEditPassword = (oldPassword, password, token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-eptoken-vendor": token,
    },
  };

  const body = JSON.stringify({ password, oldPassword });
  return async (dispatch, getState) => {
    try {
      const res = await axios.post(
        AppConsts.server + "/vendor/auth/editPassword",
        body,
        config
      );

      if (res) {
        dispatch({
          type: Constants.LOADED_SUCCESS,
          payload: {
            profile: { ...getState().vendorProfile.profile },
          },
        });
        dispatch({
          type: Constants.EDITING_SUCCESS,
        });
        return dispatch({
          type: Constants.CLOSE_DIALOGUR,
        });
      } else {
        window.alert("res has not come");

        return dispatch({
          type: Constants.EDITING_FAILED,
          payload: {
            errorMessage: "Failed To Load Resources Due To Network Error",
          },
        });
      }
    } catch (err) {
      if (err.response) {
        window.alert("err.response" + err.response.data.errorMessage);

        return dispatch({
          type: Constants.EDITING_FAILED,
          payload: {
            errorMessage: err.response.data.errorMessage,
          },
        });
      } else {
        window.alert("err.response" + err.response);
        return dispatch({
          type: Constants.EDITING_FAILED,
          payload: {
            errorMessage: err.message,
          },
        });
      }
    }
  };
}; //..........................Handle Edit profile Data
