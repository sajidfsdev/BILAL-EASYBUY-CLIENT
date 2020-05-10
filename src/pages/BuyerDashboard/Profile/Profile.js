import React, { useState, useEffect } from "react";
import Row from "./../../../UI/Row/ELXRow";
import * as constants from "./constants";
import useStyles from "./Profile.styles";
import {
  containerStyles,
  marginStyling,
} from "./../../../commonStyles/commonStyles";
import LoadingScreen from "./../../../Reusable/LoadingScreen";
import DefaultScreen from "./Screens/DefaultScreen/Default";
import ErrorScreen from "./../../../Reusable/ErrorScreen";
import { useSelector, useDispatch } from "react-redux";
import * as Action from "./../../../Store/Action/buyerProfile";
import * as Types from "./../../../Store/Constants/buyerProfile";

const Profile = (props) => {
  const classes = useStyles();
  const containerClass = containerStyles("90%");
  const marginClass = marginStyling("15px");
  const [screen, setScreen] = useState(constants.LOADING_SCREEN); //LOADING, ERROR, DEFAULT
  //Redux...
  const dispatch_RP = useDispatch();
  const profile_RP = useSelector((state) => state.buyerProfile.profile);
  const loaded_RP = useSelector((state) => state.buyerProfile.loaded);
  const isError_RP = useSelector((state) => state.buyerProfile.isError);
  const errorMessage_RP = useSelector(
    (state) => state.buyerProfile.errorMessage
  );
  const token_RP = useSelector((state) => state.auth.token);

  //useEffect....
  useEffect(() => {
    if (!loaded_RP || isError_RP) {
      loadProfileData();
    }
  }, []);

  useEffect(() => {
    console.log("Please check the loaded profile info*****");
    console.log("******************************************");
    console.log("*******************************************");
    console.log(profile_RP);
    console.log("*******************************************");
    console.log("****************************************");
  }, [profile_RP]);

  //Methods.........
  const loadProfileData = () => {
    dispatch_RP({ type: Types.START_BUFFERRING });
    dispatch_RP(Action.handleLoadProfileData(token_RP));
  }; //.........................

  // main  GUI ....
  let MainGUI = null;

  if (!loaded_RP) {
    MainGUI = <LoadingScreen title="Loading Profile Info" />;
  } else if (isError_RP) {
    MainGUI = (
      <ErrorScreen
        errorMessage={errorMessage_RP}
        handleReload={loadProfileData}
      />
    );
  } else {
    MainGUI = <DefaultScreen data={profile_RP} />;
  }

  return (
    <React.Fragment>
      <Row className={classes.title}>Manage Profile</Row>
      <Row className={containerClass.container + " " + marginClass.marginTop}>
        <Row className={containerClass.subContainer}>{MainGUI}</Row>
      </Row>
    </React.Fragment>
  );
}; //...................

export default Profile;
