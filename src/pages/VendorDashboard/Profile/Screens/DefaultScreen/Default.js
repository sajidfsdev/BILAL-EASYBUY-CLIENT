import React, { useState } from "react";
import Row from "./../../../../../UI/Row/ELXRow";
import DraggableDialogue from "./../../../../../UI/DraggableDialogue/DraggableDialogue";
import Input from "./../../../../../UI/Input/Input";
import Button from "./../../../../../UI/Button/ELXButton";
import Table from "./../../../../../Reusable/Table";
import TableRow from "./../../../../../Reusable/TableRow";
import TableCell from "./../../../../../Reusable/TableCell";
import EditIcon from "@material-ui/icons/Edit";
import * as constants from "./../../constants";
import { iconStyling } from "./../../../../../commonStyles/commonStyles";
import Spinner from "./../../../../../UI/CircularProgressBar/CircularProgressBar";
import useStyles from "./Deafult.styles";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../../../../Store/Action/vendorProfile";
import * as Types from "./../../../../../Store/Constants/vendorProfile";
import Cities from "./../../../../HomeSubPages/Products/cities";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Validators from "./../../../../../Utils/Methods/validation";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useSnackbar } from "notistack";
import Tooltip from "@material-ui/core/Tooltip";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import AppConst from "./../../../../../Constants/Strings";

//Variables...
let currentField = "";

const Default = (props) => {
  //styes init

  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();
  const iconClass = iconStyling();
  const [openDialogue, setOpenDialogue] = useState(false);
  const [dialogueTitle, setDialogueTitle] = useState("");
  const [firstinputValue, setFirstInputValue] = useState("");
  const [passwordEditing, setPasswordEditting] = useState(false);
  const [contactEditing, setContactEditing] = useState(false);
  const [cityEditing, setCityEditing] = useState(false);
  const [addressEditing, setAddressEditing] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [hibernateDialogue, setHibernateDialogue] = useState(false);
  const [hibernateBufferring, setHibernateBufferring] = useState(false);
  //Redux...
  const editBufferring_RP = useSelector(
    (state) => state.vendorProfile.editBufferring
  );
  const isEditError_RP = useSelector(
    (state) => state.vendorProfile.isEditError
  );
  const editErrorMessage_RP = useSelector(
    (state) => state.vendorProfile.editErrorMessage
  );
  const openDialogue_RP = useSelector(
    (state) => state.vendorProfile.openDialogue
  );
  const token_RP = useSelector((state) => state.auth.token);
  const dispatch_RP = useDispatch();

  const handleShowSnackBar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  //Methods......
  const setHibernateStatus = async (status) => {
    setHibernateBufferring(true);
    setHibernateDialogue(false);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-vendor": token_RP,
      },
    };

    const body = JSON.stringify({ hibernate: status });

    try {
      const res = await axios.post(
        AppConst.server + "/vendor/auth/hibernate",
        body,
        config
      );

      if (res) {
        handleShowSnackBar("Account status changed successfully", "success");
        setHibernateDialogue(false);
        setHibernateBufferring(false);
        props.refresh();
      } else {
        handleShowSnackBar("Network Error Has Occurred", "error");
        setHibernateDialogue(false);
        setHibernateBufferring(false);
      }
    } catch (err) {
      if (err.response) {
        handleShowSnackBar(err.response.data.errorMessage, "error");
        setHibernateDialogue(false);
        setHibernateBufferring(false);
      } else {
        handleShowSnackBar(err.message, "error");
        setHibernateDialogue(false);
        setHibernateBufferring(false);
      }
    }
  }; //.................set Hibernate status

  const handleEditing = () => {
    if (currentField == constants.EDIT_NAME) {
      if (firstinputValue === "") return;
      dispatch_RP({ type: Types.START_EDIT_BUFFERRING });
      dispatch_RP(
        Actions.handleEditProfileData(
          {
            name: firstinputValue.toUpperCase(),
            email: props.data.email,
            contact: props.data.contact,
            city: props.data.city,
            address: props.data.address,
            title: props.data.title,
          },
          token_RP
        )
      );
    } else if (currentField === constants.EDIT_EMAIL) {
      if (firstinputValue === "") return;
      if (!Validators.isEmail(firstinputValue)) {
        return handleShowSnackBar("Email Pattern Not Matched", "error");
      }
      dispatch_RP({ type: Types.START_EDIT_BUFFERRING });
      dispatch_RP(
        Actions.handleEditProfileData(
          {
            name: props.data.name,
            email: firstinputValue,
            contact: props.data.contact,
            city: props.data.city,
            address: props.data.address,
            title: props.data.title,
          },
          token_RP
        )
      );
    } else if (currentField === constants.EDIT_CONTACT) {
      if (firstinputValue === "") return;
      if (!Validators.isMobile(firstinputValue)) {
        return handleShowSnackBar(
          "Contact Number Does Not Match With Pattern",
          "error"
        );
      }
      dispatch_RP({ type: Types.START_EDIT_BUFFERRING });
      dispatch_RP(
        Actions.handleEditProfileData(
          {
            name: props.data.name,
            email: props.data.email,
            contact: firstinputValue,
            city: props.data.city,
            address: props.data.address,
            title: props.data.title,
          },
          token_RP
        )
      );
    } else if (currentField === constants.EDIT_CITY) {
      if (firstinputValue === "") return;
      dispatch_RP({ type: Types.START_EDIT_BUFFERRING });
      dispatch_RP(
        Actions.handleEditProfileData(
          {
            name: props.data.name,
            email: props.data.email,
            contact: props.data.contact,
            city: firstinputValue.toUpperCase(),
            address: props.data.address,
            title: props.data.title,
          },
          token_RP
        )
      );
    } else if (currentField === constants.EDIT_ADDRESS) {
      if (firstinputValue === "") return;
      dispatch_RP({ type: Types.START_EDIT_BUFFERRING });
      dispatch_RP(
        Actions.handleEditProfileData(
          {
            name: props.data.name,
            email: props.data.email,
            contact: props.data.contact,
            city: props.data.city,
            address: firstinputValue,
            title: props.data.title,
          },
          token_RP
        )
      );
    } else if (currentField === constants.EDIT_TITLE) {
      if (firstinputValue === "") return;
      dispatch_RP({ type: Types.START_EDIT_BUFFERRING });
      dispatch_RP(
        Actions.handleEditProfileData(
          {
            name: props.data.name,
            email: props.data.email,
            contact: props.data.contact,
            city: props.data.city,
            address: props.data.address,
            title: firstinputValue.toUpperCase(),
          },
          token_RP
        )
      );
    } else if (currentField === constants.EDIT_PASSWORD) {
      if (oldPassword === "" || newPassword === "" || confirmNewPassword === "")
        return;
      if (newPassword !== confirmNewPassword) {
        return dispatch_RP({
          type: Types.EDITING_FAILED,
          payload: { errorMessage: "New and confirm password did not match" },
        });
      }

      dispatch_RP({ type: Types.START_EDIT_BUFFERRING });
      dispatch_RP(
        Actions.handleEditPassword(oldPassword, newPassword, token_RP)
      );
    }
  }; //.......................Handle Editing

  const handleOpenDialogue = (fieldtype) => {
    switch (fieldtype) {
      case constants.EDIT_NAME:
        setDialogueTitle("Edit Your Name");
        currentField = constants.EDIT_NAME;
        setFirstInputValue(props.data.name);
        setPasswordEditting(false);
        setContactEditing(false);
        setCityEditing(false);
        setAddressEditing(false);

        dispatch_RP({ type: Types.OPEN_DIALOGUE });
        break;

      case constants.EDIT_TITLE:
        setDialogueTitle("Edit Your Shop Title");
        currentField = constants.EDIT_TITLE;
        setFirstInputValue(props.data.title);
        setPasswordEditting(false);
        setContactEditing(false);
        setCityEditing(false);
        setAddressEditing(false);

        dispatch_RP({ type: Types.OPEN_DIALOGUE });
        break;

      case constants.EDIT_ADDRESS:
        setDialogueTitle("Edit Your Shop Address");
        currentField = constants.EDIT_ADDRESS;
        setFirstInputValue(props.data.address);
        setPasswordEditting(false);
        setContactEditing(false);
        setCityEditing(false);
        setAddressEditing(true);
        dispatch_RP({ type: Types.OPEN_DIALOGUE });
        break;

      case constants.EDIT_EMAIL:
        setDialogueTitle("Edit Your Email");
        setFirstInputValue(props.data.email);
        currentField = constants.EDIT_EMAIL;
        setPasswordEditting(false);
        setContactEditing(false);
        setCityEditing(false);
        setAddressEditing(false);

        dispatch_RP({ type: Types.OPEN_DIALOGUE });
        break;

      case constants.EDIT_CONTACT:
        setDialogueTitle("Edit Your Contact");
        setFirstInputValue(props.data.contact);
        currentField = constants.EDIT_CONTACT;
        setPasswordEditting(false);
        setContactEditing(true);
        setAddressEditing(false);

        setCityEditing(false);

        dispatch_RP({ type: Types.OPEN_DIALOGUE });
        break;

      case constants.EDIT_CITY:
        setDialogueTitle("Edit Your City");
        setFirstInputValue(props.data.contact);
        currentField = constants.EDIT_CITY;
        setPasswordEditting(false);
        setContactEditing(false);
        setCityEditing(true);
        setAddressEditing(false);

        dispatch_RP({ type: Types.OPEN_DIALOGUE });
        break;

      case constants.EDIT_PASSWORD:
        setDialogueTitle("Update your password");
        currentField = constants.EDIT_PASSWORD;
        setPasswordEditting(true);
        setContactEditing(false);
        setCityEditing(false);
        setAddressEditing(false);

        dispatch_RP({ type: Types.OPEN_DIALOGUE });
        break;
    }
  }; //................................Handle open Dialogue

  const handleCloseDialogue = () => {
    if (editBufferring_RP) return;
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setFirstInputValue("");
    dispatch_RP({ type: Types.RESET_EDIT });
  };

  return (
    <React.Fragment>
      <Row className={classes.margin}>
        <Row className={classes.hibernateRow}>
          {hibernateBufferring ? (
            <CircularProgress size={30} color="secondary" />
          ) : props.data.hibernate ? (
            <Tooltip placement={"top"} title="Activate Account">
              <AddCircleIcon
                onClick={() => setHibernateDialogue(true)}
                className={classes.hibernateIcon}
              />
            </Tooltip>
          ) : (
            <Tooltip placement={"top"} title="Hibernate Account">
              <RemoveCircleIcon
                onClick={() => setHibernateDialogue(true)}
                className={classes.hibernateIcon}
              />
            </Tooltip>
          )}
        </Row>
      </Row>
      <Table headings={["Title", "Current Value", "Edit"]}>
        <TableRow>
          <TableCell align="center">Name</TableCell>
          <TableCell align="left">{props.data.name}</TableCell>
          <TableCell align="center">
            <EditIcon
              onClick={handleOpenDialogue.bind(this, constants.EDIT_NAME)}
              className={iconClass.icon}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="center">Email</TableCell>
          <TableCell align="left">{props.data.email}</TableCell>
          <TableCell align="center">
            <EditIcon
              onClick={handleOpenDialogue.bind(this, constants.EDIT_EMAIL)}
              className={iconClass.icon}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="center">Contact</TableCell>
          <TableCell align="left">{props.data.contact}</TableCell>
          <TableCell align="center">
            <EditIcon
              onClick={handleOpenDialogue.bind(this, constants.EDIT_CONTACT)}
              className={iconClass.icon}
            />
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell align="center">City</TableCell>
          <TableCell align="left">{props.data.city}</TableCell>
          <TableCell align="center">
            <EditIcon
              onClick={handleOpenDialogue.bind(this, constants.EDIT_CITY)}
              className={iconClass.icon}
            />
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell align="center">Shop Title</TableCell>
          <TableCell align="left">{props.data.title}</TableCell>
          <TableCell align="center">
            <EditIcon
              onClick={handleOpenDialogue.bind(this, constants.EDIT_TITLE)}
              className={iconClass.icon}
            />
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell align="center">Shop Address</TableCell>
          <TableCell align="left">{props.data.address}</TableCell>
          <TableCell align="center">
            <EditIcon
              onClick={handleOpenDialogue.bind(this, constants.EDIT_ADDRESS)}
              className={iconClass.icon}
            />
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell align="center">Password</TableCell>
          <TableCell align="left">XXX.......</TableCell>
          <TableCell align="center">
            <EditIcon
              onClick={handleOpenDialogue.bind(this, constants.EDIT_PASSWORD)}
              className={iconClass.icon}
            />
          </TableCell>
        </TableRow>
      </Table>

      {/* Dialogue Box starts... */}
      <DraggableDialogue
        open={openDialogue_RP}
        title={dialogueTitle}
        handleClose={handleCloseDialogue}
      >
        {addressEditing ? (
          <React.Fragment>
            <Row className={classes.inputRow}>
              <TextareaAutosize
                aria-label="empty textarea"
                value={firstinputValue}
                className={classes.textArea}
                onChange={(event) => setFirstInputValue(event.target.value)}
              />
            </Row>
          </React.Fragment>
        ) : cityEditing ? (
          <React.Fragment>
            <Row className={classes.inputRow}>
              <Autocomplete
                id="combo-box-cat"
                options={[...Cities.cities]}
                getOptionLabel={(option) => option}
                onChange={(event, value) => {
                  setFirstInputValue(value);
                }}
                className={classes.input}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Cities"
                    // error={state.isCityError}
                    // helperText={state.cityErrorMessage}
                    variant="outlined"
                  />
                )}
              />
            </Row>
          </React.Fragment>
        ) : contactEditing ? (
          <React.Fragment>
            <Row className={classes.inputRow}>
              <Input
                type="number"
                value={firstinputValue}
                className={classes.input}
                onChange={(event) => setFirstInputValue(event.target.value)}
              />
            </Row>
          </React.Fragment>
        ) : passwordEditing ? (
          <React.Fragment>
            <Row className={classes.inputRow}>
              <Input
                type="password"
                label="Current Password"
                value={oldPassword}
                className={classes.input}
                onChange={(event) => setOldPassword(event.target.value)}
              />
            </Row>
            <Row className={classes.inputRow}>
              <Input
                type="password"
                label="New Password"
                value={newPassword}
                className={classes.input}
                onChange={(event) => setNewPassword(event.target.value)}
              />
            </Row>
            <Row className={classes.inputRow}>
              <Input
                type="password"
                label="confirm new password"
                value={confirmNewPassword}
                className={classes.input}
                onChange={(event) => setConfirmNewPassword(event.target.value)}
              />
            </Row>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Row className={classes.inputRow}>
              <Input
                type="text"
                value={firstinputValue}
                className={classes.input}
                onChange={(event) => setFirstInputValue(event.target.value)}
              />
            </Row>
          </React.Fragment>
        )}
        <React.Fragment>
          {isEditError_RP ? (
            <Row className={classes.errorRow}>{editErrorMessage_RP}</Row>
          ) : null}

          <Row className={classes.btnRow}>
            <Button
              onClick={handleEditing}
              disabled={editBufferring_RP ? true : false}
              color="primary"
            >
              {editBufferring_RP ? (
                <Spinner className={classes.spinner} />
              ) : (
                "Edit"
              )}
            </Button>
          </Row>
        </React.Fragment>
      </DraggableDialogue>
      {/* Dialogue Box Ends..... */}

      {/* Hibernate dialogue starts.... */}
      <DraggableDialogue
        open={hibernateDialogue}
        title={
          props.data.hibernate
            ? "Are you sure you want to activate your account"
            : "Are you sure you want to Hibernate your account"
        }
        handleClose={() => setHibernateDialogue(false)}
      >
        <Row className={classes.hbBtnRow}>
          <Button
            onClick={() => setHibernateDialogue(false)}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={
              props.data.hibernate
                ? setHibernateStatus.bind(this, false)
                : setHibernateStatus.bind(this, true)
            }
            color="primary"
            variant="contained"
          >
            OK
          </Button>
        </Row>
      </DraggableDialogue>
      {/* Hibernate dialogue ends...... */}
    </React.Fragment>
  );
}; //.......................Deafult Screen

export default Default;
