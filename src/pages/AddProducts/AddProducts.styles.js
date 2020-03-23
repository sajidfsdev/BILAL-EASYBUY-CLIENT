import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "60px",
    color: theme.palette.primary.main
  },

  icon: {
    marginRight: "10px"
  },

  container: {
    width: "100%",
    height: "calc(100% - 100px)",
    overflow: "auto"
  },
  progressBar: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
}));
export default useStyles;
