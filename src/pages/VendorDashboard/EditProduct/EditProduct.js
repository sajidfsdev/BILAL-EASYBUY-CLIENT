import React, { useState, useEffect } from "react";
import useStyles from "./EditProduct.styles";
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
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import EditIcon from "@material-ui/icons/Edit";
import BackspaceIcon from "@material-ui/icons/Backspace";
import Gallery from "./../../../Reusable/Gallery";
import DownPayment from "./../../../Reusable/DownPayment";
import InstallmentPlan from "./../../../Reusable/InstallmentPlan";
import EditOperations from "./EditOperation/EditOperation";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Spinner from "./../../../UI/CircularProgressBar/CircularProgressBar";
import { useSnackbar } from "notistack";

//screen consts...
const LOADING_SCREEN = "LOADINGSCREEN";
const DEFAULT_SCREEN = "DEFAULTSCREEN";
const ERROR_SCREEN = "ERRORSCREEN";
const EMPTYSCREEN = "EMPTYSCREEN";
const DETAILS_SCREEN = "DETAILSSCREEN";
const EDIT_SCREEN = "EDITSCREEN";

const Consigned = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [errorMessage, setErrorMessage] = useState("Pending");
  const [products, setProducts] = useState([]);
  const [copiedProducts, setCopiedProducts] = useState([]);
  const token_RP = useSelector((state) => state.auth.token);
  const [screen, setScreen] = useState(LOADING_SCREEN);
  const [cat, setCat] = useState(["ALL CATEGORIES"]);
  const [searchType, setSearchType] = useState("ALL CATEGORIES");
  const [searchValue, setSearchValue] = useState("");
  const [currentProduct, setCurrentProduct] = useState();
  const [deleteBufferring, setDeleteBufferring] = useState([]);

  useEffect(() => {
    handleLoadData();
    handleLoadAllCats();
  }, []);

  const handleDeleteProduct = async (productId, index) => {
    setDeleteBufferring([
      ...deleteBufferring.map((elem, ind) => (ind === index ? true : false)),
    ]);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-vendor": token_RP,
      },
    };

    const body = JSON.stringify({ productId });

    try {
      const res = await axios.post(
        AppConsts.server + "/vendor/products/delete",
        body,
        config
      );

      if (res) {
        setDeleteBufferring([...deleteBufferring.map((elem) => false)]);
        handleLoadData();
        handleShowSnackbar("Product Deleted Successfully", "success");
      } else {
        setDeleteBufferring([...deleteBufferring.map((elem) => false)]);
        handleShowSnackbar("Network Error Has Occurred", "error");
      }
    } catch (err) {
      setDeleteBufferring([...deleteBufferring.map((elem) => false)]);
      if (err.response) {
        handleShowSnackbar(err.response.data.errorMessage, "error");
      } else {
        handleShowSnackbar(err.message, "error");
      }
    }
  }; //......................handle delete product called

  const handleShowSnackbar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  }; //................handle show snack bar

  const handleChangeSearchValue = (event) => {
    const value = event.target.value;
    if (searchType == "ALL CATEGORIES" && value == "") {
      setCopiedProducts([...products]);
    } else if (value == "") {
      setCopiedProducts([
        ...products.filter(
          (prod) => prod.cat.toUpperCase() == searchType.toUpperCase()
        ),
      ]);
    } else if (searchType == "ALL CATEGORIES") {
      setCopiedProducts([
        ...products.filter(
          (prod) => prod.name.toUpperCase().search(value.toUpperCase()) > -1
        ),
      ]);
    } else {
      setCopiedProducts([
        ...products.filter(
          (prod) =>
            prod.cat.toUpperCase() == searchType.toUpperCase() &&
            prod.name.toUpperCase().search(value.toUpperCase()) > -1
        ),
      ]);
    }
    setSearchValue(value);
  }; //.....................Handle change search value

  const handleSearchTypeChange = (event) => {
    const value = event.target.value;
    if (value == "ALL CATEGORIES") {
      setCopiedProducts([...products]);
    } else {
      setCopiedProducts([
        ...products.filter(
          (prod) => prod.cat.toUpperCase() == value.toUpperCase()
        ),
      ]);
    }

    setSearchType(value);
  }; //..................................Handle search type Change

  const handleLoadAllCats = async () => {
    setScreen(LOADING_SCREEN);

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-vendor": token_RP,
      },
    };

    try {
      const res = await axios.get(
        AppConsts.server + "/vendor/products/getAllCats",

        config
      );
      if (res) {
        const allCats = [];
        res.data.cat.forEach((element) => {
          allCats.push(element.cat);
        });

        setCat([...cat, ...allCats]);
      } else {
        setScreen(DEFAULT_SCREEN);
        handleShowSnackbar(
          "Failed To Load Resources Due To Network Error",
          "error"
        );
      }
    } catch (err) {
      setScreen(DEFAULT_SCREEN);

      if (err.response) {
        handleShowSnackbar(err.response.data.errorMessage, "error");
      } else {
        handleShowSnackbar(err.message, "error");
      }
    }
  }; //............................Load All Cats

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
      action: "Getting all products",
    });

    try {
      const res = await axios.post(
        AppConsts.server + "/vendor/products/get",
        body,
        config
      );
      if (res) {
        if (res.data.data.length == 0) {
          setScreen(EMPTYSCREEN);
        } else {
          setProducts([...res.data.data]);
          setCopiedProducts([...res.data.data]);
          setScreen(DEFAULT_SCREEN);
          setDeleteBufferring([...res.data.data.map((elem) => false)]);
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
        <Row className={classes.title}>PRODUCTS</Row>
        <Row className={classes.searchBar}>
          <select
            className={classes.input}
            onChange={handleSearchTypeChange}
            value={searchType}
          >
            {cat.map((elem, index) => (
              <option key={index}>{elem}</option>
            ))}
          </select>
          <input
            type="text"
            value={searchValue}
            onChange={handleChangeSearchValue}
            placeholder="Search..."
            className={classes.input}
          />
        </Row>
        <Row className={classes.margin}>
          <Table
            headings={[
              "SR",
              "Product",
              "Category",
              "Price",
              "Desciption",
              "Details",
              "Edit",
              "Delete",
            ]}
          >
            {copiedProducts.map((elem, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{elem.name}</TableCell>
                <TableCell align="center">{elem.cat}</TableCell>
                <TableCell align="center">{elem.price}</TableCell>
                <TableCell align="center">{elem.desc}</TableCell>
                <TableCell align="center">
                  <ZoomInIcon
                    onClick={() => {
                      setCurrentProduct(elem);
                      setScreen(DETAILS_SCREEN);
                    }}
                    className={classes.iconSec}
                  />
                </TableCell>
                <TableCell align="center">
                  <EditIcon
                    onClick={() => {
                      setCurrentProduct(elem);
                      setScreen(EDIT_SCREEN);
                    }}
                    className={classes.iconPri}
                  />
                </TableCell>
                <TableCell align="center">
                  {deleteBufferring[index] ? (
                    <Spinner color="secondary" size={25} />
                  ) : (
                    <DeleteForeverIcon
                      onClick={handleDeleteProduct.bind(this, elem._id, index)}
                      className={classes.deleteIcon}
                    />
                  )}
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
        <Row className={classes.backSpaceBar}>
          <BackspaceIcon
            onClick={() => {
              setScreen(DEFAULT_SCREEN);
            }}
            className={classes.backIcon}
          />
          <Row className={classes.backTitle}>{currentProduct.name}</Row>
          <Row></Row>
        </Row>

        <Row className={classes.margin}>
          <Gallery data={currentProduct.images} />
        </Row>

        <Row className={classes.margin}>
          <Table
            headings={[
              "Name",
              "Price",
              "Cat",
              "subCat",
              "subSubCat",
              "Description",
              "Attributes",
            ]}
          >
            <TableRow>
              <TableCell align="center">{currentProduct.name}</TableCell>
              <TableCell align="center">{currentProduct.price}</TableCell>
              <TableCell align="center">{currentProduct.cat}</TableCell>
              <TableCell align="center">{currentProduct.subCat}</TableCell>
              <TableCell align="center">{currentProduct.subSubCat}</TableCell>
              <TableCell align="center">{currentProduct.desc}</TableCell>
              <TableCell align="center">
                {
                  <ul>
                    {currentProduct.att.map((elem, index) => (
                      <li key={index}>
                        {elem[0].attribute + " : " + elem[0].value}
                      </li>
                    ))}
                  </ul>
                }
              </TableCell>
            </TableRow>
          </Table>
        </Row>

        <Row className={classes.margin}>
          <DownPayment
            downPayment={currentProduct.installmentPlan.downPayment}
          />
        </Row>

        <Row className={classes.margin}>
          <InstallmentPlan
            installmentPlan={currentProduct.installmentPlan.installmentPlan}
          />
        </Row>
      </React.Fragment>
    );
  } else if (screen == EDIT_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.backSpaceBar}>
          <BackspaceIcon
            onClick={() => {
              setScreen(DEFAULT_SCREEN);
            }}
            className={classes.backIcon}
          />
          <Row className={classes.backTitle}>{currentProduct.name}</Row>
          <Row></Row>
        </Row>
        <EditOperations
          refresh={() => {
            handleLoadData();
            handleLoadAllCats();
            setScreen(DEFAULT_SCREEN);
          }}
          data={currentProduct}
        />
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
