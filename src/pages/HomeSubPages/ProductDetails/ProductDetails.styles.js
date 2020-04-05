import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  loading: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "30px"
  },

  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "30px"
  }
}));

export default useStyles;
