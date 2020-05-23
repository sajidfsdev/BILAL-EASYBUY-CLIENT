import React, { useState, useEffect } from "react";
import Row from "./../../../UI/Row/ELXRow";
import useStyles from "./Consigned.styles";
import CircularProgressBar from "./../../../UI/CircularProgressBar/CircularProgressBar";
import PendingScreen from "./Pending";
import ApprovedScreen from "./Approved";
import RejectedScreen from "./Rejected";
import AppConsts from "./../../../Constants/Strings";
import { useSelector } from "react-redux";
import axios from "axios";
import CachedIcon from "@material-ui/icons/Cached";
import { Button } from "@material-ui/core";
import ErrorScreen from "./../../../Reusable/ErrorScreen";

const LOADING_SCREEN = "LOADINGSCREEN";
const DEFAULT_SCREEN = "DEFAULTSCREEN";
const ERROR_SCREEN = "ERRORSCREEN";
const EMPTY_SCREEN = "EMPTYSCREEN";

const Consigned = (props) => {
  //styles init...
  const classes = useStyles();
  const [screen, setScreen] = useState(DEFAULT_SCREEN);
  const [subScreen, setSubScreen] = useState("PENDING"); //PENDING,APPROVED,REJECTED
  const token_RP = useSelector((state) => state.auth.token);
  const [errorMessage, setErrorMessage] = useState("");
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  useEffect(() => {
    handleFetchedAllConsignments();
  }, []);

  const handleFetchedAllConsignments = async () => {
    setScreen(LOADING_SCREEN);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-buyer": token_RP,
      },
    };

    const body = JSON.stringify({
      status: "PENDING",
    });

    //try catch starts...
    try {
      const res = await axios.post(
        AppConsts.server + "/buyer/consigned/fetch",
        body,
        config
      );
      if (res) {
        //window.alert("RES has come");
        console.log(res.data.data);
        if (res.data.data.length == 0) {
          setScreen(EMPTY_SCREEN);
        } else {
          setPending([
            ...res.data.data.filter((elem) => elem.status == "PENDING"),
          ]);
          setApproved([
            ...res.data.data.filter((elem) => elem.status == "APPROVED"),
          ]);
          setRejected([
            ...res.data.data.filter((elem) => elem.status == "REJECTED"),
          ]);
          setScreen(DEFAULT_SCREEN);
        }
      }
    } catch (err) {
      setScreen(ERROR_SCREEN);
      if (err.response) {
        //window.alert(err.response.data.errorMessage);
        setErrorMessage(err.response.data.errorMessage);
      } else {
        //window.alert(err.message);
        setErrorMessage(err.message);
      }
    }
    //try catch ends.....
  }; //.................Handle fetch all consignments

  //Main GUI...
  let mainGUI = null;

  if (screen == EMPTY_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <ErrorScreen
          errorMessage={"No collaborator has been added yet!"}
          showreloadButton={false}
        />
      </React.Fragment>
    );
  } else if (screen == ERROR_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <ErrorScreen
          errorMessage={errorMessage}
          handleReload={handleFetchedAllConsignments}
        />
      </React.Fragment>
    );
  } else if (screen == DEFAULT_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.container}>
          <Row className={classes.subContainer}>
            <Row className={classes.bar}>
              <Row
                onClick={() => {
                  setSubScreen("PENDING");
                }}
                className={
                  subScreen == "PENDING" ? classes.activelink : classes.link
                }
              >
                PENDING
              </Row>
              <Row
                onClick={() => {
                  setSubScreen("APPROVED");
                }}
                className={
                  subScreen == "APPROVED" ? classes.activelink : classes.link
                }
              >
                APPROVED
              </Row>

              <Row
                onClick={() => {
                  setSubScreen("REJECTED");
                }}
                className={
                  subScreen == "REJECTED" ? classes.activelink : classes.link
                }
              >
                REJECTED
              </Row>
            </Row>

            <Row className={classes.screen}>
              {subScreen == "PENDING" ? (
                <PendingScreen data={pending} />
              ) : subScreen == "APPROVED" ? (
                <ApprovedScreen data={approved} />
              ) : (
                <RejectedScreen
                  reloadData={handleFetchedAllConsignments}
                  data={rejected}
                />
              )}
            </Row>
          </Row>
        </Row>
      </React.Fragment>
    );
  } else if (screen == LOADING_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.progress}>
          <CircularProgressBar size={30} color="secondary" />
        </Row>
      </React.Fragment>
    );
  }

  //return starts....
  return (
    <React.Fragment>
      <Row className={classes.screenArea}>{mainGUI}</Row>
    </React.Fragment>
  );
  //return ends......
}; //..........................

export default Consigned;
