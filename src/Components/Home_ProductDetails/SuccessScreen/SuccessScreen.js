import React, { useState } from "react";
import Row from "./../../../UI/Row/ELXRow";
import useStyles from "./SuccessScreen.styles";
import DetailsTable from "./../DetailsTable/DetailsTable";
import { Paper, Button } from "@material-ui/core";
import AppConsts from "./../../../Constants/Strings";
import InstallmentTable from "./../InstallmentTable/InstallmentTable";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ToolTips from "./../../../UI/Tooltip/Tooltip";
import CircularProgressBar from "./../../../UI/CircularProgressBar/CircularProgressBar";
import axios from "axios";
import { useSelector } from "react-redux";

const SuccessScreen = props => {
  //classes init...
  const classes = useStyles();

  //state management starts...
  const [bufferring, setBufferring] = useState(false);
  const token_RP = useSelector(state => state.auth.token);

  React.useEffect(() => {
    console.log("props.state");
    console.log(props.state);
    console.log(props.state.images[0][0]);
  }, []);

  //Methods starts.....
  const handleAddToCollaborators = async () => {
    setBufferring(true);

    const body = JSON.stringify({
      productId: props.state._id
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-buyer": token_RP
      }
    };

    //try catch starts...
    try {
      const res = await axios.post(
        AppConsts.server + "/buyer/products/addToCollaborators",
        body,
        config
      );

      if (res) {
        setBufferring(false);
        window.alert("Product Added To Collaborators");
      } else {
        setBufferring(false);
        window.alert("Some Network Error Occurred");
      }
    } catch (err) {
      setBufferring(false);
      if (err.response) {
        window.alert(err.response.data.errorMessage);
      } else {
        window.alert(err.message);
      }
    }
    //try catch ends.....
  }; //.................................

  //return starts...
  return (
    <React.Fragment>
      <Row className={classes.container}>
        <Paper className={classes.paper} elevation={10}>
          {/* title starts..... */}
          <Row className={classes.title}>
            <Row className={classes.titleText}>{props.state.name}</Row>
          </Row>
          {/* title ends.......... */}

          {/* Gallery starts...... */}
          <Paper elevation={8} className={classes.gallery}>
            {props.state.images.map((elem, index) => {
              return (
                <Paper key={index} elevation={4} className={classes.imageBox}>
                  <img
                    style={{
                      width: "215px",
                      height: "auto"
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
              marginTop: "20px"
            }}
          >
            <DetailsTable state={props.state} />
          </Row>
          {/* Details Table ends here... */}

          <Paper className={classes.middleTitle}>INSTALLMENT PLAN</Paper>

          {/* DownPayment starts... */}
          <Row className={classes.downContainer}>
            <Row className={classes.downLeft}>Down Payment</Row>
            <Row className={classes.downRight}>
              Rs: {props.state.installmentPlan.downPayment}
            </Row>
          </Row>
          {/* DownPayment Ends..... */}

          {/* Installment Plan table starts */}
          <Row
            style={{
              marginTop: "20px"
            }}
          >
            <InstallmentTable
              installmentPlan={props.state.installmentPlan.installmentPlan}
            />
          </Row>
          {/* Installment Plan Table ends here... */}

          {/* Close Btn Starts.... */}
          <Row className={classes.closeBtnRow}>
            {bufferring ? (
              <ToolTips title="Add To Collaborators">
                <Row
                  style={{
                    marginRight: "20px"
                  }}
                >
                  <CircularProgressBar size={30} color={"secondary"} />
                </Row>
              </ToolTips>
            ) : (
              <ToolTips title="Add To Collaborators">
                <AddCircleIcon
                  style={{
                    fontSize: "50px",
                    marginRight: "20px",
                    cursor: "pointer"
                  }}
                  color={"primary"}
                  onClick={handleAddToCollaborators}
                />
              </ToolTips>
            )}
          </Row>
          {/* Close Btn Ends...... */}
        </Paper>
      </Row>
    </React.Fragment>
  );
  //return ends.....
}; //...........................

export default SuccessScreen;
