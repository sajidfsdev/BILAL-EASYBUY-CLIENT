import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "30px",
    fontSize: "20px",
    color: theme.palette.primary.main,
  },

  spinner: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
  },

  error: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    color: "red",
    fontSize: "15px",
  },

  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20px",
  },

  container: {
    width: "100%",
    marginTop: "30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: "calc(100vh - 140px)",
    overflow: "auto",
  },

  subContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
  },
}));

export default useStyles;
