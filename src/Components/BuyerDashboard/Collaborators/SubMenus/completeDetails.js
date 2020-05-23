import React, { useState } from "react";
import Row from "../../../../UI/Row/ELXRow";
import DetailsTable from "../../../Home_ProductDetails/DetailsTable/DetailsTable";
import { Paper } from "@material-ui/core";
import InstallmentTable from "../../../Home_ProductDetails/InstallmentTable/InstallmentTable";
import AppConsts from "../../../../Constants/Strings";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20px",
  },

  paper: {
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },

  title: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    color: "white",
    height: "30px",
  },

  titleText: {
    fontSize: "15px",
    color: "white",
  },

  gallery: {
    width: "95%",
    marginTop: "30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "20px",
    marginLeft: "auto",
    marginRight: "auto",
  },

  imageBox: {
    width: "215px",
    height: "215px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  downContainer: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  downLeft: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },

  downRight: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
  },

  closeBtnRow: {
    width: "100%",
    marginTop: "20px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  middleTitle: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "20px",
    color: theme.palette.primary.main,
  },
  paddingDiv: {
    width: "100%",
    marginTop: "40px",
  },
}));

const SuccessScreen = (props) => {
  //classes init...
  const classes = useStyles();

  //return starts...
  return (
    <React.Fragment>
      <Row className={classes.container}>
        <Paper className={classes.paper} elevation={10}>
          {/* title starts..... */}
          <Row className={classes.title}>
            <Row className={classes.titleText}>{props.data.productId.name}</Row>
          </Row>
          {/* title ends.......... */}

          {/* Gallery starts...... */}
          <Paper elevation={8} className={classes.gallery}>
            {props.data.productId.images.map((elem, index) => {
              return (
                <Paper key={index} elevation={4} className={classes.imageBox}>
                  <img
                    style={{
                      width: "215px",
                      height: "auto",
                    }}
                    src={`${AppConsts.server}/${elem[0]}`}
                  />
                </Paper>
              );
            })}
          </Paper>
          {/* Gallery ends........ */}
          <Paper className={classes.middleTitle}>GENERAL INFORMATION</Paper>

          {/* Details table starts */}
          <Row
            style={{
              marginTop: "20px",
            }}
          >
            <DetailsTable state={props.data.productId} />
          </Row>
          {/* Details Table ends here... */}

          <Paper className={classes.middleTitle}>INSTALLMENT PLAN</Paper>

          {/* DownPayment starts... */}
          <Row className={classes.downContainer}>
            <Row className={classes.downLeft}>Down Payment</Row>
            <Row className={classes.downRight}>
              Rs: {props.data.productId.installmentPlan.downPayment}
            </Row>
          </Row>
          {/* DownPayment Ends..... */}

          {/* Installment Plan table starts */}
          <Row
            style={{
              marginTop: "20px",
            }}
          >
            <InstallmentTable
              installmentPlan={
                props.data.productId.installmentPlan.installmentPlan
              }
            />
          </Row>
          {/* Installment Plan Table ends here... */}

          {/* Padding div starts... */}
          <Row className={classes.paddingDiv}></Row>
          {/* Padding div ends.... */}
        </Paper>
      </Row>
    </React.Fragment>
  );
  //return ends.....
}; //...........................

export default SuccessScreen;
