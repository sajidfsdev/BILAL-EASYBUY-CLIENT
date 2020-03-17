import React from "react";
import Row from "./../Row/ELXRow";
import clsx from "clsx";
import useStyles from "./container.styles";

const Container = props => {
  //styles init...
  const classes = useStyles();

  //return...
  return (
    <Row
      className={clsx({
        [classes.container]: true,
        [props.containerClass]: props.containerClass !== undefined
      })}
    >
      <Row
        className={clsx({
          [classes.subContainer]: true,
          [props.subContainerClass]: props.subContainerClass !== undefined
        })}
      >
        {props.children}
      </Row>
    </Row>
  );
}; //.......................

Container.defaultProps = {
  containerClass: undefined,
  subContainerClass: undefined,
  children: <div></div>
};

export default Container;
