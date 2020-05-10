import React from "react";
import Row from "./../../../UI/Row/ELXRow";
import Paper from "./../../../UI/Paper/Paper";
import GroupIcon from "@material-ui/icons/Group";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { NavLink } from "react-router-dom";
import HistoryIcon from "@material-ui/icons/History";
import EmailIcon from "@material-ui/icons/Email";
import useStyles from "./MenuList.styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
const MenuList = (props) => {
  const classes = useStyles();
  return (
    <Row className={classes.container}>
      <Paper className={classes.paper} elevation={8}>
        <Row className={classes.initialPadding}></Row>
        <NavLink
          to="/manage/collaborators"
          exact
          style={{
            color: "white",
            display: "flex",
            flexDirection: "row",
            textDecoration: "none",
          }}
          activeStyle={{
            color: "gold",
          }}
        >
          <GroupIcon className={classes.icon} />
          <Row className={classes.finalPadding}></Row>
          <Row
            style={{
              marginTop: "5px",
            }}
          >
            COLLABORATORS
          </Row>
        </NavLink>
      </Paper>
      <Paper className={classes.paper} elevation={8}>
        <Row className={classes.initialPadding}></Row>
        <NavLink
          to="/manage/consigned"
          exact
          style={{
            color: "white",
            display: "flex",
            flexDirection: "row",
            textDecoration: "none",
          }}
          activeStyle={{
            color: "gold",
          }}
        >
          <ListAltIcon className={classes.icon} />
          <Row className={classes.finalPadding}></Row>
          <Row
            style={{
              marginTop: "5px",
            }}
          >
            CONSIGNED
          </Row>
        </NavLink>
      </Paper>
      <Paper className={classes.paper} elevation={8}>
        <Row className={classes.initialPadding}></Row>
        <NavLink
          to="/manage/history"
          exact
          style={{
            color: "white",
            display: "flex",
            flexDirection: "row",
            textDecoration: "none",
          }}
          activeStyle={{
            color: "gold",
          }}
        >
          <HistoryIcon className={classes.icon} />
          <Row className={classes.finalPadding}></Row>
          <Row
            style={{
              marginTop: "5px",
            }}
          >
            HISTORY
          </Row>
        </NavLink>
      </Paper>

      <Paper className={classes.paper} elevation={8}>
        <Row className={classes.initialPadding}></Row>
        <NavLink
          to="/manage/message"
          exact
          style={{
            color: "white",
            display: "flex",
            flexDirection: "row",
            textDecoration: "none",
          }}
          activeStyle={{
            color: "gold",
          }}
        >
          <EmailIcon className={classes.icon} />
          <Row className={classes.finalPadding}></Row>
          <Row
            style={{
              marginTop: "5px",
            }}
          >
            MESSAGES
          </Row>
        </NavLink>
      </Paper>

      <Paper className={classes.paper} elevation={8}>
        <Row className={classes.initialPadding}></Row>
        <NavLink
          to="/manage/profile"
          exact
          style={{
            color: "white",
            display: "flex",
            flexDirection: "row",
            textDecoration: "none",
          }}
          activeStyle={{
            color: "gold",
          }}
        >
          <AccountCircleIcon className={classes.icon} />
          <Row className={classes.finalPadding}></Row>
          <Row
            style={{
              marginTop: "5px",
            }}
          >
            PROFILE
          </Row>
        </NavLink>
      </Paper>
    </Row>
  );
}; //.......................

export default MenuList;
