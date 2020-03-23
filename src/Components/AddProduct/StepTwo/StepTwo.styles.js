import { makeStyles } from "@material-ui/core/styles";

const StepOne = makeStyles(theme => ({
  container: {
    width: "100%",
    marginTop: "15px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },

  row: {
    width: "70%",
    display: "flex",
    flexDirection: "row"
  },

  repeatRow: {
    width: "70%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  },

  title: {
    color: theme.palette.primary.main,
    fontSize: "15px"
  },

  file: {
    width: "200px",
    color: theme.palette.primary.main,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "30px"
  },

  errorfile: {
    width: "200px",
    color: theme.palette.secondary.main,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "30px",
    border: "1px solid red"
  },

  progressBarRow: {
    width: "200px",
    height: "auto"
  },

  imageBox: {
    width: "215px",
    height: "auto"
  },
  nextcontainer: {
    width: "100%",
    marginTop: "15px",
    marginBottom: "15px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  nextrow: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  }
}));

export default StepOne;
