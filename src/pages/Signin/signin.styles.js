import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    width: "350px"
  },

  inputRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "30px"
  },
  errorRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    color: theme.palette.secondary.main,
    marginBottom: "0px"
  },
  btnRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "10px"
  },

  registerRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },

  input: {
    width: "90%"
  },

  btn: {
    width: "300px"
  }
}));

export default useStyles;
