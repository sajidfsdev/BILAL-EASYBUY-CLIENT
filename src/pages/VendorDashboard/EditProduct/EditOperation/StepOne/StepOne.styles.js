import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "15px"
  },
  leftArea: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "15px",
    [theme.breakpoints.up("sm")]: {
      width: "50%"
    }
  },
  rightArea: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "15px",
    [theme.breakpoints.up("sm")]: {
      width: "50%"
    }
  },

  input: {
    width: "350px"
  },

  attributeContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },

  nextContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "30px",
    marginBottom: "20px"
  },
  next: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  },

  attributeTitle: {
    width: "80%",
    backgroundColor: "#c51151",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "30px",
    marginTop: "15px"
  },

  attInputRow: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    marginTop: "15px"
  },

  attInput: {
    marginLeft: "15px"
  },

  attBtn: {
    marginLeft: "15px"
  },

  tableContainer: {
    width: "80%",
    marginTop: "15px"
  }
}));

export default useStyles;
