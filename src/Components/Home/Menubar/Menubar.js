import React from "react";
import Row from "./../../../UI/Row/ELXRow";
import logo from "./../../../Assets/images/optimalLogo.png";
import useStyles from "./Menubar.styles";
import "./../../../index.css";
import * as Actions from "./../../../Store/Action/Register";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Menubar = props => {
  //classes init...
  const classes = useStyles();

  //state management...
  const dispatch = useDispatch();
  const auth_RP = useSelector(state => state.auth.auth);
  const type_RP = useSelector(state => state.auth.type);

  //Methods....
  const handleLoginClick = () => {
    dispatch(Actions.handleShowSignin());
  };

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
            <Link to="/">HOME</Link>
          </li>
          <li>
            {/* <a href="#">PRODUCTS</a> */}
            <Link to="/products">PRODUCTS</Link>
          </li>
          <li>
            <a href="#">CATEGORIES</a>
          </li>
          <li>
            {auth_RP ? (
              type_RP === "Vendor" ? (
                <Link to="/dashboard">DASHBOARD</Link>
              ) : (
                <Link to="/manage">DASHBOARD</Link>
              )
            ) : (
              <a href="#" onClick={handleLoginClick}>
                LOGIN
              </a>
            )}
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
