import React from "react";
import Row from "./../../../UI/Row/ELXRow";
import Input from "./../../../UI/Input/Input";
import Button from "@material-ui/core/Button";
import useStyles from "./Contactus.styles";

const Contactus = props => {
  //styles init...
  const classes = useStyles();

  //return starts....
  return (
    <React.Fragment>
      <Row className={classes.container}>
        <Row className={classes.subContainer}>
          <Row className={classes.title}>
            <Row className={classes.titleMargin}>Contact Us</Row>
          </Row>
          <Row className={classes.bottomContainer}>
            <Row className={classes.leftArea}>
              <Row className={classes.box}>
                <Row className={classes.inputRow}>
                  <Input
                    className={classes.input}
                    placeholder="Name"
                    variant="outlined"
                  />
                </Row>
                <Row className={classes.inputRow}>
                  <Input
                    className={classes.input}
                    placeholder="Email"
                    variant="outlined"
                  />
                </Row>
                <Row className={classes.inputRow}>
                  <Input
                    className={classes.input}
                    placeholder="Query"
                    multiline
                    rows="6"
                    variant="outlined"
                  />
                </Row>
                <Row className={classes.inputRow}>
                  <button className={classes.btn}>SUBMIT</button>
                </Row>
              </Row>
            </Row>
            <Row className={classes.rightArea}>
              <Row className={classes.listBox}>
                <ul>
                  <li>Block # 3 Area 4 staellite Town Islamabad</li>
                  <li>Ph: 051-4576545</li>
                  <li>Ph: 0514546565</li>
                  <li>Mobile: 0336-5544343</li>
                </ul>
              </Row>
            </Row>
          </Row>
        </Row>
      </Row>
    </React.Fragment>
  );
}; //.........................

export default Contactus;
