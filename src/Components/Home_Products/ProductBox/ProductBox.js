import React, { useState } from "react";
import Row from "./../../../UI/Row/ELXRow";
import Paper from "./../../../UI/Paper/Paper";
import useStyles from "./ProductBox.styles";
import Zoom from "@material-ui/core/Zoom";

const Products = props => {
  //classes init...
  const classes = useStyles();

  const [checked, setChecked] = useState(false);

  //return starts...
  return (
    <React.Fragment>
      <Paper
        elevation={8}
        className={classes.imageBox}
        onMouseOver={() => {
          setChecked(true);
        }}
        onMouseOut={() => {
          setChecked(false);
        }}
      >
        <Zoom in={checked}>
          <Row
            className={classes.curtain}
            onMouseOut={() => {
              setChecked(false);
            }}
          >
            <Row className={classes.curtainTitle}>HP Pavilian</Row>
            <Paper
              elevation={8}
              style={{ marginTop: "30px" }}
              className={classes.tableRow}
            >
              <Row className={classes.tableHeading}>Down Payment:</Row>
              <Row className={classes.tableText}>Rs: 100000</Row>
            </Paper>
            <Paper elevation={8} className={classes.tableRow}>
              <Row className={classes.tableHeading}>Total Price:</Row>
              <Row className={classes.tableText}>Rs: 100000</Row>
            </Paper>
            <Paper elevation={8} className={classes.tableRow}>
              <Row className={classes.tableHeading}>Installments:</Row>
              <Row className={classes.tableText}>5 Months</Row>
            </Paper>

            <Paper elevation={8} className={classes.tableRow}>
              <Row className={classes.tableHeading}>Area:</Row>
              <Row className={classes.tableText}>Islamabad</Row>
            </Paper>
            <Row className={classes.btnRow}>
              <button className={classes.btn}>See Details</button>
            </Row>
          </Row>
        </Zoom>
      </Paper>
    </React.Fragment>
  );
  //return ends.....
}; //......................

export default Products;
