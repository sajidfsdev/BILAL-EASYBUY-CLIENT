import React, { useState, useEffect } from "react";
import Row from "./../../UI/Row/ELXRow";
import Table from "./../../Reusable/Table";
import TableRow from "./../../Reusable/TableRow";
import TableCell from "./../../Reusable/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import SaveIcon from "@material-ui/icons/Save";
import Tooltip from "./../../UI/Tooltip/Tooltip";
import useStyles from "./Register.styles";
import LoadingScreen from "./../../Reusable/LoadingScreen";
import axios from "axios";
import AppConsts from "./../../Constants/Strings";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { compareAsc, format } from "date-fns";
import { withRouter } from "react-router-dom";
import { useSnackbar } from "notistack";

const DEFAULT_SCREEN = "DEFAULT_SCREEN";
const LOADING_SCREEN = "LOADING_SCREEN";

const Register = (props) => {
  const classes = useStyles();
  const [downCheck, setDownCheck] = useState(props.data.downCheck);
  const [completion, setCompletion] = useState(false);
  const [checkedArray, setCheckedArray] = useState([
    ...props.data.checkedArray,
  ]);
  const [downDate, setDownDate] = useState(props.data.downDate);
  const [installmentsDates, setInstallmentsDates] = useState([
    ...props.data.installmentsDates,
  ]);
  const [screen, setScreen] = useState(DEFAULT_SCREEN);
  const id_RP = useSelector((state) => state.auth.token);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    checkIsCompleted();
  }, []);

  const handleShowSnackbar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  }; //........................handle show snackbar

  const checkIsCompleted = () => {
    if (downCheck === false) {
      return setCompletion(false);
    }
    let allDone = true;
    checkedArray.forEach((elem) => {
      if (elem == false) {
        allDone = false;
      }
    });
    if (allDone === true) {
      setCompletion(true);
    } else {
      setCompletion(false);
    }
  };

  const handleAddDownDate = () => {
    let d = new Date();
    const date = format(
      new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()),
      "yyyy-MM-dd"
    );
    setDownDate(date);
  }; //...........................
  const handleRemoveDownDate = () => {
    setDownDate("");
  }; //...........................

  const handleAddInstallmentsDates = (index) => {
    let d = new Date();
    const date = format(
      new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()),
      "yyyy-MM-dd"
    );
    const copiedData = [...installmentsDates];
    copiedData[index] = date;
    setInstallmentsDates([...copiedData]);
  };
  const handleRemoveInstallmentsDates = (index) => {
    const copiedData = [...installmentsDates];
    copiedData[index] = "";
    setInstallmentsDates([...copiedData]);
  };

  const handleDoFinish = async () => {
    setScreen(LOADING_SCREEN);
    let remaining = false;
    if (downCheck === false) {
      // return window.alert(
      //   "You Cannot Complete Installments Plan Untill All Payments Complete"
      // );
      return handleShowSnackbar(
        "You Cannot Complete Installments Plan Untill All Payments Complete",
        "error"
      );
    }

    checkedArray.forEach((elem) => {
      if (elem == false) {
        remaining = true;
      }
    });

    if (remaining === true) {
      // return window.alert(
      //   "You Cannot Complete Installments Plan Untill All Payments Complete"
      // );
      return handleShowSnackbar(
        "You Cannot Complete Installments Plan Untill All Payments Complete",
        "error"
      );
    }
    ///////Ready to Complete........
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-vendor": id_RP,
      },
    };
    let d = new Date();
    const date = format(
      new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()),
      "yyyy-MM-dd"
    );

    const body = JSON.stringify({
      id: props.data._id,
      status: "COMPLETED",
      date: date,
      downDate: downDate,
      installmentsDates: installmentsDates,
    });

    //try catch starts.....
    try {
      const res = await axios.post(
        AppConsts.server + "/vendor/consigned/finish",
        body,
        config
      );
      if (res) {
        setScreen(DEFAULT_SCREEN);

        //window.alert("Record Updated Successfully");
        props.history.push("/dashboard/history");
        handleShowSnackbar("Installments Completed Successfully", "success");
      } else {
        setScreen(DEFAULT_SCREEN);

        //window.alert("Network Error");
        handleShowSnackbar("Network error", "error");
      }
    } catch (err) {
      setScreen(DEFAULT_SCREEN);
      if (err.response) {
        //window.alert(err.response.data.errorMessage);
        handleShowSnackbar(err.response.data.errorMessage, "error");
      } else {
        //window.alert(err.message);
        handleShowSnackbar(err.response, "error");
      }
    }
    //try catch ends.......
  };

  const handleUpdateInstallment = async () => {
    setScreen(LOADING_SCREEN);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-vendor": id_RP,
      },
    };

    const body = JSON.stringify({
      downCheck,
      checkedArray,
      downDate,
      installmentsDates,
      id: props.data._id,
    });
    try {
      const res = await axios.post(
        AppConsts.server + "/vendor/consigned/update",
        body,
        config
      );

      if (res) {
        setScreen(DEFAULT_SCREEN);
        //window.alert("Plan Information Saved Successfully");
        checkIsCompleted();
      } else {
        setScreen(DEFAULT_SCREEN);
        window.alert("No response due to netweok error");
      }
    } catch (err) {
      setScreen(DEFAULT_SCREEN);

      if (err.response) {
        window.alert(err.response.data.errorMessage);
      } else {
        window.alert(err.message);
      }
    }
  }; //.................................

  const handleUpdateDownCheck = () => {
    if (!downCheck === true) {
      handleAddDownDate();
    } else {
      handleRemoveDownDate();
    }
    setDownCheck(!downCheck);
  };

  const handleUpdateCheckedArray = (index) => {
    if (!checkedArray[index] === true) {
      handleAddInstallmentsDates(index);
    } else {
      handleRemoveInstallmentsDates(index);
    }
    const copiedCheckedArray = [...checkedArray];
    copiedCheckedArray[index] = !checkedArray[index];
    setCheckedArray([...copiedCheckedArray]);
  };

  let mainGUI = null;

  if (screen == LOADING_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <LoadingScreen />
      </React.Fragment>
    );
  } else if (screen == DEFAULT_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.iconsBar}>
          <Tooltip title="Save Record" placement="top">
            <SaveIcon
              className={classes.saveIcon}
              onClick={handleUpdateInstallment}
            />
          </Tooltip>
        </Row>
        <Table headings={["Title", "Payment", "Date", "Status"]}>
          <TableRow>
            <TableCell style={{ fontSize: "15px" }} align="center">
              Down Payment
            </TableCell>
            <TableCell style={{ fontSize: "15px" }} align="center">
              RS:{props.data.installmentPlan.downPayment}
            </TableCell>
            <TableCell style={{ fontSize: "15px" }} align="center">
              {downDate}
            </TableCell>
            <TableCell style={{ fontSize: "15px" }} align="center">
              <Checkbox
                onChange={() => {
                  handleUpdateDownCheck();
                }}
                checked={downCheck}
                color="primary"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
            </TableCell>
          </TableRow>
          {props.data.installmentPlan.installmentPlan.map((plan, index) => (
            <TableRow key={index}>
              <TableCell style={{ fontSize: "15px" }} align="center">
                {plan.duration + "#" + (parseInt(index) + parseInt(1))}
              </TableCell>
              <TableCell style={{ fontSize: "15px" }} align="center">
                {"Rs: " + plan.installment}
              </TableCell>
              <TableCell style={{ fontSize: "15px" }} align="center">
                {installmentsDates[index]}
              </TableCell>
              <TableCell style={{ fontSize: "15px" }} align="center">
                <Checkbox
                  checked={checkedArray[index]}
                  onChange={() => {
                    handleUpdateCheckedArray(index);
                  }}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </Table>
        {completion ? (
          <Row
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: "5px",
              marginBottom: "10px",
            }}
          >
            <Button
              onClick={handleDoFinish}
              variant="contained"
              color="primary"
            >
              Finish Agreement
            </Button>
          </Row>
        ) : null}
      </React.Fragment>
    );
  }

  return <React.Fragment>{mainGUI}</React.Fragment>;
}; //......................

export default withRouter(Register);
