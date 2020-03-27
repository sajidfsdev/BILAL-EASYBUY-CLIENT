import InitialState from "./initialState";
import * as Types from "./types";

const Reducer = (state = InitialState, action) => {
  //swicth starts....
  switch (action.type) {
    case Types.SET_CAT_SUCCESS:
      return {
        ...state,
        cat: action.payload.cat,
        isCatError: false,
        catErrorMessage: ""
      };
      break;

    case Types.SET_CAT_FAIL:
      return {
        ...state,
        cat: action.payload.cat,
        isCatError: true,
        catErrorMessage: action.payload.errorMessage
      };
      break;

    case Types.SET_SUBCAT_SUCCESS:
      return {
        ...state,
        subCat: action.payload.subCat,
        isSubCatError: false,
        subCatErrorMessage: ""
      };
      break;

    case Types.SET_SUBCAT_FAIL:
      return {
        ...state,
        subCat: action.payload.subCat,
        isSubCatError: true,
        subCatErrorMessage: action.payload.errorMessage
      };
      break;

    case Types.SET_SUBSUBCAT_SUCCESS:
      return {
        ...state,
        subSubCat: action.payload.subSubCat,
        isSubSubCatError: false,
        subSubCatErrorMessage: ""
      };
      break;

    case Types.SET_SUBSUBCAT_FAIL:
      return {
        ...state,
        subSubCat: action.payload.subSubCat,
        isSubSubCatError: true,
        subSubCatErrorMessage: action.payload.errorMessage
      };
      break;
    case Types.SET_NAME_SUCCESS:
      return {
        ...state,
        name: action.payload.name,
        isNameError: false,
        nameErrorMessage: ""
      };
      break;

    case Types.SET_NAME_FAIL:
      return {
        ...state,
        name: action.payload.name,
        isNameError: true,
        nameErrorMessage: action.payload.errorMessage
      };
      break;
    case Types.SET_PRICE_SUCCESS:
      return {
        ...state,
        price: action.payload.price,
        isPriceError: false,
        priceErrorMessage: ""
      };
      break;

    case Types.SET_PRICE_FAIL:
      return {
        ...state,
        price: action.payload.price,
        isPriceError: true,
        priceErrorMessage: action.payload.errorMessage
      };
      break;

    case Types.SET_CITY_SUCCESS:
      return {
        ...state,
        city: action.payload.city,
        isCityError: false,
        cityErrorMessage: ""
      };
      break;

    case Types.SET_CITY_FAIL:
      return {
        ...state,
        city: action.payload.city,
        isCityError: true,
        cityErrorMessage: action.payload.errorMessage
      };
      break;
    case Types.REFRESH_STATE:
      return {
        ...state,

        cat: "",
        isCatError: false,
        catErrorMessage: "",

        subCat: "",
        isSubCatError: false,
        subCatErrorMessage: "",

        subSubCat: "",
        isSubSubCatError: false,
        subSubCatErrorMessage: ""
      };
      break;

    default:
      return state;
  }
  //switch ends......
}; //............................

export default Reducer;
