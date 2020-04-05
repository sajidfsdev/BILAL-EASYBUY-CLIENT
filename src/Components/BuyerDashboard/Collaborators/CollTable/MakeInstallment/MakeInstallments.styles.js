import { makeStyles } from "@material-ui/core/styles";

const StepOne = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "15px",
    marginBottom: "20px",
  },

  row: {
    width: "80%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },

  left: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  right: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    width: "300px",
    marginBottom: "20px",
    [theme.breakpoints.up("sm")]: {
      marginBottom: "0px",
    },
  },

  selectRow: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: "20px",
    marginBottom: "20px",
  },

  select: {
    width: "200px",
  },

  durationTitle: {
    color: theme.palette.primary.main,
    fontSize: "15px",
    marginTop: "5px",
    marginLeft: "10px",
  },

  leftSelect: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: "15px",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
      marginBottom: "0px",
      justifyContent: "flex-start",
    },
  },

  rightSelect: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: "15px",

    [theme.breakpoints.up("sm")]: {
      width: "50%",
      marginBottom: "0px",
      justifyContent: "flex-end",
    },
    [theme.breakpoints.up("lg")]: {
      justifyContent: "center",
    },
  },

  stripRow: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: "15px",
  },

  leftStrip: {
    width: "100%",
    height: "50px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    marginBottom: "20px",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
  },

  rightStrip: {
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "20px",
  },

  downInput: {
    width: "300px",
  },
  nextcontainer: {
    width: "100%",
    marginTop: "15px",
    marginBottom: "15px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  nextrow: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  progress: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "400px",
  },
}));

export default StepOne;
