import React, { useEffect, useState } from "react";
import Row from "./../../UI/Row/ELXRow";
import useStyles from "./Statistics.styles";
import { useSelector } from "react-redux";
import AppConsts from "./../../Constants/Strings";
import { useSnackbar } from "notistack";
import axios from "axios";
import LoadingScreen from "./../../Reusable/LoadingScreen";
import ErrorScreen from "./../../Reusable/ErrorScreen";
import BarChart from "./../../Reusable/BarChart/BarChart";
import sorter from "sort-isostring";

//screens consts...
const LOADING_SCREEN = "LOADING_SCREEN";
const ERROR_SCREEN = "ERROR_SCREEN";
const EMPTY_SCREEN = "EMPTY_SCREEN";
const DEFAULT_SCREEN = "DEFAULT_SCREEN";

const Statistics = (props) => {
  const classes = useStyles;

  const [screen, setScreen] = useState(LOADING_SCREEN);
  const [errorMessage, setErrorMessage] = useState("");
  const [chartData, setChartData] = useState([]);
  const token_RP = useSelector((state) => state.auth.token);

  const { enqueueSnackbar } = useSnackbar();

  //use effect starts...
  useEffect(() => {
    handleLoadMyConsignments();
  }, []);

  const handleShowSnackbar = (message, variant) => {
    enqueueSnackbar(message, { variant });
  }; //............................handle show snack Bar

  const handleLoadMyConsignments = async () => {
    setScreen(LOADING_SCREEN);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-eptoken-vendor": token_RP,
      },
    };

    try {
      const res = await axios.get(
        AppConsts.server + "/vendor/consigned/stats",
        config
      );

      if (res) {
        if (res.data.data.length === 0) {
          setScreen(EMPTY_SCREEN);
          return handleShowSnackbar("No Data found", "success");
        }
        setScreen(DEFAULT_SCREEN);
        handleShowSnackbar("Generating Graph...", "success");

        //graph Data starts....
        const data = [];
        console.log("Raw Data ");
        console.log(res.data.data);
        res.data.data.forEach((elem) => {
          //first checking weather downPayment has been payed.
          if (elem.downCheck === true) {
            let isPresent = false;
            let index = 0;
            data.forEach((el, ind) => {
              if (el[0] == elem.downDate) {
                isPresent = true;
                index = ind;
              }
            });
            if (isPresent) {
              data[index][1] =
                parseInt(data[index][1]) +
                parseInt(elem.installmentPlan.downPayment);
            } else {
              data.push([
                elem.downDate,
                parseInt(elem.installmentPlan.downPayment),
              ]);
            }
          } //Mean down Payment payed

          elem.installmentsDates.forEach((installmentDate, idIndex) => {
            if (installmentDate !== "") {
              //First check weather these dates already exists in data.
              let isInstallemntDatePresent = false;
              let installemntDateIndex = 0;

              data.forEach((dataDate, dataDateIndex) => {
                if (dataDate[0] == installmentDate) {
                  isInstallemntDatePresent = true;
                  installemntDateIndex = dataDateIndex;
                }
              });
              if (isInstallemntDatePresent) {
                data[installemntDateIndex][1] =
                  parseInt(data[installemntDateIndex][1]) +
                  parseInt(
                    elem.installmentPlan.installmentPlan[idIndex].installment
                  );
              } else {
                data.push([
                  installmentDate,
                  parseInt(
                    elem.installmentPlan.installmentPlan[idIndex].installment
                  ),
                ]);
              }
            }
          });
        });

        const generatedData = [
          ["Date", "Income generated"],
          ...data.sort((x, y) => sorter(x[0], y[0])),
        ];
        console.log("Beta Version of Data Science");
        console.log(generatedData);
        setChartData(generatedData);
        //graph Data ends.......
      } else {
        setErrorMessage("Failed To Load Stats Data Due To Network Error");
        setScreen(ERROR_SCREEN);
        handleShowSnackbar("Network Error", "error");
      }
    } catch (err) {
      setScreen(ERROR_SCREEN);
      if (err.response) {
        setErrorMessage(err.response.data.errorMessage);
        handleShowSnackbar(err.response.data.errorMessage, "error");
      } else {
        setErrorMessage(err.message);
        handleShowSnackbar(err.message, "error");
      }
    }
  }; //..........................handle get my consignments

  let mainGUI = null;

  if (screen === LOADING_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <LoadingScreen size={50} />
      </React.Fragment>
    );
  } else if (screen === ERROR_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <ErrorScreen
          errorMessage={errorMessage}
          handleReload={handleLoadMyConsignments}
        />
      </React.Fragment>
    );
  } else if (screen === EMPTY_SCREEN) {
    mainGUI = (
      <React.Fragment>
        <ErrorScreen
          errorMessage={"You have yet not Data about consignments"}
          showReloadButton={false}
        />
      </React.Fragment>
    );
  } else {
    mainGUI = (
      <React.Fragment>
        <Row>
          <BarChart
            title="Your Daily Income generated"
            data={chartData}
            subTitle="Dates vs Income"
          />
        </Row>
      </React.Fragment>
    );
  }

  //return starts...
  return (
    <React.Fragment>
      <Row>{mainGUI}</Row>
    </React.Fragment>
  );
  //return ends.....
}; //......................

export default Statistics;
