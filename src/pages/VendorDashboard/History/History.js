import React, { useState, useEffect } from "react";
import useStyles from "./History.styles";
import Row from "./../../../UI/Row/ELXRow";
import { useSelector } from "react-redux";
import LoadingScreen from "./../../../Reusable/LoadingScreen";
import ErrorScreen from "./../../../Reusable/ErrorScreen";
import EmptyScreen from "./../../../Reusable/EmptyScreen";
import axios from "axios";
import AppConsts from "./../../../Constants/Strings";
import Table from "./../../../Reusable/Table";
import TableRow from "./../../../Reusable/TableRow";
import TableCell from "./../../../Reusable/TableCell";
import BackspaceIcon from "@material-ui/icons/Backspace";
import Gallery from "./../../../Reusable/Gallery";
import Checkbox from "@material-ui/core/Checkbox";

//screen consts...
const LOADING_SCREEN = "LOADINGSCREEN";
const DEFAULT_SCREEN = "DEFAULTSCREEN";
const ERROR_SCREEN = "ERRORSCREEN";
const EMPTYSCREEN = "EMPTYSCREEN";
const DETAILS_SCREEN = "DETAILS SCREEN";

//Search Constants......
const SEARCH_BY_PRODUCT = "PRODUCT";
const SEARCH_BY_CUSTOMER = "CUSTOMER";
const SEARCH_BY_DATE = "DATE";

const History = (props) => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("Pending");
  const [requests, setRequests] = useState([]);
  const [copiedRequests, setCopiedRequests] = useState([]);
  const token_RP = useSelector((state) => state.auth.token);
  const [screen, setScreen] = useState(LOADING_SCREEN);
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState(SEARCH_BY_CUSTOMER);
  const [currentRequest, setCurrentRequest] = useState();

  useEffect(() => {
    handleLoadData();
  }, []);

  const handleShowDetails = (request) => {
    setCurrentRequest(request);
    setScreen(DETAILS_SCREEN);
  }; //..............................Handle show details ends...

  const handleSearchValueChange = (event) => {
    const value = event.target.value;
    if (value == "") {
      return setCopiedRequests([...requests]);
    }
    //..............................
    if (searchType == SEARCH_BY_CUSTOMER) {
      setCopiedRequests([
        ...requests.filter(
          (elem) =>
            elem.buyerId.name.toUpperCase().search(value.toUpperCase()) > -1
        ),
      ]);
    } else if (searchType == SEARCH_BY_PRODUCT) {
      setCopiedRequests([
        ...requests.filter(
          (elem) =>
            elem.product.name.toUpperCase().search(value.toUpperCase()) > -1
        ),
      ]);
    } else if (searchType == SEARCH_BY_DATE) {
      setCopiedRequests([
        ...requests.filter(
          (elem) => elem.date.toUpperCase().search(value.toUpperCase()) > -1
        ),
      ]);
    }
    //..............................
    setSearchValue(value);
  }; //......................................

  const handleSearchTypeChange = (event) => {
    const value = event.target.value;

    setSearchType(value);
  }; //....................................

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
      status: "COMPLETED",
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
          setCopiedRequests([...res.data.data]);
          setScreen(DEFAULT_SCREEN);
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
        <Row className={classes.title}>COMPLETED CONSIGNMENTS</Row>
        <Row className={classes.searchBar}>
          <select
            className={classes.input}
            onChange={handleSearchTypeChange}
            value={searchType}
          >
            <option>{SEARCH_BY_CUSTOMER}</option>
            <option>{SEARCH_BY_PRODUCT}</option>
            <option>{SEARCH_BY_DATE}</option>
          </select>
          <input
            type="text"
            vaue={searchValue}
            onChange={handleSearchValueChange}
            placeholder="Search..."
            className={classes.input}
          />
        </Row>

        <Row className={classes.margin}>
          <Table
            headings={[
              "SR",
              "Product",
              "Price",
              "Buyer",
              "Contact",
              "City",
              "Date",
            ]}
          >
            {copiedRequests.map((elem, index) => (
              <TableRow
                key={index}
                onClick={() => {
                  handleShowDetails(elem);
                }}
                style={{
                  cursor: "pointer",
                }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{elem.product.name}</TableCell>
                <TableCell align="center">{elem.product.price}</TableCell>
                <TableCell align="center">{elem.buyerId.name}</TableCell>
                <TableCell align="center">{elem.buyerId.contact}</TableCell>
                <TableCell align="center">{elem.buyerId.city}</TableCell>
                <TableCell align="center">{elem.date}</TableCell>
              </TableRow>
            ))}
          </Table>
        </Row>
      </React.Fragment>
    );
  } else if (screen == DETAILS_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.backSpaceBar}>
          <BackspaceIcon
            className={classes.backSpaceIcon}
            onClick={() => {
              setScreen(DEFAULT_SCREEN);
            }}
          />
          <Row className={classes.backTitle}>{currentRequest.product.name}</Row>
          <Row></Row>
        </Row>

        <Row className={classes.margin}>
          <Gallery data={currentRequest.product.images} />
        </Row>

        <Row className={classes.margin}>
          <Table
            headings={["Product", "Category", "Price", "Buyer", "Contact"]}
          >
            <TableRow>
              <TableCell align="center">
                {currentRequest.product.name}
              </TableCell>
              <TableCell align="center">{currentRequest.product.cat}</TableCell>
              <TableCell align="center">
                {currentRequest.product.price}
              </TableCell>
              <TableCell align="center">
                {currentRequest.buyerId.name}
              </TableCell>
              <TableCell align="center">
                {currentRequest.buyerId.contact}
              </TableCell>
            </TableRow>
          </Table>
        </Row>

        <Row className={classes.margin}>
          <Table headings={["Title", "Payment", "Date", "Status"]}>
            <TableRow>
              <TableCell style={{ fontSize: "15px" }} align="center">
                Down Payment
              </TableCell>
              <TableCell style={{ fontSize: "15px" }} align="center">
                RS:{currentRequest.installmentPlan.downPayment}
              </TableCell>
              <TableCell style={{ fontSize: "15px" }} align="center">
                {currentRequest.downDate}
              </TableCell>
              <TableCell style={{ fontSize: "15px" }} align="center">
                <Checkbox
                  checked={currentRequest.downCheck}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </TableCell>
            </TableRow>
            {currentRequest.installmentPlan.installmentPlan.map(
              (plan, index) => (
                <TableRow key={index}>
                  <TableCell style={{ fontSize: "15px" }} align="center">
                    {plan.duration + "#" + (parseInt(index) + parseInt(1))}
                  </TableCell>
                  <TableCell style={{ fontSize: "15px" }} align="center">
                    {"Rs: " + plan.installment}
                  </TableCell>
                  <TableCell style={{ fontSize: "15px" }} align="center">
                    {currentRequest.installmentsDates[index]}
                  </TableCell>
                  <TableCell style={{ fontSize: "15px" }} align="center">
                    <Checkbox
                      checked={currentRequest.checkedArray[index]}
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </TableCell>
                </TableRow>
              )
            )}
          </Table>
        </Row>
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

export default History;
