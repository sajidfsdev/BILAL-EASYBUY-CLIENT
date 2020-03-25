import React, { useEffect, useState, useReducer } from "react";
import InitialState from "./initialState";
import Reducer from "./reducer";
import Row from "./../../UI/Row/ELXRow";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useSelector, useDispatch } from "react-redux";
import CircularProgressBar from "./../../UI/CircularProgressBar/CircularProgressBar";
import * as Actions from "./../../Store/Action/products";
import Stepper from "./../../UI/Stepper/Stepper";
import StepOne from "./../../Components/AddProduct/StepOne/StepOne";
import StepTwo from "./../../Components/AddProduct/StepTwo/StepTwo";
import StepThree from "./../../Components/AddProduct/StepThree/StepThree";
import SuccessScreen from "./../../Components/AddProduct/SuccessScreen/SuccessScreen";
import * as Types from "./types";
import * as RefType from "./../../Store/Constants/products";
import useStyles from "./AddProducts.styles";

const AddProducts = props => {
  const classes = useStyles();

  const [state, dispatch] = useReducer(Reducer, InitialState);

  //state management ...
  const loaded_RP = useSelector(state => state.products.loaded);
  const isError_RP = useSelector(state => state.products.isError);
  const errorMessage_RP = useSelector(state => state.products.errorMessage);
  const token_RP = useSelector(state => state.auth.token);
  const isSaveError_RP = useSelector(state => state.products.isSaveError);
  const failureMessage_RP = useSelector(state => state.products.failureMessage);
  const showSaveMessage_RP = useSelector(
    state => state.products.showSaveMessage
  );
  const dispatch_RP = useDispatch();

  const [activeState, setActiveState] = useState(0);

  //Handle SetActiveState....

  //use effect....
  useEffect(() => {
    if (loaded_RP === false || isError_RP === true) {
      dispatch_RP(Actions.handleLoadAllCats(token_RP));
    }
  }, []);

  //Handle refresh...
  const handleRefresh = () => {
    dispatch_RP({
      type: RefType.REFRESH
    });
    dispatch({
      type: Types.REFRESH_STATE
    });
    setActiveState(0);
  };

  //return starts...
  return (
    <React.Fragment>
      <Row className={classes.title}>
        <Row
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <Row className={classes.icon}>
            <AddCircleIcon />
          </Row>
          <Row
            style={{
              marginTop: "5px"
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
