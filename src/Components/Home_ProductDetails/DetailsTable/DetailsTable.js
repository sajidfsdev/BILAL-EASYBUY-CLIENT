import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import BackspaceIcon from "@material-ui/icons/Backspace";

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
});

const CustomizedTables = (props) => {
  const classes = useStyles();

  return (
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
              Name
            </StyledTableCell>
            <StyledTableCell
              style={{
                padding: "5px",
              }}
              align="center"
            >
              Price
            </StyledTableCell>
            <StyledTableCell
              style={{
                padding: "5px",
              }}
              align="center"
            >
              City
            </StyledTableCell>
            <StyledTableCell
              style={{
                padding: "5px",
              }}
              align="center"
            >
              Vendor
            </StyledTableCell>
            <StyledTableCell
              style={{
                padding: "5px",
              }}
              align="center"
            >
              Contact
            </StyledTableCell>

            <StyledTableCell
              style={{
                padding: "5px",
              }}
              align="center"
            >
              Description
            </StyledTableCell>
            <StyledTableCell
              style={{
                padding: "5px",
              }}
              align="center"
            >
              Attributes
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell style={{ fontSize: "15px" }} align="center">
              {props.state.name}
            </StyledTableCell>
            <StyledTableCell style={{ fontSize: "15px" }} align="center">
              {props.state.price}
            </StyledTableCell>
            <StyledTableCell style={{ fontSize: "15px" }} align="center">
              {props.state.vendorId.city}
            </StyledTableCell>
            <StyledTableCell style={{ fontSize: "15px" }} align="center">
              {props.state.vendorId.name}
            </StyledTableCell>
            <StyledTableCell style={{ fontSize: "15px" }} align="center">
              {props.state.vendorId.contact}
            </StyledTableCell>
            <StyledTableCell style={{ fontSize: "15px" }} align="center">
              {props.state.desc}
            </StyledTableCell>
            <StyledTableCell style={{ fontSize: "15px" }} align="center">
              <ul>
                {props.state.att.map((elem, index) => (
                  <li key={index}>
                    {elem[0].attribute + " : " + elem[0].value}
                  </li>
                ))}
              </ul>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

CustomizedTables.defaultProps = {
  state: {
    name: "HP Laptop",
    price: 50000,
    cat: "Laptop",
    subCat: "HP",
    subSubCat: "Not Available",
    desc: "Some description",
  },
};

export default CustomizedTables;
