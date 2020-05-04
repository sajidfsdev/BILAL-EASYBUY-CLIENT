import React, { useState, useEffect } from "react";
import useStyles from "./FeaturedProducts.styles";
import Row from "./../../../UI/Row/ELXRow";
import GridList from "./../../../UI/HorizontalList/HorizontalList";
import CircularProgressBar from "./../../../UI/CircularProgressBar/CircularProgressBar";
import ErrorScreen from "./../../../Reusable/ErrorScreen";
import { useSelector, useDispatch } from "react-redux";
import * as Actions from "./../../../Store/Action/bulk";
import * as Types from "./../../../Store/Constants/bulk";

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
    bulk.forEach((elem, index) => {
      if (index < 5) {
        prods.push(elem);
      }
    });
    setProducts([...prods]);
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
