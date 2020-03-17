import * as types from "./../Constants/Register";

const initialState = {
  showSignIn: false,
  showRegister: false
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
    default:
      return state;
  }
}; //..................................................

export default RegisterReducer;
