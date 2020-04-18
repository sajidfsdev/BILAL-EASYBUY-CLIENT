import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Row from "./../../../UI/Row/ELXRow";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  emptyScreen: {
    width: "100%",
    height: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

const CustomizedTables = (props) => {
  const classes = useStyles();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    let array = [];
    props.data.forEach((elem, index) => {
      let present = false;
      array.forEach((arr) => {
        if (elem.productId.name == arr.name) {
          present = true;
        }
      });
      if (present == false) {
        array.push(elem.productId);
      }
    });
    setProducts([...array]);
  }, []);

  return (
    <React.Fragment>
      {products.length === 0 ? (
        <Row className={classes.emptyScreen}>
          No More Product Available. You Can Go Back
        </Row>
      ) : (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  style={{
                    padding: "5px",
                  }}
                  align="center"
                >
                  SR
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    padding: "5px",
                  }}
                  align="center"
                >
                  Name
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    padding: "5px",
                  }}
                  align="center"
                >
                  Category
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    padding: "5px",
                  }}
                  align="center"
                >
                  Price
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((elem, index) => (
                <StyledTableRow
                  key={index}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    props.next(elem._id);
                  }}
                >
                  <StyledTableCell style={{ fontSize: "15px" }} align="center">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell style={{ fontSize: "15px" }} align="center">
                    {elem.name}
                  </StyledTableCell>
                  <StyledTableCell style={{ fontSize: "15px" }} align="center">
                    {elem.cat}
                  </StyledTableCell>
                  <StyledTableCell style={{ fontSize: "15px" }} align="center">
                    {elem.price}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </React.Fragment>
  );
};

CustomizedTables.defaultProps = {
  data: [],
};

export default CustomizedTables;
