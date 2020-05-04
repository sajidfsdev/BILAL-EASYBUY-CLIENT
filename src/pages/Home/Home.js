import React from "react";
import useStyles from "./Home.styles";
import AppBar from "./../../Components/Home/AppBar/AppBar";
import Menubar from "./../../Components/Home/Menubar/Menubar";
import Row from "./../../UI/Row/ELXRow";
import Cover from "./../../Components/Home/Cover/Cover";
import FeaturedProducts from "./../../Components/Home/FeaturedProducts/FeaturedProducts";
import HowItWorks from "./../../Components/Home/HowItWorks/HowItWorks";
import Statistics from "./../../Components/Home/Statistics/Statistics";
import ContactUs from "./../../Components/Home/Contactus/Contactus";
import MissionStatement from "./../../Components/Home/Mission/Mission";
import Footer from "./../../Components/Home/Footer/Footer";

const Home = (props) => {
  //styles starts....
  const classes = useStyles();
  //return starts...
  return (
    <React.Fragment>
      <AppBar />

      <Menubar />

      <Cover />

      <FeaturedProducts />

      <HowItWorks />

      <Statistics />

      <MissionStatement />

      <ContactUs />

      <Footer />
    </React.Fragment>
  );
  //return ends.....
}; //...................

export default Home;
