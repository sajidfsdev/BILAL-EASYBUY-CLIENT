import * as Types from "./Types";

export default (state, action) => {
  switch (action.type) {
    case Types.SET_NAME:
      return {
        ...state,
        name: action.payload.name,
        isNameError: false,
        nameErrorMessage: ""
      };
      break;
    case Types.SET_NAMEERROR:
      return {
        ...state,
        name: action.payload.name,
        isNameError: true,
        nameErrorMessage: action.payload.errorMessage
      };
      break;
    case Types.SET_EMAIL:
      return {
        ...state,
        email: action.payload.email,
        isEmailError: false,
        emailErrorMessage: ""
      };
      break;
    case Types.SET_EMAILERROR:
      return {
        ...state,
        email: action.payload.email,
        isEmailError: true,
        emailErrorMessage: action.payload.errorMessage
      };
      break;
    case Types.SET_TITLE:
      return {
        ...state,
        title: action.payload.title,
        isTitleError: false,
        titleErrorMessage: ""
      };
      break;
    case Types.SET_TITLEERROR:
      return {
        ...state,
        title: action.payload.title,
        isTitleError: true,
        titleErrorMessage: action.payload.errorMessage
      };
      break;
    case Types.SET_CITY:
      return {
        ...state,
        city: action.payload.city,
        isCityError: false,
        cityErrorMessage: ""
      };
      break;
    case Types.SET_CITYERROR:
      return {
        ...state,
        city: action.payload.city,
        isCityError: true,
        cityErrorMessage: action.payload.errorMessage
      };
      break;
    case Types.SET_ADDRESS:
      return {
        ...state,
        address: action.payload.address,
        isAddressError: false,
        addressErrorMessage: ""
      };
      break;
    case Types.SET_ADDRESSERROR:
      return {
        ...state,
        address: action.payload.address,
        isAddressError: true,
        addressErrorMessage: action.payload.errorMessage
      };
      break;
    case Types.SET_CITY:
      return {
        ...state,
        city: action.payload.city,
        isCityError: false,
        cityErrorMessage: ""
      };
      break;
    case Types.SET_CITYERROR:
      return {
        ...state,
        city: action.payload.city,
        isCityError: true,
        cityErrorMessage: action.payload.errorMessage
      };
      break;
    case Types.SET_CONTACT:
      return {
        ...state,
        contact: action.payload.contact,
        isContactError: false,
        contactErrorMessage: ""
      };
      break;
    case Types.SET_CONTACTERROR:
      return {
        ...state,
        contact: action.payload.contact,
        isContactError: true,
        contactErrorMessage: action.payload.errorMessage
      };
      break;
    case Types.SET_PASSWORD:
      return {
        ...state,
        password: action.payload.password,
        isPasswordError: false,
        passwordErrorMessage: ""
      };
      break;
    case Types.SET_PASSWORDERROR:
      return {
        ...state,
        password: action.payload.password,
        isPasswordError: true,
        passwordErrorMessage: action.payload.errorMessage
      };
      break;
    case Types.SET_CONFIRM_PASSWORD:
      return {
        ...state,
        confirmPassword: action.payload.confirmPassword,
        confirmPasswordError: false,
        confirmPasswordErrorMessage: ""
      };
      break;
    case Types.SET_CONFIRM_PASSWORDERROR:
      return {
        ...state,
        confirmPassword: action.payload.confirmPassword,
        confirmPasswordError: true,
        confirmPasswordErrorMessage: action.payload.errorMessage
      };
      break;
    default:
      return state;
  }
}; //ending.......................
