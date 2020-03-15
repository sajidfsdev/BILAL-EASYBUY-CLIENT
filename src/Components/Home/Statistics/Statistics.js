import React, { useEffect, useState } from "react";
import Row from "./../../../UI/Row/ELXRow";
import StorefrontIcon from "@material-ui/icons/Storefront";
import { FaHandshake } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import ScrollAnimation from "react-animate-on-scroll";
import { AnimatedOnScroll } from "react-animated-css-onscroll";

import useStyles from "./Statistics.styles";

const Statistics = props => {
  //styles init...
  const classes = useStyles();

  //state ...
  const [statsVisible, setStatsVisible] = useState(false);

  const onStatsVisibilityChange = isVisible => {
    isVisible ? setStatsVisible(true) : setStatsVisible(false);
  };

  //use effect...
  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Row className={classes.topGrid}>
        <Row className={classes.title}>STATISTICS</Row>
      </Row>
      <Row className={classes.container}>
        <VisibilitySensor onChange={onStatsVisibilityChange}>
          <Row className={classes.subContainer}>
            <Row className={classes.one}>
              <AnimatedOnScroll animationIn="bounceInLeft">
                <Row className={classes.icon}>
                  <StorefrontIcon style={{ fontSize: "50px" }} />
                  <Row className={classes.countUp}>
                    {statsVisible ? <CountUp duration={5} end={2000} /> : 2000}+
                  </Row>
                  <Row className={classes.countUpTitle}>Shops</Row>
                </Row>
              </AnimatedOnScroll>
            </Row>
            <Row className={classes.two}>
              <AnimatedOnScroll animationIn="bounceInLeft">
                <Row className={classes.icon}>
                  <FaHandshake style={{ fontSize: "50px" }} />
                  <Row className={classes.countUp}>
                    {statsVisible ? <CountUp duration={5} end={5000} /> : 5000}+
                  </Row>
                  <Row className={classes.countUpTitle}>Consignments</Row>
                </Row>
              </AnimatedOnScroll>
            </Row>
            <Row className={classes.three}>
              <AnimatedOnScroll animationIn="bounceInRight">
                <Row className={classes.icon}>
                  <FaMoneyCheckAlt style={{ fontSize: "50px" }} />
                  <Row className={classes.countUp}>
                    {statsVisible ? <CountUp duration={5} end={500} /> : 500}+
                  </Row>
                  <Row className={classes.countUpTitle}>Sales</Row>
                </Row>
              </AnimatedOnScroll>
            </Row>
          </Row>
        </VisibilitySensor>
      </Row>
    </React.Fragment>
  );
}; //........................

export default Statistics;
