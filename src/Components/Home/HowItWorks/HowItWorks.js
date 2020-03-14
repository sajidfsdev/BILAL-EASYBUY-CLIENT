import React from "react";
import Row from "./../../../UI/Row/ELXRow";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import TableChartIcon from "@material-ui/icons/TableChart";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import TimelineIcon from "@material-ui/icons/Timeline";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { FaRegHandshake } from "react-icons/fa";
import useStyles from "./HowItWorks.styles";

const HowItWorks = props => {
  //styles init...
  const classes = useStyles();

  //Methods...
  const returnBox = (step, title, Icon, content, size = false) => (
    <Row className={classes.box}>
      <Row className={classes.boxRow}>
        <Row className={classes.step}>{step}</Row>
        <Row className={classes.title}>{title}</Row>
      </Row>
      <Row className={classes.boxRow}>
        <Row className={classes.icon}>
          {size === false ? <Icon fontSize={"large"} /> : <Icon size={35} />}
        </Row>
        <Row className={classes.content}>{content}</Row>
      </Row>
    </Row>
  ); //...................return box ends...

  //return starts....
  return (
    <Row className={classes.container}>
      <Row className={classes.subContainer}>
        <Row className={classes.title}>HOW IT WORKS</Row>
        <Row className={classes.border}></Row>
        <Row className={classes.gridContainer}>
          <Row className={classes.gridOne}>
            {returnBox(
              "#1",
              "REGISTER",
              PersonAddIcon,
              "Simply register yourself by providing info about your shop Add your products and make them visible to thousands of buyers"
            )}
          </Row>
          <Row className={classes.gridTwo}>
            {returnBox(
              "#2",
              "INSTALLMENT PLAN",
              TableChartIcon,
              `Through our installment management solution simply design your
              installment plan for each products.`
            )}
          </Row>
          <Row className={classes.gridThree}>
            {returnBox(
              "#3",
              "DISCUSS PLAN",
              QuestionAnswerIcon,
              `Discuss Installment plan with buyers. adjust your plans with
              your particular customer`
            )}
          </Row>
        </Row>
        <Row className={classes.gridContainer}>
          <Row className={classes.gridOne}>
            {returnBox(
              "#4",
              "REACH AGREEMENT",
              FaRegHandshake,
              `After discussion lock agreed installment plan with customer`,
              true
            )}
          </Row>
          <Row className={classes.gridTwo}>
            {returnBox(
              "#5",
              "TRACK INSTALLMENTS",
              TimelineIcon,
              ` Keep record of how much installments have been cleared by your
              customers relevant to their installment plan`
            )}
          </Row>
          <Row className={classes.gridThree}>
            {returnBox(
              "#6",
              "EARN PROFIT",
              MonetizationOnIcon,
              ` By all that increase your income and enhance your business`
            )}
          </Row>
        </Row>
        <Row className={classes.border}></Row>
      </Row>
    </Row>
  );
  //return ends......
}; //.........................

export default HowItWorks;
