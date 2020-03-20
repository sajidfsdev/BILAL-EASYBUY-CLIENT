import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

const TooltipComp = props => {
  //return...
  return <Tooltip title={props.title}>{props.children}</Tooltip>;
}; //.....................

export default TooltipComp;
