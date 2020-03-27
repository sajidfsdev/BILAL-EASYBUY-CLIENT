import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main
  },

  subContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "column"
  },

  titleRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px"
  },

  titleIcon: {
    marginRight: "15px"
  },

  searchIcon: {
    fontSize: "30px",
    color: theme.palette.secondary.main
  },
  searchIconSubmit: {
    fontSize: "30px",
    color: "white"
  },

  titleTitle: {
    fontSize: "17px",
    color: theme.palette.primary.main
  },

  searchKit: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column"
  },
  topKit: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: "20px"
  },
  bottomKit: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "20px"
  },
  input: {
    width: "350px"
  },
  inputRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      width: "33%"
    }
  },
  submitBtnRow: {
    width: "100%",
    marginTop: "20px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  height: {
    width: "100%",
    height: "20px"
  },
  bufferRow: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  errorContainer: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column"
  },
  errorMessage: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "20px",
    color: theme.palette.secondary.main
  },
  refreshBtn: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "20px"
  }
}));

export default useStyles;
