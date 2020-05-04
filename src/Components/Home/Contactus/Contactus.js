import React, { useState } from "react";
import Row from "./../../../UI/Row/ELXRow";
import Input from "./../../../UI/Input/Input";
import useStyles from "./Contactus.styles";
import CircularProgressBar from "./../../../UI/CircularProgressBar/CircularProgressBar";
import axios from "axios";
import AppConsts from "./../../../Constants/Strings";
import { useSnackbar } from "notistack";

const Contactus = (props) => {
  //styles init...
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [spinner, setSpinner] = useState(false);

  //Methods...
  const handleFormSubmission = async (event) => {
    setSpinner(true);
    event.preventDefault();
    const body = JSON.stringify({ name, email, message });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(
        AppConsts.server + "/general/message/send",
        body,
        config
      );
      if (res) {
        setSpinner(false);
        handleShowSnackBar("Message has been sent to Admin", "success");
      } else {
        setSpinner(false);

        handleShowSnackBar(
          "Failed to send Message Due To Network Error",
          "error"
        );
      }
    } catch (err) {
      setSpinner(false);

      if (err.response) {
        handleShowSnackBar(err.response.data.errorMessage, "error");
      } else {
        handleShowSnackBar(err.message, "error");
      }
    }
  }; //.................Handle form submission

  const handleShowSnackBar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  };

  //return starts....
  return (
    <React.Fragment>
      <Row className={classes.container}>
        <Row className={classes.subContainer}>
          <form onSubmit={handleFormSubmission}>
            <Row className={classes.title}>
              <Row className={classes.titleMargin}>Contact Us</Row>
            </Row>
            <Row className={classes.bottomContainer}>
              <Row className={classes.leftArea}>
                <Row className={classes.box}>
                  <Row className={classes.inputRow}>
                    <Input
                      type="text"
                      required
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className={classes.input}
                      placeholder="Name"
                      variant="outlined"
                    />
                  </Row>
                  <Row className={classes.inputRow}>
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className={classes.input}
                      placeholder="Email"
                      variant="outlined"
                    />
                  </Row>
                  <Row className={classes.inputRow}>
                    <Input
                      type="text"
                      required
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      className={classes.input}
                      placeholder="Query"
                      multiline
                      rows="6"
                      variant="outlined"
                    />
                  </Row>
                  <Row className={classes.inputRow}>
                    {spinner ? (
                      <button
                        style={{ cursor: "not-allowed" }}
                        disabled
                        type="btn"
                        className={classes.btn}
                      >
                        Please Wait....
                      </button>
                    ) : (
                      <button type="submit" className={classes.btn}>
                        SUBMIT
                      </button>
                    )}
                  </Row>
                </Row>
              </Row>
              <Row className={classes.rightArea}>
                <Row className={classes.listBox}>
                  <ul>
                    <li>Block # 3 Area 4 staellite Town Islamabad</li>
                    <li>Ph: 051-4576545</li>
                    <li>Ph: 0514546565</li>
                    <li>Mobile: 0336-5544343</li>
                  </ul>
                </Row>
              </Row>
            </Row>
          </form>
        </Row>
      </Row>
    </React.Fragment>
  );
}; //.........................

export default Contactus;
