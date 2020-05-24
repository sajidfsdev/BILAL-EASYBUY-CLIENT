import React, { useEffect, useState } from "react";
import Row from "./../../../UI/Row/ELXRow";
import StorefrontIcon from "@material-ui/icons/Storefront";
import { FaHandshake } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import ScrollAnimation from "react-animate-on-scroll";
import { AnimatedOnScroll } from "react-animated-css-onscroll";
import axios from "axios";
import AppConsts from "./../../../Constants/Strings";
import { useSnackbar } from "notistack";
import LoadingScreen from "./../../../Reusable/LoadingScreen";
import ErrorScreen from "./../../../Reusable/ErrorScreen";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import useStyles from "./Statistics.styles";

//screen consts...
const LOADING_SCREEN = "LOADING_SCREEN";
const DEFAULT_SCREEN = "DEFAULT_SCREEN";
const ERROR_SCREEN = "ERROR_SCREEN";

const Statistics = (props) => {
  //styles init...
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  //state ...
  const [statsVisible, setStatsVisible] = useState(false);
  const [screen, setScreen] = useState(ERROR_SCREEN);
  const [errorMessage, setErrorMessage] = useState("");
  const [statsData, setStatsData] = useState({});

  const handleShowSnackbar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  }; //......................handle show snack bar

  const onStatsVisibilityChange = (isVisible) => {
    isVisible ? setStatsVisible(true) : setStatsVisible(false);
  };

  //use effect...
  useEffect(() => {
    handleLoadStats();
  }, []);

  const handleLoadStats = async () => {
    setScreen(LOADING_SCREEN);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.get(
        AppConsts.server + "/admin/stats/get",
        config
      );

      if (res) {
        setStatsData(res.data);
        setScreen(DEFAULT_SCREEN);
      } else {
        setErrorMessage("Failed to load stats due to Network error");
        handleShowSnackbar("Network Error", "error");
        setScreen(ERROR_SCREEN);
      }
    } catch (err) {
      setScreen(ERROR_SCREEN);

      if (err.response) {
        setErrorMessage(err.response.data.errorMessage);
        handleShowSnackbar(err.response.data.errorMessage, "error");
      } else {
        setErrorMessage(err.message);
        handleShowSnackbar(err.message, "error");
      }
    }
  }; //..........................handle load stats

  let mainGUI = null;

  if (screen === LOADING_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <LoadingScreen size={50} />
      </React.Fragment>
    );
  } else if (screen === ERROR_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <ErrorScreen
          handleReload={handleLoadStats}
          errorMessage={errorMessage}
        />
      </React.Fragment>
    );
  } else {
    mainGUI = (
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
                      {statsVisible ? (
                        <CountUp duration={5} end={statsData.vendors} />
                      ) : (
                        statsData.vendors
                      )}
                      +
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
                      {statsVisible ? (
                        <CountUp
                          duration={5}
                          end={statsData.consigned.length}
                        />
                      ) : (
                        statsData.consigned.length
                      )}
                      +
                    </Row>
                    <Row className={classes.countUpTitle}>Consignments</Row>
                  </Row>
                </AnimatedOnScroll>
              </Row>
              <Row className={classes.three}>
                <AnimatedOnScroll animationIn="bounceInRight">
                  <Row className={classes.icon}>
                    <AccountCircleIcon style={{ fontSize: "50px" }} />
                    <Row className={classes.countUp}>
                      {statsVisible ? (
                        <CountUp duration={5} end={statsData.buyers} />
                      ) : (
                        statsData.buyers
                      )}
                      +
                    </Row>
                    <Row className={classes.countUpTitle}>Buyers</Row>
                  </Row>
                </AnimatedOnScroll>
              </Row>
            </Row>
          </VisibilitySensor>
        </Row>
      </React.Fragment>
    );
  }

  return <React.Fragment>{mainGUI}</React.Fragment>;
}; //........................

export default Statistics;
