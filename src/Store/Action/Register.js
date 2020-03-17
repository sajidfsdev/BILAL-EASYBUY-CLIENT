import * as Types from "./../Constants/Register";

export const handleShowSignin = () => {
  return {
    type: Types.SHOWSIGNIN
  };
};

export const handleShowRegister = () => {
  return {
    type: Types.SHOWREGISTER
  };
};

export const handleHideSignIn = () => {
  return {
    type: Types.HIDESIGNIN
  };
};

export const handleHideRegister = () => {
  return {
    type: Types.HIDEREGISTER
  };
};
