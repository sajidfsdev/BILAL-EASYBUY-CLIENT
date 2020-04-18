import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20px",
    color: theme.palette.primary.main,
    fontSize: "20px",
  },

  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },

  subContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
  },
  productsearchBar: {
    width: "100%",
    height: "40px",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
    borderRadius: "20px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },

  searchBar: {
    width: "100%",
    height: "40px",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "10px",
    borderRadius: "20px",
  },

  input: {
    width: "150px",
    marginRight: "20px",
    height: "25px",
  },

  loadingScreen: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
  },

  errorMessage: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: "30px",
  },

  error: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    color: "red",
  },

  refreshBtn: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20px",
  },

  emptyMessage: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
    color: theme.palette.primary.main,
    fontSize: "18px",
  },

  defaultcontainer: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  defaultBar: {
    width: "95%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    marginTop: "15px",
    marginBottom: "15px",
    borderRadius: "20px",
    height: "25px",
    paddingLeft: "20px",
    paddingRight: "20px",
    cursor: "pointer",
  },

  circle: {
    width: "30px",
    height: "30px",
    borderRadius: "15px",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },

  cpTitle: {
    color: "gold",
    fontSize: "18px",
  },

  bottomPopoulation: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
  },
}));

export default useStyles;
