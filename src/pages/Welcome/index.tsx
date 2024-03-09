import React from "react";

//Import Components
import Navbar from "./Navbar/Navbar";
import Section from "./HeroSection/Section";
import CardsMini from "./HeroSection/cards-mini";
// import AboutUs from "./AboutUs/about-us";
// import Features from "./Features/features";
import RoadMap from "./RoadMap/road-map";
// import OurTeam from "./Team/our-team";
import Blog from "./OurServices/blog";
// import FAQs from "./Faqs/FAQs";
import Footer from "./Footer/footer";

const Welcome = () => {
  //meta title
  document.title = "KDM Engineers Group | Home";

  return (
    <React.Fragment>
      {/* import navbar */}
      <Navbar />

      {/* Hero section */}
      <Section />

      {/* mini cards */}
      <CardsMini />

      {/* aboutus */}
      {/* <AboutUs /> */}

      {/* features */}
      {/* <Features /> */}

      {/* roadmap */}
      <RoadMap />

      {/* our team */}
      {/* <OurTeam /> */}

      {/* blog */}
      <Blog />

      {/* faqs */}
      {/* <FAQs /> */}

      {/* footer */}
      <Footer />
    </React.Fragment>
  );
};

export default Welcome;
