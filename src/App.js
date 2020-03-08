import React from "react";
import defaultTheme from "./Theme/default";
import { ThemeProvider } from "@material-ui/core/styles";
import HomePage from "./pages/Home/Home";

const App = props => {
  //return starts...
  return (
    <ThemeProvider theme={defaultTheme}>
      <HomePage />
    </ThemeProvider>
  );
  //return ends.....
}; //.................

export default App;
