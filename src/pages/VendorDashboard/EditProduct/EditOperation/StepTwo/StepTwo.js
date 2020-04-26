import React from "react";
import Row from "./../../../../../UI/Row/ELXRow";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "./../../../../../UI/Paper/Paper";
import axios from "axios";
import { useSelector } from "react-redux";
import AppConsts from "./../../../../../Constants/Strings";
import * as Types from "./../types";
import useStyles from "./StepTwo.styles";

const StepTwo = (props) => {
  //classes...
  const classes = useStyles();

  //state management....
  const token_RP = useSelector((state) => state.auth.token);

  //Methods starts...

  const handleMoveNext = () => {
    let validate = false;
    props.state.images.forEach((elem) => {
      if (
        elem.serverfilename !== null &&
        elem.progress === 100 &&
        elem.isError === false
      ) {
        validate = true;
      }
    });
    if (validate === true) {
      props.setActiveState(2);
    } else {
      window.alert("Please Upload Atleast One Image");
    }
  }; //........................

  const handleFileUploadOne = async (event) => {
    const file = event.target.files[0];
    const filename = event.target.files[0].name;
    const copiedArr = [...props.state.images];
    copiedArr[0].file = file;
    copiedArr[0].filename = filename;
    copiedArr[0].message = filename;
    props.dispatch({
      type: Types.SET_IMAGES_SUCCESS,
      payload: {
        images: [...copiedArr],
      },
    });

    var bodyFormData = new FormData();
    bodyFormData.append("fileOne", file);

    try {
      const res = await axios.post(
        AppConsts.server + "/vendor/upload/one",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-eptoken-vendor": token_RP,
          },
          onUploadProgress: (ProgressEvent) => {
            handleProgressFileOne(
              parseInt(
                Math.round(ProgressEvent.loaded * 100) / ProgressEvent.total
              )
            );
          },
        }
      );
      if (res) {
        const serverfilename = res.data.serverfilename;
        const copiedArr = [...props.state.images];
        copiedArr[0].serverfilename = serverfilename;
        copiedArr[0].isError = false;
        copiedArr[0].message = "Uploaded";
        props.dispatch({
          type: Types.SET_IMAGES_SUCCESS,
          payload: {
            images: [...copiedArr],
          },
        });
      }
    } catch (err) {
      if (err.response) {
        const copiedArr = [...props.state.images];
        copiedArr[0].serverfilename = null;
        copiedArr[0].isError = true;
        copiedArr[0].message = err.response.data.errorMessage;
        props.dispatch({
          type: Types.SET_IMAGES_SUCCESS,
          payload: {
            images: [...copiedArr],
          },
        });
      } else {
        const copiedArr = [...props.state.images];
        copiedArr[0].serverfilename = null;
        copiedArr[0].isError = true;
        copiedArr[0].message = err.message;
        props.dispatch({
          type: Types.SET_IMAGES_SUCCESS,
          payload: {
            images: [...copiedArr],
          },
        });
      }
    }

    //try catch ends......
  }; //.......................Handle FileUpload One Ends...
  //
  //
  //
  const handleFileUploadTwo = async (event) => {
    const file = event.target.files[0];
    const filename = event.target.files[0].name;
    const copiedArr = [...props.state.images];
    copiedArr[1].file = file;
    copiedArr[1].filename = filename;
    copiedArr[1].message = filename;
    props.dispatch({
      type: Types.SET_IMAGES_SUCCESS,
      payload: {
        images: [...copiedArr],
      },
    });

    var bodyFormData = new FormData();
    bodyFormData.append("fileTwo", file);

    try {
      const res = await axios.post(
        AppConsts.server + "/vendor/upload/two",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-eptoken-vendor": token_RP,
          },
          onUploadProgress: (ProgressEvent) => {
            handleProgressFileTwo(
              parseInt(
                Math.round(ProgressEvent.loaded * 100) / ProgressEvent.total
              )
            );
          },
        }
      );
      if (res) {
        const serverfilename = res.data.serverfilename;
        const copiedArr = [...props.state.images];
        copiedArr[1].serverfilename = serverfilename;
        copiedArr[1].isError = false;
        copiedArr[1].message = "Uploaded";
        props.dispatch({
          type: Types.SET_IMAGES_SUCCESS,
          payload: {
            images: [...copiedArr],
          },
        });
      }
    } catch (err) {
      if (err.response) {
        const copiedArr = [...props.state.images];
        copiedArr[1].serverfilename = null;
        copiedArr[1].isError = true;
        copiedArr[1].message = err.response.data.errorMessage;
        props.dispatch({
          type: Types.SET_IMAGES_SUCCESS,
          payload: {
            images: [...copiedArr],
          },
        });
      } else {
        const copiedArr = [...props.state.images];
        copiedArr[1].serverfilename = null;
        copiedArr[1].isError = true;
        copiedArr[1].message = err.message;
        props.dispatch({
          type: Types.SET_IMAGES_SUCCESS,
          payload: {
            images: [...copiedArr],
          },
        });
      }
    }

    //try catch ends......
  }; //.......................Handle FileUpload Two Ends...
  //
  //
  //
  const handleFileUploadThree = async (event) => {
    const file = event.target.files[0];
    const filename = event.target.files[0].name;
    const copiedArr = [...props.state.images];
    copiedArr[2].file = file;
    copiedArr[2].filename = filename;
    copiedArr[2].message = filename;
    props.dispatch({
      type: Types.SET_IMAGES_SUCCESS,
      payload: {
        images: [...copiedArr],
      },
    });

    var bodyFormData = new FormData();
    bodyFormData.append("fileThree", file);

    try {
      const res = await axios.post(
        AppConsts.server + "/vendor/upload/three",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-eptoken-vendor": token_RP,
          },
          onUploadProgress: (ProgressEvent) => {
            handleProgressFileThree(
              parseInt(
                Math.round(ProgressEvent.loaded * 100) / ProgressEvent.total
              )
            );
          },
        }
      );
      if (res) {
        const serverfilename = res.data.serverfilename;
        const copiedArr = [...props.state.images];
        copiedArr[2].serverfilename = serverfilename;
        copiedArr[2].isError = false;
        copiedArr[2].message = "Uploaded";
        props.dispatch({
          type: Types.SET_IMAGES_SUCCESS,
          payload: {
            images: [...copiedArr],
          },
        });
      }
    } catch (err) {
      if (err.response) {
        const copiedArr = [...props.state.images];
        copiedArr[2].serverfilename = null;
        copiedArr[2].isError = true;
        copiedArr[2].message = err.response.data.errorMessage;
        props.dispatch({
          type: Types.SET_IMAGES_SUCCESS,
          payload: {
            images: [...copiedArr],
          },
        });
      } else {
        const copiedArr = [...props.state.images];
        copiedArr[2].serverfilename = null;
        copiedArr[2].isError = true;
        copiedArr[2].message = err.message;
        props.dispatch({
          type: Types.SET_IMAGES_SUCCESS,
          payload: {
            images: [...copiedArr],
          },
        });
      }
    }

    //try catch ends......
  }; //.......................Handle FileUpload Three Ends...

  const handleFileUploadFour = async (event) => {
    const file = event.target.files[0];
    const filename = event.target.files[0].name;
    const copiedArr = [...props.state.images];
    copiedArr[3].file = file;
    copiedArr[3].filename = filename;
    copiedArr[3].message = filename;
    props.dispatch({
      type: Types.SET_IMAGES_SUCCESS,
      payload: {
        images: [...copiedArr],
      },
    });

    var bodyFormData = new FormData();
    bodyFormData.append("fileFour", file);

    try {
      const res = await axios.post(
        AppConsts.server + "/vendor/upload/four",
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-eptoken-vendor": token_RP,
          },
          onUploadProgress: (ProgressEvent) => {
            handleProgressFileFour(
              parseInt(
                Math.round(ProgressEvent.loaded * 100) / ProgressEvent.total
              )
            );
          },
        }
      );
      if (res) {
        const serverfilename = res.data.serverfilename;
        const copiedArr = [...props.state.images];
        copiedArr[3].serverfilename = serverfilename;
        copiedArr[3].isError = false;
        copiedArr[3].message = "Uploaded";
        props.dispatch({
          type: Types.SET_IMAGES_SUCCESS,
          payload: {
            images: [...copiedArr],
          },
        });
      }
    } catch (err) {
      if (err.response) {
        const copiedArr = [...props.state.images];
        copiedArr[3].serverfilename = null;
        copiedArr[3].isError = true;
        copiedArr[3].message = err.response.data.errorMessage;
        props.dispatch({
          type: Types.SET_IMAGES_SUCCESS,
          payload: {
            images: [...copiedArr],
          },
        });
      } else {
        const copiedArr = [...props.state.images];
        copiedArr[3].serverfilename = null;
        copiedArr[3].isError = true;
        copiedArr[3].message = err.message;
        props.dispatch({
          type: Types.SET_IMAGES_SUCCESS,
          payload: {
            images: [...copiedArr],
          },
        });
      }
    }

    //try catch ends......
  }; //.......................Handle FileUpload Four Ends...

  const handleProgressFileOne = (progress) => {
    const copiedArr = [...props.state.images];
    copiedArr[0].progress = progress;
    props.dispatch({
      type: Types.SET_IMAGES_SUCCESS,
      payload: {
        images: [...copiedArr],
      },
    });
  }; //..........................Handle Progress One

  const handleProgressFileTwo = (progress) => {
    const copiedArr = [...props.state.images];
    copiedArr[1].progress = progress;
    props.dispatch({
      type: Types.SET_IMAGES_SUCCESS,
      payload: {
        images: [...copiedArr],
      },
    });
  }; //..........................Handle Progress Two

  const handleProgressFileThree = (progress) => {
    const copiedArr = [...props.state.images];
    copiedArr[2].progress = progress;
    props.dispatch({
      type: Types.SET_IMAGES_SUCCESS,
      payload: {
        images: [...copiedArr],
      },
    });
  }; //..........................Handle Progress Three

  const handleProgressFileFour = (progress) => {
    const copiedArr = [...props.state.images];
    copiedArr[3].progress = progress;
    props.dispatch({
      type: Types.SET_IMAGES_SUCCESS,
      payload: {
        images: [...copiedArr],
      },
    });
  }; //..........................Handle Progress Four

  //return starts...
  return (
    <React.Fragment>
      <Row className={classes.container}>
        <Row className={classes.row}>
          <Row className={classes.title}>
            Please upload product images atLeast 1 required
          </Row>
        </Row>
      </Row>
      <Row className={classes.container}>
        <Row className={classes.repeatRow}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-fileOne"
            multiple
            onChange={handleFileUploadOne}
            type="file"
            style={{
              display: "none",
            }}
          />
          <label htmlFor="contained-button-fileOne">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>

          <Paper
            elevation={8}
            className={
              props.state.images[0].isError ? classes.errorfile : classes.file
            }
          >
            {props.state.images[0].message}
          </Paper>
          <Row className={classes.progressBarRow}>
            <LinearProgress
              variant="determinate"
              value={props.state.images[0].progress}
            />
          </Row>
          <Paper elevation={8} className={classes.imageBox}>
            {props.state.images[0].serverfilename !== null &&
            props.state.images[0].progress === 100 ? (
              <img
                style={{
                  width: "215px",
                  height: "auto",
                }}
                src={`${AppConsts.server}/${props.state.images[0].serverfilename}`}
              />
            ) : null}
          </Paper>
        </Row>
      </Row>
      <Row className={classes.container}>
        <Row className={classes.repeatRow}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-fileTwo"
            multiple
            type="file"
            onChange={handleFileUploadTwo}
            style={{
              display: "none",
            }}
          />
          <label htmlFor="contained-button-fileTwo">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>

          <Paper
            elevation={8}
            className={
              props.state.images[1].isError ? classes.errorfile : classes.file
            }
          >
            {props.state.images[1].message}
          </Paper>
          <Row className={classes.progressBarRow}>
            <LinearProgress
              variant="determinate"
              value={props.state.images[1].progress}
            />
          </Row>
          <Paper elevation={8} className={classes.imageBox}>
            {props.state.images[1].serverfilename !== null &&
            props.state.images[1].progress === 100 ? (
              <img
                style={{
                  width: "215px",
                  height: "auto",
                }}
                src={`${AppConsts.server}/${props.state.images[1].serverfilename}`}
              />
            ) : null}
          </Paper>
        </Row>
      </Row>
      <Row className={classes.container}>
        <Row className={classes.repeatRow}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-fileThree"
            multiple
            type="file"
            onChange={handleFileUploadThree}
            style={{
              display: "none",
            }}
          />
          <label htmlFor="contained-button-fileThree">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>

          <Paper
            elevation={8}
            className={
              props.state.images[2].isError ? classes.errorfile : classes.file
            }
          >
            {props.state.images[2].message}
          </Paper>
          <Row className={classes.progressBarRow}>
            <LinearProgress
              variant="determinate"
              value={props.state.images[2].progress}
            />
          </Row>
          <Paper elevation={8} className={classes.imageBox}>
            {props.state.images[2].serverfilename !== null &&
            props.state.images[2].progress === 100 ? (
              <img
                style={{
                  width: "215px",
                  height: "auto",
                }}
                src={`${AppConsts.server}/${props.state.images[2].serverfilename}`}
              />
            ) : null}
          </Paper>
        </Row>
      </Row>
      <Row className={classes.container}>
        <Row className={classes.repeatRow}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-fileFour"
            multiple
            type="file"
            onChange={handleFileUploadFour}
            style={{
              display: "none",
            }}
          />
          <label htmlFor="contained-button-fileFour">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>

          <Paper
            elevation={8}
            className={
              props.state.images[3].isError ? classes.errorfile : classes.file
            }
          >
            {props.state.images[3].message}
          </Paper>
          <Row className={classes.progressBarRow}>
            <LinearProgress
              variant="determinate"
              value={props.state.images[3].progress}
            />
          </Row>
          <Paper elevation={8} className={classes.imageBox}>
            {props.state.images[3].serverfilename !== null &&
            props.state.images[3].progress === 100 ? (
              <img
                style={{
                  width: "215px",
                  height: "auto",
                }}
                src={`${AppConsts.server}/${props.state.images[3].serverfilename}`}
              />
            ) : null}
          </Paper>
        </Row>
      </Row>

      <Row className={classes.nextcontainer}>
        <Row className={classes.nextrow}>
          <Button
            onClick={() => {
              props.setActiveState(0);
            }}
            variant="contained"
            color="secondary"
          >
            Back
          </Button>
          <Button onClick={handleMoveNext} variant="contained" color="primary">
            Next ->
          </Button>
        </Row>
      </Row>
    </React.Fragment>
  );
  //return ends.....
}; //.......................

export default StepTwo;
