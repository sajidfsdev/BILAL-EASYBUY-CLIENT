import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20px"
  },

  paper: {
    width: "80%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
  },

  title: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },

  titleIcon: {
    color: "green",
    marginRight: "30px"
  },

  titleText: {
    fontSize: "15px",
    color: theme.palette.primary.main
  },

  gallery: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },

  imageBox: {
    width: "215px",
    height: "215px"
  },

  downContainer: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },

  downLeft: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
    backgroundColor: theme.palette.primary.main,
    color: "white"
  },

  downRight: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "50px"
  },

  closeBtnRow: {
    width: "100%",
    marginTop: "20px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end"
  }
}));

export default useStyles;
