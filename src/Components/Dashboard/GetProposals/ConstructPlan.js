import React, { useReducer } from "react";
import Row from "./../../../UI/Row/ELXRow";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import StepThree from "./Factory/StepThree";
import InitialState from "./Factory/initialState";
import Reducer from "./Factory/reducer";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  bar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    height: "30px",
  },

  title: {
    fontSize: "18px",
    color: "#fff",
  },
  icon: {
    fontSize: "20px",
    cursor: "pointer",
    color: "#fff",
  },
  paddingDiv: {
    marginTop: "30px",
  },
}));

const ConstrctPlan = (props) => {
  //styles init...
  const classes = useStyles();

  const [state, dispatch] = useReducer(Reducer, InitialState);

  return (
    <React.Fragment>
      <Row className={classes.container}>
        <Row className={classes.bar}>
          <ArrowBackIcon onClick={props.back} className={classes.icon} />
          <Row className={classes.title}>Suggest Modifications</Row>
          <Row></Row>
        </Row>
        <Row className={classes.paddingDiv}></Row>
        <StepThree
          refresh={props.refresh}
          state={state}
          dispatch={dispatch}
          data={props.data}
        />
        <Row className={classes.paddingDiv}></Row>
      </Row>
    </React.Fragment>
  );
}; //...........................

export default ConstrctPlan;
