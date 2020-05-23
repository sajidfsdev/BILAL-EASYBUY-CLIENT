import React, { useEffect } from "react";
import Row from "./../../../UI/Row/ELXRow";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import DetailsTable from "./DetailsTable";
import InstallmentTable from "./InstallmentTable";
import { Paper, Button } from "@material-ui/core";
import AppConsts from "./../../../Constants/Strings";

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
  },

  titleIcon: {
    color: "green",
    marginRight: "30px",
  },

  titleText: {
    fontSize: "15px",
    color: theme.palette.primary.main,
  },

  gallery: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
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
}));

const SuccessScreen = (props) => {
  const classes = useStyles();

  //return starts...
  return (
    <React.Fragment>
      <Row className={classes.container}>
        <Paper className={classes.paper} elevation={10}>
          {/* title starts..... */}
          {props.showThumbUp ? (
            <Row className={classes.title}>
              <Row className={classes.titleIcon}>
                <ThumbUpIcon
                  style={{
                    fontSize: "30px",
                  }}
                />
              </Row>
              <Row className={classes.titleText}>Request Has Been Made ...</Row>
            </Row>
          ) : null}

          {/* title ends.......... */}

          {/* Gallery starts...... */}
          <Row className={classes.gallery}>
            {props.data.product.images.map((elem, index) => {
              return (
                <Paper key={index} elevation={4} className={classes.imageBox}>
                  <img
                    style={{
                      width: "215px",
                      height: "auto",
                    }}
                    src={`${AppConsts.server}/${elem}`}
                  />
                </Paper>
              );
            })}
          </Row>
          {/* Gallery ends........ */}

          {/* Details table starts */}
          <Row
            style={{
              marginTop: "20px",
            }}
          >
            <DetailsTable state={props.data} />
          </Row>
          {/* Details Table ends here... */}

          {/* DownPayment starts... */}
          <Row className={classes.downContainer}>
            <Row className={classes.downLeft}>Down Payment</Row>
            <Row className={classes.downRight}>
              Rs: {props.data.installmentPlan.downPayment}
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
              installmentPlan={props.data.installmentPlan.installmentPlan}
            />
          </Row>
          {/* Installment Plan Table ends here... */}

          {/* Close Btn Starts.... */}
          {/* <Row className={classes.closeBtnRow}>
            <Button
              onClick={props.refresh}
              variant={"contained"}
              color="primary"
            >
              OK
            </Button>
          </Row> */}
          {/* Close Btn Ends...... */}
        </Paper>
      </Row>
    </React.Fragment>
  );
  //return ends.....
}; //...........................

export default SuccessScreen;
