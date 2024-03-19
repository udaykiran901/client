import React, { useEffect } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate, Navigate } from "react-router-dom";
// action
import { registerUser, apiError } from "../../slices/thunk";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
// import logoImg from "../../assets/images/logo.svg";
import { createSelector } from "reselect";
import logo from "../../assets/images/logo-light.png";

const UserRegister = () => {
  //meta title
  document.title = "Register | KDM Engineers Group";

  const dispatch = useDispatch<any>();
  const history = useNavigate();
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
      conformPassword: "",
      mobile: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
      conformPassword: Yup.string().required(
        "Password and Conform passwords are not equal"
      ),
      mobile: Yup.string().required("Please Enter a valid phone number"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  const selectProperties = createSelector(
    (state: any) => state.Account,
    (account) => ({
      user: account.user,
      registrationError: account.registrationError,
      loading: account.loading,
      success: account.success,
    })
  );

  const { user, registrationError, success } = useSelector(selectProperties);

  useEffect(() => {
    dispatch(apiError());
  }, [dispatch]);

  if (success) {
    return <Navigate to="/" />;
  }

  return (
    <React.Fragment>
      <div className="account-pages  pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary-subtle">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Free Register</h5>
                        <p>Get your free KDM Engineers account now.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-3">
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
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {user && user ? (
                        <Alert color="success">
                          You've Successfully Registered
                        </Alert>
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">
                          Failed to Register your account An account <br />{" "}
                          Maybe an account is existed on this mail Or might be
                          an internet issue
                        </Alert>
                      ) : null}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Mobile Number</Label>
                        <Input
                          id="mobile"
                          name="mobile"
                          className="form-control"
                          placeholder="Enter Phone number Ex-9999999999"
                          type="number"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.mobile || ""}
                          invalid={
                            (validation.touched.mobile &&
                              (validation.errors.mobile ? true : false)) ||
                            (validation.values.mobile.toString().length !==
                              10 &&
                              validation.touched.mobile)
                          }
                        />
                        {validation.touched.mobile &&
                        validation.errors.mobile ? (
                          <FormFeedback type="invalid">
                            {validation.errors.mobile}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Conform Password</Label>
                        <Input
                          name="conformPassword"
                          type="password"
                          placeholder="ReEnter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.conformPassword || ""}
                          invalid={
                            (validation.touched.conformPassword &&
                              (validation.errors.conformPassword
                                ? true
                                : false)) ||
                            validation.values.password !==
                              validation.values.conformPassword
                          }
                        />
                        {validation.touched.conformPassword ||
                        validation.errors.conformPassword ? (
                          <FormFeedback type="invalid">
                            {validation.errors.conformPassword}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-4">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Register
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-1">
                          By registering you agree to the KDM's Plicy{" "}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div>

                      <div className="text-center">
                        <p>
                          Already have an account ?
                          <Link
                            to="/ecommerce/login"
                            className="font-weight-medium text-primary"
                          >
                            Login
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserRegister;
