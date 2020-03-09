import React, { useState } from "react";
import useStyles from "./FeaturedProducts.styles";
import Row from "./../../../UI/Row/ELXRow";
import GridList from "./../../../UI/HorizontalList/HorizontalList";

const FeaturedProducts = props => {
  //styles init...
  const classes = useStyles();

  //state....
  const [productsState, setProductsState] = useState([
    {
      title: "Fruit Juicer",
      price: 2300,
      description: "Some regular description",
      installmentPlan: "3 Months"
    },
    {
      title: "Fruit Juicer",
      price: 2300,
      description: "Some regular description",
      installmentPlan: "3 Months"
    },
    {
      title: "Fruit Juicer",
      price: 2300,
      description: "Some regular description",
      installmentPlan: "3 Months"
    },
    {
      title: "Fruit Juicer",
      price: 2300,
      description: "Some regular description",
      installmentPlan: "3 Months"
    }
  ]);
  return (
    <React.Fragment>
      <Row className={classes.container}>
        <Row className={classes.heading}>TOP RATED PRODUCTS</Row>
      </Row>

      <Row className={classes.gridRow}>
        <GridList products={productsState} />
      </Row>
    </React.Fragment>
  );
}; //...............................

export default FeaturedProducts;
