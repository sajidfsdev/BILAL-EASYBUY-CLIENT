// import React, { useState, useEffect } from "react";
// import useStyles from "./Consigned.styles";
// import Row from "./../../../../UI/Row/ELXRow";
// import { useSelector } from "react-redux";
// import LoadingScreen from "./../../../../Reusable/LoadingScreen";
// import ErrorScreen from "./../../../../Reusable/ErrorScreen";
// import EmptyScreen from "./../../../../Reusable/EmptyScreen";
// import axios from "axios";
// import AppConsts from "./../../../../Constants/Strings";

// //screen consts...
// const LOADING_SCREEN = "LOADINGSCREEN";
// const DEFAULT_SCREEN = "DEFAULTSCREEN";
// const ERROR_SCREEN = "ERRORSCREEN";
// const EMPTYSCREEN = "EMPTYSCREEN";

// const Consigned = (props) => {
//   const classes = useStyles();
//   const [errorMessage, setErrorMessage] = useState("Pending");
//   const [requests, setRequests] = useState([]);
//   const token_RP = useSelector((state) => state.auth.token);
//   const [screen, setScreen] = useState(LOADING_SCREEN);

//   useEffect(() => {
//     handleLoadData();
//   }, []);

//   //................
//   const handleLoadData = async () => {
//     setScreen(LOADING_SCREEN);

//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//         "x-auth-eptoken-vendor": token_RP,
//       },
//     };

//     const body = JSON.stringify({
//       status: "PENDING",
//     });

//     try {
//       const res = await axios.post(
//         AppConsts.server + "/vendor/consigned/get",
//         body,
//         config
//       );
//       if (res) {
//         if (res.data.data.length == 0) {
//           setScreen(EMPTYSCREEN);
//         } else {
//           setRequests([...res.data.data]);
//           setScreen(DEFAULT_SCREEN);
//           console.log("Pending requests");
//           console.log(res.data.data);
//         }
//       } else {
//         setScreen(ERROR_SCREEN);
//         setErrorMessage("Failed To Load Resources Due To Network Error");
//       }
//     } catch (err) {
//       setScreen(ERROR_SCREEN);
//       if (err.response) {
//         setErrorMessage(err.response.data.errorMessage);
//       } else {
//         setErrorMessage(err.message);
//       }
//     }
//   }; //..................handle load data

//   //main GUI starts...
//   let mainGUI = null;
//   if (screen == LOADING_SCREEN) {
//     mainGUI = (
//       <React.Fragment>
//         <LoadingScreen size={40} />
//       </React.Fragment>
//     );
//   } else if (screen == ERROR_SCREEN) {
//     mainGUI = (
//       <React.Fragment>
//         <ErrorScreen errorMessage={errorMessage} />
//       </React.Fragment>
//     );
//   } else if (screen == EMPTYSCREEN) {
//     mainGUI = (
//       <React.Fragment>
//         <EmptyScreen message="Sorry No Requests Exists Against You" />
//       </React.Fragment>
//     );
//   } else if (screen == DEFAULT_SCREEN) {
//     mainGUI = (
//       <React.Fragment>
//         <Row>Default Screen Under Construction</Row>
//       </React.Fragment>
//     );
//   }
//   //main GUI ends.....

//   return (
//     <React.Fragment>
//       <Row className={classes.container}>
//         <Row className={classes.subContainer}>{mainGUI}</Row>
//       </Row>
//     </React.Fragment>
//   );
// }; //.......................

// export default Consigned;
