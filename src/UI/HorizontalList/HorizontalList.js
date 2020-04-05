import React, { useState, useEffect } from "react";
import useStyles from "./HorizontalList.styles";
import Row from "./../Row/ELXRow";
import Paper from "./../Paper/Paper";
import Collapse from "@material-ui/core/Collapse";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { AnimatedOnScroll } from "react-animated-css-onscroll";
import AppConsts from "./../../Constants/Strings";
import { withRouter } from "react-router-dom";

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

  const handleImageClick = id => {
    props.history.push(`/details/${id}`);
  }; //.........................

  const handleHovering = (index, state) => {
    const hoverArray = [...hoverState];
    hoverArray[index] = state;
    setHoverState([...hoverArray]);
  }; //..........
  return (
    <Row className={classes.container}>
      <Row className={classes.list}>
        {props.products.map((elem, index) => (
          <AnimatedOnScroll
            animationInDelay={2}
            animationIn="fadeIn"
            animationOut="fadeOut"
          >
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
                      {/* <FavoriteIcon className={classes.icon} /> */}
                      <Row>{elem.name}</Row>
                      {/* <Row className={classes.padding}></Row> */}
                    </Row>
                    <Row className={classes.hiddenContainer}>
                      <Row className={classes.hiddenPadding}></Row>
                      <Row className={classes.pricing}>
                        {"Total Rs: " + elem.price + "/-"}
                      </Row>

                      <Row className={classes.furtherDetails}>
                        {"City: " + elem.vendorId.city.toLowerCase()}
                      </Row>
                      <Row className={classes.furtherDetails}>
                        {"DownPayment: Rs" +
                          elem.installmentPlan.downPayment +
                          "/-"}
                      </Row>
                      <Row className={classes.furtherDetails}>
                        {"Installment Plan: " +
                          (elem.installmentPlan.installmentPlan.length + 1) +
                          " " +
                          elem.installmentPlan.duration}
                      </Row>
                      <Row className={classes.btnRow}>
                        <buton
                          onClick={() => {
                            handleImageClick(elem._id);
                          }}
                          className={classes.btn}
                        >
                          See Details
                        </buton>
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
                  src={`${AppConsts.server}/${elem.images[0]}`}
                  className={classes.image}
                />
              </Row>
            </Paper>
          </AnimatedOnScroll>
        ))}
      </Row>
    </Row>
  );
}; //..............................

export default withRouter(HorizonatalList);
