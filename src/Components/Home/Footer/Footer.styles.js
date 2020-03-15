import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  footer: {
    width: "100%",
    marginTop: "50px",
    // backgroundColor: "black",
    color: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  leftArea: {
    width: "15%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "70px"
  },
  icon: {
    fontSize: "40px",
    cursor: "pointer"
  },
  rightArea: {
    color: "black",
    marginRight: "70px"
  }
}));

export default useStyles;
