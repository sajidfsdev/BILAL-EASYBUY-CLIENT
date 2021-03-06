import React, { useState, useEffect } from "react";
import Row from "./../../../UI/Row/ELXRow";
import CircularProgressBar from "./../../../UI/CircularProgressBar/CircularProgressBar";
import axios from "axios";
import { useSelector } from "react-redux";
import AppConsts from "./../../../Constants/Strings";
import CachedIcon from "@material-ui/icons/Cached";
import useStyles from "./Collaborators.styles";
import { Button, Paper } from "@material-ui/core";
import CollaboratorTable from "./../../../Components/BuyerDashboard/Collaborators/CollTable/collTable";
import ErrorScreen from "./../../../Reusable/ErrorScreen";
import { useSnackbar } from "notistack";

const Collaborators = (props) => {
  //styles init...
  const classes = useStyles();

  //state management...
  const [loaded, setLoaded] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token_RP = useSelector((state) => state.auth.token);
  const { enqueueSnackbar } = useSnackbar();

  //Methods starts....
  useEffect(() => {
    setLoaded(false);
    handleFetchAllCollaborators();
  }, []);

  const handleShowSnackBar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  }; //..................handle show snack bar ends.

  const handleRefresh = () => {
    setLoaded(false);
    handleFetchAllCollaborators();
  }; //....................Handle refresh

  const handleDeleteRow = async (index) => {
    // /deleteCollaborators
    setLoaded(false);

    const body = JSON.stringify({
      productId: collaborators[index].productId._id,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-buyer": token_RP,
      },
    };

    //try catch starts.....
    try {
      const res = await axios.post(
        AppConsts.server + "/buyer/products/deleteCollaborators",
        body,
        config
      );

      if (res) {
        setLoaded(true);
        //deleting manually starts..,
        setCollaborators([
          ...collaborators.filter((elem, ind) => ind != index),
        ]);

        handleShowSnackBar("Deleted Successfully", "success");

        //deleting manually ends.....
      } else {
        setLoaded(true);

        handleShowSnackBar("Unable to delete due to network error", "error");
      }
    } catch (err) {
      setLoaded(true);

      if (err.response) {
        handleShowSnackBar(err.response.data.errorMessage, "error");
      } else {
        handleShowSnackBar(err.message);
      }
    }
    //try catch ends here....
  }; //...............................Handle delete Row

  const handleFetchAllCollaborators = async () => {
    const body = JSON.stringify({
      action: "Gte all cats",
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
        AppConsts.server + "/buyer/products/getAllCollaborators",
        body,
        config
      );

      if (res) {
        setLoaded(true);
        setCollaborators([...res.data.data]);
        console.log("Please check data of collaborators*************");
        console.log(res.data.data);
      } else {
        setLoaded(true);
        setIsError(true);
        setErrorMessage("Network Error Ocurred");
      }
    } catch (err) {
      setLoaded(true);

      if (err.response) {
        setIsError(true);
        setErrorMessage(err.response.data.errorMessage);
      } else {
        setIsError(true);
        setErrorMessage(err.message);
      }
    }
    //try catch ends......
  }; //..........................Handle fetch all collaboratoes

  //return starts....
  return (
    <React.Fragment>
      <Row className={classes.title}>Collaborators</Row>
      {loaded ? (
        isError ? (
          <ErrorScreen
            errorMessage={errorMessage}
            handleReload={handleRefresh}
          />
        ) : (
          <Row>
            {collaborators.length === 0 ? (
              <ErrorScreen
                showReloadButton={false}
                errorMessage="No collaborator has been added yet!"
              />
            ) : (
              <Row className={classes.container}>
                <Paper elevation={0} className={classes.subContainer}>
                  <CollaboratorTable
                    handleDeleteRow={handleDeleteRow}
                    data={collaborators}
                  />
                </Paper>
              </Row>
            )}
          </Row>
        )
      ) : (
        <Row className={classes.spinner}>
          <CircularProgressBar size={40} color="secondary" />
        </Row>
      )}
    </React.Fragment>
  );
  //return ends......
}; //..........................

export default Collaborators;
