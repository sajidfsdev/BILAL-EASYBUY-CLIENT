import React, { useEffect, useState } from "react";
import Row from "./../../../../../UI/Row/ELXRow";
import Input from "./../../../../../UI/Input/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Validators from "./../../../../../Utils/Methods/validation";
import * as Types from "./../../../../../Components/BuyerDashboard/Collaborators/types";
import Button from "@material-ui/core/Button";
import InstallmentTable from "./../../../../../UI/InstallmentTable/InstallmentTable";
import BodyBuilder from "./../../../../../pages/AddProducts/BodyBuilder";
import { useSelector } from "react-redux";
import axios from "axios";
import AppConsts from "./../../../../../Constants/Strings";
import useStyles from "./MakeInstallments.styles";
import CircularProgressBar from "./../../../../../UI/CircularProgressBar/CircularProgressBar";
import { useSnackbar } from "notistack";

const LOADING_SCREEN = "LOADINGSCREEN";
const SUCCESS_MESSAGE_SCREEN = "SUCCESSMESSAGESCREEN";
const ERROR_SCREEN = "ERROR_SCREEN";
const DEFAULT_SCREEN = "DEFAULTSCREEN";

const StepThree = (props) => {
  //classes...
  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  //selections....
  const token_RP = useSelector((state) => state.auth.token);

  //state management starts....
  const [screen, setScreen] = useState(DEFAULT_SCREEN);

  //Use effect....
  useEffect(() => {
    if (props.state.installmentPlan.length != 0) {
      return;
    }
    props.dispatch({
      type: Types.SET_DOWNPAYMENT_SUCCESS,
      payload: {
        downPayment: props.state.price,
      },
    });
  }, []);

  useEffect(() => {
    //Price-(DownPayment-InstallmentPlan)
    let installments = 0;
    props.state.installmentPlan.forEach((elem) => {
      installments = parseInt(installments) + parseInt(elem.installment);
    });
    //window.alert("Installments: " + installments);
    //window.alert("Downpayment: " + props.state.downPayment);

    const buffer = parseInt(props.state.downPayment) + parseInt(installments);
    //window.alert("Buffer: " + buffer);
    //window.alert("Price: " + props.state.price);

    const remaining = parseInt(props.state.price) - parseInt(buffer);

    //window.alert("Remaining: " + remaining);
    if (remaining < 0) {
      props.dispatch({
        type: Types.SET_REMAINING_FAIL,
        payload: {
          remaining: remaining,
          errorMessage: "Installment Plan Is Incorrect",
        },
      });
    } else {
      props.dispatch({
        type: Types.SET_REMAINING_SUCCESS,
        payload: {
          remaining: remaining,
        },
      });
    }
  }, [props.state.price, props.state.downPayment, props.state.installmentPlan]);

  //Methods...

  const handleShowSnackBar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  const handleFormSubmission = async () => {
    setScreen(LOADING_SCREEN);
    let installments = 0;
    props.state.installmentPlan.forEach((elem) => {
      installments = parseInt(installments) + parseInt(elem.installment);
    });
    if (props.state.installmentPlan.length === 0 || installments === 0) {
      setScreen(DEFAULT_SCREEN);
      return handleShowSnackBar(
        "Please make at least one installments",
        "error"
      );
    } else if (props.state.remaining !== 0) {
      setScreen(DEFAULT_SCREEN);
      return handleShowSnackBar(
        "You have remaining Amount. Please adjust it",
        "error"
      );
    } else {
      const installmentPlan = {
        installmentPlan: props.state.installmentPlan,
        downPayment: props.state.downPayment,
        duration: props.state.duration,
      };
      const body = JSON.stringify({
        installmentPlan: installmentPlan,
        productId: props.data.productId._id,
        vendorId: props.data.productId.vendorId._id,
        status: "PENDING",
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-eptoken-buyer": token_RP,
        },
      };

      //try catch starts....
      try {
        const res = await axios.post(
          AppConsts.server + "/buyer/proposal/propose",
          body,
          config
        );
        if (res) {
          setScreen(DEFAULT_SCREEN);
          props.goBack();
        } else {
          handleShowSnackBar("Network Error Has Occurred", "error");
          setScreen(DEFAULT_SCREEN);
        }
      } catch (err) {
        setScreen(DEFAULT_SCREEN);
        if (err.response) {
          handleShowSnackBar(err.response.data.errorMessage, "error");
        } else {
          handleShowSnackBar(err.message, "error");
        }
      }
      //try catch ends......
      //   dispatch_RP(Actions.handleAddProduct(token_RP, body));
    }
  }; //...............................Handle Form Submission

  const handleInstallmentInputChange = (event, index) => {
    const value = event.target.value;
    let installments = 0;
    props.state.installmentPlan.forEach((elem, ind) => {
      if (ind != index) {
        installments = parseInt(installments) + parseInt(elem.installment);
      }
    });
    //window.alert("Installments: " + installments);
    const buffer = parseInt(props.state.downPayment) + parseInt(installments);
    //window.alert("Buffer: " + buffer);
    if (parseInt(value) + parseInt(buffer) > parseInt(props.state.price)) {
      // if (value > buffer) {
      //window.alert("Value less than buffer");
      //setting back starts...
      const copiedArr = [];
      props.state.installmentPlan.forEach((e, i) => {
        if (i == index) {
          //window.alert("i==index");
          copiedArr.push({
            duration: e.duration,
            installment: value,
            isError: true,
            errorMessage: "Installment value increased",
          });
        } else {
          copiedArr.push(e);
        }
      });
      props.dispatch({
        type: Types.SET_INSTALLMENTPLAN_SUCCESS,
        payload: {
          installmentPlan: [...copiedArr],
        },
      });
      //setting back ends.....
    } else if (value < 1) {
      //window.alert("Value Less than 1");
      //setting back starts...
      const copiedArr = [];
      props.state.installmentPlan.forEach((e, i) => {
        if (i == index) {
          //window.alert("i==index");
          copiedArr.push({
            duration: e.duration,
            installment: value,
            isError: true,
            errorMessage: "Installment cannot be less than 1",
          });
        } else {
          copiedArr.push(e);
        }
      });
      props.dispatch({
        type: Types.SET_INSTALLMENTPLAN_SUCCESS,
        payload: {
          installmentPlan: [...copiedArr],
        },
      });
      //setting back ends.....
    } else {
      //setting back starts...
      //window.alert("else");
      const copiedArr = [];
      props.state.installmentPlan.forEach((e, i) => {
        if (i == index) {
          //window.alert("i==index");
          copiedArr.push({
            duration: e.duration,
            installment: value,
            isError: false,
            errorMessage: "",
          });
        } else {
          copiedArr.push(e);
        }
      });
      props.dispatch({
        type: Types.SET_INSTALLMENTPLAN_SUCCESS,
        payload: {
          installmentPlan: [...copiedArr],
        },
      });
      //setting back ends.....
    }
  }; //..................................Handle Installment Input Chnage

  const handleChangeDownPayment = (event) => {
    const value = event.target.value;
    //Down Payment < price + installemts && >0
    let installments = 0;
    props.state.installmentPlan.forEach((elem) => {
      installments = parseInt(installments) + parseInt(elem.installment);
    });
    //window.alert("Installments; " + installments);
    const buffer = parseInt(props.state.price) + parseInt(installments);
    //window.alert("Buffer is: " + buffer);
    if (value > buffer) {
      props.dispatch({
        type: Types.SET_DOWNPAYMENT_FAIL,
        payload: {
          downPayment: value,
          errorMessage: "Down Payment has increased total amount    ",
        },
      });
    } else if (value < 1) {
      props.dispatch({
        type: Types.SET_DOWNPAYMENT_FAIL,
        payload: {
          downPayment: value,
          errorMessage: "Down Payment cannot be less than 1",
        },
      });
    } else {
      props.dispatch({
        type: Types.SET_DOWNPAYMENT_SUCCESS,
        payload: {
          downPayment: value,
        },
      });
    }
  }; //................................Handle Down Payment

  const handleDeleteRow = (index) => {
    const copiedArray = [];
    props.state.installmentPlan.forEach((elem, ind) => {
      if (ind != index) {
        copiedArray.push(elem);
      }
    });
    props.dispatch({
      type: Types.SET_INSTALLMENTPLAN_SUCCESS,
      payload: {
        installmentPlan: [...copiedArray],
      },
    });
  }; //.............................Handle delete row

  const handleAddInstallment = () => {
    const copiedArray = [...props.state.installmentPlan];
    copiedArray.push({
      duration: props.state.duration,
      installment: 0,
      isError: true,
      errorMessage: "Installment Cannot Be less than 1",
    });
    props.dispatch({
      type: Types.SET_INSTALLMENTPLAN_SUCCESS,
      payload: {
        installmentPlan: [...copiedArray],
      },
    });
  }; //...............................copied Array

  const handleChangeDuration = (event) => {
    const value = event.target.value;
    props.dispatch({
      type: Types.SET_DURATION_SUCCESS,
      payload: {
        duration: value,
      },
    });
    const copiedArray = [];
    props.state.installmentPlan.forEach((elem) => {
      copiedArray.push({
        duration: value,
        installment: elem.installment,
        isError: elem.isError,
        errorMessage: elem.errorMessage,
      });
    });
    props.dispatch({
      type: Types.SET_INSTALLMENTPLAN_SUCCESS,
      payload: {
        installmentPlan: [...copiedArray],
      },
    });
  }; //..................................Hand;e Change Duraion

  const handlePriceChange = (event) => {
    const value = event.target.value;
    if (Validators.isEmpty(value)) {
      props.dispatch({
        type: Types.SET_PRICE_FAIL,
        payload: {
          errorMessage: "Product Price cannot be empty",
          price: value,
        },
      });
    } else if (Validators.isNumeric(value) === false) {
      props.dispatch({
        type: Types.SET_PRICE_FAIL,
        payload: {
          errorMessage: "Price Must Be Numeric Value",
          price: value,
        },
      });
    } else if (value < 1) {
      props.dispatch({
        type: Types.SET_PRICE_FAIL,
        payload: {
          errorMessage: "Price must be greater than 0",
          price: value,
        },
      });
    } else {
      props.dispatch({
        type: Types.SET_PRICE_SUCCESS,
        payload: {
          price: value,
        },
      });
    }
  }; //..................................Handle Price Change

  //GUI MANIPULATON STARTS......
  let mainGUI = null;
  if (screen == LOADING_SCREEN) {
    mainGUI = (
      <Row className={classes.progress}>
        <CircularProgressBar size={50} color="secondary" />
      </Row>
    );
  } else {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.container}>
          <Row className={classes.row}>
            <Row className={classes.left}>
              <Input
                type="text"
                label="Total Price (Rs)"
                value={props.state.price}
                helperText={props.state.priceErrorMessage}
                error={props.state.isPriceError}
                onChange={handlePriceChange}
                className={classes.input}
              />
            </Row>
            <Row className={classes.right}>
              <Input
                type="text"
                label="Remaining (Rs)"
                readonly
                value={props.state.remaining}
                error={props.state.isRemainingError}
                helperText={props.state.remainingErrorMessage}
                className={classes.input}
              />
            </Row>
          </Row>
        </Row>

        <Row className={classes.container}>
          <Row className={classes.selectRow}>
            <Row className={classes.leftSelect}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Duration Title
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  className={classes.input}
                  value={props.state.duration}
                  onChange={handleChangeDuration}
                  label="Duration Title"
                >
                  <MenuItem value={"Month"}>Month</MenuItem>
                  <MenuItem value={"Week"}>Week</MenuItem>
                </Select>
              </FormControl>
            </Row>
            <Row className={classes.rightSelect}>
              <Button
                onClick={handleAddInstallment}
                variant="contained"
                color="primary"
              >
                ADD Installment
              </Button>
            </Row>
          </Row>
        </Row>

        <Row className={classes.container}>
          <Row className={classes.stripRow}>
            <Row className={classes.leftStrip}>Down Payment</Row>
            <Row className={classes.rightStrip}>
              <Input
                type="text"
                className={classes.downInput}
                label="Down Payment"
                value={props.state.downPayment}
                error={props.state.isDownpaymentError}
                helperText={props.state.downPaymentErrorMessage}
                onChange={handleChangeDownPayment}
              />
            </Row>
          </Row>
        </Row>

        <Row className={classes.container}>
          <Row className={classes.row}>
            <InstallmentTable
              data={props.state.installmentPlan}
              handleDeleteRow={handleDeleteRow}
              handleInstallmentInputChange={handleInstallmentInputChange}
            />
          </Row>
        </Row>

        <Row className={classes.nextcontainer}>
          <Row className={classes.nextrow}>
            <Button
              onClick={handleFormSubmission}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </Row>
        </Row>
      </React.Fragment>
    );
  }
  //GUI MANIPULATION ENDS......

  //return starts...
  return <React.Fragment>{mainGUI}</React.Fragment>;
  //return ends.....
}; //.......................

export default StepThree;
