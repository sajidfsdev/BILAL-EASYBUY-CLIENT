import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Row from "./../../../../UI/Row/ELXRow";
import BackspaceIcon from "@material-ui/icons/Backspace";
import Tooltip from "./../../../../UI/Tooltip/Tooltip";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "40px",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
  },

  left: {
    display: "flex",
    height: "40px",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  title: {
    color: "white",
    fontSize: 15,
    marginLeft: "20px",
    cursor: "pointer",
  },

  activeTitle: {
    color: "gold",
    fontSize: 15,
    marginLeft: "20px",
    cursor: "pointer",
  },

  icon: {
    color: "red",
    cursor: "pointer",
  },
}));

const DETAILS_SCREEN = "DETAILSSCREEN";
const PROPOSED_SCREEN = "PROPOSEDSCREEN";
const PLANS_SCREENS = "PLANSCREENS";

const TopBar = (props) => {
  //styles init.....
  const classes = useStyles();

  return (
    <Row className={classes.container}>
      <Row className={classes.left}>
        <Row
          className={
            props.screens === DETAILS_SCREEN
              ? classes.activeTitle
              : classes.title
          }
          onClick={() => {
            props.handleChangeScreen(DETAILS_SCREEN);
          }}
        >
          Details
        </Row>
        <Row
          className={
            props.screens === PROPOSED_SCREEN
              ? classes.activeTitle
              : classes.title
          }
          onClick={() => {
            props.handleChangeScreen(PROPOSED_SCREEN);
          }}
        >
          Proposed_Plans
        </Row>
        <Row
          className={
            props.screens === PLANS_SCREENS
              ? classes.activeTitle
              : classes.title
          }
          onClick={() => {
            props.handleChangeScreen(PLANS_SCREENS);
          }}
        >
          Suggest_Plan
        </Row>
      </Row>
      <Row className={classes.right}>
        <Tooltip title="Close">
          <BackspaceIcon className={classes.icon} onClick={props.handleClose} />
        </Tooltip>
      </Row>
    </Row>
  );
}; //....................

TopBar.defaultProps = {
  handleClose: () => {},
  handleChangeScreen: () => {},
  screens: DETAILS_SCREEN,
};

export default TopBar;
