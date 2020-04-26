import React, { useReducer } from "react";
import FullScreenDialogue from "./../../UI/FullScreenDialogue/FullScreenDialogue";
import Row from "./../../UI/Row/ELXRow";
import Container from "./../../UI/container/container";
import Input from "./../../UI/Input/Input";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Cities from "./cities";
import Reducer from "./reducer";
import InitialState from "./initialState";
import * as Types from "./Types";
import Validations from "./../../Utils/Methods/validation";
import LinearProgressBar from "./../../UI/LinearProgress/LinearProgress";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import useStyles from "./Register.styles";

//redux ...
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../Store/Action/Register";
import * as ReduxTypes from "./../../Store/Constants/Register";

const Register = (props) => {
  //classes init...
  const classes = useStyles();

  //state management...

  //redux state...
  const showRegister_RP = useSelector((state) => state.register.showRegister);
  const buffer_RP = useSelector((state) => state.register.buffer);
  const errorMessage_RP = useSelector((state) => state.register.errorMessage);
  const registered_RP = useSelector((state) => state.register.registered);
  const dispatch_RP = useDispatch();
  const [state, dispatch] = React.useReducer(Reducer, InitialState);

  const handleClose = () => {
    dispatch_RP(Actions.handleHideRegister());
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    dispatch_RP({
      type: ReduxTypes.START_BUFFERRING,
    });
    const vendor = {};
    vendor.name = state.name;
    vendor.email = state.email;
    vendor.title = state.title;
    vendor.city = state.city;
    vendor.address = state.address;
    vendor.contact = state.contact;
    vendor.password = state.password;

    dispatch_RP(Actions.handleRegistration(vendor));
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    if (Validations.isEmpty(value)) {
      dispatch({
        type: Types.SET_NAMEERROR,
        payload: {
          name: value,
          errorMessage: "Name Cannot Be Empty",
        },
      });
    } else {
      dispatch({
        type: Types.SET_NAME,
        payload: {
          name: value,
        },
      });
    }
  }; //..............................Handle Name Change

  const handleEmailChange = (event) => {
    const value = event.target.value;
    if (Validations.isEmpty(value)) {
      dispatch({
        type: Types.SET_EMAILERROR,
        payload: {
          email: value,
          errorMessage: "Please Enter Email",
        },
      });
    } else if (Validations.isEmail(value)) {
      dispatch({
        type: Types.SET_EMAIL,
        payload: {
          email: value,
        },
      });
    } else {
      dispatch({
        type: Types.SET_EMAILERROR,
        payload: {
          email: value,
          errorMessage: "Email Does Not Match With Pattern",
        },
      });
    }
  }; //..............................Handle Email Change

  const handleTitleChange = (event) => {
    const value = event.target.value;
    if (Validations.isEmpty(value)) {
      dispatch({
        type: Types.SET_TITLEERROR,
        payload: {
          title: value,
          errorMessage: "Please Enter Shop Title",
        },
      });
    } else {
      dispatch({
        type: Types.SET_TITLE,
        payload: {
          title: value,
        },
      });
    }
  }; //..............................Handle Name Change

  const handleCityChange = (value) => {
    if (Validations.isEmpty(value) || value === null) {
      dispatch({
        type: Types.SET_CITYERROR,
        payload: {
          city: value,
          errorMessage: "Please Choose City",
        },
      });
    } else {
      dispatch({
        type: Types.SET_CITY,
        payload: {
          city: value,
        },
      });
    }
  }; //..............................Handle Name Change

  const handleAddressChange = (event) => {
    const value = event.target.value;
    if (Validations.isEmpty(value)) {
      dispatch({
        type: Types.SET_ADDRESSERROR,
        payload: {
          address: value,
          errorMessage: "Please Enter Shop Address",
        },
      });
    } else {
      dispatch({
        type: Types.SET_ADDRESS,
        payload: {
          address: value,
        },
      });
    }
  }; //..............................Handle Name Change

  const handleContactChange = (event) => {
    const value = event.target.value;
    if (Validations.isEmpty(value)) {
      dispatch({
        type: Types.SET_CONTACTERROR,
        payload: {
          contact: value,
          errorMessage: "Please Enter Contact Number",
        },
      });
    } else if (Validations.isMobile(value)) {
      dispatch({
        type: Types.SET_CONTACT,
        payload: {
          contact: value,
        },
      });
    } else {
      dispatch({
        type: Types.SET_CONTACTERROR,
        payload: {
          contact: value,
          errorMessage: "Mobile number not correspond to pattern",
        },
      });
    }
  }; //..............................Handle Contact Change

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    if (Validations.isPassword(value)) {
      dispatch({
        type: Types.SET_PASSWORD,
        payload: {
          password: value,
        },
      });
    } else {
      dispatch({
        type: Types.SET_PASSWORDERROR,
        payload: {
          password: value,
          errorMessage:
            "Password must contains atleast eight characters 1 letter 1 number 1 special case",
        },
      });
    }
  }; //..............................Handle Contact Change

  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    if (value === "") {
      dispatch({
        type: Types.SET_CONFIRM_PASSWORDERROR,
        payload: {
          confirmPassword: value,
          errorMessage: "Password cannot be empty",
        },
      });
    } else if (state.password === value) {
      dispatch({
        type: Types.SET_CONFIRM_PASSWORD,
        payload: {
          confirmPassword: value,
        },
      });
    } else {
      dispatch({
        type: Types.SET_CONFIRM_PASSWORDERROR,
        payload: {
          confirmPassword: value,
          errorMessage: "Password does not match",
        },
      });
    }
  }; //..............................Handle Contact Change

  //return...
  return (
    <FullScreenDialogue open={showRegister_RP} handleClose={handleClose}>
      {registered_RP === false ? (
        <form onSubmit={handleFormSubmission}>
          <Container subContainerClass={classes.title}>
            Create Account (Vendor)
          </Container>
          <Container subContainerClass={classes.inputRow}>
            <Row className={classes.linearBar}>
              {buffer_RP ? (
                <LinearProgressBar
                  color="secondary"
                  className={classes.linear}
                />
              ) : null}
              {errorMessage_RP ? (
                <Row className={classes.errorMessage}>{errorMessage_RP}</Row>
              ) : null}
            </Row>
            <Row className={classes.sections}>
              <Input
                type="text"
                value={state.name}
                error={state.isNameError}
                helperText={state.nameErrorMessage}
                label="Name"
                required
                className={classes.input}
                onChange={handleNameChange}
              />
            </Row>
            <Row className={classes.sections}>
              <Input
                type="text"
                value={state.email}
                error={state.isEmailError}
                helperText={state.emailErrorMessage}
                label="Email"
                required
                className={classes.input}
                onChange={handleEmailChange}
              />
            </Row>
          </Container>
          <Container subContainerClass={classes.inputRow}>
            <Row className={classes.sections}>
              <Input
                type="text"
                label="Shop Title"
                value={state.title}
                error={state.isTitleError}
                helperText={state.titleErrorMessage}
                onChange={handleTitleChange}
                required
                className={classes.input}
              />
            </Row>
            <Row className={classes.sections}>
              <Autocomplete
                id="combo-box-demo"
                options={[...Cities.cities]}
                getOptionLabel={(option) => option}
                value={state.city}
                onChange={(event, value) => {
                  handleCityChange(value);
                }}
                className={classes.input}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Combo box"
                    error={state.isCityError}
                    helperText={state.cityErrorMessage}
                    defaultValue={state.city}
                    required
                    variant="outlined"
                  />
                )}
              />
            </Row>
          </Container>
          <Container subContainerClass={classes.inputRow}>
            <Row className={classes.sections}>
              <Input
                label="Address"
                value={state.address}
                error={state.isAddressError}
                helperText={state.addressErrorMessage}
                onChange={handleAddressChange}
                required
                className={classes.input}
              />
            </Row>
            <Row className={classes.sections}>
              <Input
                type="number"
                label="Contact"
                value={state.contact}
                error={state.isContactError}
                helperText={state.contactErrorMessage}
                onChange={handleContactChange}
                required
                className={classes.input}
              />
            </Row>
          </Container>
          <Container subContainerClass={classes.inputRow}>
            <Row className={classes.sections}>
              <Input
                label="Password"
                type="password"
                value={state.password}
                error={state.isPasswordError}
                helperText={state.passwordErrorMessage}
                onChange={handlePasswordChange}
                required
                className={classes.input}
              />
            </Row>
            <Row className={classes.sections}>
              <Input
                label="Confirm Password"
                type="password"
                value={state.confirmPassword}
                error={state.confirmPasswordError}
                helperText={state.confirmPasswordErrorMessage}
                onChange={handleConfirmPasswordChange}
                required
                className={classes.input}
              />
            </Row>
          </Container>
          <Container subContainerClass={classes.btnRow}>
            <button
              style={{
                cursor: buffer_RP ? "not-allowed" : "pointer",
              }}
              disabled={buffer_RP ? true : false}
              type="submit"
              className={classes.btn}
            >
              REGISTER
            </button>
          </Container>
        </form>
      ) : (
        <Row className={classes.successContainer}>
          <Row className={classes.rowOne}>
            <Row className={classes.successIconDiv}>
              <CheckCircleIcon className={classes.successIcon} />
            </Row>
            <Row className={classes.message}>
              You have been registered successfully
            </Row>
          </Row>
          <Row className={classes.rowTwo}>
            <button
              onClick={() => {
                dispatch_RP({
                  type: ReduxTypes.HIDEREGISTER,
                });
                dispatch_RP({
                  type: ReduxTypes.SHOWSIGNIN,
                });
              }}
              className={classes.successBtn}
            >
              Lets Login
            </button>
          </Row>
        </Row>
      )}
    </FullScreenDialogue>
  );
}; //.......................

export default Register;
