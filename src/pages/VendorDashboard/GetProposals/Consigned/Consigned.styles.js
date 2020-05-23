import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: "calc(100%-100px)",
    overFlow: "auto",
  },

  subContainer: {
    width: "95%",
    display: "flex",
    flexDirection: "column",
  },

  title: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    fontSize: "20px",
    color: theme.palette.primary.main,
    marginTop: "20px",
  },
  defaultTitle: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
    marginBottom: "10px",
    color: theme.palette.primary.main,
    fontSize: "18px",
  },
  tick: {
    fontSize: "30px",
    color: "green",
    cursor: "pointer",
  },
  cross: {
    fontSize: "30px",
    color: "red",
    cursor: "pointer",
  },

  searchBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    height: "30px",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    marginTop: "10px",
    marginBottom: "10px",
  },

  input: {
    width: "200px",
    fontSize: "15px",
    marginRight: "20px",
  },
  backBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
    backgroundColor: theme.palette.primary.main,
    height: "30px",
    color: "white",
  },
  backIcon: {
    color: "red",
    fontSize: "20px",
    cursor: "pointer",
  },
  dialogueBtnRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  textArea: {
    minWidth: "200px",
    minHeight: "50px",
    marginBottom: "10px",
  },
}));

export default useStyles;
