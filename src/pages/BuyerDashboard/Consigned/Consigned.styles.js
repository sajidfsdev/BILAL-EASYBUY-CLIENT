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
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  subContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
  },
  bar: {
    width: "100%",
    height: "30px",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "10px",
  },

  link: {
    fontSize: "12px",
    color: "#fff",
    cursor: "pointer",
    marginLeft: "30px",
  },
  activelink: {
    fontSize: "12px",
    color: "gold",
    cursor: "pointer",
    marginLeft: "30px",
  },
  progress: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
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
  screenArea: {
    width: "100%",
    height: "calc(100% - 60px)",
    overflow: "auto",
  },
}));

export default useStyles;
