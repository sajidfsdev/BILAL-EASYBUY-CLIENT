import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  menuBar: {
    width: "100%",
    padding: "5px 0px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  leftSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  logo: {
    width: "50px",
    height: "50px",
    marginLeft: "10px",
    [theme.breakpoints.up("sm")]: {
      width: "80px",
      height: "80px"
    }
  },
  statement: {
    fontFamily: "pacific",
    marginLeft: "10px",
    fontSize: "20px",
    color: "green"
  },
  rightSection: {
    display: "none",
    flexDirection: "column",
    justifyContent: "center",
    "&>ul": {
      listStyle: "none",
      padding: "0px",
      margin: "0px"
    },
    "&>ul>li": {
      display: "inline",
      marginRight: "10px",
      borderLeft: "1px solid",
      paddingLeft: "5px"
    },
    "&>ul>li>a": {
      textDecoration: "none",
      color: "black",
      fontSize: "12px"
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  }
}));

export default useStyles;
