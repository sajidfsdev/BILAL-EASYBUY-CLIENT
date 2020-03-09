import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    marginTop: "30px",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center"
  },

  list: {
    width: "90%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "space-between"
    }
  },

  paper: {
    width: "215px",
    height: "230px",
    marginBottom: "20px"
    // [theme.breakpoints.up("md")]: {
    //   width: "250px"
    // }
  },
  cardHeadingRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "10px"
  },
  icon: {
    color: "red",
    fontSize: "25px"
  },
  padding: {
    marginRight: "25px"
  }
}));

export default useStyles;
