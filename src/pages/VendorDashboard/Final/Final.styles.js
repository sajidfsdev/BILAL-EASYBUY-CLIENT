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
  defaultTitle: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
    marginBottom: "10px",
    color: theme.palette.primary.main,
    fontSize: "18px",
  },
  cancelTitle: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
    marginBottom: "10px",
    color: theme.palette.primary.main,
    fontSize: "18px",
  },
  cancelIcon: {
    color: "red",
    fontSize: "18px",
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
  bar: {
    width: "100%",
    marginTop: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "30px",
    backgroundColor: theme.palette.primary.main,
  },

  crossIcon: {
    fontSize: "18px",
    color: "red",
    cursor: "pointer",
  },
  barTitle: {
    fontSize: "15px",
    color: "white",
  },
  title: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "5px",
    fontSize: "15px",
    color: theme.palette.primary.main,
  },
  productDetailsTable: {
    marginTop: "5px",
  },
  marginRow: {
    marginTop: "5px",
  },
}));

export default useStyles;
