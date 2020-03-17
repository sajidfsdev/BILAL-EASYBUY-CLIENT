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
  }
}));
export default useStyles;
