import React, { useState } from "react";
import Row from "./../../../UI/Row/ELXRow";
import useStyles from "./Cover.styles";
// import cover from "./../../../Assets/images/testingSix.jpg";
import cover from "./../../../Assets/images/testingEight.jpg";
import coverOne from "./../../../Assets/images/Covers/one.jpg";
import coverTwo from "./../../../Assets/images/Covers/two.png";
import coverThree from "./../../../Assets/images/Covers/three.jpg";
import coverFour from "./../../../Assets/images/Covers/four.jpg";

let index = 0;
const images = [coverOne, coverThree, coverTwo, coverFour];

const Cover = (props) => {
  //classes init...
  const classes = useStyles();
  const [currentImage, setCurrentImage] = useState(images[index]);

  React.useEffect(() => {
    setInterval(() => {
      if (index == parseInt(images.length) - parseInt(1)) {
        index = 0;
      } else {
        index = index + 1;
      }
      setCurrentImage(images[index]);
    }, 4000);
  }, []);

  //return starts...
  return (
    <Row className={classes.cover}>
      <img src={currentImage} className={classes.image} />
    </Row>
  );
  //return ends.....
}; //....................

export default Cover;
