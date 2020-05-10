import React from "react";
import Row from "./../../../UI/Row/ELXRow";
import Paper from "./../../../UI/Paper/Paper";
import PollIcon from "@material-ui/icons/Poll";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CommentIcon from "@material-ui/icons/Comment";
import { NavLink } from "react-router-dom";
import useStyles from "./MenuList.styles";
import HearingIcon from "@material-ui/icons/Hearing";
import HistoryIcon from "@material-ui/icons/History";
import RedeemIcon from "@material-ui/icons/Redeem";
import EmailIcon from "@material-ui/icons/Email";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

//dashboard/message

const MenuList = (props) => {
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
            textDecoration: "none",
          }}
          activeStyle={{
            color: "gold",
          }}
        >
          <AddCircleIcon className={classes.icon} />
          <Row className={classes.finalPadding}></Row>
          <Row
            style={{
              marginTop: "5px",
            }}
          >
            ADD PRODUCTS
          </Row>
        </NavLink>
      </Paper>
      <Paper className={classes.paper} elevation={8}>
        <Row className={classes.initialPadding}></Row>
        <NavLink
          to="/dashboard/products"
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
          <RedeemIcon className={classes.icon} />
          <Row className={classes.finalPadding}></Row>
          <Row
            style={{
              marginTop: "5px",
            }}
          >
            PRODUCTS
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
            textDecoration: "none",
          }}
          activeStyle={{
            color: "gold",
          }}
        >
          <PollIcon className={classes.icon} />
          <Row className={classes.finalPadding}></Row>
          <Row
            style={{
              marginTop: "5px",
            }}
          >
            STATISTICS
          </Row>
        </NavLink>
      </Paper>

      <Paper className={classes.paper} elevation={8}>
        <Row className={classes.initialPadding}></Row>
        <NavLink
          to="/dashboard/getProposals"
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
          <CommentIcon className={classes.icon} />
          <Row className={classes.finalPadding}></Row>
          <Row
            style={{
              marginTop: "5px",
            }}
          >
            PROPOSALS
          </Row>
        </NavLink>
      </Paper>
      <Paper className={classes.paper} elevation={8}>
        <Row className={classes.initialPadding}></Row>
        <NavLink
          to="/dashboard/requests"
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
          <HearingIcon className={classes.icon} />
          <Row className={classes.finalPadding}></Row>
          <Row
            style={{
              marginTop: "5px",
            }}
          >
            REQUESTS
          </Row>
        </NavLink>
      </Paper>
      <Paper className={classes.paper} elevation={8}>
        <Row className={classes.initialPadding}></Row>
        <NavLink
          to="/dashboard/final"
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
          <EventNoteIcon className={classes.icon} />
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
          to="/dashboard/history"
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
          to="/dashboard/message"
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
          to="/dashboard/profile"
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
