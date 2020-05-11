import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Row from "./../UI/Row/ELXRow";
import Table from "./Table";
import TableRow from "./TableRow";
import TableCell from "./TableCell";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: "10px",
    marginBottom: "10px",
  },
}));

const Attributes = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Row className={classes.margin}>
        <Table headings={["SR", "Attributes", "Value"]}>
          {props.data.map((elem, index) => (
            <TableRow key={index}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell align="center">{elem[0].attribute}</TableCell>
              <TableCell align="center">{elem[0].value}</TableCell>
            </TableRow>
          ))}
        </Table>
      </Row>
    </React.Fragment>
  );
}; //...............Attributes ends

Attributes.defaultProps = {
  data: [],
};

export default Attributes;
