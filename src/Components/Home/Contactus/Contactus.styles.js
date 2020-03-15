import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  subContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    marginTop: "70px",
    backgroundColor: "#0a5590",
    color: "white"
  },
  title: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    color: "gold",
    fontSize: "25px",
    marginTop: "30px"
  },
  titleMargin: {
    marginLeft: "8%"
  },

  bottomContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "10px"
  },

  leftArea: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      width: "50%"
    }
  },
  rightArea: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50%"
    }
  },

  box: {
    width: "90%",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "white"
  },
  inputRow: {
    marginTop: "15px"
  },
  input: {
    width: "350px",
    fontSize: "27px",
    backgroundColor: "white",
    [theme.breakpoints.up("sm")]: {
      width: "420px"
    }
  },

  listBox: {
    paddingLeft: "20px"
  },

  btn: {
    width: "inherit",
    backgroundColor: "green",
    color: "white",
    border: "0px",
    padding: "10px",
    width: "350px",
    cursor: "pointer"
  }
}));

export default useStyles;
