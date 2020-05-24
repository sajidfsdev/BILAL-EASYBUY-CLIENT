import React, { useState, useEffect } from "react";
import useStyles from "./FeaturedProducts.styles";
import Row from "./../../../UI/Row/ELXRow";
import GridList from "./../../../UI/HorizontalList/HorizontalList";
import CircularProgressBar from "./../../../UI/CircularProgressBar/CircularProgressBar";
import ErrorScreen from "./../../../Reusable/ErrorScreen";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../../Store/Action/bulk";
import * as Types from "./../../../Store/Constants/bulk";
import randomInt from "random-int";

const FeaturedProducts = (props) => {
  //styles init...
  const classes = useStyles();
  const [screen, setScreen] = useState("LOADING"); //LOADING/DEFAULT/ERROR
  const [products, setProducts] = useState([]);
  const bulk = useSelector((state) => state.bulk.bulk);
  const loaded_RP = useSelector((state) => state.bulk.loaded);
  const isError = useSelector((state) => state.bulk.isError);
  const errorMessage = useSelector((state) => state.bulk.errorMessage);
  const dispatch_RP = useDispatch();

  //Methods...
  useEffect(() => {
    dispatch_RP({ type: Types.SIMULATE_LOADING });
    dispatch_RP(Actions.handleGetAllProducts());
  }, []);

  useEffect(() => {
    let prods = [];
    // bulk.forEach((elem, index) => {
    //   if (index < 5) {
    //     prods.push(elem);
    //   }
    // });
    if (bulk.length <= 5) {
      return setProducts([...bulk]);
    } else {
      const bulkLength = bulk.length;
      //window.alert(bulkLength);
      const randomIndexes = [];
      for (let i = 1; i <= 5; i++) {
        let alreadyExist = true;
        while (alreadyExist) {
          let randomIndex = randomInt(0, bulkLength - 1);
          //window.alert(randomIndex);
          if (randomIndexes.findIndex((elem) => elem == randomIndex) >= 0) {
            alreadyExist = true;
            //window.alert("already exists");
          } else {
            //window.alert("pushed");
            randomIndexes.push(randomIndex);
            alreadyExist = false;
          }
        }
      } //for ending

      console.log("Please Plaese Plaese see random Indexes");
      console.log(randomIndexes);

      randomIndexes.forEach((elem) => {
        prods.push(bulk[elem]);
      });
      setProducts([...prods]);
    }
    //setProducts([...prods]);
  }, [bulk]);

  const handleLoadProducts = () => {
    dispatch_RP({ type: Types.SIMULATE_LOADING });
    dispatch_RP(Actions.handleGetAllProducts());
  };

  let mainGUI = null;

  if (!loaded_RP) {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.loadingContainer}>
          <CircularProgressBar size={80} color="secondary" />
        </Row>
      </React.Fragment>
    );
  } else if (isError) {
    mainGUI = (
      <React.Fragment>
        <ErrorScreen
          handleReload={handleLoadProducts}
          errorMessage="Failed to load Top Rated Products Due To Network Error"
        />
      </React.Fragment>
    );
  } else {
    mainGUI = (
      <React.Fragment>
        <Row className={classes.container}>
          <Row className={classes.heading}>TOP RATED PRODUCTS</Row>
        </Row>

        <Row className={classes.gridRow}>
          <GridList products={products} />
        </Row>
      </React.Fragment>
    );
  }

  return <React.Fragment>{mainGUI}</React.Fragment>;
}; //...............................

export default FeaturedProducts;
