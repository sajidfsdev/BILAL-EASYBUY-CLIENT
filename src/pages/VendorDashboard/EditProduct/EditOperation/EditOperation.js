import React, { useEffect, useState, useReducer } from "react";
import InitialState from "./initialState";
import Reducer from "./reducer";
import Row from "./../../../../UI/Row/ELXRow";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useSelector, useDispatch } from "react-redux";
import CircularProgressBar from "./../../../../UI/CircularProgressBar/CircularProgressBar";
import * as Actions from "./../../../../Store/Action/products";
import Stepper from "./../../../../UI/Stepper/Stepper";
import StepOne from "./StepOne/StepOne";
import StepTwo from "./StepTwo/StepTwo";
import StepThree from "./StepThree/StepThree";
import SuccessScreen from "./SuccessScreen/SuccessScreen";
import * as Types from "./types";
import * as RefType from "./../../../../Store/Constants/products";
import useStyles from "./EditOperation.styles";

const AddProducts = (props) => {
  const classes = useStyles();

  const [state, dispatch] = useReducer(Reducer, InitialState);

  //state management ...
  const loaded_RP = useSelector((state) => state.products.loaded);
  const isError_RP = useSelector((state) => state.products.isError);
  const errorMessage_RP = useSelector((state) => state.products.errorMessage);
  const token_RP = useSelector((state) => state.auth.token);
  const isSaveError_RP = useSelector((state) => state.products.isSaveError);
  const failureMessage_RP = useSelector(
    (state) => state.products.failureMessage
  );

  const showSaveMessage_RP = useSelector(
    (state) => state.products.showSaveMessage
  );
  const dispatch_RP = useDispatch();

  const [activeState, setActiveState] = useState(0);

  //Handle SetActiveState....

  useEffect(() => {
    let att = [];
    props.data.att.forEach((elem, index) => {
      att.push({
        attribute: elem[0].attribute,
        value: elem[0].value,
      });
    });
    //setting images
    let images = [
      {
        file: null,
        filename: null,
        path: null,
        progress: 0,
        isError: false,
        serverfilename: null,
        message: "No File Choosen",
      },
      {
        file: null,
        filename: null,
        path: null,
        progress: 0,
        isError: false,
        serverfilename: null,
        message: "No File Choosen",
      },
      {
        file: null,
        filename: null,
        path: null,
        progress: 0,
        isError: false,
        serverfilename: null,
        message: "No File Choosen",
      },
      {
        file: null,
        filename: null,
        path: null,
        progress: 0,
        isError: false,
        serverfilename: null,
        message: "No File Choosen",
      },
    ];

    props.data.images.forEach((elem, index) => {
      images[index].serverfilename = elem;
      images[index].progress = 100;
    });
    setInitialData(att, images);
  }, []);

  const setInitialData = (att, images) => {
    dispatch({
      type: Types.SET_ALL_DATA,
      payload: {
        name: props.data.name,
        cat: props.data.cat,
        subCat: props.data.subCat,
        subSubCat: props.data.subSubCat,
        price: props.data.price,
        desc: props.data.desc,
        att: att,
        images: images,
        installmentPlan: [...props.data.installmentPlan.installmentPlan],
        downPayment: props.data.installmentPlan.downPayment,
        duration: props.data.installmentPlan.duration,
      },
    });
  }; //........................Set initial Data

  //use effect....
  useEffect(() => {
    if (loaded_RP === false || isError_RP === true) {
      dispatch_RP(Actions.handleLoadAllCats(token_RP));
    }
  }, []);

  //Handle refresh...
  const handleRefresh = () => {
    setActiveState(0);
    props.refresh();
  };

  //return starts...
  return (
    <React.Fragment>
      <Row className={classes.title}>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Row className={classes.icon}>
            <AddCircleIcon />
          </Row>
          <Row
            style={{
              marginTop: "5px",
            }}
          >
            ADD PRODUCT
          </Row>
        </Row>
      </Row>
      <Row className={classes.container}>
        {loaded_RP === false ? (
          <Row className={classes.progressBar}>
            <CircularProgressBar color="secondary" size={60} />
          </Row>
        ) : isError_RP ? (
          <Row className={classes.errorMessage}>{errorMessage_RP}</Row>
        ) : isSaveError_RP ? (
          <Row>{failureMessage_RP}</Row>
        ) : showSaveMessage_RP ? (
          <SuccessScreen
            state={state}
            refresh={handleRefresh}
            dispatch={dispatch}
            setActiveState={setActiveState}
          />
        ) : (
          <Row>
            <Stepper activeStep={activeState} />
            {activeState === 0 ? (
              <StepOne
                state={state}
                dispatch={dispatch}
                setActiveState={setActiveState}
              />
            ) : activeState === 1 ? (
              <StepTwo
                state={state}
                dispatch={dispatch}
                setActiveState={setActiveState}
              />
            ) : (
              <StepThree
                state={state}
                dispatch={dispatch}
                setActiveState={setActiveState}
                id={props.data._id}
              />
            )}
          </Row>
        )}
      </Row>
    </React.Fragment>
  );
  //return ends.....
}; //......................

export default AddProducts;
