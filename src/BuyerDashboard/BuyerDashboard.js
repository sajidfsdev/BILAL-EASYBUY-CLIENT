import React from "react";
import Row from "./../UI/Row/ELXRow";
import Paper from "./../UI/Paper/Paper";
import MenuList from "./../Components/BuyerDashboard/MenuList/MenuList";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "./../UI/Tooltip/Tooltip";
import { useDispatch } from "react-redux";
import * as Types from "./../Store/Constants/Auth";
import { Switch, Route } from "react-router-dom";
import CollaboratorsPage from "./../pages/BuyerDashboard/Collaborators/Collaborators";
import ConsignedPage from "./../pages/BuyerDashboard/Consigned/Consigned";
import HistoryPage from "./../pages/BuyerDashboard/History/History";
import HomeIcon from "@material-ui/icons/Home";
import useStyles from "./BuyerDashboard.styles";

const Dashboard = (props) => {
  //classes init...
  const classes = useStyles();

  //state management...
  const dispatch_RP = useDispatch();

  //Methods....
  const handleLogout = () => {
    return dispatch_RP({
      type: Types.AUTH_FAIL,
    });
  }; //........................

  return (
    <React.Fragment>
      <Row className={classes.container}>
        <Paper elevation={8} className={classes.leftArea}>
          <Row className={classes.logoContainer}>
            <Row className={classes.title}>Dashboard</Row>
          </Row>
          <MenuList />
        </Paper>
        <Row className={classes.rightArea}>
          <Row className={classes.appBar}>
            <Row className={classes.iconRow}>
              <Tooltip title="Home">
                <HomeIcon
                  onClick={() => {
                    return props.history.push("/");
                  }}
                  className={classes.icon}
                />
              </Tooltip>
            </Row>
            <Row className={classes.iconRow}>
              <Tooltip title="Logout">
                <ExitToAppIcon
                  onClick={handleLogout}
                  className={classes.icon}
                />
              </Tooltip>
            </Row>
          </Row>
          <Row className={classes.displayArea}>
            <Switch>
              <Route
                exact
                path="/manage/collaborators"
                component={CollaboratorsPage}
              />
              <Route exact path="/manage/consigned" component={ConsignedPage} />
              <Route exact path="/manage/history" component={HistoryPage} />
            </Switch>
          </Row>
        </Row>
      </Row>
    </React.Fragment>
  );
}; //.......................

export default Dashboard;
