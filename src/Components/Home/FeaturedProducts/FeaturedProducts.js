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
      title: "HP=Pavilion",
      price: 2300,
      description: "Some regular description",
      installmentPlan: "3 Months",
      downPayment: 1000,
      image: "products/laptops/hpPavilion.png"
    },
    {
      title: "Canon 34A",
      price: 2300,
      downPayment: 1000,
      description: "Some regular description",
      installmentPlan: "3 Months",
      image: "products/camera/canon.png"
    },
    {
      title: "Men-R T-Shirt",
      price: 2300,
      description: "Some regular description",
      installmentPlan: "3 Months",
      downPayment: 1000,
      image: "products/shirt/shirt.png"
    },
    {
      title: "Oxford Shoes",
      price: 2300,
      description: "Some regular description",
      installmentPlan: "3 Months",
      downPayment: 1000,
      image: "products/shoes/shoes.png"
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
