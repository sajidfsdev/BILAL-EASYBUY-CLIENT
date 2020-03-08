import React from "react";
import Row from "./../../../UI/Row/ELXRow";
import useStyles from "./Cover.styles";
// import cover from "./../../../Assets/images/testingSix.jpg";
import cover from "./../../../Assets/images/testingEight.jpg";

const Cover = props => {
  //classes init...
  const classes = useStyles();

  //return starts...
  return (
    <Row className={classes.cover}>
      <img src={cover} className={classes.image} />
    </Row>
  );
  //return ends.....
}; //....................

export default Cover;
