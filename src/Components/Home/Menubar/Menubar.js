import React from "react";
import Row from "./../../../UI/Row/ELXRow";
import logo from "./../../../Assets/images/optimalLogo.png";
import useStyles from "./Menubar.styles";
import "./../../../index.css";

const Menubar = props => {
  //classes init...
  const classes = useStyles();

  //return starts....
  return (
    <Row className={classes.menuBar}>
      <Row className={classes.leftSection}>
        <img src={logo} className={classes.logo} />
        <Row className={classes.statement}>Things On Installement</Row>
      </Row>

      <Row className={classes.rightSection}>
        <ul>
          <li>
            <a href="#">HOME</a>
          </li>
          <li>
            <a href="#">PRODUCTS</a>
          </li>
          <li>
            <a href="#">CATEGORIES</a>
          </li>
          <li>
            <a href="#">REGISTER</a>
          </li>
          <li>
            <a href="#">CONTACT</a>
          </li>
        </ul>
      </Row>
    </Row>
  );
  //return ends......
}; //......................

export default Menubar;