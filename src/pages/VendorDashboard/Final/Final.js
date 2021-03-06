import React, { useState, useEffect } from "react";
import useStyles from "./Final.styles";
import Row from "./../../../UI/Row/ELXRow";
import { useSelector } from "react-redux";
import LoadingScreen from "./../../../Reusable/LoadingScreen";
import ErrorScreen from "./../../../Reusable/ErrorScreen";
import EmptyScreen from "./../../../Reusable/EmptyScreen";
import Table from "./../../../Reusable/Table";
import TableCell from "./../../../Reusable/TableCell";
import TableRow from "./../../../Reusable/TableRow";
import axios from "axios";
import AppConsts from "./../../../Constants/Strings";
import BackspaceIcon from "@material-ui/icons/Backspace";
import Register from "./../../../Reusable/REGISTER/Register";
import { Button } from "@material-ui/core";
import Gallery from "./../../../Reusable/Gallery";
import DownPayment from "./../../../Reusable/DownPayment";
import InstallmentPlan from "./../../../Reusable/InstallmentPlan";

//screen consts...
const LOADING_SCREEN = "LOADINGSCREEN";
const DEFAULT_SCREEN = "DEFAULTSCREEN";
const ERROR_SCREEN = "ERRORSCREEN";
const EMPTYSCREEN = "EMPTYSCREEN";
const CUSTOMER_PRODUCTS_SCREEN = "CUSTOMERPRODUCTSCREEN";
const REGISTER = "REGISTER";
const DETAILS_SCREEN = "DETAILS SCREEN";

const SEARCH_BY_NAME = "SEARCH_BY_NAME";
const SEARCH_BY_CONTACT = "SEARCH_BY_CONTACT";
const SEARCH_BY_EMAIL = "SEARCH_BY_EMAIL";
const SEARCH_BY_CITY = "SEARCH_BY_CITY";

const Consigned = (props) => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState("Pending");
  const [requests, setRequests] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [filteredReuests, setFilteresRequests] = useState([]);
  const [filteredRequestCopy, setFilteredRequestCopy] = useState([]);
  const token_RP = useSelector((state) => state.auth.token);
  const [screen, setScreen] = useState(LOADING_SCREEN);
  const [currentRegister, setCurrentRegister] = useState();
  const [currentData, setCurrentData] = useState();
  const [customersCopy, setCustomersCopy] = useState([]);
  const [searchKeywords, setSearchKeywords] = useState("");
  const [searchType, setSearchType] = useState(SEARCH_BY_NAME);
  const [productSearchKeywords, setProductSearchKeywords] = useState("");

  useEffect(() => {
    handleLoadData();
  }, []);

  const handleFilterProducts = (event) => {
    const value = event.target.value;
    setProductSearchKeywords(value);
    if (value === "") {
      setFilteredRequestCopy([...filteredReuests]);
    } else {
      setFilteredRequestCopy([
        ...filteredReuests.filter(
          (elem) =>
            elem.product.name.toUpperCase().search(value.toUpperCase()) >= 0
        ),
      ]);
    }
  };

  const handleFilterCustomers = (event) => {
    const value = event.target.value;
    setSearchKeywords(value);

    if (value === "") {
      return setCustomersCopy([...customers]);
    }

    switch (searchType) {
      case SEARCH_BY_NAME:
        setCustomersCopy([
          ...customers.filter(
            (elem) => elem.name.toUpperCase().search(value.toUpperCase()) >= 0
          ),
        ]);
        break;

      case SEARCH_BY_EMAIL:
        setCustomersCopy([
          ...customers.filter(
            (elem) => elem.email.toUpperCase().search(value.toUpperCase()) >= 0
          ),
        ]);
        break;

      case SEARCH_BY_CONTACT:
        setCustomersCopy([
          ...customers.filter(
            (elem) =>
              elem.contact.toUpperCase().search(value.toUpperCase()) >= 0
          ),
        ]);
        break;

      case SEARCH_BY_CITY:
        setCustomersCopy([
          ...customers.filter(
            (elem) => elem.city.toUpperCase().search(value.toUpperCase()) >= 0
          ),
        ]);
        break;
    } //swicth ending...
  }; //......................handle filter customers

  const handleShowDetails = (elem) => {
    setCurrentData(elem);
    setScreen(DETAILS_SCREEN);
  };

  const handleshowRegister = (req) => {
    let register = null;
    filteredReuests.forEach((elem) => {
      if (elem._id == req._id) {
        register = elem;
      }
    });
    setCurrentRegister(register);
    setScreen(REGISTER);
  }; //..........................Handle show register

  const handleSelectCustomer = (buyerId) => {
    setFilteresRequests([
      ...requests.filter((req) => req.buyerId._id == buyerId._id),
    ]);
    setFilteredRequestCopy([
      ...requests.filter((req) => req.buyerId._id == buyerId._id),
    ]);
    setScreen(CUSTOMER_PRODUCTS_SCREEN);
  }; //.....................................

  const handleLoadCustomers = (requests) => {
    let allCustomers = [];

    requests.forEach((req) => {
      console.log("First Re");
      console.log(req);
      let isPresent = false;
      allCustomers.forEach((customer) => {
        if (customer._id == req.buyerId._id) {
          isPresent = true;
        }
      });
      if (isPresent == false) {
        allCustomers.push(req.buyerId);
      }
    });
    setCustomers([...allCustomers]);
    setCustomersCopy([...allCustomers]);
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
      status: "APPROVED",
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
          handleLoadCustomers([...res.data.data]);
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
        <EmptyScreen message="Sorry No Requests Exists Against You" />
      </React.Fragment>
    );
  } else if (screen == DEFAULT_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.defaultTitle}>Consigned Customers</Row>
        <Row className={classes.searchBar}>
          <select
            onChange={(event) => {
              setSearchType(event.target.value);
            }}
            value={searchType}
            className={classes.input}
          >
            <option value={SEARCH_BY_NAME}>Name</option>
            <option value={SEARCH_BY_EMAIL}>Email</option>
            <option value={SEARCH_BY_CONTACT}>Contact</option>
            <option value={SEARCH_BY_CITY}>City</option>
          </select>
          <input
            value={searchKeywords}
            onChange={handleFilterCustomers}
            type="text"
            className={classes.input}
          />
        </Row>
        <Row className={classes.table}>
          <Table headings={["SR", "Name", "Email", "Contact", "City"]}>
            {customersCopy.map((elem, index) => (
              <TableRow
                style={{
                  cursor: "pointer",
                }}
                key={index}
                onClick={() => {
                  handleSelectCustomer(elem);
                }}
              >
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {index + 1}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {elem.name}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {elem.email}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {elem.contact}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {elem.city}
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Row>
      </React.Fragment>
    );
  } else if (screen == CUSTOMER_PRODUCTS_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.cancelTitle}>
          <Row>
            <BackspaceIcon
              className={classes.cancelIcon}
              onClick={() => {
                setScreen(DEFAULT_SCREEN);
              }}
            />
          </Row>
          <Row>Products Consigned</Row>
          <Row></Row>
        </Row>
        <Row className={classes.searchBar}>
          <input
            onChange={handleFilterProducts}
            value={productSearchKeywords}
            type="text"
            className={classes.input}
            placeholder="Search Product"
          />
        </Row>
        <Row className={classes.table}>
          <Table
            headings={[
              "SR",
              "Product",
              "Category",
              "Price",
              "Details",
              "Installments",
            ]}
          >
            {filteredRequestCopy.map((elem, index) => (
              <TableRow
                style={{
                  cursor: "pointer",
                }}
                key={index}
              >
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {index + 1}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {elem.product.name}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {elem.product.cat}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {elem.product.price}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  <Button
                    onClick={() => {
                      handleShowDetails(elem);
                    }}
                    color="primary"
                    variant="contained"
                  >
                    Details
                  </Button>
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  <Button
                    onClick={() => {
                      handleshowRegister(elem);
                    }}
                    color="primary"
                    variant="contained"
                  >
                    Installments
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Row>
      </React.Fragment>
    );
  } else if (screen == REGISTER) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.cancelTitle}>
          <Row>
            <BackspaceIcon
              className={classes.cancelIcon}
              onClick={() => {
                setScreen(CUSTOMER_PRODUCTS_SCREEN);
              }}
            />
          </Row>
          <Row>Installment Plan</Row>
          <Row></Row>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Register data={currentRegister} />
        </Row>
      </React.Fragment>
    );
  } else if (screen == DETAILS_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.bar}>
          <BackspaceIcon
            onClick={() => {
              setScreen(CUSTOMER_PRODUCTS_SCREEN);
            }}
            className={classes.crossIcon}
          />
          <Row className={classes.barTitle}>
            Product Details and Agreed Plan
          </Row>
          <Row></Row>
        </Row>

        <Row className={classes.title}>{currentData.product.name}</Row>
        <Gallery data={currentData.product.images} />
        <Row className={classes.productDetailsTable}>
          <Table
            headings={["Product", "Category", "Price", "Buyer", "Contact"]}
          >
            <TableRow>
              <TableCell style={{ fontSize: "15px" }} align="center">
                {currentData.product.name}
              </TableCell>
              <TableCell style={{ fontSize: "15px" }} align="center">
                {currentData.product.cat}
              </TableCell>
              <TableCell style={{ fontSize: "15px" }} align="center">
                {currentData.product.price}
              </TableCell>
              <TableCell style={{ fontSize: "15px" }} align="center">
                {currentData.buyerId.name}
              </TableCell>
              <TableCell style={{ fontSize: "15px" }} align="center">
                {currentData.buyerId.contact}
              </TableCell>
            </TableRow>
          </Table>
        </Row>

        <Row className={classes.marginRow}>
          <DownPayment downPayment={currentData.installmentPlan.downPayment} />
        </Row>
        <Row className={classes.marginRow}>
          <InstallmentPlan
            installmentPlan={currentData.installmentPlan.installmentPlan}
          />
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

export default Consigned;
