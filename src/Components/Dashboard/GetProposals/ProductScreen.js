import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DetailsScreen from "./DetailsScreen";
import Row from "./../../../UI/Row/ELXRow";

const useStyles = makeStyles((theme) => ({}));

const ProductScreen = (props) => {
  //styles init...
  const classes = useStyles();

  const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let product = null;
    props.data.forEach((element) => {
      if (element.productId._id == props.productId) {
        product = element.productId;
      }
    });
    setProductInfo(product);
    setLoading(false);
  }, []);

  return (
    <React.Fragment>
      {loading ? <div>Loading....</div> : <DetailsScreen data={productInfo} />}
    </React.Fragment>
  );
}; //...........................

export default ProductScreen;
