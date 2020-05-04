import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import * as Actions from "./../../Store/Action/Register";
import * as Types from "./../../Store/Constants/Auth";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import DashboardIcon from "@material-ui/icons/Dashboard";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const DrawerComp = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const auth_RP = useSelector((state) => state.auth.auth);
  const type_RP = useSelector((state) => state.auth.type);
  const dispatch = useDispatch();

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      //   onClick={toggleDrawer(anchor, false)}
      //   onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Drawer anchor={"right"} open={props.open} onClose={props.onClose}>
      <div
        className={clsx(classes.list, {
          [classes.fullList]: false,
        })}
        role="presentation"
      >
        <List>
          <ListItem
            button
            onClick={() => {
              props.history.push("/");
              props.onClose();
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              props.history.push("/products");
              props.onClose();
            }}
          >
            <ListItemIcon>
              <CardGiftcardIcon />
            </ListItemIcon>
            <ListItemText primary={"Products"} />
          </ListItem>
          {auth_RP ? (
            <ListItem
              button
              onClick={() => {
                if (!auth_RP) return;
                if (type_RP === "Vendor") {
                  props.history.push("/dashboard");
                } else {
                  props.history.push("/manage");
                }
                props.onClose();
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItem>
          ) : (
            <ListItem
              button
              onClick={() => {
                dispatch(Actions.handleShowSignin());
                props.onClose();
              }}
            >
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText primary={"Login"} />
            </ListItem>
          )}

          {auth_RP ? (
            <ListItem
              button
              onClick={() => {
                dispatch({ type: Types.AUTH_FAIL });
                props.onClose();
              }}
            >
              <ListItemIcon>
                <MeetingRoomIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          ) : null}
        </List>
      </div>
    </Drawer>
  );
};
export default withRouter(DrawerComp);
