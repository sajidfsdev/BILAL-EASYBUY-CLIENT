import React from "react";
import Row from "./../UI/Row/ELXRow";
import logo from "./../Assets/images/optimalLogo.png";
import Paper from "./../UI/Paper/Paper";
import Avatar from "./../UI/Avatar/Avatar";
import MenuList from "./../Components/Dashboard/MenuList/MenuList";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "./../UI/Tooltip/Tooltip";
import { useDispatch } from "react-redux";
import * as Types from "./../Store/Constants/Auth";
import { Switch, Route } from "react-router-dom";
import Statistics from "./../pages/Statistics/Statistics";
import AddProducts from "./../pages/AddProducts/AddProducts";
import useStyles from "./Dashboard.styles";
import GetProposalScreen from "./../pages/VendorDashboard/GetProposals/GetProposals";
import ConsignedPage from "./../pages/VendorDashboard/GetProposals/Consigned/Cosigned";
import FinalPage from "./../pages/VendorDashboard/Final/Final";
import HistoryPage from "./../pages/VendorDashboard/History/History";
import EditPage from "./../pages/VendorDashboard/EditProduct/EditProduct";
import MessagePage from "./../pages/VendorDashboard/Message/Message";
import HomeIcon from "@material-ui/icons/Home";
import ProfilePage from "./../pages/VendorDashboard/Profile/Profile";

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
            <Avatar src={logo} size={10} className={classes.logo} />
            <Row className={classes.title}>Dashboard</Row>
          </Row>
          <MenuList />
        </Paper>
        <Row className={classes.rightArea}>
          <Row className={classes.appBar}>
            <Row className={classes.iconRow}>
              <Tooltip title="Home">
                <HomeIcon
                  onClick={() => props.history.push("/")}
                  className={classes.icon}
                />
              </Tooltip>
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
                path="/dashboard/addproducts"
                component={AddProducts}
              />
              <Route
                exact
                path="/dashboard/statistics"
                component={Statistics}
              />
              <Route
                exact
                path="/dashboard/getProposals"
                component={GetProposalScreen}
              />
              <Route
                exact
                path="/dashboard/requests"
                component={ConsignedPage}
              />
              <Route exact path="/dashboard/final" component={FinalPage} />
              <Route exact path="/dashboard/history" component={HistoryPage} />
              <Route exact path="/dashboard/products" component={EditPage} />
              <Route exact path="/dashboard/message" component={MessagePage} />
              <Route exact path="/dashboard/profile" component={ProfilePage} />
            </Switch>
          </Row>
        </Row>
      </Row>
    </React.Fragment>
  );
}; //.......................

export default Dashboard;
