import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { Tooltip } from "@material-ui/core";
import SubMenu from "./../SubMenus/SubMenus";

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
      cursor: "pointer",
    },
    "&:nth-of-type(even)": {
      cursor: "pointer",
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

  //state manageemt starts....
  const [screens, setScreens] = useState(1);
  const [currentCollaborator, setCurrentCollaborator] = useState(null);

  //state management starts.......

  const handleClose = () => {
    setScreens(1);
  }; //.......................

  const handleOpenSubmenu = (elem) => {
    setScreens(2);
    setCurrentCollaborator(elem);
  }; //..............state management ends...
  //state management ends.........

  //GUI man starts.........
  let mainGUI = null;

  if (screens === 1) {
    mainGUI = (
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
                Product_Name
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
                Remove
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row, index) => (
              <StyledTableRow
                key={index}
                onClick={() => {
                  handleOpenSubmenu(row);
                }}
              >
                <StyledTableCell style={{ fontSize: "15px" }} align="center">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "15px" }} align="center">
                  {row.productId.name}
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "15px" }} align="center">
                  {row.productId.price}
                </StyledTableCell>
                <StyledTableCell style={{ fontSize: "15px" }} align="center">
                  {row.productId.vendorId.name}
                </StyledTableCell>

                <StyledTableCell style={{ fontSize: "15px" }} align="center">
                  {row.productId.vendorId.contact}
                </StyledTableCell>

                <StyledTableCell style={{ fontSize: "15px" }} align="center">
                  <Tooltip title="Delete">
                    <BackspaceIcon
                      style={{
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        props.handleDeleteRow(index);
                      }}
                    />
                  </Tooltip>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else if (screens === 2) {
    mainGUI = <SubMenu data={currentCollaborator} handleClose={handleClose} />;
  }
  //GUI man ends here......

  return <React.Fragment>{mainGUI}</React.Fragment>;
};

CustomizedTables.defaultProps = {
  data: [],
};

export default CustomizedTables;
