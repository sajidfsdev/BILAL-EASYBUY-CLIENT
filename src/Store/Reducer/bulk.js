import * as Types from "./../Constants/bulk";
const initialState = {
  loaded: false,
  isError: false,
  errorMessage: "",
  bulk: []
};

const Bulk = (state = initialState, action) => {
  //switch starts..
  switch (action.type) {
    case Types.BULK_LOADED_SUCCESS:
      return {
        ...state,
        loaded: true,
        isError: false,
        errorMessage: "",
        bulk: [...action.payload.bulk]
      };
      break;

    case Types.BULK_LOADED_FAIL:
      return {
        ...state,
        loaded: true,
        isError: true,
        errorMessage: action.payload.errorMessage,
        bulk: []
      };
      break;

    case Types.SIMULATE_LOADING:
      return {
        ...state,
        loaded: false,
        isError: false,
        errorMessage: "",
        bulk: []
      };
      break;
    default:
      return state;
  }
  //switch ends....
}; //......................................

export default Bulk;
