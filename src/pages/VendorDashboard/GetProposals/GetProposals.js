import React, { useState, useEffect } from "react";
import Row from "./../../../UI/Row/ELXRow";
import useStyles from "./GetProposals.styles";
import CircularProgressBar from "./../../../UI/CircularProgressBar/CircularProgressBar";
import CachedIcon from "@material-ui/icons/Cached";
import Button from "./../../../UI/Button/ELXButton";
import axios from "axios";
import { useSelector } from "react-redux";
import AppConsts from "./../../../Constants/Strings";
import { Paper } from "@material-ui/core";
import SubMenus from "./../../../Components/Dashboard/GetProposals/SubMenu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ProductDetailsTable from "./ProductTable";
import ErrorScreen from "./../../../Reusable/ErrorScreen";

const LOADING_SCREEN = "LOADINGSCREEN";
const DEFAULT_SCREEN = "DEFAULTSCREEN";
const ERROR_SCREEN = "ERRORSCREEN";
const EMPTY_SCREEN = "EMPTYSCREEN";
const SUBMENU_SCREEN = "SUBMENUSCREEN";
const CUSTOMER_PRODUCTS_SCREEN = "CUSTOMERPRODUCTSSCREENs";
const CUSTOMER_NAME = "NAME";
const CUSTOMER_NUMBER = "CONTACT";

const GetProposals = (props) => {
  //classes init....
  const classes = useStyles();

  const token_RP = useSelector((state) => state.auth.token);

  //state management starts...
  const [screen, setScreen] = useState(LOADING_SCREEN);
  const [errorMessage, setErrorMessage] = useState(
    "Failed to load Data due to network error"
  );
  const [proposals, setProposals] = useState([]);
  const [currentProposals, setCurrentProposals] = useState([]);
  const [productId, setProductId] = useState(null);
  const [clients, setClients] = useState([]);
  const [clientsCopy, setClientsCopy] = useState([]);
  const [searchType, setSearchType] = useState(CUSTOMER_NAME);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchCurrentProposals, setSearchCurrentProposals] = useState("");
  const [currentProposalCopy, setCurrentProposalCopy] = useState([]);

  useEffect(() => {
    retrieveAllProposals();
  }, []);

  const handleSearchCurrentProposals = (event) => {
    console.log("************Current Proposals");
    console.log(currentProposals);
    const value = event.target.value;
    if (value === "") {
      setCurrentProposalCopy([...currentProposals]);
    } else {
      setCurrentProposalCopy([
        ...currentProposals.filter(
          (elem) =>
            elem.productId.name.toUpperCase().search(value.toUpperCase()) >= 0
        ),
      ]);
    }
    setSearchCurrentProposals(value);
  }; //............

  const handleSearch = (event) => {
    const value = event.target.value;
    if (value === "") {
      setClientsCopy([...clients]);
    } else if (searchType === CUSTOMER_NAME) {
      setClientsCopy([
        ...clients.filter(
          (elem) => elem.name.toUpperCase().search(value.toUpperCase()) >= 0
        ),
      ]);
    } else {
      setClientsCopy([
        ...clients.filter(
          (elem) => elem.contact.toUpperCase().search(value.toUpperCase()) >= 0
        ),
      ]);
    }
    setSearchKeyword(value);
  }; //................handle search

  const handleDeleteRecord = (id) => {
    // window.alert("Called");
    const filteredProposals = [...proposals.filter((elem) => elem._id != id)];
    setProposals([...filteredProposals]);
    filterClients([...filteredProposals]);
    const filteredcurrentProposals = [
      ...currentProposals.filter((elem) => elem._id != id),
    ];
    setCurrentProposals([...filteredcurrentProposals]);
    setCurrentProposalCopy([...filteredcurrentProposals]);
  }; //.............................

  const handleMoveNext = (productId) => {
    setProductId(productId);
    setScreen(SUBMENU_SCREEN);
  };

  const handleChangeScreen = (screen) => {
    if (screen == CUSTOMER_PRODUCTS_SCREEN && currentProposals.length == 0) {
      return setScreen(DEFAULT_SCREEN);
    }
    setScreen(screen);
  };

  const handleSelectCustomer = (customerId) => {
    setCurrentProposals([
      ...proposals.filter((elem) => elem.buyerId._id == customerId),
    ]);
    setCurrentProposalCopy([
      ...proposals.filter((elem) => elem.buyerId._id == customerId),
    ]);
    handleChangeScreen(CUSTOMER_PRODUCTS_SCREEN);
  };

  const filterClients = (data) => {
    const clients = [];
    data.forEach((elem) => {
      let present = false;
      clients.forEach((client) => {
        if (elem.buyerId._id == client._id) {
          present = true;
        }
      });
      if (present == false) {
        clients.push(elem.buyerId);
      }
    });
    setClients([...clients]);
    setClientsCopy([...clients]);
    console.log("??????????????????");
    console.log(clients);
    console.log("??????????????????");
  }; //.......................

  const retrieveAllProposals = async () => {
    const body = JSON.stringify({
      action: "retrieve",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-vendor": token_RP,
      },
    };

    //try catch starts....
    try {
      const res = await axios.post(
        AppConsts.server + "/vendor/proposal/getMyProposals",
        body,
        config
      );

      if (res) {
        if (res.data.data.length === 0) {
          setScreen(EMPTY_SCREEN);
          setProposals([]);
        } else {
          setScreen(DEFAULT_SCREEN);
          setProposals([...res.data.data]);
          filterClients([...res.data.data]);
          console.log("^^^^^^^^^^^^^^^^^^^^");
          console.log(res.data.data);
          console.log("^^^^^^^^^^^^^^^^^^^^^");
        }
      } else {
        setScreen(ERROR_SCREEN);
        setErrorMessage("Failed To Load Data Due To Network Error");
      }
    } catch (err) {
      setScreen(ERROR_SCREEN);
      if (err.response) {
        setErrorMessage(err.responae.data.errorMessage);
      } else {
        setErrorMessage(err.message);
      }
    }
    //try catch ends.......
  }; //..............retrieve all proposals

  let mainGUI = null;

  if (screen == LOADING_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.loadingScreen}>
          <CircularProgressBar size={40} color="secondary" />
        </Row>
      </React.Fragment>
    );
  } else if (screen == CUSTOMER_PRODUCTS_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.productsearchBar}>
          <Row
            className={classes.circle}
            onClick={() => {
              setScreen(DEFAULT_SCREEN);
            }}
          >
            <ArrowBackIcon />
          </Row>
          <Row className={classes.cpTitle}>Products</Row>
          <input
            placeholder="Product Name"
            type="text"
            value={searchCurrentProposals}
            onChange={handleSearchCurrentProposals}
            className={classes.input}
          />
        </Row>

        <Paper elevation={3} className={classes.bottomPopoulation}>
          <ProductDetailsTable
            data={currentProposalCopy}
            next={handleMoveNext}
          />
        </Paper>
      </React.Fragment>
    );
  } else if (screen == DEFAULT_SCREEN) {
    mainGUI = (function () {
      if (clients.length == 0) {
        return (
          <React.Fragment>
            <ErrorScreen
              errorMessage={"There are no proposals to Retrieve"}
              showReloadButton={false}
            />
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <Row className={classes.searchBar}>
              <select
                value={searchType}
                onChange={(event) => setSearchType(event.target.value)}
                className={classes.input}
              >
                <option>{CUSTOMER_NUMBER}</option>
                <option>{CUSTOMER_NAME}</option>
              </select>
              <input
                value={searchKeyword}
                onChange={handleSearch}
                placeholder="Search"
                type="text"
                className={classes.input}
              />
            </Row>
            <Paper elevation={1} className={classes.defaultcontainer}>
              {clientsCopy.map((elem, index) => {
                return (
                  <Row
                    className={classes.defaultBar}
                    key={index}
                    onClick={() => {
                      handleSelectCustomer(elem._id);
                    }}
                  >
                    <Row>{index + 1}</Row>
                    <Row> {elem.name}</Row>
                    <Row>{elem.contact}</Row>
                    <Row>{elem.city}</Row>
                  </Row>
                );
              })}
            </Paper>
          </React.Fragment>
        );
      }
    })();
  } else if (screen == ERROR_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <ErrorScreen
          errorMessage={errorMessage}
          handleReload={retrieveAllProposals}
        />
      </React.Fragment>
    );
  } else if (screen == EMPTY_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <ErrorScreen
          errorMessage={"There are no proposals to Retrieve"}
          showReloadButton={false}
        />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {screen == SUBMENU_SCREEN ? (
        <SubMenus
          delete={handleDeleteRecord}
          data={currentProposals}
          productId={productId}
          goBack={() => {
            handleChangeScreen(CUSTOMER_PRODUCTS_SCREEN);
          }}
        />
      ) : (
        <React.Fragment>
          <Row className={classes.title}>Proposed Plans</Row>
          <Row className={classes.container}>
            <Row className={classes.subContainer}>{mainGUI}</Row>
          </Row>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}; //..........................

export default GetProposals;
