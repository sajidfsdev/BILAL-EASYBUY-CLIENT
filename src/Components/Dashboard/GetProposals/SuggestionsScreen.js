import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Row from "./../../../UI/Row/ELXRow";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DetailsTable from "./ProductDetailsTable";
import InstallmentTable from "./../../Home_ProductDetails/InstallmentTable/InstallmentTable";
import Paper from "./../../../UI/Paper/Paper";
import { Button } from "@material-ui/core";
import Axios from "axios";
import AppConsts from "./../../../Constants/Strings";
import { useSelector } from "react-redux";
import CircularProgressBar from "./../../../UI/CircularProgressBar/CircularProgressBar";
import DraggableDialog from "./../../../UI/DraggableDialogue/DraggableDialogue";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import ConstructPlan from "./ConstructPlan";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  capsule: {
    width: "95%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    alignItems: "center",
    marginTop: "30px",
    cursor: "pointer",
    height: "30px",
    borderRadius: "15px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  loadingScreen: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
  },
  emptyMessage: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
    color: theme.palette.primary.main,
    fontSize: "18px",
  },

  detailsContainer: {
    width: "95%",
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
  },

  detailsTitle: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
    fontSize: "18px",
    color: "#fff",
    height: "30px",
    backgroundColor: theme.palette.primary.main,
  },

  detailsBackIcon: {
    fontSize: "22px",
    cursor: "pointer",
  },
  middleTitle: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "20px",
    color: theme.palette.primary.main,
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
  paddingDiv: {
    marginTop: "30px",
  },
  btnDiv: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btnAccept: {
    backgroundColor: "green",
    "&:hover": {
      backgroundColor: "green",
    },
  },
  btnReject: {
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "red",
    },
  },

  textArea: {
    minWidth: "300px",
  },

  dialogueBtnRow: {
    width: "100%",
    marginTop: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  btn: {
    color: "white",
  },
}));

const LOADING_SCREEN = "LOADINGSCREEN";
const DETAIL_SCREEN = "DETAILSCREEN";
const DEFAULT_SCREEN = "DEGAULTSCREEN";
const EMPTY_SCREEN = "EMPTYSCREEN";
const CONSTRUCT_PLAN = "CONSTRUCT_PLAN";

const SuggestionsScreen = (props) => {
  //styles init...
  const classes = useStyles();

  const [proposals, setProposals] = useState([]);
  const [screen, setScreen] = useState(LOADING_SCREEN);
  const [currentPlan, setCurrentPlan] = useState(null);
  const token_RP = useSelector((state) => state.auth.token);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [comment, setComment] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const data = [];
    props.data.forEach((elem) => {
      if (elem.productId._id == props.productId) {
        data.push(elem);
      }
    });
    setProposals(data);
    setScreen(DEFAULT_SCREEN);
  }, []);

  //Handle refresh proposals starts...

  const handleShowSnackbar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  }; //........................handle show snack bar ends

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handleRefreshProposals = (id) => {
    setScreen(DEFAULT_SCREEN);
    const refreshed = [...proposals.filter((elem) => elem._id != id)];
    setProposals([...refreshed]);

    props.delete(id);
    if (refreshed.length == 0) {
      props.goBack();
    }
  };

  //Methods starts...
  const handleChangeStatus = async (status, comment = "") => {
    setScreen(LOADING_SCREEN);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-vendor": token_RP,
      },
    };

    const id = currentPlan._id;
    const proposal = {
      status,
      comment,
    };

    const body = JSON.stringify({
      id,
      proposal,
    });

    try {
      const res = await Axios.post(
        AppConsts.server + "/vendor/proposal/update",
        body,
        config
      );

      if (res) {
        setScreen(DEFAULT_SCREEN);
        handleRefreshProposals(id);
      } else {
        setScreen(DEFAULT_SCREEN);

        handleShowSnackbar("Network error has occurred", "error");
      }
    } catch (err) {
      setScreen(DEFAULT_SCREEN);
      if (err.response) {
        handleShowSnackbar(err.response.data.errorMessage, "error");
      } else {
        handleShowSnackbar(err.message, "error");
      }
    }
  }; //...................................

  const handleSelectProposal = (proposal) => {
    setCurrentPlan(proposal);
    setScreen(DETAIL_SCREEN);
  }; //.....................................

  //main GUI man starts....
  let mainGUI = null;

  if (screen == LOADING_SCREEN) {
    mainGUI = (
      <Row className={classes.loadingScreen}>
        <CircularProgressBar size={40} color="secondary" />
      </Row>
    );
  } else if (screen == DEFAULT_SCREEN) {
    mainGUI = (
      <Row>
        {proposals.map((elem, index) => {
          return (
            <Row
              key={index}
              className={classes.capsule}
              onClick={() => {
                handleSelectProposal(elem);
              }}
            >
              <Row>{index + 1}</Row>
              <Row>{`Proposal # ${index + 1}`}</Row>
              <Row>Pending</Row>
            </Row>
          );
        })}
      </Row>
    );
  } else if (screen == EMPTY_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.emptyMessage}>
          There are no proposals to Retrieve
        </Row>
      </React.Fragment>
    );
  } else if (screen == CONSTRUCT_PLAN) {
    mainGUI = (
      <ConstructPlan
        back={() => {
          setScreen(DETAIL_SCREEN);
        }}
        data={currentPlan}
        refresh={(id) => {
          setScreen(DEFAULT_SCREEN);
          handleRefreshProposals(id);
        }}
      />
    );
  } else if (screen == DETAIL_SCREEN) {
    mainGUI = (
      <Row className={classes.detailsContainer}>
        <Row className={classes.detailsTitle}>
          <Row>
            <ArrowBackIcon
              className={classes.detailsBackIcon}
              onClick={() => {
                setScreen(DEFAULT_SCREEN);
              }}
            />
          </Row>
          <Row> Proposal Details</Row>
          <Row></Row>
        </Row>
        <Paper className={classes.middleTitle}>GENERAL INFORMATION</Paper>

        {/* Details table starts */}
        <Row
          style={{
            marginTop: "20px",
          }}
        >
          <DetailsTable state={currentPlan.productId} />
        </Row>
        {/* Details Table ends here... */}

        <Paper className={classes.middleTitle}>INSTALLMENT PLAN</Paper>

        {/* DownPayment starts... */}
        <Row className={classes.downContainer}>
          <Row className={classes.downLeft}>Down Payment</Row>
          <Row className={classes.downRight}>
            Rs: {currentPlan.installmentPlan.downPayment}
          </Row>
        </Row>
        {/* DownPayment Ends..... */}

        {/* Installment Plan table starts */}
        <Row
          style={{
            marginTop: "20px",
          }}
        >
          <InstallmentTable
            installmentPlan={currentPlan.installmentPlan.installmentPlan}
          />
        </Row>
        {/* Installment Plan Table ends here... */}

        <Row className={classes.paddingDiv}></Row>

        <Row className={classes.btnDiv}>
          <Button
            className={classes.btnAccept}
            variant="contained"
            color="primary"
            onClick={() => {
              handleChangeStatus("ACCEPT");
            }}
          >
            Accept
          </Button>
          <Button
            className={classes.btnReject}
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenDialogue(true);
            }}
          >
            Reject
          </Button>
          <Button
            onClick={() => {
              setScreen(CONSTRUCT_PLAN);
            }}
            variant="contained"
            color="primary"
          >
            Suggest
          </Button>
        </Row>

        <Row className={classes.paddingDiv}></Row>
      </Row>
    );
  }

  return (
    <React.Fragment>
      <DraggableDialog
        open={openDialogue}
        title="Reason Of Rejection"
        handleClose={() => {
          setOpenDialogue(false);
        }}
      >
        <Row className={classes.dialogueContainer}>
          <Row className={classes.dialogueTitle}>Why You Reject This?</Row>
          <Row className={classes.dialogueTextArea}>
            <TextareaAutosize
              className={classes.textArea}
              aria-label="Comment"
              rowsMin={5}
              colsMin={10}
              placeholder="Comment..."
              value={comment}
              onChange={handleCommentChange}
            />
          </Row>
          <Row className={classes.dialogueBtnRow}>
            <Button
              variant="contained"
              className={classes.btnAccept + " " + classes.btn}
              onClick={() => {
                if (comment != "") {
                  handleChangeStatus("REJECT", comment);
                  setOpenDialogue(false);
                }
              }}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              className={classes.btnReject + " " + classes.btn}
              onClick={() => {
                setOpenDialogue(false);
              }}
            >
              Cancel
            </Button>
          </Row>
        </Row>
      </DraggableDialog>
      {mainGUI}
    </React.Fragment>
  );
}; //...........................

export default SuggestionsScreen;
