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

const Collaborators = (props) => {
  //styles init...
  const classes = useStyles();

  //state management...
  const [loaded, setLoaded] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const token_RP = useSelector((state) => state.auth.token);

  //Methods starts....
  useEffect(() => {
    setLoaded(false);
    handleFetchAllCollaborators();
  }, []);

  const handleRefresh = () => {
    setLoaded(false);
    handleFetchAllCollaborators();
  }; //....................Handle refresh

  const handleDeleteRow = async (index) => {
    window.alert(collaborators[index].productId._id);
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

        //deleting manually ends.....
      } else {
        setLoaded(true);

        window.alert("Network Error Ocurred");
      }
    } catch (err) {
      setLoaded(true);

      if (err.response) {
        window.alert(err.response.data.errorMessage);
      } else {
        window.alert(err.message);
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
        console.log("Please check data*************");
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
          <Row className={classes.error}>
            <Row className={classes.row}> {errorMessage}</Row>
            <Row className={classes.row}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CachedIcon />}
                onClick={handleRefresh}
              >
                Refresh
              </Button>
            </Row>
          </Row>
        ) : (
          <Row>
            {collaborators.length === 0 ? (
              <Row className={classes.error}>
                No collaborator has been added yet!
              </Row>
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
