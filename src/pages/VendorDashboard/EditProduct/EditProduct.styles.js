import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  searchBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "30px",
    backgroundColor: theme.palette.primary.main,
    marginTop: "5px",
  },
  input: {
    width: "200px",
    padding: "2px",
    marginRight: "10px",
  },
  title: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "10px",
    color: theme.palette.primary.main,
    fontSize: "14px",
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
  margin: {
    marginTop: "10px",
  },
  iconSec: {
    fontSize: "20px",
    color: theme.palette.secondary.main,
    cursor: "pointer",
  },
  iconPri: {
    fontSize: "20px",
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
  backSpaceBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "30px",
    marginTop: "10px",
    backgroundColor: theme.palette.primary.main,
  },
  backIcon: {
    color: "red",
    fontSize: "20px",
    cursor: "pointer",
  },
  backTitle: {
    fontSize: "15px",
    color: "white",
  },
  margin: {
    marginTop: "5px",
  },
}));
