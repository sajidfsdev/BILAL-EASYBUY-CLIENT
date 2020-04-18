import React, { useState } from "react";
import Row from "./../../../UI/Row/ELXRow";
import useStyles from "./SubMenu.styles";
import { Paper } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import ProductScreen from "./ProductScreen";
import SuggestionsScreen from "./SuggestionsScreen";
import SuggestScreen from "./suggestScreen";

const PRODUCT_SCREEN = "PRODUCTSCREEN";
const SUGGESTIONS_SCREEN = "SUGGESTIONSSCREEN";
const SUGGEST_SCREEN = "SUGGESTSCREEN";

const SubMenu = (props) => {
  //classes init...
  const classes = useStyles();

  //state management starts...
  const [activeScreen, setActiveScreen] = useState(PRODUCT_SCREEN);

  const handleChangeScreen = (screen) => {
    setActiveScreen(screen);
  }; //...................................

  //return starts....
  return (
    <React.Fragment>
      <Row className={classes.container}>
        <Paper elevation={2} className={classes.topBar}>
          <Row className={classes.left}>
            <ArrowBackIcon className={classes.icon} onClick={props.goBack} />
          </Row>
          <Row className={classes.right}>
            <Row
              className={
                activeScreen == PRODUCT_SCREEN
                  ? classes.active
                  : classes.inactive
              }
              onClick={() => {
                handleChangeScreen(PRODUCT_SCREEN);
              }}
            >
              PRODUCT
            </Row>
            <Row
              className={
                activeScreen == SUGGESTIONS_SCREEN
                  ? classes.active
                  : classes.inactive
              }
              onClick={() => {
                handleChangeScreen(SUGGESTIONS_SCREEN);
              }}
            >
              SUGGESTIONS
            </Row>
            <Row
              className={
                activeScreen == SUGGEST_SCREEN
                  ? classes.active
                  : classes.inactive
              }
              onClick={() => {
                handleChangeScreen(SUGGEST_SCREEN);
              }}
            >
              SUGGEST
            </Row>
          </Row>
        </Paper>

        <Row className={classes.screenArea}>
          {activeScreen === PRODUCT_SCREEN ? (
            <ProductScreen data={props.data} productId={props.productId} />
          ) : activeScreen == SUGGESTIONS_SCREEN ? (
            <SuggestionsScreen
              delete={props.delete}
              data={props.data}
              productId={props.productId}
              goBack={props.goBack}
            />
          ) : (
            <SuggestScreen data={props.data} productId={props.productId} />
          )}
        </Row>
      </Row>
    </React.Fragment>
  );
  //return ends......
}; //......................

export default SubMenu;
