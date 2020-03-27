import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  imageBox: {
    width: "215px",
    height: "215px",
    position: "relative"
  },
  curtain: {
    position: "absolute",
    width: "inherit",
    height: "inherit",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    display: "flex",
    flexDirection: "column"
  },
  curtainTitle: {
    width: "215px",
    height: "15px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    overFlow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: "gold"
  },
  tableRow: {
    width: "100%",
    marginTop: "10px",
    marginBottom: "5px",
    display: "flex",
    flexDirection: "row"
  },
  tableHeading: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    color: theme.palette.primary.main,
    paddingLeft: "5px",
    fontSize: "13px"
  },
  tableText: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    fontSize: "13px"
  },

  btnRow: {
    width: "100%",
    marginTop: "25px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  btn: {
    border: "0px",
    backgroundColor: "white",
    padding: "5px",
    cursor: "pointer"
  }
}));

export default useStyles;
