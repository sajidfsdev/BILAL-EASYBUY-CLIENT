import React, { useState, useEffect } from "react";
import useStyles from "./Consigned.styles";
import Row from "./../../../../UI/Row/ELXRow";
import { useSelector } from "react-redux";
import LoadingScreen from "./../../../../Reusable/LoadingScreen";
import ErrorScreen from "./../../../../Reusable/ErrorScreen";
import EmptyScreen from "./../../../../Reusable/ErrorScreen";
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
import DraggableDialogue from "./../../../../UI/DraggableDialogue/DraggableDialogue";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import Spinner from "./../../../../UI/CircularProgressBar/CircularProgressBar";
import { useSnackbar } from "notistack";

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
const SEARCH_BY_NAME = "NAME";
const SEARCH_BY_CONTACT = "CONTACT";
const SEARCH_BY_DATE = "DATE";

const Consigned = (props) => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("Pending");
  const [requests, setRequests] = useState([]);
  const [requestsCopy, setRequestsCopy] = useState([]);
  const token_RP = useSelector((state) => state.auth.token);
  const [screen, setScreen] = useState(LOADING_SCREEN);
  const [currentRequest, setCurrentRequest] = useState();
  const [searchType, setSearchType] = useState(SEARCH_BY_NAME);
  const [searchKeyword, setSearchKeywrod] = useState("");
  const [openDialogue, setOpenDialogue] = useState(false);
  const [reason, setReason] = useState("");
  const [reasonBuffer, setReasonBuffer] = useState(false);
  const [rejectedReuest, setRejectedRequest] = useState();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    handleLoadData();
  }, []);

  const handleShowSnackbar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  }; //.............handle show snackBar

  const handleSearchRecord = (event) => {
    const value = event.target.value;
    setSearchKeywrod(value);

    if (value === "") return setRequestsCopy([...requests]);

    switch (searchType) {
      case SEARCH_BY_NAME:
        return setRequestsCopy([
          ...requests.filter(
            (elem) =>
              elem.buyerId.name.toUpperCase().search(value.toUpperCase()) >= 0
          ),
        ]);
        break;

      case SEARCH_BY_CONTACT:
        return setRequestsCopy([
          ...requests.filter(
            (elem) =>
              elem.buyerId.contact.toUpperCase().search(value.toUpperCase()) >=
              0
          ),
        ]);

        break;

      case SEARCH_BY_DATE:
        return setRequestsCopy([
          ...requests.filter(
            (elem) => elem.date.toUpperCase().search(value.toUpperCase()) >= 0
          ),
        ]);

        break;
    }
  }; //........................handle serahc record

  const filterData = (id) => {
    setRequests([...requests.filter((req) => req._id != id)]);
    setRequestsCopy([...requests.filter((req) => req._id != id)]);
  };

  const handleChangeStatus = async (status, req) => {
    setScreen(LOADING_SCREEN);
    if (status === "REJECTED") {
      setReasonBuffer(true);
    }
    const id = req._id;

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-vendor": token_RP,
      },
    };

    const body = JSON.stringify({
      id: id,
      status: status,
      reason: status === "REJECTED" ? reason : "",
    });

    try {
      const res = await axios.post(
        AppConsts.server + "/vendor/consigned/status",
        body,
        config
      );

      if (res) {
        filterData(id);
        setScreen(DEFAULT_SCREEN);
        setReasonBuffer(false);
        setOpenDialogue(false);
        handleShowSnackbar("Request updated successfully", "success");
      } else {
        setReasonBuffer(false);

        setScreen(DEFAULT_SCREEN);
        handleShowSnackbar("Network error has occurred", "error");
      }
    } catch (err) {
      setReasonBuffer(false);

      if (err.response) {
        setScreen(DEFAULT_SCREEN);
        handleShowSnackbar(err.response.data.errorMessage, "error");
      } else {
        setScreen(DEFAULT_SCREEN);
        handleShowSnackbar(err.message, "error");
      }
    }
  }; //..................................

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
          setRequestsCopy([...res.data.data]);
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
        <ErrorScreen
          handleReload={handleLoadData}
          errorMessage={errorMessage}
        />
      </React.Fragment>
    );
  } else if (screen == EMPTYSCREEN) {
    mainGUI = (
      <React.Fragment>
        <EmptyScreen
          showReloadButton={false}
          errorMessage="Sorry No Requests Exists Against You"
        />
      </React.Fragment>
    );
  } else if (screen == DEFAULT_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.defaultTitle}>Requests For Consignment</Row>
        <Row className={classes.searchBar}>
          <select
            value={searchType}
            onChange={(event) => setSearchType(event.target.value)}
            className={classes.input}
          >
            <option>{SEARCH_BY_NAME}</option>
            <option>{SEARCH_BY_CONTACT}</option>
            <option>{SEARCH_BY_DATE}</option>
          </select>
          <input
            value={searchKeyword}
            onChange={handleSearchRecord}
            type="text"
            className={classes.input}
          />
        </Row>
        <Table headings={headings}>
          {requestsCopy.map((elem, index) => {
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
                  <CheckCircleIcon
                    onClick={(event) => {
                      event.stopPropagation();

                      handleChangeStatus("APPROVED", elem);
                    }}
                    className={classes.tick}
                  />
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  <CancelIcon
                    onClick={(event) => {
                      event.stopPropagation();
                      // handleChangeStatus("REJECTED", elem);
                      setRejectedRequest(elem);
                      setOpenDialogue(true);
                    }}
                    className={classes.cross}
                  />
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
      <DraggableDialogue
        open={openDialogue}
        handleClose={() => {
          if (reasonBuffer === true) {
            return;
          }
          setOpenDialogue(false);
        }}
        title="Provide reason for rejection"
      >
        <Row
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Reason"
            className={classes.textArea}
            value={reason}
            onChange={(event) => setReason(event.target.value)}
          />
          <Row className={classes.dialogueBtnRow}>
            <Button
              onClick={(event) => {
                setReasonBuffer(true);
                handleChangeStatus("REJECTED", rejectedReuest);
              }}
              color="primary"
              variant="contained"
            >
              {reasonBuffer ? (
                <Spinner color="secondary" size={30} />
              ) : (
                "Reject"
              )}
            </Button>
          </Row>
        </Row>
      </DraggableDialogue>
    </React.Fragment>
  );
}; //.......................

export default Consigned;
