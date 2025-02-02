import React, { useEffect, useState } from "react";

// Redux
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Container,
  Form,
  Input,
  Label,
  FormFeedback,
  Alert,
} from "reactstrap";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";

// import images
import profile from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo-light.png";

//import thunk
import { loginuser, resetLoginMsgFlag } from "slices/auth/login/thunk";

import withRouter from "Components/Common/withRouter";
import { createSelector } from "reselect";

const UserLoginForm = (props: any) => {
  const [show, setShow] = useState(false);
  const dispatch: any = useDispatch();

  //meta title
  document.title = "Login | KDM Engineers Group";

  const selectProperties = createSelector(
    (state: any) => state.Login,
    (login) => ({
      error: login.error,
      loading: login.loading,
    })
  );

  const { error, loading } = useSelector(selectProperties);

  // Form validation
  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),

    onSubmit: (values: any) => {
      dispatch(loginuser(values, props.router.navigate));
    },
  });

  const signIn = (type: any) => {
    //SOCIAL LOGIN
  };

  const socialResponse = (type: any) => {
    signIn(type);
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(resetLoginMsgFlag());
      }, 3000);
    }
  }, [dispatch, error]);

  return (
    <React.Fragment>
      <div className="background-banner">
        <div className="account-pages  pt-sm-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="overflow-hidden  transparent-bg">
                  <div className="bg-primary-subtle">
                    <Row style={{ backgroundColor: "rgb(85, 110, 230)" }}>
                      <Col className="col-7">
                        <div className="text-primary p-4">
                          <h5 className="text-primary text-white">
                            Welcome Back !
                          </h5>
                          <p className="text-white">
                            Sign in to continue to KDM Engineers.
                          </p>
                        </div>
                      </Col>
                      <Col className="col-5 align-self-end">
                        <img src={profile} alt="" className="img-fluid" />
                      </Col>
                    </Row>
                  </div>
                  <div className="pt-0 p-3 ">
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
                      <Form
                        className="form-horizontal"
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <div className="mb-3">
                          {!loading && error ? (
                            <Alert color="danger">{error}</Alert>
                          ) : null}
                          <Label className="form-label text-white">Email</Label>
                          <Input
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label className="form-label text-white">
                            Password
                          </Label>
                          <div className="input-group auth-pass-inputgroup">
                            <Input
                              name="password"
                              value={validation.values.password || ""}
                              type={show ? "text" : "password"}
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            <button
                              onClick={() => setShow(!show)}
                              className="btn btn-light p-2"
                              type="button"
                              id="password-addon"
                            >
                              <i className="mdi mdi-eye-outline"></i>
                            </button>
                          </div>
                          {validation.touched.password &&
                          validation.errors.password ? (
                            <FormFeedback type="invalid">
                              {validation.errors.password}
                            </FormFeedback>
                          ) : null}
                        </div>

                        {/* <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div> */}

                        <div className="mt-3 d-grid">
                          <button
                            className="btn btn-primary btn-block "
                            type="submit"
                          >
                            {loading ? (
                              <>
                                {" "}
                                <i className="bx bx-loader bx-spin "></i> Please
                                Wait...{" "}
                              </>
                            ) : (
                              "Log In"
                            )}
                          </button>
                        </div>

                        <div className="mt-4 text-center">
                          <h5 className="font-size-14 mb-3 text-white">
                            Sign in with
                          </h5>

                          <ul className="list-inline">
                            <li className="list-inline-item">
                              <Link
                                to="#"
                                className="social-list-item bg-primary text-white border-primary"
                                onClick={(e: any) => {
                                  e.preventDefault();
                                  socialResponse("facebook");
                                }}
                              >
                                <i className="mdi mdi-facebook" />
                              </Link>
                            </li>{" "}
                            <li className="list-inline-item">
                              <Link
                                to="#"
                                className="social-list-item bg-info text-white border-info"
                              >
                                <i className="mdi mdi-twitter" />
                              </Link>
                            </li>{" "}
                            <li className="list-inline-item">
                              <Link
                                to="#"
                                className="social-list-item bg-danger text-white border-danger"
                                onClick={(e: any) => {
                                  e.preventDefault();
                                  socialResponse("google");
                                }}
                              >
                                <i className="mdi mdi-google" />
                              </Link>
                            </li>
                          </ul>
                        </div>

                        <div className="mt-4 text-center">
                          <Link to="/forgot-password" className="text-muted ">
                            <i className="mdi mdi-lock me-1" />{" "}
                            <span className="text-white">
                              Forgot your password?
                            </span>
                          </Link>
                        </div>
                        <p className="text-center text-white">
                          Don&apos;t have an account ?{" "}
                          <Link
                            to="/ecommerce/register"
                            className="fw-medium text-primary"
                          >
                            {" "}
                            Signup now{" "}
                          </Link>{" "}
                        </p>
                      </Form>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserLoginForm);
