import { createMuiTheme } from "@material-ui/core/styles";

const DefaultTheme = createMuiTheme({
  palette: {
    primary: {
      // main: "#29ABE1"
      // main: "#0993cc"
      main: "#3b7188"
    },
    success: {
      main: "#28a745"
    }
    // secondary: {
    //   main: "#56c9ef"
    // }
  },
  typography: {
    fontFamily: "Helvetica Neue"
  }
});

export default DefaultTheme;
