import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  iconsBar: {
    width: "100%",
    marginTop: "5px",
    marginBottom: "5px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  saveIcon: {
    fontSize: "28px",
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
}));

export default useStyles;
