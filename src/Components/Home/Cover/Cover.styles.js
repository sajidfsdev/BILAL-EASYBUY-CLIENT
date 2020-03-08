import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  cover: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },

  image: {
    width: "90%"
  }
}));

export default useStyles;
