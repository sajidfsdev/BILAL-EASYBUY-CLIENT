import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Row from "../UI/Row/ELXRow";
import { Button } from "@material-ui/core";
import CachedIcon from "@material-ui/icons/Cached";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    marginTop: "15px",
  },
  error: {
    fontSize: "18px",
    color: theme.palette.primary.main,
  },
}));

const EmptyScreen = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Row className={classes.container}>
        <Row className={classes.error}>{props.message}</Row>
        <Row className={classes.btn}></Row>
      </Row>
    </React.Fragment>
  );
}; //...........................

EmptyScreen.defaultProps = {
  errorMessage: "No Record Exists",
  refresh: () => {},
};

export default EmptyScreen;
