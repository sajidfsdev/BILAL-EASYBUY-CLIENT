import React from "react";
import useStyles from "./Home.styles";
import AppBar from "./../../Components/Home/AppBar/AppBar";
import Menubar from "./../../Components/Home/Menubar/Menubar";
import Row from "./../../UI/Row/ELXRow";
import Cover from "./../../Components/Home/Cover/Cover";
import FeaturedProducts from "./../../Components/Home/FeaturedProducts/FeaturedProducts";

const Home = props => {
  //styles starts....
  const classes = useStyles();
  //return starts...
  return (
    <React.Fragment>
      {/* AppBar Starts.... */}
      <AppBar />
      {/* AppBar Ends...... */}

      {/* Menu Bar Starts ... */}
      <Menubar />
      {/*  Menu Bar Ends .... */}

      {/* Banner Area Starts... */}
      <Cover />
      {/* Banner Area Ends..... */}

      {/* Featured Products..... */}
      <FeaturedProducts />
      {/* Featured Products ends.. */}
    </React.Fragment>
  );
  //return ends.....
}; //...................

export default Home;
