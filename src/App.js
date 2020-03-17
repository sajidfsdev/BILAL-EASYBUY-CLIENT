import React from "react";
import defaultTheme from "./Theme/default";
import { ThemeProvider } from "@material-ui/core/styles";
import HomePage from "./pages/Home/Home";
import SignIn from "./pages/Signin/signin";
import Register from "./pages/Register/Register";

const App = props => {
  //return starts...
  return (
    <ThemeProvider theme={defaultTheme}>
      <SignIn />
      <Register />
      <HomePage />
    </ThemeProvider>
  );
  //return ends.....
}; //.................

export default App;
