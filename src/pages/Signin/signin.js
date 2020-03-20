import React, { useState } from "react";
import Dialogue from "./../../UI/DraggableDialogue/DraggableDialogue";
import Input from "./../../UI/Input/Input";
import Row from "./../../UI/Row/ELXRow";
import Button from "./../../UI/Button/ELXButton";
import LinearProgressBar from "./../../UI/LinearProgress/LinearProgress";
import useStyles from "./signin.styles";

//redux....
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../Store/Action/Register";
import * as SignInActions from "./../../Store/Action/Auth";
import * as Types from "./../../Store/Constants/Register";

const SignIn = props => {
  //styles init...
  const classes = useStyles();

  //state management...
  const showSignIn_RP = useSelector(state => state.register.showSignIn);
  const buffer_RP = useSelector(state => state.register.signInBuffer);
  const isError_RP = useSelector(state => state.register.isSignInError);
  const errorMessage_RP = useSelector(
    state => state.register.signInErrorMessage
  );
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch_RP = useDispatch();

  //Methods....

  const handleFormSubmission = event => {
    event.preventDefault();
    dispatch_RP({ type: Types.START_SIGNIN_BUFFERRING });
    dispatch_RP(SignInActions.handleLogin(username, password));
  }; //..................................

  const handleUsernameChange = event => {
    setUserName(event.target.value);
  }; //..................................

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  }; //....................................

  const handleClose = () => {
    dispatch_RP(Actions.handleHideSignIn());
  };

  const handleRegisterAsVendor = () => {
    dispatch_RP(Actions.handleShowRegister());
  };

  return (
    <Dialogue
      open={showSignIn_RP}
      title="Login Your Account"
      className={classes.title}
      handleClose={handleClose}
    >
      <Row className={classes.inputRow}>
        {buffer_RP ? <LinearProgressBar color="secondary" /> : null}
      </Row>
      <form onSubmit={handleFormSubmission}>
        <Row className={classes.inputRow}>
          <Input
            type="text"
            required
            label="username"
            required
            value={username}
            onChange={handleUsernameChange}
            className={classes.input}
          />
        </Row>
        <Row className={classes.inputRow}>
          <Input
            type="password"
            required
            label="password"
            required
            value={password}
            onChange={handlePasswordChange}
            className={classes.input}
          />
        </Row>
        <Row className={classes.errorRow}>
          {isError_RP ? errorMessage_RP : null}
        </Row>
        <Row className={classes.btnRow}>
          <Button
            type="submit"
            disabled={buffer_RP ? true : false}
            style={{
              cursor: buffer_RP ? "not-allowed" : "pointer"
            }}
            color="primary"
            className={classes.btn}
          >
            SIGNIN
          </Button>
        </Row>
      </form>
      <Row className={classes.registerRow}>
        Not have account?Register as &nbsp;
        <a href="#" onClick={handleRegisterAsVendor}>
          Vendor
        </a>
        &nbsp;or&nbsp;
        <a href="#"> Buyer</a>
      </Row>
    </Dialogue>
  );
}; //......................

export default SignIn;
