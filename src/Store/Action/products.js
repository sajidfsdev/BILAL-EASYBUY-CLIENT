import * as Types from "./../Constants/products";
import AppConsts from "./../../Constants/Strings";
import axios from "axios";

export const handleLoadAllCats = token => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-eptoken-vendor": token
    }
  };

  //return starts....
  return async dispatch => {
    //try catch starts....
    try {
      const res = await axios.get(
        AppConsts.server + "/vendor/products/getAllCats"
      );

      if (res) {
        //window.alert("res has come");
        console.log(res.data);
        return dispatch({
          type: Types.ALL_CATS_LOADED_SUCCESS,
          payload: {
            cat: [...res.data.cat],
            subCat: [...res.data.subCat],
            subSubCat: [...res.data.subSubCat]
          }
        });
      } else {
        //window.alert("MY Network error");

        return dispatch({
          type: Types.ALL_CATS_LOADED_FAILED,
          payload: {
            errorMessage: "My Network Error"
          }
        });
      }
    } catch (err) {
      if (err.response) {
        //window.alert("response: " + err.response.data.errorMessage);

        return dispatch({
          type: Types.ALL_CATS_LOADED_FAILED,
          payload: {
            errorMessage: err.response.data.errorMessage
          }
        });
      } else {
        //window.alert("ERR: " + err.message);

        return dispatch({
          type: Types.ALL_CATS_LOADED_FAILED,
          payload: {
            errorMessage: err.message
          }
        });
      }
    }
    //try catch ends......
  };
  //return ends......
}; //..................................Handle Load All Cats

export const handleAddProduct = (token, body) => {
  //return starts....
  return async dispatch => {
    dispatch({
      type: Types.START_BUFFERRING
    });
    //window.alert(token);

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-vendor": token
      }
    };

    //try catch starts.....
    try {
      const res = await axios.post(
        AppConsts.server + "/vendor/products/add",
        body,
        config
      );

      if (res) {
        //window.alert("RES Has Come");
        return dispatch({
          type: Types.END_BUFFERRING_WITH_SUCCESS,
          payload: {
            successMessage: "Product Has Been Added Successfully"
          }
        });
      } else {
        //window.alert("Network error");
        return dispatch({
          type: Types.END_BUFFERRING_WITH_ERROR,
          payload: {
            errorMessage: "Network Error Occurred"
          }
        });
      }
    } catch (err) {
      if (err.response) {
        //window.alert("err.response");
        //window.alert(err.response.data.errorMessage);
        return dispatch({
          type: Types.END_BUFFERRING_WITH_ERROR,
          payload: {
            errorMessage: err.response.data.errorMessage
          }
        });
      } else {
        //window.alert("err.");
        //window.alert(err.message);
        return dispatch({
          type: Types.END_BUFFERRING_WITH_ERROR,
          payload: {
            errorMessage: err.message
          }
        });
      }
    }
    //try catch ends.......
  };
  //return ends......
}; //..............................Handle Add Product
