import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "50px"
  },

  subContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    color: "#3b7188",
    fontSize: "18px"
  },

  border: {
    width: "100%",
    border: "2px solid #3b7188",
    marginTop: "20px",
    marginBottom: "30px"
  },

  gridContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  gridOne: {
    width: "100%",
    display: "flex",
    marginBottom: "50px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      width: "50%"
    },
    [theme.breakpoints.up("md")]: {
      width: "33%"
    }
  },
  gridTwo: {
    width: "100%",
    display: "flex",
    marginBottom: "50px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      width: "50%"
    },
    [theme.breakpoints.up("md")]: {
      width: "33%"
    }
  },
  gridThree: {
    width: "100%",
    display: "flex",
    marginBottom: "50px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      width: "100%"
    },
    [theme.breakpoints.up("md")]: {
      width: "33%"
    }
  },

  box: {
    width: "100%"
  },
  boxRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  step: {
    width: "80px",
    height: "80px",
    borderRadius: "40px",
    backgroundColor: "#20af64",
    color: "white",
    fontSize: "18px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    width: "80px",
    height: "80px",
    backgroundColor: "#078838",
    color: "white",
    fontSize: "18px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    display: "flex",
    width: "30%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "20px",
    fontSize: "18px",
    color: "#3b7188"
  },
  content: {
    display: "flex",
    width: "70%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "20px",
    fontSize: "15px",
    color: "#3b7188",
    paddingRight: "30px"
  }
}));
export default useStyles;
