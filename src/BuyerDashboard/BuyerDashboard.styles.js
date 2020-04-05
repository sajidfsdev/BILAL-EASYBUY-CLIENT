import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "row"
  },

  leftArea: {
    width: "20%",
    height: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },

  rightArea: {
    width: "80%",
    height: "inherit",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.primary,
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },

  logoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "40px"
  },

  logo: {
    width: "90px",
    height: "90px"
  },
  title: {
    fontSize: "20px",
    color: "white"
  },

  appBar: {
    width: "100%",
    height: "50px",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  icon: {
    color: "white"
  },
  iconRow: {
    marginRight: "30px"
  },
  icon: {
    cursor: "pointer",
    color: "white"
  },

  displayArea: {
    width: "100%",
    height: "calc(100% - 60px)"
  }
}));
export default useStyles;
