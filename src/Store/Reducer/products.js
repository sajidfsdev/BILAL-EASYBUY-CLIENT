import * as Types from "./../Constants/products";

const initialState = {
  cat: [],
  subCat: [],
  subSubCat: [],
  loaded: false,
  isError: false,
  errorMessage: ""
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

    default:
      return state;
  }
}; //.................................................

export default ProductsReducer;
