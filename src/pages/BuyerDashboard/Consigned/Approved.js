import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Row from "./../../../UI/Row/ELXRow";
import LoadingScreen from "./../../../Reusable/LoadingScreen";
import EmptyScreen from "./../../../Reusable/EmptyScreen";
import Table from "./../../../Reusable/Table";
import TableRow from "./../../../Reusable/TableRow";
import TableCell from "./../../../Reusable/TableCell";
import Button from "@material-ui/core/Button";
import BackspaceIcon from "@material-ui/icons/Backspace";
import Gallery from "./../../../Reusable/Gallery";
import DownPayment from "./../../../Reusable/DownPayment";
import InstallmentPlan from "./../../../Reusable/InstallmentPlan";
import Checkbox from "@material-ui/core/Checkbox";
import ErrorScreen from "./../../../Reusable/ErrorScreen";

const useStyles = makeStyles((theme) => ({
  // table: {
  //   marginTop: "30px",
  // },
  bar: {
    width: "100%",
    marginTop: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "30px",
    backgroundColor: theme.palette.primary.main,
  },

  crossIcon: {
    fontSize: "18px",
    color: "red",
    cursor: "pointer",
  },
  barTitle: {
    fontSize: "15px",
    color: "white",
  },
  title: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "5px",
    fontSize: "15px",
    color: theme.palette.primary.main,
  },
  productDetailsTable: {
    marginTop: "5px",
  },
  marginRow: {
    marginTop: "5px",
  },
  searchInputBar: {
    marginRight: "20px",
  },
  searchInput: {
    width: "200px",
    height: "25px",
    fontSize: "15px",
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
}));

const LOADING_SCREEN = "loading screen";
const DEFAULT_SCREEN = "default screen";
const EMPTY_SCREEN = "empty screen";
const DETAILS_SCREEN = "DETAILS SCREEN";
const INSTALLMENT_SCREEN = "INSTALLMENT SCREENS";

const SEARCH_BY_VENDOR_NAME = "Vendor";
const SEARCH_BY_VENDOR_CONTACT = "Contact";
const SEARCH_BY_PRODUCT = "Product";

const Approved = (props) => {
  //styles init....
  const classes = useStyles();
  const [screen, setScreen] = useState(LOADING_SCREEN);
  const [currentData, setCurrentData] = useState();
  const [searchKeywords, setSearchKeywords] = useState("");
  const [searchType, setSearchType] = useState(SEARCH_BY_PRODUCT);
  const [records, setRecords] = useState(props.data);

  useEffect(() => {
    if (props.data.length === 0) {
      setScreen(EMPTY_SCREEN);
    } else {
      setScreen(DEFAULT_SCREEN);
    }
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

  React.useEffect(() => {
    setRecords(props.data);
  }, [props.data]);

  //Main GUI....
  let mainGUI = null;

  if (screen == LOADING_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <LoadingScreen />
      </React.Fragment>
    );
  } else if (screen == EMPTY_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <ErrorScreen
          showReloadButton={false}
          errorMessage="There Are No Approved Reuquests"
        />
      </React.Fragment>
    );
  } else if (screen == DEFAULT_SCREEN) {
    mainGUI = (
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
        <Row className={classes.table}>
          <Table
            headings={[
              "SR",
              "Product",
              "Price",
              "Vendor",
              "Contact",
              "Details",
              "Installments",
            ]}
          >
            {records.map((elem, index) => (
              <TableRow key={index}>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {index + 1}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {elem.product.name}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {elem.product.price}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {elem.vendorId.name}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {elem.vendorId.contact}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  <Button
                    onClick={() => {
                      setCurrentData(elem);
                      setScreen(DETAILS_SCREEN);
                    }}
                    variant="outlined"
                    color="primary"
                  >
                    Details
                  </Button>
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  <Button
                    onClick={() => {
                      setCurrentData(elem);
                      setScreen(INSTALLMENT_SCREEN);
                    }}
                    variant="outlined"
                    color="primary"
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
  } else if (screen == DETAILS_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.bar}>
          <BackspaceIcon
            onClick={() => {
              setScreen(DEFAULT_SCREEN);
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
            headings={["Product", "Category", "Price", "Vendor", "Contact"]}
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
                {currentData.vendorId.name}
              </TableCell>
              <TableCell style={{ fontSize: "15px" }} align="center">
                {currentData.vendorId.contact}
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
  } else if (screen == INSTALLMENT_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.bar}>
          <BackspaceIcon
            onClick={() => {
              setScreen(DEFAULT_SCREEN);
            }}
            className={classes.crossIcon}
          />
          <Row className={classes.barTitle}>Installment Plan</Row>
          <Row></Row>
        </Row>
        <Row>
          <Table headings={["Title", "Payment", "Status"]}>
            <TableRow>
              <TableCell style={{ fontSize: "15px" }} align="center">
                Down Payment
              </TableCell>
              <TableCell style={{ fontSize: "15px" }} align="center">
                RS:{currentData.installmentPlan.downPayment}
              </TableCell>
              <TableCell style={{ fontSize: "15px" }} align="center">
                <Checkbox
                  checked={currentData.downCheck}
                  color="primary"
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
              </TableCell>
            </TableRow>
            {currentData.installmentPlan.installmentPlan.map((plan, index) => (
              <TableRow key={index}>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {plan.duration + "#" + (parseInt(index) + parseInt(1))}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  {"Rs: " + plan.installment}
                </TableCell>
                <TableCell style={{ fontSize: "15px" }} align="center">
                  <Checkbox
                    checked={currentData.checkedArray[index]}
                    color="primary"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </Row>
      </React.Fragment>
    );
  }

  return <React.Fragment>{mainGUI}</React.Fragment>;
}; //.....................

export default Approved;
