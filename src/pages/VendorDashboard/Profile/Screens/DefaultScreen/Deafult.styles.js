import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  marginedCell: {
    marginLeft: "50px",
  },
  btnRow: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  inputRow: {
    marginBottom: "10px",
  },
  input: {
    width: "300px",
  },
  textArea: {
    minWidth: "300px",
    minHeight: "100px",
  },

  errorRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "2px",
    marginBottom: "2px",
    color: "red",
    fontSize: "15px",
  },
  margin: {
    marginTop: "5px",
    marginBottom: "5px",
  },
  hibernateRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  hibernateIcon: {
    fontSize: "30px",
    cursor: "pointer",
    color: theme.palette.primary.main,
  },
  hbBtnRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
}));
