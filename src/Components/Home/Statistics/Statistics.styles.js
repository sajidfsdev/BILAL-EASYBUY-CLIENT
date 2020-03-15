import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "50px"
  },

  subContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },

  one: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      width: "33%"
    }
  },
  two: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      width: "33%"
    }
  },
  three: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      width: "33%"
    }
  },
  title: {
    display: "flex",
    width: "30%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "20px",
    fontSize: "18px",
    color: "#3b7188"
  },

  topGrid: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px"
  },
  icon: {
    width: "150px",
    height: "150px",
    borderRadius: "75px",
    // backgroundColor: "#0fa2bf",
    // #710661,
    backgroundColor: "#b10f5d",
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  countUp: {
    fontSize: "25px",
    color: "gold"
  },
  countUpTitle: {
    color: "gold"
  }
}));

export default useStyles;
