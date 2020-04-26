import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "10px",
    color: theme.palette.primary.main,
    fontSize: "14px",
  },

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
  backSpaceBar: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "30px",
    backgroundColor: theme.palette.primary.main,
    marginTop: "10px",
  },

  backSpaceIcon: {
    fontSize: "15px",
    cursor: "pointer",
    color: "red",
  },
  backTitle: {
    fontSize: "15px",
    color: "white",
  },
}));

export default useStyles;
