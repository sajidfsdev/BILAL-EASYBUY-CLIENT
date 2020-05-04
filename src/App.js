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
import { SnackbarProvider } from "notistack";

const App = (props) => {
  //state management...
  const resolved_RP = useSelector((state) => state.auth.resolved);
  const auth_RP = useSelector((state) => state.auth.auth);
  const type_RP = useSelector((state) => state.auth.type);
  const dispatch_RP = useDispatch();

  //use effect...
  useEffect(() => {
    dispatch_RP(Actions.handleAuthChecking());
  }, []);

  //return starts...
  return (
    <ThemeProvider theme={defaultTheme}>
      <SnackbarProvider maxSnack={3}>
        {resolved_RP ? (
          <React.Fragment>
            <SignIn />
            <Register />
            <RegisterBuyerPage />
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={HomePage} />
                {auth_RP === true && type_RP == "Vendor" ? (
                  <Route path="/dashboard" component={Dashboard} />
                ) : null}

                <Route exact path="/products" component={ProductsPage} />
                <Route
                  exact
                  path="/details/:id"
                  component={ProductDetailsPage}
                />
                {auth_RP === true && type_RP == "Buyer" ? (
                  <Route path="/manage" component={BuyerDashboard} />
                ) : null}

                <Route component={HomePage} />
              </Switch>
            </BrowserRouter>
          </React.Fragment>
        ) : (
          <LoadingScreen />
        )}
      </SnackbarProvider>
    </ThemeProvider>
  );
  //return ends.....
}; //.................

export default App;
