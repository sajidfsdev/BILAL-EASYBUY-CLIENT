import React from "react";
import Row from "./../../../UI/Row/ELXRow";
import Paper from "./../../../UI/Paper/Paper";
import PollIcon from "@material-ui/icons/Poll";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import useStyles from "./MenuList.styles";

const MenuList = props => {
  const classes = useStyles();
  return (
    <Row className={classes.container}>
      <Paper className={classes.paper} elevation={8}>
        <Row className={classes.initialPadding}></Row>
        <PollIcon className={classes.icon} />
        <Row className={classes.finalPadding}></Row>
        STATISTICS
      </Paper>
      <Paper className={classes.paper} elevation={8}>
        <Row className={classes.initialPadding}></Row>
        <CardGiftcardIcon className={classes.icon} />
        <Row className={classes.finalPadding}></Row>
        PRODUCTS
      </Paper>
      <Paper className={classes.paper} elevation={8}>
        <Row className={classes.initialPadding}></Row>
        <AccountCircleIcon className={classes.icon} />
        <Row className={classes.finalPadding}></Row>
        PROFILE
      </Paper>
    </Row>
  );
}; //.......................

export default MenuList;
