import React, { useState } from "react";
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
import { useFormik } from "formik";
import * as Yup from "yup";

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
  Form,
} from "reactstrap";
import { useEffect } from "react";
import { KDM_ECOMMERCE_USER_JWT_TOKEN } from "common/tokens";
import { useDispatch } from "react-redux";
import { onSubscribe } from "slices/thunk";
import { toggleSubscribeModal } from "slices/BD/reducer";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import Spinners from "Components/Common/Spinner";

const Welcome = () => {
  document.title = "KDM Engineers Group";
  const dispatch: any = useDispatch();

  const bdModuleState = createSelector(
    (state: any) => state.bd,
    (bd) => ({
      showSubscribeModal: bd.showSubscribeModal,
      loading: bd.loading,
    })
  );

  const { showSubscribeModal, loading } = useSelector(bdModuleState);

  useEffect(() => {
    setTimeout(() => {
      const token = Cookies.get(KDM_ECOMMERCE_USER_JWT_TOKEN);
      if (!token) {
        dispatch(toggleSubscribeModal());
      }
    }, 3000);
  }, [dispatch]);

  const validation: any = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Your mail is required"),
    }),
    onSubmit: (values: any) => {
      dispatch(onSubscribe(values));
    },
  });

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
        isOpen={showSubscribeModal}
        autoFocus={true}
        centered
        toggle={() => {
          dispatch(toggleSubscribeModal());
        }}
      >
        <div>
          <ModalHeader
            className="border-bottom-0"
            toggle={() => {
              dispatch(toggleSubscribeModal());
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

                <Form onSubmit={validation.handleSubmit}>
                  <InputGroup className="rounded bg-light">
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      name="email"
                      value={validation.values.email}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      invalid={
                        validation.touched.email && validation.errors.email
                          ? true
                          : false
                      }
                    />

                    <Button
                      disabled={loading}
                      color="primary"
                      type="submit"
                      id="button-addon2"
                    >
                      {loading ? (
                        <i className="bx bx-loader bx-spin "></i>
                      ) : (
                        <i className="bx bxs-paper-plane"></i>
                      )}
                    </Button>
                  </InputGroup>
                </Form>
              </Col>
              <ToastContainer />
            </Row>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Welcome;
