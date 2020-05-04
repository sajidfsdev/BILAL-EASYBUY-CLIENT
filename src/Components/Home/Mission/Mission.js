import React from "react";
import Row from "./../../../UI/Row/ELXRow";
import useStyles from "./Mission.styles";
import Paper from "@material-ui/core/Paper";
import { AnimatedOnScroll } from "react-animated-css-onscroll";

const Mission = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Row className={classes.container}>
        <Row className={classes.subContainer}>
          <Row className={classes.title}>OUR STATEMENTS</Row>
          <Row className={classes.border}></Row>
          <Row className={classes.boxRow}>
            <AnimatedOnScroll animationIn="bounceIn" animationOut="bounceOut">
              <Paper elevation={8} className={classes.box}>
                <Row className={classes.iconRow}>M</Row>
                <Row className={classes.underline}>Mission Statement</Row>
                <Row className={classes.text}>
                  To provide reliable and efficient platform where people can
                  easily do their business based on installments
                </Row>
              </Paper>
            </AnimatedOnScroll>
            <AnimatedOnScroll animationIn="bounceIn" animationOut="bounceOut">
              <Paper elevation={8} className={classes.box}>
                <Row className={classes.iconRow}>V</Row>
                <Row className={classes.underline}>Vision Statement</Row>
                <Row className={classes.text}>
                  To Make Easy Buy high Quality standard where the its name
                  reflects the quality promisses and gain people trust
                </Row>
              </Paper>
            </AnimatedOnScroll>

            <AnimatedOnScroll animationIn="bounceIn" animationOut="bounceOut">
              <Paper elevation={8} className={classes.box}>
                <Row className={classes.iconRow}>T</Row>
                <Row className={classes.underline}>Future Targets</Row>
                <Row className={classes.text}>
                  Move our business to Global Level and promote ecommerce
                  culture in areas where it has not been observed yet
                </Row>
              </Paper>
            </AnimatedOnScroll>
          </Row>
        </Row>
      </Row>
    </React.Fragment>
  );
}; //..............Mission

export default Mission;
