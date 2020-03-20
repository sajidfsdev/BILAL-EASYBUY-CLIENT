import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    marginTop: "30px",
    display: "flex",
    flexDirection: "column"
  },
  paper: {
    width: "100%",
    height: "40px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "15px",
    backgroundColor: theme.palette.primary.main,
    color: "gold",
    "&:hover": {
      backgroundColor: "#467b92"
    }
  },

  initialPadding: {
    marginLeft: "20px"
  },

  finalPadding: {
    marginLeft: "20px"
  }
}));
export default useStyles;
