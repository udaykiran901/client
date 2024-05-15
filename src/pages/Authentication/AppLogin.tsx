import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import withRouter from "Components/Common/withRouter";

import {
  Col,
  Container,
  Form,
  Row,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";
import CarouselPage from "./CarouselPage";
import { useDispatch } from "react-redux";
import { employeeLogin } from "slices/thunk";
import { EMPLOYEE_LOCAL_STORAGE_KEY } from "common/tokens";
import Cookies from "js-cookie";

const AppLogin = (props: any) => {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  document.title = "Employee Login | KDM Engineers Group";
  const dispatch: any = useDispatch();

  const validation: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: async (values: any) => {
      dispatch(employeeLogin(values, props.router.navigate, setLoading));
    },
  });

  const token = Cookies.get(EMPLOYEE_LOCAL_STORAGE_KEY);
  if (token !== undefined) {
    return <Navigate to={{ pathname: "/profile" }} />;
  }

  return (
    <React.Fragment>
      <div>
        <Container fluid className="p-0">
          <Row className="g-0">
            <CarouselPage />

            <Col xl={4}>
              <div className="auth-full-page-content p-md-5 p-4">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="mb-4 mb-md-5">
                      <Link to="/" className="d-block auth-logo">
                        <img
                          src={logodark}
                          alt=""
                          height="18"
                          className="auth-logo-dark"
                        />
                        <img
                          src={logolight}
                          alt=""
                          height="18"
                          className="auth-logo-light"
                        />
                      </Link>
                    </div>
                    <div className="my-auto">
                      <div>
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p className="text-muted">
                          Sign in to continue to KDM Engineers Group
                        </p>
                      </div>

                      <div className="mt-4">
                        <Form
                          className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                          <div className="mb-3">
                            <Label className="form-label">Username</Label>
                            <Input
                              name="username"
                              className="form-control"
                              placeholder="Enter username"
                              type="text"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.username || ""}
                              invalid={
                                validation.touched.username &&
                                validation.errors.username
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.username &&
                            validation.errors.username ? (
                              <FormFeedback type="invalid">
                                {validation.errors.username}
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label className="form-label">Password</Label>
                            <div className="input-group auth-pass-inputgroup">
                              <Input
                                name="password"
                                value={validation.values.password || ""}
                                type={passwordShow ? "text" : "password"}
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
                                onClick={() => setPasswordShow(!passwordShow)}
                                className="btn btn-light "
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

                          <div className="mt-3 d-grid z-0">
                            <button
                              disabled={loading}
                              className="btn btn-primary btn-block z-0 "
                              type="submit"
                            >
                              {loading ? "Wait..." : "Log In"}
                            </button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(AppLogin);
