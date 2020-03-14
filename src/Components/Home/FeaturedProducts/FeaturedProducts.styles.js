import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "80px",
    marginBottom: "80px"
  },
  heading: {
    fontSize: "18px",
    color: theme.palette.primary.main
  }
}));

export default useStyles;
