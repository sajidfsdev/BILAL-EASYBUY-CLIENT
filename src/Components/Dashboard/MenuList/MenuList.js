import React from "react";
import Row from "./../../../UI/Row/ELXRow";
import Paper from "./../../../UI/Paper/Paper";
import PollIcon from "@material-ui/icons/Poll";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { NavLink } from "react-router-dom";
import useStyles from "./MenuList.styles";

const MenuList = props => {
  const classes = useStyles();
  return (
    <Row className={classes.container}>
      <Paper className={classes.paper} elevation={8}>
        <Row className={classes.initialPadding}></Row>
        <NavLink
          to="/dashboard/addproducts"
          exact
          style={{
            color: "white",
            display: "flex",
            flexDirection: "row",
            textDecoration: "none"
          }}
          activeStyle={{
            color: "gold"
          }}
        >
          <AddCircleIcon className={classes.icon} />
          <Row className={classes.finalPadding}></Row>
          <Row
            style={{
              marginTop: "5px"
            }}
          >
            ADD PRODUCTS
          </Row>
        </NavLink>
      </Paper>
      <Paper className={classes.paper} elevation={8}>
        <Row className={classes.initialPadding}></Row>
        <NavLink
          to="/dashboard/statistics"
          exact
          style={{
            color: "white",
            display: "flex",
            flexDirection: "row",
            textDecoration: "none"
          }}
          activeStyle={{
            color: "gold"
          }}
        >
          <PollIcon className={classes.icon} />
          <Row className={classes.finalPadding}></Row>
          <Row
            style={{
              marginTop: "5px"
            }}
          >
            STATISTICS
          </Row>
        </NavLink>
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
