import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "50px"
  },

  subContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column"
  },

  title: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: "20px",
    fontSize: "18px",
    color: theme.palette.primary.main,
    paddingLeft: "20px"
  },
  screen: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "20px",
    border: "1px solid",
    borderColor: theme.palette.secondary.main,
    borderRadius: "10px",
    paddingLeft: "15px",
    paddingRight: "15px",
    paddingTop: "15px",
    paddingBottom: "15px"
  },

  screenRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  }
}));

export default useStyles;
