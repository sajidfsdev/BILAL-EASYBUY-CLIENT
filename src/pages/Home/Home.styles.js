import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  menuBar: {
    width: "100%",
    padding: "5px 0px",
    backgroundColor: "#508fe68f",
    color: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    "&>ul": {
      listStyle: "none",
      margin: "0",
      padding: 0
    },
    "&>ul>li": {
      display: "inline",
      marginRight: "20px"
    },
    "&>ul>li>a": {
      textDecoration: "none",
      color: "#1f1e1e"
    }
  }
}));

export default useStyles;
