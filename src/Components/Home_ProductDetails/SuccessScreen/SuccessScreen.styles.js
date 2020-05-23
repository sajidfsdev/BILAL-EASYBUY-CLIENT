import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20px",
  },

  paper: {
    width: "80%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },

  title: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    height: "30px",
  },

  titleText: {
    fontSize: "15px",
    color: "white",
  },

  gallery: {
    width: "95%",
    marginTop: "30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "20px",
    marginLeft: "auto",
    marginRight: "auto",
  },

  imageBox: {
    width: "215px",
    height: "215px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  downContainer: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  downLeft: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },

  downRight: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
  },

  closeBtnRow: {
    width: "100%",
    marginTop: "20px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  middleTitle: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "20px",
    color: theme.palette.primary.main,
  },

  textArea: {
    //minWidth: "200px",
    width: "100%",
    minHeight: "100px",
  },
  reportBtn: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
}));

export default useStyles;
