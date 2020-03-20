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

    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },

  rightArea: {
    width: "80%",
    height: "inherit",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },

  logoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "20px"
  },

  logo: {
    width: "90px",
    height: "90px"
  },
  title: {
    fontSize: "22px",
    color: theme.palette.primary.main
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
  }
}));
export default useStyles;
