import React, { useState } from "react";
import Row from "./../../../UI/Row/ELXRow";
import useStyles from "./SuccessScreen.styles";
import DetailsTable from "./../DetailsTable/DetailsTable";
import { Paper, Button, TextareaAutosize } from "@material-ui/core";
import AppConsts from "./../../../Constants/Strings";
import InstallmentTable from "./../InstallmentTable/InstallmentTable";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ToolTips from "./../../../UI/Tooltip/Tooltip";
import CircularProgressBar from "./../../../UI/CircularProgressBar/CircularProgressBar";
import axios from "axios";
import { useSelector } from "react-redux";
import SendIcon from "@material-ui/icons/Send";
import ReportIcon from "@material-ui/icons/Report";
import { useSnackbar } from "notistack";
import { withRouter } from "react-router-dom";
import { format } from "date-fns";
import DraggableDialogue from "./../../../UI/DraggableDialogue/DraggableDialogue";

const SuccessScreen = (props) => {
  //classes init...
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  //state management starts...
  const [bufferring, setBufferring] = useState(false);
  const [sendBufferring, setSendBufferring] = useState(false);
  const [reportBufferring, setReportBufferring] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [reason, setReason] = useState("");
  const [dialogueBufferring, setDialogueBufferring] = useState(false);

  const token_RP = useSelector((state) => state.auth.token);
  const type_RP = useSelector((state) => state.auth.type);

  React.useEffect(() => {
    console.log("props.state");
    console.log(props.state);
    console.log(props.state.images[0][0]);
  }, []);

  //Handle request consignment starts...

  const handleReportAdmin = async () => {
    if (reason === "") return;
    setReportBufferring(true);
    setDialogueBufferring(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-buyer": token_RP,
      },
    };

    const body = JSON.stringify({
      product: props.state,
      reason: reason,
    });

    try {
      const res = await axios.post(
        AppConsts.server + "/buyer/report/report",
        body,
        config
      );

      if (res) {
        setDialogueBufferring(false);
        setOpenDialogue(false);

        setReportBufferring(false);
        handleShowSnackBar(
          "Advertisement has been Reported to Admin",
          "success"
        );
      } else {
        setDialogueBufferring(false);

        setReportBufferring(false);
        handleShowSnackBar(
          "Failed To Report To Admin due to Network Error",
          "error"
        );
      }
    } catch (err) {
      setReportBufferring(false);
      setDialogueBufferring(false);

      if (err.response) {
        handleShowSnackBar(err.response.data.errorMessage, "error");
      } else {
        handleShowSnackBar(err.response, "error");
      }
    }
  }; //.......................handle report Admin

  const handleRequestConsignment = async () => {
    setSendBufferring(true);
    let installmentPlan = props.state.installmentPlan;
    const productId = props.state._id;
    const product = props.state;
    const vendorId = props.state.vendorId._id;
    const status = "PENDING";
    let d = new Date();
    const date = format(
      new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()),
      "yyyy-MM-dd"
    );
    const body = JSON.stringify({
      vendorId: vendorId,
      status: status,
      installmentPlan: installmentPlan,
      product: product,
      productId: productId,
      date: date,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-buyer": token_RP,
      },
    };

    //try catch starts....
    try {
      const res = await axios.post(
        AppConsts.server + "/buyer/consigned/request",
        body,
        config
      );
      if (res) {
        //window.alert("RESPONSE HAS COME");
        setSendBufferring(false);
        handleShowSnackBar(
          "Your Request has been submitted to Vendor",
          "success"
        );
        props.history.push("/manage/consigned");
      } else {
        setSendBufferring(false);

        //window.alert("NO RESPONSE");
        handleShowSnackBar(
          "Could not send Reuest due to Network Error",
          "error"
        );
      }
    } catch (err) {
      setSendBufferring(false);

      if (err.response) {
        //window.alert("err.response");
        //window.alert(err.response.data.errorMessage);
        handleShowSnackBar(err.response.data.errorMessage, "error");
      } else {
        //window.alert("err.message");
        //window.alert(err.message);
        handleShowSnackBar(err.message, "error");
      }
    }
    //try catch ends......
  }; //..................................
  //Handle reuest consignment ends......

  const handleShowSnackBar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  //Methods starts.....
  const handleAddToCollaborators = async () => {
    setBufferring(true);

    const body = JSON.stringify({
      productId: props.state._id,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-buyer": token_RP,
      },
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
        handleShowSnackBar(
          "Product has been added to collaborators",
          "success"
        );
        props.history.push("/manage/collaborators");
        //window.alert("Product Added To Collaborators");
      } else {
        setBufferring(false);
        handleShowSnackBar("Some Network Error Occurred", "error");
      }
    } catch (err) {
      setBufferring(false);
      if (err.response) {
        handleShowSnackBar(err.response.data.errorMessage, "error");
      } else {
        handleShowSnackBar(err.message, "error");
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
              marginTop: "20px",
            }}
          >
            <InstallmentTable
              installmentPlan={props.state.installmentPlan.installmentPlan}
            />
          </Row>
          {/* Installment Plan Table ends here... */}

          {/* Close Btn Starts.... */}

          {type_RP === "Buyer" ? (
            <Row className={classes.closeBtnRow}>
              {/* Report Icon starts... */}
              {reportBufferring ? (
                <Row
                  style={{
                    marginRight: "20px",
                  }}
                >
                  <CircularProgressBar size={30} color={"secondary"} />
                </Row>
              ) : (
                <Row
                  style={{
                    marginRight: "20px",
                  }}
                >
                  <ToolTips title="Report Abuse">
                    <ReportIcon
                      // onClick={handleReportAdmin}
                      onClick={() => setOpenDialogue(true)}
                      style={{
                        fontSize: "50px",
                        marginRight: "20px",
                        cursor: "pointer",
                      }}
                      color={"primary"}
                    />
                  </ToolTips>
                </Row>
              )}
              {/* Report Icon ends..... */}

              {/* sendIcon starts ends... */}
              {sendBufferring ? (
                <Row
                  style={{
                    marginRight: "20px",
                  }}
                >
                  <CircularProgressBar size={30} color={"secondary"} />
                </Row>
              ) : (
                <Row
                  style={{
                    marginRight: "20px",
                  }}
                >
                  <ToolTips title="Request Vendor">
                    <SendIcon
                      onClick={handleRequestConsignment}
                      style={{
                        fontSize: "50px",
                        marginRight: "20px",
                        cursor: "pointer",
                      }}
                      color={"primary"}
                    />
                  </ToolTips>
                </Row>
              )}
              {/* sendIcons ends here.... */}

              {bufferring ? (
                <ToolTips title="Add To Collaborators">
                  <Row
                    style={{
                      marginRight: "20px",
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
                      cursor: "pointer",
                    }}
                    color={"primary"}
                    onClick={handleAddToCollaborators}
                  />
                </ToolTips>
              )}
            </Row>
          ) : null}

          {/* Close Btn Ends...... */}
        </Paper>
      </Row>

      <DraggableDialogue
        open={openDialogue}
        title="Provide Reason for Reporting this Ad"
        handleClose={() => {
          setOpenDialogue(false);
        }}
      >
        <TextareaAutosize
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          className={classes.textArea}
        />
        <Row className={classes.margin}>
          {dialogueBufferring ? (
            <Row className={classes.reportBtn}>
              <CircularProgressBar size={30} color={"secondary"} />
            </Row>
          ) : (
            <Row className={classes.reportBtn}>
              <Button
                onClick={handleReportAdmin}
                color="primary"
                variant="contained"
              >
                Report
              </Button>
            </Row>
          )}
        </Row>
      </DraggableDialogue>
    </React.Fragment>
  );
  //return ends.....
}; //...........................

export default withRouter(SuccessScreen);
