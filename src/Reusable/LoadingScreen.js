import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Row from "./../UI/Row/ELXRow";
import CircularProgressBar from "./../UI/CircularProgressBar/CircularProgressBar";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const LoadingScreen = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Row className={classes.container}>
        <CircularProgressBar size={props.size} color={props.color} />
      </Row>
    </React.Fragment>
  );
}; //...........................

LoadingScreen.defaultProps = {
  size: 30,
  color: "secondary",
};

export default LoadingScreen;
