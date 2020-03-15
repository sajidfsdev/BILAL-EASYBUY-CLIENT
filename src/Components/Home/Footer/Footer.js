import React from "react";
import Row from "./../../../UI/Row/ELXRow";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import YouTubeIcon from "@material-ui/icons/YouTube";
import useStyles from "./Footer.styles";

const Footer = props => {
  //styles init...
  const classes = useStyles();

  //return starts...
  return (
    <Row className={classes.footer}>
      <Row className={classes.leftArea}>
        <FacebookIcon
          className={classes.icon}
          style={{
            color: "#3b5998"
          }}
        />
        <TwitterIcon
          className={classes.icon}
          style={{
            color: "#00acee"
          }}
        />
        <YouTubeIcon
          className={classes.icon}
          style={{
            color: "#c4302b"
          }}
        />
      </Row>
      <Row className={classes.rightArea}>
        &copy; All Rights Reserved For This Application.
      </Row>
    </Row>
  );
}; //.....................

export default Footer;
