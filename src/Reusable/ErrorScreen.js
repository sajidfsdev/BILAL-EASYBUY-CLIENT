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
    color: "red",
  },
}));

const EmptyScreen = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Row className={classes.container}>
        <Row className={classes.error}>{props.errorMessage}</Row>
        <Row className={classes.btn}>
          <Button
            onClick={props.refresh}
            variant="contained"
            color="primary"
            startIcon={<CachedIcon />}
          >
            Refresh
          </Button>
        </Row>
      </Row>
    </React.Fragment>
  );
}; //...........................

EmptyScreen.defaultProps = {
  errorMessage: "Sorry Failed To Load Resources Due To Network Error",
  refresh: () => {},
};

export default EmptyScreen;
