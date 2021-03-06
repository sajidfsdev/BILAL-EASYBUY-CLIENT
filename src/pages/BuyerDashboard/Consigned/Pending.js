import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Row from "./../../../UI/Row/ELXRow";
import CircularProgressBar from "./../../../UI/CircularProgressBar/CircularProgressBar";
import PendingTable from "./PendingTable";
import BackspaceIcon from "@material-ui/icons/Backspace";
import SuccessView from "./SuccessView";
import ErrorScreen from "./../../../Reusable/ErrorScreen";

const useStyles = makeStyles((theme) => ({
  progress: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
  },
  empty: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100px",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    color: theme.palette.primary.main,
  },
  searchBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "30px",
    backgroundColor: theme.palette.primary.main,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  searchInputBar: {
    marginRight: "20px",
  },
  searchInput: {
    width: "200px",
    height: "25px",
    fontSize: "15px",
  },
  blackBar: {
    width: "100%",
    height: "23px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
  },
  blackBarTitle: {
    fontSize: "15px",
    color: "#fff",
  },
  BackspaceIcon: {
    color: "red",
    cursor: "pointer",
  },
}));

const LOADING_SCREEN = "LOADINGSCREEN";
const DEFAULT_SCREEN = "DEFAULTSCREEN";
const DETAILS_SCREEN = "DETILSSCREEN";

const SEARCH_BY_VENDOR_NAME = "Vendor";
const SEARCH_BY_VENDOR_CONTACT = "Contact";
const SEARCH_BY_PRODUCT = "Product";

const Pending = (props) => {
  //styles init....
  const classes = useStyles();

  const [screen, setScreen] = useState(DEFAULT_SCREEN);
  const [current, setCurrent] = useState();
  const [searchKeywords, setSearchKeywords] = useState("");
  const [searchType, setSearchType] = useState(SEARCH_BY_PRODUCT);
  const [records, setRecords] = useState(props.data);

  React.useEffect(() => {
    setRecords(props.data);
  }, [props.data]);

  const handleSearchRecord = (event) => {
    const value = event.target.value;
    if (value === "") {
      setRecords([...props.data]);
    } else if (searchType === SEARCH_BY_PRODUCT) {
      setRecords([
        ...props.data.filter(
          (elem) =>
            elem.product.name.toUpperCase().search(value.toUpperCase()) >= 0
        ),
      ]);
    } else if (searchType === SEARCH_BY_VENDOR_CONTACT) {
      setRecords([
        ...props.data.filter(
          (elem) =>
            elem.vendorId.contact.toUpperCase().search(value.toUpperCase()) >= 0
        ),
      ]);
    } else if (searchType === SEARCH_BY_VENDOR_NAME) {
      setRecords([
        ...props.data.filter(
          (elem) =>
            elem.vendorId.name.toUpperCase().search(value.toUpperCase()) >= 0
        ),
      ]);
    }
    setSearchKeywords(value);
  }; //.............handle earch record

  const handleGoBack = () => {
    setScreen(DEFAULT_SCREEN);
  };

  const handleChangeScreen = (scr, obj) => {
    if (scr == DETAILS_SCREEN) {
      setScreen(DETAILS_SCREEN);
      setCurrent(obj);
    }
  };

  //main GUI starts....
  let mainGUI = null;

  if (screen == LOADING_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.progress}>
          <CircularProgressBar size={40} color="secondary" />
        </Row>
      </React.Fragment>
    );
  } else if (screen == DEFAULT_SCREEN) {
    mainGUI = (
      <React.Fragment>
        {props.data.length == 0 ? (
          <React.Fragment>
            <ErrorScreen
              showReloadButton={false}
              errorMessage="There Are No Pending Requests"
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Row className={classes.searchBar}>
              <Row className={classes.searchInputBar}>
                <select
                  style={{
                    height: "30px",
                  }}
                  className={classes.searchInput}
                  value={searchType}
                  onChange={(event) => setSearchType(event.target.value)}
                >
                  <option>{SEARCH_BY_VENDOR_NAME}</option>
                  <option>{SEARCH_BY_VENDOR_CONTACT}</option>
                  <option>{SEARCH_BY_PRODUCT}</option>
                </select>
              </Row>
              <Row className={classes.searchInputBar}>
                <input
                  value={searchKeywords}
                  onChange={handleSearchRecord}
                  type="text"
                  className={classes.searchInput}
                />
              </Row>
            </Row>

            <PendingTable changeScreen={handleChangeScreen} data={records} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  } else if (screen == DETAILS_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.blackBar}>
          <BackspaceIcon
            onClick={handleGoBack}
            className={classes.BackspaceIcon}
          />
          <Row className={classes.blackBarTitle}>Details</Row>
          <Row></Row>
        </Row>
        <SuccessView data={current} />
      </React.Fragment>
    );
  }

  return <React.Fragment>{mainGUI}</React.Fragment>;
}; //.....................

export default Pending;
