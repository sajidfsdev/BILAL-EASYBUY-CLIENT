import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  topBar: {
    width: "95%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "40px",
  },

  icon: {
    fontSize: "22px",
    cursor: "pointer",
  },

  right: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "350px",
    alignItems: "center",
    marginRight: "20px",
    backgroundColor: theme.palette.primary.main,
    fontSize: "12px",
    height: "100%",
    paddingLeft: "10px",
    paddingRight: "10px",
  },

  active: {
    color: "gold",
    cursor: "pointer",
  },

  inactive: {
    color: "white",
    cursor: "pointer",
  },

  screenArea: {
    marginTop: "20px",
    width: "95%",
    height: "500px",
    overflow: "auto",
  },
}));

export default useStyles;
