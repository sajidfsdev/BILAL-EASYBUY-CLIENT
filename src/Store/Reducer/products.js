import * as Types from "./../Constants/products";

const initialState = {
  cat: [],
  subCat: [],
  subSubCat: [],
  loaded: false,
  isError: false,
  errorMessage: "",
  isSaveError: false,
  showSaveMessage: false,
  successMessage: "",
  failureMessage: ""
};

const ProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.ALL_CATS_LOADED_SUCCESS:
      return {
        ...state,
        cat: [...action.payload.cat],
        subCat: [...action.payload.subCat],
        subSubCat: [...action.payload.subSubCat],
        loaded: true,
        isError: false,
        errorMessage: ""
      };
      break;

    case Types.ALL_CATS_LOADED_FAILED:
      return {
        ...state,
        cat: [],
        subCat: [],
        subSubCat: [],
        loaded: true,
        isError: true,
        errorMessage: action.payload.errorMessage
      };
      break;
    case Types.START_BUFFERRING:
      return {
        ...state,
        loaded: false
      };
      break;
    case Types.END_BUFFERRING_WITH_ERROR:
      return {
        ...state,
        isSaveError: true,
        successMessage: "",
        failureMessage: action.payload.errorMessage,
        showSaveMessage: false,
        loaded: true
      };
      break;
    case Types.END_BUFFERRING_WITH_SUCCESS:
      return {
        ...state,
        isSaveError: false,
        successMessage: action.payload.successMessage,
        failureMessage: "",
        showSaveMessage: true,
        loaded: true
      };
      break;

    case Types.REFRESH:
      return {
        ...state,
        isSaveError: false,
        showSaveMessage: false,
        successMessage: "",
        failureMessage: ""
      };
      break;

    default:
      return state;
  }
}; //.................................................

export default ProductsReducer;
