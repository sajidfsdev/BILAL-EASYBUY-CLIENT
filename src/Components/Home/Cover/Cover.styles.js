import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cover: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    height: "100%",
    maxHeight: "411px",
    overflow: "hidden",
  },

  image: {
    width: "90%",
  },
}));

export default useStyles;
