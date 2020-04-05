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
  const [errorMessage, setErrorMessage] = useState(
    "Some error occurred due to network erro"
  );

  //use effect starts....
  useEffect(() => {
    handleRetrieveProposals();
  }, []);

  const handleCloseBar = () => {
    setScreen(DEFAULT_SCREEN);
  }; //......................

  const handleShowPlanDetails = (index) => {
    setInstallmentPlan(data[index].installmentPlan);
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
              className={classes.barContainer}
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
    mainGUI = (
      <React.Fragment>
        <Row className={classes.closeBar}>
          <BackspaceIcon
            className={classes.closeIcon}
            onClick={handleCloseBar}
          />
        </Row>
        {/* DownPayment starts... */}
        <Row className={classes.downContainer}>
          <Row className={classes.downLeft}>Down Payment</Row>
          <Row className={classes.downRight}>
            Rs: {installmentPlan.downPayment}
          </Row>
        </Row>
        {/* DownPayment Ends..... */}
        <InstallmentTable installmentPlan={installmentPlan.installmentPlan} />
      </React.Fragment>
    );
  }
  //main GUI ends here.....

  return <React.Fragment>{mainGUI}</React.Fragment>;
}; //............................

export default ProposedScreen;
