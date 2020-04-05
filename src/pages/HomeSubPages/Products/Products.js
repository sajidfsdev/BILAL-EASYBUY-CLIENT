import React, { useEffect, useState, useReducer } from "react";
import Row from "./../../../UI/Row/ELXRow";
import AppBar from "./../../../Components/Home/AppBar/AppBar";
import MenuBar from "./../../../Components/Home/Menubar/Menubar";
import SearchIcon from "@material-ui/icons/Search";
import Paper from "./../../../UI/Paper/Paper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Input from "./../../../UI/Input/Input";
import DefaultScreen from "./../../../Components/Home_Products/DefaultScreen/DefaultScreen";
import useStyles from "./Products.styles";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../../Store/Action/bulk";
import * as Types from "./../../../Store/Constants/bulk";
import CircularProgressBar from "./../../../UI/CircularProgressBar/CircularProgressBar";
import CachedIcon from "@material-ui/icons/Cached";
import Footer from "./../../../Components/Home/Footer/Footer";
import * as ProdActions from "./../../../Store/Action/products";
import Validators from "./../../../Utils/Methods/validation";
import Reducer from "./reducer";
import InitialState from "./initialState";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Cities from "./cities";
import sort from "fast-sort";
import * as LocalTypes from "./types";
import { withRouter } from "react-router-dom";

const Products = props => {
  //classes init...
  const classes = useStyles();

  const [state, dispatch] = useReducer(Reducer, InitialState);

  //state management...
  const bulk = useSelector(state => state.bulk.bulk);
  const loaded_RP = useSelector(state => state.bulk.loaded);
  const isError = useSelector(state => state.bulk.isError);
  const errorMessage = useSelector(state => state.bulk.errorMessage);
  //
  //
  const cat_loaded_RP = useSelector(state => state.products.loaded);
  const cat_isError_RP = useSelector(state => state.products.isError);
  const cat_errorMessage_RP = useSelector(state => state.products.errorMessage);
  const token_RP = useSelector(state => state.auth.token);
  //
  //
  const cat_RP = useSelector(state => state.products.cat);
  const subCat_RP = useSelector(state => state.products.subCat);
  const subSubCat_RP = useSelector(state => state.products.subSubCat);
  //
  const [subCatCopy, setSubCatCopy] = useState([...subCat_RP]);
  const [subSubCatCopy, setSubSubCatCopy] = useState([...subSubCat_RP]);
  //
  //
  const [bulkCopy, setBulkCopy] = useState([]);
  const [searchState, setSearchState] = useState("");
  //
  const dispatch_RP = useDispatch();

  useEffect(() => {
    setBulkCopy([...bulk]);
  }, [bulk]);

  //Methods.....
  useEffect(() => {
    dispatch_RP({ type: Types.SIMULATE_LOADING });
    dispatch_RP(Actions.handleGetAllProducts());
  }, []);

  useEffect(() => {
    if (cat_loaded_RP === false || cat_isError_RP === true) {
      dispatch_RP(ProdActions.handleLoadAllCats(token_RP));
    }
  }, []);

  //Methods starts...
  const handleFiltration = () => {
    if (state.isCatError || state.isSubCatError || state.isSubSubCatError) {
      return window.alert("Please choose category correctly");
    }
    let catFiltered = [...handleCatFiltration()];
    if (catFiltered.length === 0) {
      return setBulkCopy([...catFiltered]);
    }
    let nameFiltered = [...handleNameFiltration(catFiltered)];
    if (nameFiltered.length === 0) {
      return setBulkCopy([...nameFiltered]);
    }

    let priceFiltered = [...handlePriceFiltration(nameFiltered)];
    if (priceFiltered.length === 0) {
      return setBulkCopy([...priceFiltered]);
    }
    let cityFiltered = [...handleCityFilter(priceFiltered)];
    setBulkCopy([...cityFiltered]);
  }; //........................Handle filtration called:

  const handleCityFilter = priceFiltered => {
    if (state.city == "" || state.city == "All Cities") {
      return priceFiltered;
    } else {
      let cityFiltered = priceFiltered.filter(
        elem => elem.vendorId.city.toUpperCase() == state.city.toUpperCase()
      );

      return cityFiltered;
    }
  }; //........................Handle city filter

  const handlePriceFiltration = nameFiltered => {
    let priceFiltered = [];
    if (state.price == "All Prices") {
      return nameFiltered;
    } else if (state.price == "Lowest To Highest") {
      return sort(nameFiltered).asc(u => u.price);
    } else {
      return sort(nameFiltered).desc(u => u.price);
    }
  }; //.............................HandlePrice Filtration

  const handleNameFiltration = catFiltered => {
    //window.alert("Name filter called");
    if (state.name === "") {
      //window.alert("name === empty");
      return [...catFiltered];
    } else {
      let nameFiltered = catFiltered.filter(elem => {
        //window.alert(elem.name);
        //window.alert(state.name.toUpperCase());
        // keywordSearch(elem.name, state.name.toUpperCase(), 1)
        if (elem.name.toUpperCase().search(state.name.toUpperCase()) >= 0) {
          //window.alert("true detected");
          return true;
        } else {
          //window.alert("Not matched");
          return false;
        }
      });
      return nameFiltered;
    }
  }; //.........................Handle name filtration...

  const handleCatFiltration = () => {
    let catFiltered = [];
    if (state.cat === "") {
      return [...bulk];
    }
    if (state.subCat == "" && state.subSubCat === "") {
      catFiltered = [...bulk.filter(elem => elem.cat == state.cat)];
    } else if (state.subSubCat == "") {
      catFiltered = [
        ...bulk.filter(
          elem => elem.cat == state.cat && elem.subCat == state.subCat
        )
      ];
    } else {
      catFiltered = [
        ...bulk.filter(
          elem =>
            elem.cat == state.cat &&
            elem.subCat == state.subCat &&
            elem.subSubCat == state.subSubCat
        )
      ];
    }
    return catFiltered;
  }; //...............................Handle cat filtration

  const handleRefresh = () => {
    dispatch_RP({ type: Types.SIMULATE_LOADING });
    dispatch_RP(Actions.handleGetAllProducts());
    dispatch_RP(ProdActions.handleLoadAllCats(token_RP));
  }; //.....................Handle Refresh

  const handleSearchChange = event => {
    const value = event.target.value;
    dispatch({
      type: LocalTypes.SET_NAME_SUCCESS,
      payload: {
        name: value
      }
    });
  };

  const handleCatChange = value => {
    let val = "";
    if (value === null) {
      val = "";
    } else {
      val = value.cat;
    }
    if (Validators.isEmpty(val)) {
      dispatch({
        type: LocalTypes.SET_CAT_FAIL,
        payload: {
          errorMessage: "Please select category",
          cat: val
        }
      });
    } else {
      //checking if pre-selected subCat and subSubCat exists starts....
      if (state.subCat != "") {
        dispatch({
          type: LocalTypes.SET_SUBCAT_FAIL,
          payload: {
            subCat: "",
            errorMessage: "Please select subCat accordingly"
          }
        });
      }
      if (state.subSubCat != "") {
        dispatch({
          type: LocalTypes.SET_SUBSUBCAT_FAIL,
          payload: {
            subSubCat: "",
            errorMessage: "Please select sub-sub-Cat accordingly"
          }
        });
      }

      //checking pre-selected subScat and SubSubCat ends...............
      //Altering subCat and subSubCat accordingly.....
      const copiedSubCat = [];
      const copiedSubSubCat = [];
      subCat_RP.forEach(elem => {
        if (elem.cat === val) {
          copiedSubCat.push(elem);
        }
      });
      subSubCat_RP.forEach(elem => {
        if (elem.cat === val) {
          copiedSubSubCat.push(elem);
        }
      });
      if (copiedSubSubCat.length === 0) {
        copiedSubSubCat.push({
          subSubCat: "Not Available"
        });
        setSubSubCatCopy([...copiedSubSubCat]);
      } else {
        setSubSubCatCopy([...copiedSubSubCat]);
      }
      if (copiedSubCat.length === 0) {
        copiedSubCat.push({
          subCat: "Not Available"
        });
        copiedSubSubCat.push({
          subSubCat: "Not Available"
        });
        setSubCatCopy([...copiedSubCat]);
        setSubSubCatCopy([...copiedSubSubCat]);
      } else {
        setSubCatCopy([...copiedSubCat]);
      }
      //Altering subCat and subSubCat ................
      dispatch({
        type: LocalTypes.SET_CAT_SUCCESS,
        payload: {
          cat: val
        }
      });
    }
  }; //..................................Handle Cat change

  const handleSubCatChange = value => {
    let val = "";
    if (value === null) {
      val = "";
    } else {
      val = value.subCat;
    }
    if (Validators.isEmpty(val)) {
      dispatch({
        type: LocalTypes.SET_SUBCAT_FAIL,
        payload: {
          errorMessage: "Please select sub-category",
          subCat: val
        }
      });
    } else {
      //seeing if sub sub cat is pre-selected starts....
      if (state.subSubCat != "") {
        dispatch({
          type: LocalTypes.SET_SUBSUBCAT_FAIL,
          payload: {
            subSubCat: "",
            errorMessage: "Please select sub-sub-Cat accordingly"
          }
        });
      }
      //seeing if sub sub cat is preselected ends.......
      //Setting sub sub cat accordingly starts....
      const copiedSubSubCat = [];
      subSubCat_RP.forEach(elem => {
        if (elem.cat === state.cat && elem.subCat === val) {
          copiedSubSubCat.push(elem);
        }
      });
      if (copiedSubSubCat.length === 0) {
        setSubSubCatCopy([
          {
            subSubCat: "Not Available"
          }
        ]);
      } else {
        setSubSubCatCopy([...copiedSubSubCat]);
      }
      //Setting sub sub cat accordingly ends......
      dispatch({
        type: LocalTypes.SET_SUBCAT_SUCCESS,
        payload: {
          subCat: val
        }
      });
    }
  }; //...................................Handle Sub Cat Change

  const handleSubSubCatChange = value => {
    let val = "";
    if (value === null) {
      val = "";
    } else {
      val = value.subSubCat;
    }
    if (Validators.isEmpty(val)) {
      dispatch({
        type: LocalTypes.SET_SUBSUBCAT_FAIL,
        payload: {
          errorMessage: "Please select sub-sub-category",
          subSubCat: val
        }
      });
    } else {
      dispatch({
        type: LocalTypes.SET_SUBSUBCAT_SUCCESS,
        payload: {
          subSubCat: val
        }
      });
    }
  }; //.....................................Handle Sub Sub Cat....

  const handleCityChange = city => {
    let val = "";
    if (city == null) {
      val = "";
    } else {
      val = city;
    }
    dispatch({
      type: LocalTypes.SET_CITY_SUCCESS,
      payload: {
        city: val
      }
    });
  }; //...............................

  //return starts...
  return (
    <React.Fragment>
      <AppBar />
      <MenuBar />
      <Row className={classes.container}>
        <Row className={classes.subContainer}>
          {/* Title starts... */}
          <Paper elevation={5} className={classes.titleRow}>
            <Row className={classes.titleIcon}>
              <SearchIcon className={classes.searchIcon} />
            </Row>
            <Row className={classes.titleTitle}>Search Product</Row>
          </Paper>
          {/* Title ends..... */}

          {/* Search Kit starts..... */}
          <Paper elevation={5} className={classes.searchKit}>
            <Row className={classes.topKit}>
              <Row className={classes.inputRow}>
                <Autocomplete
                  id="combo-box-cat"
                  options={[...cat_RP]}
                  getOptionLabel={option => option.cat}
                  onChange={(event, value) => {
                    handleCatChange(value);
                  }}
                  className={classes.input}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Category"
                      error={state.isCatError}
                      helperText={state.catErrorMessage}
                      required
                      variant="outlined"
                    />
                  )}
                />
              </Row>
              <Row className={classes.inputRow}>
                <Autocomplete
                  id="combo-box-cat"
                  options={[...subCatCopy]}
                  getOptionLabel={option => option.subCat}
                  onChange={(event, value) => {
                    handleSubCatChange(value);
                  }}
                  className={classes.input}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="sub-category"
                      error={state.isSubCatError}
                      helperText={state.subCatErrorMessage}
                      value={state.subCat}
                      required
                      variant="outlined"
                    />
                  )}
                />
              </Row>
              <Row className={classes.inputRow}>
                <Autocomplete
                  id="combo-box-cat"
                  options={[...subSubCatCopy]}
                  getOptionLabel={option => option.subSubCat}
                  onChange={(event, value) => {
                    handleSubSubCatChange(value);
                  }}
                  className={classes.input}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="sub-sub-category"
                      error={state.isSubSubCatError}
                      helperText={state.subSubCatErrorMessage}
                      required
                      variant="outlined"
                    />
                  )}
                />
              </Row>
            </Row>
            <Row className={classes.bottomKit}>
              <Row className={classes.inputRow}>
                <Input
                  type="text"
                  label="search Item"
                  className={classes.input}
                  value={state.name}
                  error={state.isNameError}
                  helperText={state.nameErrorMessage}
                  onChange={handleSearchChange}
                />
              </Row>
              <Row className={classes.inputRow}>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={state.price}
                  variant="outlined"
                  label="Price Filter"
                  error={state.isPriceError}
                  helperText={state.priceErrorMessage}
                  onChange={event => {
                    dispatch({
                      type: LocalTypes.SET_PRICE_SUCCESS,
                      payload: {
                        price: event.target.value
                      }
                    });
                  }}
                  label="Price Filter"
                  className={classes.input}
                >
                  <MenuItem value={"All Prices"}>All Prices</MenuItem>
                  <MenuItem value={"Lowest To Highest"}>
                    Lowest To Highest
                  </MenuItem>
                  <MenuItem value={"Highest To Lowest"}>
                    Highest To Lowest
                  </MenuItem>
                </Select>
              </Row>
              <Row className={classes.inputRow}>
                <Autocomplete
                  id="combo-box-cat"
                  options={[...Cities.cities]}
                  getOptionLabel={option => option}
                  onChange={(event, value) => {
                    handleCityChange(value);
                  }}
                  className={classes.input}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Cities"
                      error={state.isCityError}
                      helperText={state.cityErrorMessage}
                      variant="outlined"
                    />
                  )}
                />
              </Row>
            </Row>
            <Row className={classes.submitBtnRow}>
              <Button
                startIcon={<SearchIcon className={classes.searchIconSubmit} />}
                variant="contained"
                color="primary"
                onClick={handleFiltration}
              >
                Search
              </Button>
            </Row>
          </Paper>
          {/* Search Kits ends...... */}
          <Row className={classes.height}></Row>
        </Row>
      </Row>

      {loaded_RP || cat_loaded_RP ? (
        isError || cat_isError_RP ? (
          <Row className={classes.errorContainer}>
            <Row className={classes.errorMessage}>
              {" "}
              {errorMessage + " " + cat_errorMessage_RP}
            </Row>
            <Row className={classes.refreshBtn}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CachedIcon />}
                onClick={handleRefresh}
              >
                Refresh
              </Button>
            </Row>
          </Row>
        ) : (
          <DefaultScreen bulk={bulkCopy} />
        )
      ) : (
        <Row className={classes.bufferRow}>
          <CircularProgressBar color="secondary" size={60} />
        </Row>
      )}
      <Footer />
    </React.Fragment>
  );
  //return ends.....
}; //......................

export default withRouter(Products);
