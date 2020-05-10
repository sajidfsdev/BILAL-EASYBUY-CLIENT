import React, { useState, useReducer, useEffect } from "react";
import InitialState from "./../initialState";
import Reducer from "./../Reducer";
import * as Types from "./../types";
import useStyles from "./SubMenus.styles";
import Row from "./../../../../UI/Row/ELXRow";
import CircularProgressBar from "./../../../../UI/CircularProgressBar/CircularProgressBar";
import TopBar from "./TopBar";
import DetailsScreen from "./DetailsScreen";
import ProposedScreen from "./ProposedScreen";
import SuggestScreen from "./SuggestScreen";

const LOADING_SCREEN = "LOADINGSCREEN";
const DETAILS_SCREEN = "DETAILSSCREEN";
const PROPOSED_SCREEN = "PROPOSEDSCREEN";
const PLANS_SCREENS = "PLANSCREENS";

const SubMenus = (props) => {
  //classes init....
  const classes = useStyles();

  const [state, dispatch] = useReducer(Reducer, InitialState);

  //state management starts....
  const [screens, setScreens] = useState(DETAILS_SCREEN);

  //use effect starts....
  useEffect(() => {
    dispatch({
      type: Types.SET_PRICE_SUCCESS,
      payload: {
        price: props.data.productId.price,
      },
    });
  }, []);
  //use effect ends......

  //Methods starts....
  const handleChangeScreen = (screens) => {
    setScreens(screens);
  };
  //Methods ends......

  let mainGUI = null;
  //main gui starts...
  if (screens === LOADING_SCREEN) {
    mainGUI = (
      <Row className={classes.bufferring}>
        <CircularProgressBar size={50} color="secondary" />
      </Row>
    );
  } else if (
    screens === DETAILS_SCREEN ||
    screens === PROPOSED_SCREEN ||
    screens === PLANS_SCREENS
  ) {
    mainGUI = (
      <React.Fragment>
        <TopBar
          handleClose={props.handleClose}
          screens={screens}
          handleChangeScreen={handleChangeScreen}
        />
        {screens === DETAILS_SCREEN ? (
          <DetailsScreen data={props.data} />
        ) : screens === PROPOSED_SCREEN ? (
          <ProposedScreen data={props.data} />
        ) : screens === PLANS_SCREENS ? (
          <SuggestScreen
            state={state}
            dispatch={dispatch}
            data={props.data}
            setActiveState={() => {}}
            goBack={() => {
              handleChangeScreen(PROPOSED_SCREEN);
            }}
          />
        ) : null}
      </React.Fragment>
    );
  }

  //main GUI ends.....

  return <React.Fragment>{mainGUI}</React.Fragment>;
}; //.......................

SubMenus.defaultProps = {
  data: null,
  handleClose: () => {},
};

export default SubMenus;
