import React from "react";
import useStyles from "./HorizontalList.styles";
import Row from "./../Row/ELXRow";
import Paper from "./../Paper/Paper";
import FavoriteIcon from "@material-ui/icons/Favorite";

const HorizonatalList = props => {
  const classes = useStyles();
  return (
    <Row className={classes.container}>
      <Row className={classes.list}>
        {props.products.map((elem, index) => (
          <Paper key={index} elevation={7} className={classes.paper}>
            <Row className={classes.cardHeadingRow}>
              <FavoriteIcon className={classes.icon} />
              <Row>{elem.title}</Row>
              <Row className={classes.padding}></Row>
            </Row>
          </Paper>
        ))}
      </Row>
    </Row>
  );
}; //..............................

export default HorizonatalList;
