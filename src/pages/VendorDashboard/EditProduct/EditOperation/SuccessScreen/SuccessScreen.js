import React from "react";
import Row from "./../../../../../UI/Row/ELXRow";
import useStyles from "./SuccessScreen.styles";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import DetailsTable from "./DetailTable";
import InstallmentTable from "./InstallmentTable";
import { Paper, Button } from "@material-ui/core";
import AppConsts from "./../../../../../Constants/Strings";

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
            <Row className={classes.titleIcon}>
              <ThumbUpIcon
                style={{
                  fontSize: "30px",
                }}
              />
            </Row>
            <Row className={classes.titleText}>GREAT! Product Added</Row>
          </Row>
          {/* title ends.......... */}

          {/* Gallery starts...... */}
          <Row className={classes.gallery}>
            {props.state.images.map((elem, index) => {
              return elem.serverfilename != null ? (
                <Paper key={index} elevation={4} className={classes.imageBox}>
                  <img
                    style={{
                      width: "215px",
                      height: "auto",
                    }}
                    src={`${AppConsts.server}/${elem.serverfilename}`}
                  />
                </Paper>
              ) : null;
            })}
          </Row>
          {/* Gallery ends........ */}

          {/* Details table starts */}
          <Row
            style={{
              marginTop: "20px",
            }}
          >
            <DetailsTable state={props.state} />
          </Row>
          {/* Details Table ends here... */}

          {/* DownPayment starts... */}
          <Row className={classes.downContainer}>
            <Row className={classes.downLeft}>Down Payment</Row>
            <Row className={classes.downRight}>
              Rs: {props.state.downPayment}
            </Row>
          </Row>
          {/* DownPayment Ends..... */}

          {/* Installment Plan table starts */}
          <Row
            style={{
              marginTop: "20px",
            }}
          >
            <InstallmentTable installmentPlan={props.state.installmentPlan} />
          </Row>
          {/* Installment Plan Table ends here... */}

          {/* Close Btn Starts.... */}
          <Row className={classes.closeBtnRow}>
            <Button
              onClick={() => {
                props.setActiveState(0);
                props.refresh();
              }}
              variant={"contained"}
              color="primary"
            >
              OK
            </Button>
          </Row>
          {/* Close Btn Ends...... */}
        </Paper>
      </Row>
    </React.Fragment>
  );
  //return ends.....
}; //...........................

export default SuccessScreen;
