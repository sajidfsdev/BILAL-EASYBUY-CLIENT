import React, { useState, useEffect } from "react";
import useStyles from "./HorizontalList.styles";
import Row from "./../Row/ELXRow";
import Paper from "./../Paper/Paper";
import Collapse from "@material-ui/core/Collapse";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";

const HorizonatalList = props => {
  const [checked, setChecked] = useState(false);
  const [hoverState, setHoverState] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const hoverArray = [];
    props.products.forEach(elem => {
      hoverArray.push(false);
    });
    setHoverState(hoverArray);
  }, [props.products]);

  const handleHovering = (index, state) => {
    const hoverArray = [...hoverState];
    hoverArray[index] = state;
    setHoverState([...hoverArray]);
  }; //..........
  return (
    <Row className={classes.container}>
      <Row className={classes.list}>
        {props.products.map((elem, index) => (
          <Paper
            key={index}
            elevation={7}
            className={classes.paper}
            onMouseOver={() => {
              handleHovering(index, true);
            }}
            onMouseOut={() => {
              handleHovering(index, false);
            }}
          >
            <Row className={classes.dropcontainer}>
              <Collapse in={hoverState[index]} collapsedHeight={40}>
                <Paper elevation={4} className={classes.droppaper}>
                  <Row className={classes.cardHeadingRow}>
                    <FavoriteIcon className={classes.icon} />
                    <Row>{elem.title}</Row>
                    <Row className={classes.padding}></Row>
                  </Row>
                  <Row className={classes.hiddenContainer}>
                    <Row className={classes.hiddenPadding}></Row>
                    <Row className={classes.pricing}>
                      {"For Rs: " + elem.price + "/-"}
                    </Row>
                    <Row className={classes.furtherDetails}>
                      {"DownPayment: Rs" + elem.downPayment + "/-"}
                    </Row>
                    <Row className={classes.furtherDetails}>
                      {"Installment Plan: " + elem.installmentPlan}
                    </Row>
                    <Row className={classes.btnRow}>
                      <buton className={classes.btn}>See Details</buton>
                    </Row>
                  </Row>
                  <svg className={classes.svg}>
                    <polygon
                      points="0,100 50,00, 100,100"
                      className={classes.polygon}
                    />
                  </svg>
                </Paper>
              </Collapse>
            </Row>
            <Row className={classes.imageRow}>
              <img
                src={require(`./../../Assets/images/${elem.image}`)}
                className={classes.image}
              />
            </Row>
          </Paper>
        ))}
      </Row>
    </Row>
  );
}; //..............................

export default HorizonatalList;
