import * as types from "./../Constants/Register";

const initialState = {
  showSignIn: false,
  showRegister: false,
  buffer: false,
  signInBuffer: false,
  signInErrorMessage: "",
  isSignInError: false,
  isError: false,
  errorMessage: "",
  registered: false
};

const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOWSIGNIN:
      return {
        ...state,
        showSignIn: true,
        showRegister: false
      };
      break;
    case types.SHOWREGISTER:
      return {
        ...state,
        showRegister: true,
        showSignIn: false
      };
      break;
    case types.HIDESIGNIN:
      return {
        ...state,
        showSignIn: false
      };
      break;
    case types.HIDEREGISTER:
      return {
        ...state,
        showRegister: false
      };
      break;

    case types.START_BUFFERRING:
      return {
        ...state,
        buffer: true
      };
      break;
    case types.END_BUFFERRING:
      return {
        ...state,
        buffer: false
      };
      break;

    case types.REGISTERED_SUCCESS:
      return {
        ...state,
        buffer: false,
        isError: false,
        errorMessage: "",
        registered: true
      };
      break;

    case types.REGISTERED_FAILED:
      return {
        ...state,
        buffer: false,
        isError: true,
        errorMessage: action.payload.errorMessage,
        registered: true
      };
      break;

    case types.START_SIGNIN_BUFFERRING:
      return {
        ...state,
        signInBuffer: true
      };
      break;

    case types.END_SIGNIN_BUFFERRING:
      return {
        ...state,
        signInBuffer: false
      };
      break;

    case types.SIGNIN_FAILED:
      return {
        ...state,
        showSignIn: true,
        signInBuffer: false,
        signInErrorMessage: action.payload.errorMessage,
        isSignInError: true
      };
      break;
    default:
      return state;
  }
}; //..................................................

export default RegisterReducer;
