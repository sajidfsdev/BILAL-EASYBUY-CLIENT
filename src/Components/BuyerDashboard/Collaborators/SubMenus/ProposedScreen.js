import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Row from "./../../../../UI/Row/ELXRow";
import AppConsts from "./../../../../Constants/Strings";
import axios from "axios";
import CircularProgressBar from "./../../../../UI/CircularProgressBar/CircularProgressBar";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import CachedIcon from "@material-ui/icons/Cached";
import InstallmentTable from "./../../../AddProduct/SuccessScreen/InstallmentTable";
import BackspaceIcon from "@material-ui/icons/Backspace";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import EventNoteIcon from "@material-ui/icons/EventNote";
import { compareAsc, format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  progress: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
  },
  downContainer: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  downLeft: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },

  downRight: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
  },

  emptyRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "30px",
    fontSize: "20px",
    color: theme.palette.primary.main,
  },
  errorContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  },
  errorMessage: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    color: "red",
    marginBottom: "20px",
  },

  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: "30px",
  },

  barContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    height: "30px",
    marginBottom: "20px",
    alignItems: "center",
    borderRadius: "20px",
    cursor: "pointer",
  },
  acceptBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "green",
    color: "white",
    height: "30px",
    marginBottom: "20px",
    alignItems: "center",
    borderRadius: "20px",
    cursor: "pointer",
  },
  rejectBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    height: "30px",
    marginBottom: "20px",
    alignItems: "center",
    borderRadius: "20px",
    cursor: "pointer",
  },
  suggestedBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#d6ba26",
    color: "white",
    height: "30px",
    marginBottom: "20px",
    alignItems: "center",
    borderRadius: "20px",
    cursor: "pointer",
  },

  sr: {
    marginLeft: "20px",
  },
  status: {
    marginRight: "20px",
  },
  closeBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: "20px",
    marginBottom: "20px",
  },

  closeIcon: {
    color: "red",
    cursor: "pointer",
  },
  acceptTitle: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    fontSize: "15px",
    alignItems: "center",
  },
  rejectTitle: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    fontSize: "15px",
    alignItems: "center",
    color: "red",
  },
  tick: {
    color: "green",
    fontSize: "30px",
  },
  acceptBtn: {
    backgroundColor: "green",
    color: "#fff",
    "&:hover": {
      backgroundColor: "green",
      color: "#fff",
    },
  },
  rejectBtn: {
    backgroundColor: "red",
    color: "#fff",
    "&:hover": {
      backgroundColor: "red",
      color: "#fff",
    },
  },

  acceptBtnRow: {
    width: "100%",
    marginTop: "10px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cross: {
    color: "red",
    fontSize: "30px",
  },
  rejectContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  rejectTitle: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "10px",
    marginBottom: "10px",
    fontWeight: "bold",
    fontSize: "15px",
    color: "red",
  },

  rejectComment: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "10px",
    marginBottom: "10px",
    fontSize: "15px",
  },
  suggestedContainer: {
    width: "100%",
    marginTop: "5px",
    marginBottom: "5px",
    height: "30px",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    color: "white",
  },
  suggestedOptions: {
    marginLeft: "30px",
    cursor: "pointer",
  },
  activeOption: {
    color: "gold",
    marginLeft: "30px",
    cursor: "pointer",
  },
}));

const LOADING_SCREEN = "LOADINGSCREEN";
const DEFAULT_SCREEN = "DEFAULTSCREEN";
const ERROR_SCREEN = "ERRORSCREEN";
const EMPTY_SCREEN = "EMPTYSCREEN";
const DETAILS_SCREEN = "DETAILSSCREEN";

const ProposedScreen = (props) => {
  //styles init.....
  const classes = useStyles();

  //token.....
  const token_RP = useSelector((state) => state.auth.token);
  const [screen, setScreen] = useState(LOADING_SCREEN);
  const [data, setData] = useState([]);
  const [installmentPlan, setInstallmentPlan] = useState(null);
  const [currentData, setCurrentData] = useState();
  const [errorMessage, setErrorMessage] = useState(
    "Some error occurred due to network erro"
  );
  const [suggestedScreen, setSuggestedScreen] = useState("ME"); //Me and Vendor

  //use effect starts....
  useEffect(() => {
    handleRetrieveProposals();
  }, []);

  const handleRequestConsignment = async () => {
    let installmentPlan = null;
    if (currentData.status == "SUGGESTED") {
      installmentPlan = currentData.suggestedPlan.installmentPlan;
    } else {
      installmentPlan = currentData.installmentPlan;
    }
    const productId = currentData.productId;
    const product = props.data.productId;
    const vendorId = currentData.vendorId;
    const status = "PENDING";
    let d = new Date();
    const date = format(
      new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()),
      "yyyy-MM-dd"
    );
    const body = JSON.stringify({
      buyerId: currentData.buyerId,
      vendorId: vendorId,
      status: status,
      installmentPlan: installmentPlan,
      product: product,
      productId: productId,
      date: date,
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
        AppConsts.server + "/buyer/consigned/request",
        body,
        config
      );
      if (res) {
        window.alert("RESPONSE HAS COME");
      } else {
        window.alert("NO RESPONSE");
      }
    } catch (err) {
      if (err.response) {
        window.alert("err.response");
        window.alert(err.response.data.errorMessage);
      } else {
        window.alert("err.message");
        window.alert(err.message);
      }
    }
    //try catch ends......
  }; //..................................

  const handleCloseBar = () => {
    setScreen(DEFAULT_SCREEN);
  }; //......................

  const handleShowPlanDetails = (index) => {
    setInstallmentPlan(data[index].installmentPlan);
    setCurrentData(data[index]);
    setScreen(DETAILS_SCREEN);
  }; //.......................Handle show details

  const handleRetrieveProposals = async () => {
    setScreen(LOADING_SCREEN);
    const body = JSON.stringify({
      productId: props.data.productId._id,
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
        AppConsts.server + "/buyer/proposal/getMyProposals",
        body,
        config
      );

      if (res) {
        if (res.data.data.length === 0) {
          setScreen(EMPTY_SCREEN);
        } else {
          setScreen(DEFAULT_SCREEN);
          setData([...res.data.data]);
        }
      } else {
        setErrorMessage("Network error has occurred. Please try again");
        setScreen(ERROR_SCREEN);
      }
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.errorMessage);
        setScreen(ERROR_SCREEN);
      } else {
        setErrorMessage(err.message);
        setScreen(ERROR_SCREEN);
      }
    }
    //try catch ends......
  }; //.................................

  //main GUI starts here...
  let mainGUI = null;

  if (screen == LOADING_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.progress}>
          <CircularProgressBar size={50} color="secondary" />
        </Row>
      </React.Fragment>
    );
  } else if (screen == EMPTY_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.emptyRow}>
          You have made no suggestions to vendor
        </Row>
      </React.Fragment>
    );
  } else if (screen == ERROR_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.errorContainer}>
          <Row className={classes.errorMessage}>{errorMessage}</Row>
          <Row className={classes.errorButton}>
            <Button
              startIcon={<CachedIcon />}
              variant="contained"
              color="primary"
              onClick={handleRetrieveProposals}
            >
              Refresh
            </Button>
          </Row>
        </Row>
      </React.Fragment>
    );
  } else if (screen == DEFAULT_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.container}>
          {data.map((elem, index) => (
            <Row
              // className={classes.barContainer}
              className={
                elem.status == "PENDING"
                  ? classes.barContainer
                  : elem.status == "ACCEPT"
                  ? classes.acceptBar
                  : elem.status == "REJECT"
                  ? classes.rejectBar
                  : classes.suggestedBar
              }
              key={index}
              onClick={() => {
                handleShowPlanDetails(index);
              }}
            >
              <Row className={classes.sr}>{index + 1}</Row>
              <Row className={classes.rowtitle}>
                Proposed Plan # {index + 1}
              </Row>
              <Row className={classes.status}>{elem.status}</Row>
            </Row>
          ))}
        </Row>
      </React.Fragment>
    );
  } else if (screen == DETAILS_SCREEN) {
    if (currentData.status == "SUGGESTED") {
      mainGUI = (
        <React.Fragment>
          <Row className={classes.closeBar}>
            <BackspaceIcon
              className={classes.closeIcon}
              onClick={handleCloseBar}
            />
          </Row>
          <Row className={classes.acceptTitle}>
            <Row>
              <EventNoteIcon className={classes.tick} />
            </Row>
            <div
              style={{
                width: "20px",
              }}
            ></div>
            <Row>Vendor Suggested His Plan Against Your Plan</Row>
          </Row>
          <Row className={classes.suggestedContainer}>
            <Row
              className={
                suggestedScreen == "ME"
                  ? classes.activeOption
                  : classes.suggestedOptions
              }
              onClick={() => {
                setSuggestedScreen("ME");
              }}
            >
              Your Plan
            </Row>
            <Row
              className={
                suggestedScreen == "VENDOR"
                  ? classes.activeOption
                  : classes.suggestedOptions
              }
              onClick={() => {
                setSuggestedScreen("VENDOR");
              }}
            >
              Siggested Plan
            </Row>
          </Row>
          <Row className={classes.suggestedScreen}>
            {suggestedScreen == "ME" ? (
              <React.Fragment>
                <Row className={classes.downContainer}>
                  <Row className={classes.downLeft}>Down Payment</Row>
                  <Row className={classes.downRight}>
                    Rs: {installmentPlan.downPayment}
                  </Row>
                </Row>
                <InstallmentTable
                  installmentPlan={installmentPlan.installmentPlan}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Row className={classes.downContainer}>
                  <Row className={classes.downLeft}>Down Payment</Row>
                  <Row className={classes.downRight}>
                    Rs: {currentData.suggestedPlan.installmentPlan.downPayment}
                  </Row>
                </Row>
                <InstallmentTable
                  installmentPlan={
                    currentData.suggestedPlan.installmentPlan.installmentPlan
                  }
                />
                <Row className={classes.acceptBtnRow}>
                  <Button
                    onClick={handleRequestConsignment}
                    className={classes.acceptBtn}
                  >
                    Request Consignment
                  </Button>
                </Row>
              </React.Fragment>
            )}
          </Row>
        </React.Fragment>
      );
    } else {
      mainGUI = (
        <React.Fragment>
          <Row className={classes.closeBar}>
            <BackspaceIcon
              className={classes.closeIcon}
              onClick={handleCloseBar}
            />
          </Row>

          {currentData.status == "ACCEPT" ? (
            <Row className={classes.acceptTitle}>
              <Row>
                <CheckCircleIcon className={classes.tick} />
              </Row>
              <div
                style={{
                  width: "20px",
                }}
              ></div>
              <Row>Your Plan Has Been Accepted Successfully</Row>
            </Row>
          ) : currentData.status == "REJECT" ? (
            <Row className={classes.rejectTitle}>
              <Row>
                <CancelIcon className={classes.cross} />
              </Row>
              <div
                style={{
                  width: "20px",
                }}
              ></div>
              <Row>Your Plan Has Been Rejected By Vendor</Row>
            </Row>
          ) : null}

          {/* DownPayment starts... */}
          <Row className={classes.downContainer}>
            <Row className={classes.downLeft}>Down Payment</Row>
            <Row className={classes.downRight}>
              Rs: {installmentPlan.downPayment}
            </Row>
          </Row>
          {/* DownPayment Ends..... */}
          <InstallmentTable installmentPlan={installmentPlan.installmentPlan} />
          {currentData.status == "REJECT" ? (
            <Row className={classes.rejectContainer}>
              <Row className={classes.rejectTitle}>Reason Of Rejection</Row>
              <Row className={classes.rejectComment}>{currentData.comment}</Row>
            </Row>
          ) : null}
          {currentData.status == "ACCEPT" ? (
            <Row className={classes.acceptBtnRow}>
              <Button
                onClick={handleRequestConsignment}
                className={classes.acceptBtn}
              >
                Request Consignment
              </Button>
            </Row>
          ) : null}
          {currentData.status == "REJECT" ? (
            <Row className={classes.acceptBtnRow}>
              <Button className={classes.rejectBtn}>DELETE</Button>
            </Row>
          ) : null}
        </React.Fragment>
      );
    }
  }
  //main GUI ends here.....

  return <React.Fragment>{mainGUI}</React.Fragment>;
}; //............................

export default ProposedScreen;
