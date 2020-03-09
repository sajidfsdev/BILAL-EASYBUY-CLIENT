import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "50px"
  },
  heading: {
    fontSize: "18px",
    color: theme.palette.primary.main
  }
}));

export default useStyles;
