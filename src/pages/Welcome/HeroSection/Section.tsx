import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Form,
  FormFeedback,
  Input,
  Label,
  Card,
  CardBody,
} from "reactstrap";
import Switch from "react-switch";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo-dark.png";
import profile from "../../../assets/images/profile-img.png";
import { useDispatch } from "react-redux";
import { RequestCallBackFormType } from "pages/BD/types";
// import { onRequestCallBack } from "slices/thunk";
import { onRequestCallbackThunk } from "slices/thunk";

export const Offsymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        paddingRight: 2,
      }}
    >
      {" "}
      No
    </div>
  );
};

export const OnSymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        paddingRight: 2,
      }}
    >
      {" "}
      Yes
    </div>
  );
};

const Section = () => {
  const [modal_standard, setmodal_standard] = useState(false);
  const [whatsappSwitch, setWhatsappSwitch] = useState(true);
  const dispatch: any = useDispatch();

  function tog_standard() {
    setmodal_standard(!modal_standard);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      contact: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      contact: Yup.string().required("Please Enter a valid number"),
    }),

    onSubmit: (values: any) => {
      const reqObj: RequestCallBackFormType = {
        name: values.name,
        mobile: values.contact,
        whatsapp: whatsappSwitch,
      };

      dispatch(onRequestCallbackThunk(reqObj));
    },
  });

  const renderModal = () => {
    return (
      <div>
        <Modal
          isOpen={modal_standard}
          toggle={() => {
            tog_standard();
          }}
          className="p-0"
        >
          <div className="justify-content-center">
            <Card className="overflow-hidden">
              <div className="bg-primary-subtle">
                <Row className="justify-content-center">
                  <Col className="col-8">
                    <div className="text-primary p-4">
                      <h5 className="text-primary">Fill out the form below</h5>
                      <p>We are happy to help you !</p>
                    </div>
                  </Col>
                  <Col className="col-4">
                    <img src={profile} alt="" className="img-fluid" />
                  </Col>
                </Row>
              </div>
              <CardBody className="pt-0">
                <div className="auth-logo">
                  <Link to="/" className="auth-logo-light">
                    <div className="avatar-md profile-user-wid mb-4">
                      <span className="avatar-title rounded-circle bg-light">
                        <img
                          src={logo}
                          alt=""
                          className="rounded-circle"
                          height="34"
                        />
                      </span>
                    </div>
                  </Link>
                  <Link to="/" className="auth-logo-dark">
                    <div className="avatar-md profile-user-wid mb-4">
                      <span className="avatar-title rounded-circle bg-light">
                        <img
                          src={logo}
                          alt="app-logo"
                          className="rounded-circle"
                          height="40"
                        />
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="p-2">
                  <p className="text-success">
                    Thank you for reaching out to us! Please fill out the form,
                    and our help desk will contact you shortly. We typically
                    reach out within 24 working hours.
                  </p>
                  <Form
                    className="form-horizontal"
                    onSubmit={(e) => {
                      e.preventDefault();
                      validation.handleSubmit();
                      return false;
                    }}
                  >
                    <div className="mb-3">
                      <Label className="form-label">Your Name</Label>
                      <Input
                        name="name"
                        className="form-control"
                        placeholder="Enter your name"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name || ""}
                        invalid={
                          validation.touched.name && validation.errors.name
                            ? true
                            : false
                        }
                      />
                      {validation.touched.name && validation.errors.name ? (
                        <FormFeedback type="invalid">
                          {validation.errors.name}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label className="form-label">Mobile</Label>
                      <div className="input-group auth-pass-inputgroup">
                        <Input
                          name="contact"
                          value={validation.values.contact || ""}
                          type="number"
                          placeholder="Enter your Contact Ex-9999999999"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          invalid={
                            (validation.touched.contact &&
                              (validation.errors.contact ? true : false)) ||
                            (validation.values.contact.toString().length !==
                              10 &&
                              validation.touched.contact)
                          }
                        />
                        {validation.touched.contact &&
                        validation.errors.contact ? (
                          <FormFeedback type="invalid">
                            {validation.errors.contact}
                          </FormFeedback>
                        ) : null}
                      </div>
                      {validation.touched.contact &&
                      validation.errors.contact ? (
                        <FormFeedback type="invalid">
                          {validation.errors.contact}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <Switch
                      uncheckedIcon={<Offsymbol />}
                      checkedIcon={<OnSymbol />}
                      className="me-1 mb-sm-8 mb-2"
                      onColor="#02a499"
                      onChange={() => setWhatsappSwitch(!whatsappSwitch)}
                      checked={whatsappSwitch}
                    />
                    <span> {"   "}I agree to be contacted via WhatsApp</span>
                    <div className="mt-3 d-grid">
                      <button
                        type="submit"
                        className="btn  btn-primary btn-block "
                      >
                        <i className="bx bx-support font-size-16 align-middle me-2"></i>{" "}
                        Request Call back
                      </button>
                    </div>
                  </Form>
                </div>
              </CardBody>
            </Card>
          </div>
        </Modal>
      </div>
    );
  };

  return (
    <React.Fragment>
      <section className="section hero-section bg-ico-hero" id="home">
        <div className="bg-overlay bg-primary"></div>
        <Container>
          <Row className="align-items-center">
            {modal_standard && renderModal()}
            <Col lg={6}>
              <div className="text-white-50">
                <h3>Welcome to</h3>
                <h1 className="text-white fw-semibold mb-3 hero-title">
                  KDM Engineers Group
                </h1>
                <p className="font-size-14">
                  Where innovation meets excellence in the world of civil
                  engineering. We are dedicated to creating sustainable
                  solutions that not only shape skylines but also transform
                  communities. With a passion for precision and a commitment to
                  quality, we take pride in every project we undertake. Explore
                  the possibilities with us as we build a future that stands the
                  test of time.
                </p>

                <div className="d-flex flex-wrap gap-2 mt-4">
                  <a href="#services" className="btn btn-primary ">
                    Get Started
                  </a>

                  {/* <Link to="#" className="btn btn-light">
                    Request a Phone call
                  </Link> */}

                  <button
                    type="button"
                    onClick={() => {
                      tog_standard();
                    }}
                    className="btn btn-success"
                    data-dismiss="modal"
                  >
                    Request a Phone call
                  </button>
                </div>
              </div>
            </Col>
            {/* <Col lg={5} md={8} sm={10} className="ms-lg-auto">
              <Card className="overflow-hidden mb-0 mt-5 mt-lg-0">
                <CardHeader className="text-center">
                  <h5 className="mb-0">ICO Countdown time</h5>
                </CardHeader>
                <CardBody>
                  <div className="text-center">
                    <h5>Time left to Ico :</h5>
                    <div className="mt-4">
                      <div className="counter-number ico-countdown"></div>
                      <Countdown date="2025/10/31" renderer={renderer} />
                    </div>

                    <div className="mt-4">
                      <button type="button" className="btn btn-success w-md">
                        Get Token
                      </button>
                    </div>

                    <div className="mt-5">
                      <h4 className="fw-semibold">1 ETH = 2235 SKT</h4>
                      <div className="clearfix mt-4">
                        <h5 className="float-end font-size-14">5234.43</h5>
                      </div>
                      <div className="progress p-1 progress-xl softcap-progress">
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          style={{ width: "15%" }}
                        >
                          <div className="progress-label">15 %</div>
                        </div>
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          style={{ width: "30%" }}
                        >
                          <div className="progress-label">30 %</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col> */}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Section;
