import React from "react";
import Cookies from "js-cookie";

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

import { ToastContainer } from "react-toastify";

import {
  Button,
  Col,
  Input,
  Modal,
  ModalHeader,
  Row,
  ModalBody,
  InputGroup,
} from "reactstrap";
import { useState, useEffect } from "react";
import { KDM_ECOMMERCE_USER_JWT_TOKEN } from "common/tokens";

const Welcome = () => {
  //meta title
  document.title = "Home | KDM Engineers Group";

  const [subScribeModal, setSubScribeModal] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      const token = Cookies.get(KDM_ECOMMERCE_USER_JWT_TOKEN);
      setSubScribeModal(token ? false : true);
    }, 2000);
  }, []);

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
      <ToastContainer />
      <Footer />

      {/* subscribe ModalHeader */}
      <Modal
        isOpen={subScribeModal}
        autoFocus={true}
        centered
        toggle={() => {
          setSubScribeModal(!subScribeModal);
        }}
      >
        <div>
          <ModalHeader
            className="border-bottom-0"
            toggle={() => {
              setSubScribeModal(!subScribeModal);
            }}
          />
        </div>
        <ModalBody>
          <div className="text-center mb-4">
            <div className="avatar-md mx-auto mb-4">
              <div className="avatar-title bg-light  rounded-circle text-primary h1">
                <i className="mdi mdi-email-open"></i>
              </div>
            </div>

            <Row className="justify-content-center">
              <Col xl={12}>
                <h4 className="text-primary">
                  Subscribe to Our Newsletter for Updates!
                </h4>
                <p className="text-muted font-size-14 mb-4">
                  Stay ahead with the latest updates and exclusive offers by
                  subscribing to our newsletter. Be the first to know about new
                  arrivals, special promotions, and insightful articles on
                  material testing, including soil, cement, and more. Don't miss
                  out
                </p>
                <p className="text-muted font-size-14 mb-4">
                  subscribe today to elevate your understanding and stay
                  informed!
                </p>

                <InputGroup className="rounded bg-light">
                  <Input
                    type="email"
                    className="bg-transparent border-0"
                    placeholder="Enter Email address"
                  />
                  <Button color="primary" type="button" id="button-addon2">
                    {" "}
                    <i className="bx bxs-paper-plane"></i>{" "}
                  </Button>
                </InputGroup>
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Welcome;
