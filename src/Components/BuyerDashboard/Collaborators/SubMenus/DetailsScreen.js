import React from "react";
import Row from "./../../../../UI/Row/ELXRow";
import useStyles from "./../../../../pages/HomeSubPages/ProductDetails/ProductDetails.styles";
import CompleteDetailsScreen from "./completeDetails";

const DetailsScreen = (props) => {
  const classes = useStyles();

  React.useEffect(() => {
    console.log("******************8");
    console.log(props.data);
    console.log(")))))))))))))))))))");
  }, []);
  //return starts...
  return (
    <React.Fragment>
      <CompleteDetailsScreen data={props.data} />
    </React.Fragment>
  );
  //return ends....
}; //............................

export default DetailsScreen;
