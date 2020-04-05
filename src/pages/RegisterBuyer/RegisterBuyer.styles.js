import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    fontSize: "20px"
  },

  inputRow: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "50px"
  },
  sections: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      width: "50%"
    }
  },

  input: {
    width: "400px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "30px"
    }
  },

  btnRow: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  btn: {
    width: "80%",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    padding: "10px",
    cursor: "pointer"
  },

  linearBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "30px"
  },

  linear: {
    width: "80%"
  },

  errorMessage: {
    width: "80%",
    color: "red",
    fontSize: "15px",
    justifyContent: "center"
  },

  successContainer: {
    width: "100%",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },

  rowOne: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },

  successIconDiv: {
    marginRight: "50px"
  },

  successIcon: {
    fontSize: "100px",
    color: "green"
  },
  message: {
    fontSize: "27px",
    color: theme.palette.primary.main,
    marginTop: "50px"
  },

  successBtn: {
    width: "100px",
    padding: "10px",
    backgroundColor: "green",
    color: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#429a42"
    }
  }
}));
export default useStyles;
