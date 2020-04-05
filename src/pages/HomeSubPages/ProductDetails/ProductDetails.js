import React, { useEffect, useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import Row from "./../../../UI/Row/ELXRow";
import AppBar from "./../../../Components/Home/AppBar/AppBar";
import MenuBar from "./../../../Components/Home/Menubar/Menubar";
import Footer from "./../../../Components/Home/Footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./ProductDetails.styles";
import SuccessScreen from "./../../../Components/Home_ProductDetails/SuccessScreen/SuccessScreen";
import { CircularProgress } from "@material-ui/core";

const ProductDetails = props => {
  //state management...
  const bulk_RP = useSelector(state => state.bulk.bulk);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    const id = props.match.params.id;

    const filteredProduct = bulk_RP.filter(elem => elem._id == id);
    if (filteredProduct.length === 0) {
      return props.history.push("/");
    }
    setProduct(filteredProduct[0]);
  }, []);
  //classes init...
  const classes = useStyles();
  //return starts...
  return (
    <React.Fragment>
      <AppBar />
      <MenuBar />
      {product === null ? (
        <Row className={classes.loading}>
          <CircularProgress size={30} color="secondary" />
        </Row>
      ) : (
        <SuccessScreen state={product} />
      )}
      <Footer />
    </React.Fragment>
  );
  //return ends....
}; //............................

export default withRouter(ProductDetails);
