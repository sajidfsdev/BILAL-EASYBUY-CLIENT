import Row from "./../../../UI/Row/ELXRow";
import React, { useState } from "react";
import Input from "./../../../UI/Input/Input";
import Validators from "./../../../Utils/Methods/validation";
import * as Types from "./../../../pages/AddProducts/types";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useSelector } from "react-redux";
import Table from "./../../../UI/Table/Table";
import useStyles from "./StepOne.styles";
import { Button } from "@material-ui/core";
const StepOne = props => {
  //classes...

  const classes = useStyles();

  //state mnagement....
  const cat_RP = useSelector(state => state.products.cat);
  const subCat_RP = useSelector(state => state.products.subCat);
  const subSubCat_RP = useSelector(state => state.products.subSubCat);

  const [subCatCopy, setSubCatCopy] = useState([...subCat_RP]);
  const [subSubCatCopy, setSubSubCatCopy] = useState([...subSubCat_RP]);
  const [att, setAtt] = useState("");
  const [attVal, setAttVal] = useState("");

  //Methods......

  const handleDeleteAtt = index => {
    const copiedArr = [];
    props.state.att.forEach((elem, ind) => {
      if (index != ind) {
        copiedArr.push(elem);
      }
    });
    props.dispatch({
      type: Types.SET_ATT_SUCCESS,
      payload: {
        att: [...copiedArr]
      }
    });
  };

  const handleNext = () => {
    if (
      props.state.name === "" ||
      props.state.price === "" ||
      props.state.cat === "" ||
      props.state.subCat === "" ||
      props.state.subSubCat === "" ||
      props.state.att.length === 0
    ) {
      return window.alert("Please fill The Requisite Fields");
    }

    if (
      props.state.isNameError ||
      props.state.isPriceError ||
      props.state.isCatError ||
      props.state.isSubCatError ||
      props.state.isSubSubCatError
    ) {
      return window.alert("Please correct above error inOrder to proceed");
    }

    props.setActiveState(1);
  }; //...........................Handle Next

  const handleAttChange = event => {
    const value = event.target.value;
    setAtt(value);
  }; //.........................Handle Att Change

  const handleAttValChange = event => {
    const value = event.target.value;
    setAttVal(value);
  }; //.........................Handle AttVal change

  const handleNameChange = event => {
    const value = event.target.value;
    if (Validators.isEmpty(value)) {
      props.dispatch({
        type: Types.SET_NAME_FAIL,
        payload: {
          errorMessage: "Product Name cannot be empty",
          name: value
        }
      });
    } else {
      props.dispatch({
        type: Types.SET_NAME_SUCCESS,
        payload: {
          name: value
        }
      });
    }
  }; //..................................Handle Name Change

  const handlePriceChange = event => {
    const value = event.target.value;
    if (Validators.isEmpty(value)) {
      props.dispatch({
        type: Types.SET_PRICE_FAIL,
        payload: {
          errorMessage: "Product Price cannot be empty",
          price: value
        }
      });
    } else if (Validators.isNumeric(value) === false) {
      props.dispatch({
        type: Types.SET_PRICE_FAIL,
        payload: {
          errorMessage: "Price Must Be Numeric Value",
          price: value
        }
      });
    } else if (value < 1) {
      props.dispatch({
        type: Types.SET_PRICE_FAIL,
        payload: {
          errorMessage: "Price must be greater than 0",
          price: value
        }
      });
    } else {
      props.dispatch({
        type: Types.SET_PRICE_SUCCESS,
        payload: {
          price: value
        }
      });
    }
  }; //..................................Handle Price Change

  const handleCatChange = value => {
    let val = "";
    if (value === null) {
      val = "";
    } else {
      val = value.cat;
    }
    if (Validators.isEmpty(val)) {
      props.dispatch({
        type: Types.SET_CAT_FAIL,
        payload: {
          errorMessage: "Please select category",
          cat: val
        }
      });
    } else {
      //checking if pre-selected subCat and subSubCat exists starts....
      if (props.state.subCat != "") {
        props.dispatch({
          type: Types.SET_SUBCAT_FAIL,
          payload: {
            subCat: "",
            errorMessage: "Please select subCat accordingly"
          }
        });
      }
      if (props.state.subSubCat != "") {
        props.dispatch({
          type: Types.SET_SUBSUBCAT_FAIL,
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

      //Resetting Values starts.....
      // props.dispatch({
      //   type: Types.SET_SUBCAT_SUCCESS,
      //   payload: {
      //     subCat: ""
      //   }
      // });
      // props.dispatch({
      //   type: Types.SET_SUBSUBCAT_SUCCESS,
      //   payload: {
      //     subSubCat: ""
      //   }
      // });
      //Resetting Values ends.......

      props.dispatch({
        type: Types.SET_CAT_SUCCESS,
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
      props.dispatch({
        type: Types.SET_SUBCAT_FAIL,
        payload: {
          errorMessage: "Please select sub-category",
          subCat: val
        }
      });
    } else {
      //seeing if sub sub cat is pre-selected starts....
      if (props.state.subSubCat != "") {
        props.dispatch({
          type: Types.SET_SUBSUBCAT_FAIL,
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
        if (elem.cat === props.state.cat && elem.subCat === val) {
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
      props.dispatch({
        type: Types.SET_SUBCAT_SUCCESS,
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
      props.dispatch({
        type: Types.SET_SUBSUBCAT_FAIL,
        payload: {
          errorMessage: "Please select sub-sub-category",
          subSubCat: val
        }
      });
    } else {
      props.dispatch({
        type: Types.SET_SUBSUBCAT_SUCCESS,
        payload: {
          subSubCat: val
        }
      });
    }
  }; //.....................................Handle Sub Sub Cat....

  const handleDescChange = event => {
    const value = event.target.value;
    props.dispatch({
      type: Types.SET_DESC_SUCCESS,
      payload: {
        desc: value
      }
    });
  }; //......................................Handle Desc Error

  // Handle Att Form Submission.....
  const handleAttFormSubmission = event => {
    event.preventDefault();
    const copyArr = [...props.state.att];
    copyArr.push({
      attribute: att,
      value: attVal
    });
    props.dispatch({
      type: Types.SET_ATT_SUCCESS,
      payload: {
        att: [...copyArr]
      }
    });
    setAttVal("");
    setAtt("");
  };
  // Handle Att Form Submission.....

  //return starts...
  return (
    <React.Fragment>
      {/* container starts.... */}
      <Row className={classes.container}>
        <Row className={classes.leftArea}>
          <Input
            className={classes.input}
            required
            value={props.state.name}
            onChange={handleNameChange}
            helperText={props.state.nameErrorMessage}
            error={props.state.isNameError}
            label="Product Name"
          />
        </Row>
        <Row className={classes.rightArea}>
          <Input
            type="number"
            className={classes.input}
            required
            value={props.state.price}
            onChange={handlePriceChange}
            helperText={props.state.priceErrorMessage}
            error={props.state.isPriceError}
            label="Price (Rs)"
          />
        </Row>
      </Row>
      {/* Container ends...... */}

      {/* container starts.... */}
      <Row className={classes.container}>
        <Row className={classes.leftArea}>
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
                error={props.state.isCatError}
                helperText={props.state.catErrorMessage}
                required
                variant="outlined"
              />
            )}
          />
        </Row>
        <Row className={classes.rightArea}>
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
                error={props.state.isSubCatError}
                helperText={props.state.subCatErrorMessage}
                value={props.state.subCat}
                required
                variant="outlined"
              />
            )}
          />
        </Row>
      </Row>
      {/* Container ends...... */}

      {/* container starts.... */}
      <Row className={classes.container}>
        <Row className={classes.leftArea}>
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
                error={props.state.isSubSubCatError}
                helperText={props.state.subSubCatErrorMessage}
                required
                variant="outlined"
              />
            )}
          />
        </Row>
        <Row className={classes.rightArea}>
          <Input
            className={classes.input}
            value={props.state.desc}
            onChange={handleDescChange}
            helperText={props.state.descErrorMessage}
            error={props.state.isDescError}
            label="Description"
          />
        </Row>
      </Row>
      {/* Container ends...... */}

      {/* Attributes starts..... */}
      <Row className={classes.attributeContainer}>
        <Row className={classes.attributeTitle}>Product Attributes</Row>
      </Row>

      <Row className={classes.attributeContainer}>
        <Row className={classes.attInputRow}>
          <form onSubmit={handleAttFormSubmission}>
            <Input
              type="text"
              value={att}
              onChange={handleAttChange}
              required
              label="Title"
            />
            <Input
              type="text"
              required
              value={attVal}
              onChange={handleAttValChange}
              label="Value"
              className={classes.attInput}
            />
            <Button
              type="submit"
              className={classes.attBtn}
              variant="contained"
              color="primary"
            >
              ADD
            </Button>
          </form>
        </Row>
      </Row>
      {/* Attributes Ends...... */}

      {/* Table starts here..... */}
      <Row className={classes.attributeContainer}>
        <Row className={classes.tableContainer}>
          <Table data={props.state.att} handleDeleteAtt={handleDeleteAtt} />
        </Row>
      </Row>
      {/* Table ends here....... */}

      {/* Next Button Starts.... */}
      <Row className={classes.nextContainer}>
        <Row className={classes.next}>
          <Button onClick={handleNext} color="primary" variant="contained">
            NEXT ->
          </Button>
        </Row>
      </Row>
      {/* Next Button ends...... */}
    </React.Fragment>
  );
  //return ends.....
}; //.......................

export default StepOne;
