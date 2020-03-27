import React, { useState, useEffect } from "react";
import Row from "./../../../UI/Row/ELXRow";
import Paper from "./../../../UI/Paper/Paper";
import HorizontalList from "./../../../UI/HorizontalList/HorizontalList";
import CircularProgressBar from "./../../../UI/CircularProgressBar/CircularProgressBar";
import useStyles from "./DefaultScreen.styles";

const DefaultScreen = props => {
  const classes = useStyles();

  //state management...
  const [cats, setCats] = useState([]);
  const [catsData, setCatsData] = useState([]);
  const [allSet, setAllSet] = useState(false);

  //Methods....
  useEffect(() => {
    setAllSet(false);
    let catsHeading = [];
    let catsBulk = [];
    props.bulk.forEach(elem => {
      if (catsHeading.length === 0) {
        catsHeading.push(elem.cat);
        catsBulk.push({
          bulk: [elem]
        });
      } else {
        let present = false;
        let index = 0;

        catsHeading.forEach((cat, ind) => {
          if (cat == elem.cat) {
            present = true;
            index = ind;
          }
        });
        if (present === false) {
          catsHeading.push(elem.cat);
          catsBulk.push({
            bulk: [elem]
          });
        } else {
          catsBulk[index].bulk.push(elem);
        }
      }
    });
    setCats([...catsHeading]);
    setCatsData([...catsBulk]);
    setAllSet(true);
  }, [props.bulk]);

  //return starts...
  return (
    <React.Fragment>
      <Row className={classes.container}>
        {allSet ? (
          <Paper elevation={5} className={classes.subContainer}>
            {cats.map((category, index) => (
              <React.Fragment key={index}>
                <Row className={classes.title}>{category}</Row>

                <Row className={classes.screenRow}>
                  <Row className={classes.screen}>
                    <HorizontalList products={catsData[index].bulk} />
                  </Row>
                </Row>
              </React.Fragment>
            ))}
          </Paper>
        ) : (
          <CircularProgressBar color="secondary" size={60} />
        )}
      </Row>
    </React.Fragment>
  );
  //return ends.....
}; //...........................

export default DefaultScreen;
