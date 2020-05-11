import * as Types from "./../Constants/bulk";
import axios from "axios";
import AppConsts from "./../../Constants/Strings";

export const handleGetAllProducts = () => {
  const body = JSON.stringify({
    action: "get all products",
  });

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //return starts...
  return async (dispatch) => {
    //try catch starts..
    try {
      const res = await axios.post(
        AppConsts.server + "/buyer/products/getAllProducts",
        body,
        config
      );

      if (res) {
        return dispatch({
          type: Types.BULK_LOADED_SUCCESS,
          payload: {
            bulk: [
              ...res.data.data.filter(
                (elem) => elem.vendorId.hibernate === false
              ),
            ],
          },
        });
      } else {
        return dispatch({
          type: Types.BULK_LOADED_FAIL,
          payload: {
            errorMessage: "Unable To Load Products. Please try again",
          },
        });
      }
    } catch (err) {
      if (err.response) {
        return dispatch({
          type: Types.BULK_LOADED_FAIL,
          payload: {
            errorMessage: err.response.data.errorMessage,
          },
        });
      } else {
        return dispatch({
          type: Types.BULK_LOADED_FAIL,
          payload: {
            errorMessage: err.message,
          },
        });
      }
    }
    //try catch ends....
  };
  //return ends.....
}; //....................................Get all products
