import React from "react";
import Dialogue from "./../../UI/DraggableDialogue/DraggableDialogue";
import Input from "./../../UI/Input/Input";
import Row from "./../../UI/Row/ELXRow";
import Button from "./../../UI/Button/ELXButton";
import LinearProgressBar from "./../../UI/LinearProgress/LinearProgress";
import useStyles from "./signin.styles";

//redux....
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../Store/Action/Register";

const SignIn = props => {
  //styles init...
  const classes = useStyles();

  //state management...
  const showSignIn_RP = useSelector(state => state.register.showSignIn);
  const dispatch_RP = useDispatch();

  //Methods....
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
        <LinearProgressBar color="secondary" />
      </Row>
      <Row className={classes.inputRow}>
        <Input label="username" required className={classes.input} />
      </Row>
      <Row className={classes.inputRow}>
        <Input label="password" required className={classes.input} />
      </Row>
      <Row className={classes.errorRow}>
        sorry username or password is incorrect
      </Row>
      <Row className={classes.btnRow}>
        <Button color="primary" className={classes.btn}>
          SIGNIN
        </Button>
      </Row>
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
