import React, { useState, useEffect } from "react";
import useStyles from "./Consigned.styles";
import Row from "./../../../../UI/Row/ELXRow";
import { useSelector } from "react-redux";
import LoadingScreen from "./../../../../Reusable/LoadingScreen";
import ErrorScreen from "./../../../../Reusable/ErrorScreen";
import EmptyScreen from "./../../../../Reusable/EmptyScreen";
import axios from "axios";
import AppConsts from "./../../../../Constants/Strings";
import Table from "./../../../../Reusable/Table";
import TableRow from "./../../../../Reusable/TableRow";
import TableCell from "./../../../../Reusable/TableCell";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import Backspace from "@material-ui/icons/Backspace";
import Gallery from "./../../../../Reusable/Gallery";
import DownPayment from "./../../../../Reusable/DownPayment";
import InstallmentPlan from "./../../../../Reusable/InstallmentPlan";
//screen consts...
const LOADING_SCREEN = "LOADINGSCREEN";
const DEFAULT_SCREEN = "DEFAULTSCREEN";
const ERROR_SCREEN = "ERRORSCREEN";
const EMPTYSCREEN = "EMPTYSCREEN";
const DETAILS_SCREEN = "DETAILSSCREEN";
const headings = [
  "SR",
  "PRODUCT",
  "BUYER",
  "CONTACT",
  "Data",
  "Approve",
  "Reject",
];

const Consigned = (props) => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("Pending");
  const [requests, setRequests] = useState([]);
  const token_RP = useSelector((state) => state.auth.token);
  const [screen, setScreen] = useState(LOADING_SCREEN);
  const [currentRequest, setCurrentRequest] = useState();

  useEffect(() => {
    handleLoadData();
  }, []);

  const handleRowClick = (request) => {
    setCurrentRequest(request);
    setScreen(DETAILS_SCREEN);
  }; //...........................Handle Request select

  //................
  const handleLoadData = async () => {
    setScreen(LOADING_SCREEN);

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-vendor": token_RP,
      },
    };

    const body = JSON.stringify({
      status: "PENDING",
    });

    try {
      const res = await axios.post(
        AppConsts.server + "/vendor/consigned/get",
        body,
        config
      );
      if (res) {
        if (res.data.data.length == 0) {
          setScreen(EMPTYSCREEN);
        } else {
          setRequests([...res.data.data]);
          setScreen(DEFAULT_SCREEN);
          console.log("Pending requests");
          console.log(res.data.data);
        }
      } else {
        setScreen(ERROR_SCREEN);
        setErrorMessage("Failed To Load Resources Due To Network Error");
      }
    } catch (err) {
      setScreen(ERROR_SCREEN);
      if (err.response) {
        setErrorMessage(err.response.data.errorMessage);
      } else {
        setErrorMessage(err.message);
      }
    }
  }; //..................handle load data

  //main GUI starts...
  let mainGUI = null;
  if (screen == LOADING_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <LoadingScreen size={40} />
      </React.Fragment>
    );
  } else if (screen == ERROR_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <ErrorScreen errorMessage={errorMessage} />
      </React.Fragment>
    );
  } else if (screen == EMPTYSCREEN) {
    mainGUI = (
      <React.Fragment>
        <EmptyScreen message="Sorry No Requests Exists Against You" />
      </React.Fragment>
    );
  } else if (screen == DEFAULT_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.defaultTitle}>Requests For Consignment</Row>
        <Row className={classes.searchBar}>
          <input type="text" className={classes.input} />
          <input type="text" className={classes.input} />
        </Row>
        <Table headings={headings}>
          {requests.map((elem, index) => {
            return (
              <TableRow
                style={{ cursor: "pointer" }}
                onClick={handleRowClick.bind(this, elem)}
                key={index}
              >
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {index + 1}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {elem.product.name}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {elem.buyerId.name}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {elem.buyerId.contact}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {elem.date}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  <CheckCircleIcon className={classes.tick} />
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  <CancelIcon className={classes.cross} />
                </TableCell>
              </TableRow>
            );
          })}
        </Table>
      </React.Fragment>
    );
  } else if (screen == DETAILS_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.defaultTitle}>Requests Details</Row>
        <Row className={classes.backBar}>
          <Backspace
            className={classes.backIcon}
            onClick={() => {
              setScreen(DEFAULT_SCREEN);
            }}
          />
          <Row>{currentRequest.product.name}</Row>
          <Row></Row>
        </Row>

        <Gallery data={currentRequest.product.images} />
        <Table headings={["Product", "Price", "Category", "Buyer", "Contact"]}>
          <TableRow style={{ cursor: "pointer" }}>
            <TableCell style={{ fontSize: "15px" }} align="center">
              {currentRequest.product.name}
            </TableCell>
            <TableCell style={{ fontSize: "15px" }} align="center">
              {currentRequest.product.price}
            </TableCell>
            <TableCell style={{ fontSize: "15px" }} align="center">
              {currentRequest.product.cat}
            </TableCell>
            <TableCell style={{ fontSize: "15px" }} align="center">
              {currentRequest.buyerId.name}
            </TableCell>
            <TableCell style={{ fontSize: "15px" }} align="center">
              {currentRequest.buyerId.contact}
            </TableCell>
          </TableRow>
        </Table>
        <DownPayment downPayment={currentRequest.installmentPlan.downPayment} />
        <InstallmentPlan
          installmentPlan={currentRequest.installmentPlan.installmentPlan}
        />
        <Row
          style={{
            marginTop: "30px",
          }}
        ></Row>
      </React.Fragment>
    );
  }
  //main GUI ends.....

  return (
    <React.Fragment>
      <Row className={classes.container}>
        <Row className={classes.subContainer}>{mainGUI}</Row>
      </Row>
    </React.Fragment>
  );
}; //.......................

export default Consigned;
