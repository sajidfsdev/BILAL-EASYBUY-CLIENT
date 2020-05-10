import React, { useState, useEffect } from "react";
import Row from "./../../../UI/Row/ELXRow";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Tooltip from "./../../../UI/Tooltip/Tooltip";
import Dialogue from "./../../../UI/DraggableDialogue/DraggableDialogue";
import Input from "./../../../UI/Input/Input";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Spinner from "./../../../UI/CircularProgressBar/CircularProgressBar";
import { useSelector } from "react-redux";
import axios from "axios";
import AppConsts from "./../../../Constants/Strings";
import { compareAsc, format } from "date-fns";
import { useSnackbar } from "notistack";
import LoadingScreen from "./../../../Reusable/LoadingScreen";
import ErrorScreen from "./../../../Reusable/ErrorScreen";
import Table from "./../../../Reusable/Table";
import TableRow from "./../../../Reusable/TableRow";
import TableCell from "./../../../Reusable/TableCell";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import useStyles from "./Message.styles";

//constants....
const LOADING_SCREEN = "LOADING SCREEN";
const ERROR_SCREEN = "ERROR SCREEN";
const DEFAULT_SCREEN = "DEFAULT SCREEN";

const Messages = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [screen, setScreen] = useState(LOADING_SCREEN);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [inlineSpinner, setInlineSpinner] = useState(false);
  const token_RP = useSelector((state) => state.auth.token);
  const [errorMessage, setErrorMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [repliedMessages, setRepliedMessages] = useState([]);
  const [unrepliedMessages, setUnrepliedMessages] = useState([]);
  const [type, setType] = useState("UNREPLIED");
  const [searchType, setSearchType] = useState("Title");
  const [searchValue, setSearchValue] = useState("");
  const [showDeleteSpinner, setShowDeleteSpinner] = useState([]);

  useEffect(() => {
    handleLoadAllMessages();
  }, []);

  //Methods...

  const handleDeleteMessage = async (_id, index) => {
    setShowDeleteSpinner([
      ...showDeleteSpinner.map((elem, ind) => (ind === index ? true : false)),
    ]);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-vendor": token_RP,
      },
    };

    const body = JSON.stringify({ _id });

    try {
      const res = await axios.post(
        AppConsts.server + "/vendor/message/delete",
        body,
        config
      );

      if (res) {
        setShowDeleteSpinner([...showDeleteSpinner.map((elem) => false)]);
        handleShowSnackBar("Message deleted successfully", "success");
        handleLoadAllMessages();
      } else {
        setShowDeleteSpinner([...showDeleteSpinner.map((elem) => false)]);
        handleShowSnackBar(
          "Failed to delete message due to network error",
          "error"
        );
      }
    } catch (err) {
      setShowDeleteSpinner([...showDeleteSpinner.map((elem) => false)]);
      if (err.response) {
        handleShowSnackBar(err.response.data.errorMessage, "error");
      } else {
        handleShowSnackBar(err.message, "error");
      }
    }
  }; //...................handle delete messages ends

  const handleChangeSearchValue = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    if (searchType === "Title") {
      if (type === "REPLIED") {
        if (value === "") {
          return setRepliedMessages([
            ...messages.filter((elem) => elem.status == "REPLIED"),
          ]);
        }
        setRepliedMessages([
          ...messages.filter(
            (elem) =>
              elem.status === "REPLIED" &&
              elem.title.toUpperCase().search(value.toUpperCase()) > -1
          ),
        ]);
      } else {
        if (value === "") {
          return setUnrepliedMessages([
            ...messages.filter((elem) => elem.status == "PENDING"),
          ]);
        }
        setUnrepliedMessages([
          ...messages.filter(
            (elem) =>
              elem.status === "PENDING" &&
              elem.title.toUpperCase().search(value.toUpperCase()) > -1
          ),
        ]);
      }
    } else if (searchType === "Message") {
      if (type === "REPLIED") {
        if (value === "") {
          return setRepliedMessages([
            ...messages.filter((elem) => elem.status == "REPLIED"),
          ]);
        }
        setRepliedMessages([
          ...messages.filter(
            (elem) =>
              elem.status === "REPLIED" &&
              elem.message.toUpperCase().search(value.toUpperCase()) > -1
          ),
        ]);
      } else {
        if (value === "") {
          return setUnrepliedMessages([
            ...messages.filter((elem) => elem.status == "PENDING"),
          ]);
        }
        setUnrepliedMessages([
          ...messages.filter(
            (elem) =>
              elem.status === "PENDING" &&
              elem.message.toUpperCase().search(value.toUpperCase()) > -1
          ),
        ]);
      }
    } else {
      if (type === "REPLIED") {
        if (value === "") {
          return setRepliedMessages([
            ...messages.filter((elem) => elem.status == "REPLIED"),
          ]);
        }
        setRepliedMessages([
          ...messages.filter(
            (elem) =>
              elem.status === "REPLIED" &&
              elem.date.toUpperCase().search(value.toUpperCase()) > -1
          ),
        ]);
      } else {
        if (value === "") {
          return setUnrepliedMessages([
            ...messages.filter((elem) => elem.status == "PENDING"),
          ]);
        }
        setUnrepliedMessages([
          ...messages.filter(
            (elem) =>
              elem.status === "PENDING" &&
              elem.date.toUpperCase().search(value.toUpperCase()) > -1
          ),
        ]);
      }
    }
  }; //..Handle change search Value

  const handleLoadAllMessages = async () => {
    setScreen(LOADING_SCREEN);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-vendor": token_RP,
      },
    };

    try {
      const res = await axios.get(
        AppConsts.server + "/vendor/message/get",
        config
      );

      if (res) {
        handleShowSnackBar("Messages Loaded With Success", "success");
        setScreen(DEFAULT_SCREEN);
        setMessages([...res.data.data]);
        setRepliedMessages([
          ...res.data.data.filter((elem) => elem.status === "REPLIED"),
        ]);
        setShowDeleteSpinner([
          ...res.data.data
            .filter((elem) => elem.status === "REPLIED")
            .map((elem) => false),
        ]);
        setUnrepliedMessages([
          ...res.data.data.filter((elem) => elem.status === "PENDING"),
        ]);
      } else {
        handleShowSnackBar(
          "Failed To Load Messages Due To Network Error",
          "error"
        );
        setScreen(ERROR_SCREEN);
        setErrorMessage("Failed To Load Messages Due To Network Error");
      }
    } catch (err) {
      if (err.response) {
        handleShowSnackBar(err.response.data.errorMessage, "error");
        setScreen(ERROR_SCREEN);
        setErrorMessage(err.response.data.errorMessage);
      } else {
        handleShowSnackBar(err.message, "error");
        setScreen(ERROR_SCREEN);
        setErrorMessage(err.message);
      }
    }
  }; //...........................Handle Load Messages

  const handleClose = () => {
    if (inlineSpinner) return;
    setOpenDialogue(false);
  }; //.............Handle close..

  const handleShowSnackBar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  //Methods.....
  const handleFormSubmission = async (event) => {
    event.preventDefault();
    setInlineSpinner(true);

    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-vendor": token_RP,
      },
    };
    let d = new Date();
    const date = format(
      new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()),
      "yyyy-MM-dd"
    );

    const body = JSON.stringify({
      title,
      message,
      date,
    });

    try {
      const res = await axios.post(
        AppConsts.server + "/vendor/message/send",
        body,
        config
      );

      if (res) {
        handleShowSnackBar("Message send to Admin Successfully", "success");
        setInlineSpinner(false);
        setOpenDialogue(false);
        setTitle("");
        setMessage("");
        handleLoadAllMessages();
      } else {
        handleShowSnackBar("Network Error Has Occurred", "error");
        setInlineSpinner(false);
      }
    } catch (err) {
      if (err.response) {
        handleShowSnackBar(err.response.data.errorMessage, "error");
        setInlineSpinner(false);
      } else {
        handleShowSnackBar(err.message, "error");
        setInlineSpinner(false);
      }
    }
  }; //...............Handle form submission

  //Main GUI starts.....
  let mainGUI = null;

  if (screen === LOADING_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <LoadingScreen color="secondary" size={60} />
      </React.Fragment>
    );
  } else if (screen === ERROR_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <ErrorScreen
          handleReload={handleLoadAllMessages}
          errorMessage={errorMessage}
        />
      </React.Fragment>
    );
  } else if (screen === DEFAULT_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.searchBar}>
          <Row className={classes.left}>
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
              className={classes.select}
            >
              <option>REPLIED</option>
              <option>UNREPLIED</option>
            </select>
          </Row>

          <Row className={classes.right}>
            <select
              value={searchType}
              onChange={(event) => setSearchType(event.target.value)}
              className={classes.select}
            >
              <option>Title</option>
              <option>Message</option>
              <option>Date</option>
            </select>

            <input
              type="text"
              value={searchValue}
              onChange={handleChangeSearchValue}
              className={classes.select}
              placeholder="Search..."
            />
          </Row>
        </Row>

        <Row className={classes.margin}>
          {type === "UNREPLIED" ? (
            <Table headings={["SR", "Title", "Message", "Date", "Status"]}>
              {unrepliedMessages.map((elem, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{elem.title}</TableCell>
                  <TableCell align="center">{elem.message}</TableCell>
                  <TableCell align="center">{elem.date}</TableCell>
                  <TableCell align="center">{"Pending"}</TableCell>
                </TableRow>
              ))}
            </Table>
          ) : (
            <Table
              headings={[
                "SR",
                "Title",
                "Message",
                "Date",
                "See Reply",
                "Delete",
              ]}
            >
              {repliedMessages.map((elem, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{elem.title}</TableCell>
                  <TableCell align="center">{elem.message}</TableCell>
                  <TableCell align="center">{elem.date}</TableCell>
                  <TableCell align="center">{elem.reply}</TableCell>
                  <TableCell align="center">
                    {showDeleteSpinner[index] ? (
                      <Spinner size={20} color="secondary" />
                    ) : (
                      <DeleteForeverIcon
                        onClick={handleDeleteMessage.bind(
                          this,
                          elem._id,
                          index
                        )}
                        className={classes.deleteIcon}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          )}
        </Row>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Row className={classes.bar}>
        <Row></Row>
        <Row className={classes.title}>Query Admin</Row>
        <Tooltip title="Send New Message">
          <AddCircleIcon
            onClick={() => setOpenDialogue(true)}
            className={classes.icon}
          />
        </Tooltip>
      </Row>

      <Row className={classes.container}>
        <Row className={classes.subContainer}>{mainGUI}</Row>
      </Row>

      {/* Draggable dialogue starts */}
      <Dialogue
        handleClose={handleClose}
        open={openDialogue}
        title="Send New Message"
      >
        <form onSubmit={handleFormSubmission}>
          <Row className={classes.margin}>
            <Input
              type="text"
              required
              label="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className={classes.input}
            />
          </Row>

          <Row className={classes.margin}>
            <TextareaAutosize
              value={message}
              required
              onChange={(event) => setMessage(event.target.value)}
              aria-label="minimum height"
              rowsMin={3}
              placeholder="Write Query"
              className={classes.textArea}
            />
          </Row>

          <Row className={classes.btnRow}>
            {inlineSpinner ? (
              <Button
                disabled={true}
                type="btn"
                variant="contained"
                color="primary"
              >
                <Spinner size={20} color="secondary" />
              </Button>
            ) : (
              <Button type="submit" variant="contained" color="primary">
                Send
              </Button>
            )}
          </Row>
        </form>
      </Dialogue>
    </React.Fragment>
  );
}; //..................Messages

export default Messages;
