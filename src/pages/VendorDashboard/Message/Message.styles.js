import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  bar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
  },

  title: {
    fontSize: "20px",
    color: theme.palette.primary.main,
  },

  icon: {
    fontSize: "40px",
    color: theme.palette.primary.main,
    cursor: "pointer",
    marginRight: "20px",
  },

  btnRow: {
    marginTop: "15px",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  margin: {
    marginTop: "15px",
  },
  input: {
    width: "100%",
    maxWidth: "500px",
    cursor: "pointer",
  },

  textArea: {
    width: "100%",
    minWidth: "300px",
    maxWidth: "500px",
  },

  searchBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "35px",
    backgroundColor: theme.palette.primary.main,
    marginTop: "10px",
  },

  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  subContainer: {
    width: "95%",
    display: "flex",
    flexDirection: "column",
  },

  left: {
    marginLeft: "10px",
  },
  right: {
    marginRight: "10px",
    width: "300px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  select: {
    width: "140px",
    height: "30px",
  },
  deleteIcon: {
    fontSize: "25px",
    color: "red",
    cursor: "pointer",
  },
}));
