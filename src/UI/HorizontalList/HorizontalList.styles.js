import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    marginTop: "30px",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center"
  },

  list: {
    width: "90%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      justifyContent: "flex-start"
    }
  },

  paper: {
    width: "215px",
    height: "257px",
    marginBottom: "20px",
    position: "relative",
    overflow: "hidden",
    marginRight: "20px"
    // [theme.breakpoints.up("md")]: {
    //   width: "250px"
    // }
  },
  cardHeadingRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  icon: {
    color: "red",
    fontSize: "25px"
  },
  padding: {
    marginRight: "25px"
  },
  //Drop down styles starts...
  root: {
    height: 180
  },
  dropcontainer: {
    display: "flex",
    width: "100%",
    position: "absolute"
  },
  droppaper: {
    width: "215px"
  },
  svg: {
    width: "215px",
    height: 100
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
    marginBottom: "10px"
  },
  imageRow: {
    marginTop: "40px",
    width: "100%",

    height: "220px"
  },
  image: {
    width: "215px",
    height: "auto"
  },
  hiddenContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  hiddenPadding: {
    marginTop: "20px"
  },
  pricing: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    color: "#00a152",
    fontWeight: "bold"
  },
  furtherDetails: {
    width: "100%",
    marginTop: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },

  btnRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20px"
  },

  btn: {
    backgroundColor: "#5cb85c",
    color: "white",
    padding: "10px",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "15px"
  }
}));

export default useStyles;
