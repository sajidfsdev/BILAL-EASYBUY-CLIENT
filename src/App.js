import React, { useEffect } from "react";
import defaultTheme from "./Theme/default";
import { ThemeProvider } from "@material-ui/core/styles";
import HomePage from "./pages/Home/Home";
import SignIn from "./pages/Signin/signin";
import Register from "./pages/Register/Register";
import Dashboard from "./Dashboard/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./Store/Action/Auth";
import LoadingScreen from "./pages/LoadingScreen/LoadingScreen";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProductsPage from "./pages/HomeSubPages/Products/Products";
import ProductDetailsPage from "./pages/HomeSubPages/ProductDetails/ProductDetails";
import RegisterBuyerPage from "./pages/RegisterBuyer/RegisterBuyer";
import BuyerDashboard from "./BuyerDashboard/BuyerDashboard";

const App = props => {
  //state management...
  const resolved_RP = useSelector(state => state.auth.resolved);
  const auth_RP = useSelector(state => state.auth.auth);
  const dispatch_RP = useDispatch();

  //use effect...
  useEffect(() => {
    dispatch_RP(Actions.handleAuthChecking());
  }, []);

  //return starts...
  return (
    <ThemeProvider theme={defaultTheme}>
      {resolved_RP ? (
        <React.Fragment>
          <SignIn />
          <Register />
          <RegisterBuyerPage />
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={HomePage} />
              {auth_RP ? (
                <Route path="/dashboard" component={Dashboard} />
              ) : null}

              <Route exact path="/products" component={ProductsPage} />
              <Route exact path="/details/:id" component={ProductDetailsPage} />
              {auth_RP ? (
                <Route path="/manage" component={BuyerDashboard} />
              ) : null}

              <Route component={HomePage} />
            </Switch>
          </BrowserRouter>
        </React.Fragment>
      ) : (
        <LoadingScreen />
      )}
    </ThemeProvider>
  );
  //return ends.....
}; //.................

export default App;
