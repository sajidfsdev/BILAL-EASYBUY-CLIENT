import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Row from "./../../../../UI/Row/ELXRow";
import MakeInstallment from "./../../../BuyerDashboard/Collaborators/CollTable/MakeInstallment/MakeInstallment";

const useStyles = makeStyles((theme) => ({}));

const SuggestScreen = (props) => {
  //styles init.....
  const classes = useStyles();

  return (
    <React.Fragment>
      <MakeInstallment
        state={props.state}
        dispatch={props.dispatch}
        setActiveState={props.setActiveState}
        data={props.data}
      />
    </React.Fragment>
  );
}; //............................

export default SuggestScreen;
