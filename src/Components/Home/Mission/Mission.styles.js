import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "50px",
  },

  subContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    color: "#3b7188",
    fontSize: "18px",
  },

  border: {
    width: "100%",
    border: "2px solid #3b7188",
    marginTop: "20px",
    marginBottom: "30px",
  },
  boxRow: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  box: {
    width: "250px",
    height: "250px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  iconRow: {
    width: "100px",
    height: "100px",
    border: "2px dashed green",
    borderRadius: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "30px",
  },

  underline: {
    width: "auto",
    marginTop: "10px",
    borderBottom: "1px solid",
    fontSize: "15px",
    color: theme.palette.primary.main,
  },

  text: {
    width: "100%",
    textAlign: "center",
    marginTop: "20px",
    height: "auto",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    height: "100px",
    display: "flex",
    alignItems: "center",
    paddingLeft: "15px",
    paddingRight: "15px",
    fontSize: "12px",
  },
}));
