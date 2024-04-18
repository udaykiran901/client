import React, { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  // Table,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Card,
  Form,
  FormGroup,
  Label,
  CardBody,
  CardTitle,
  FormFeedback,
} from "reactstrap";
// import Select from "react-select";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import classnames from "classnames";
import Navbar from "pages/Welcome/Navbar/Navbar";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";

//Import Images

// import { cart } from "./type";
import { useDispatch } from "react-redux";
import { getCart } from "slices/thunk";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";

// const optionGroup = [
//   {
//     label: "Picnic",
//     options: [
//       { label: "Mustard", value: "Mustard" },
//       { label: "Ketchup", value: "Ketchup" },
//       { label: "Relish", value: "Relish" },
//     ],
//   },
//   {
//     label: "Camping",
//     options: [
//       { label: "Tent", value: "Tent" },
//       { label: "Flashlight", value: "Flashlight" },
//       { label: "Toilet Paper", value: "Toilet Paper" },
//     ],
//   },
// ];

const EcommerceCheckout = () => {
  //meta title
  document.title = "Checkout | KDM Engineers Group";

  const [activeTab, setActiveTab] = useState<any>("1");
  // const [selectedGroup, setSelectedGroup] = useState<any>(null);

  // const selectProperties = createSelector(
  //   (state: any) => state.ecommerce,
  //   (ecommerce) => ({
  //     cart: ecommerce.cart,
  //   })
  // );

  const profileSelector = createSelector(
    (state: any) => state.Profile,
    (profile) => ({
      user: profile.user,
    })
  );

  // const { cart } = useSelector(selectProperties);
  const { user } = useSelector(profileSelector);
  const { email, mobile } = user;

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const validation: any = useFormik({
    initialValues: {
      name: "",
      email: email,
      phone: mobile,
      address: "",
      country: "",
      states: "",
      order: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter your Name"),
      // email: Yup.string().email().required("Please Enter your Email Address"),
      // phone: Yup.string().required("Please Enter your Phone"),
      address: Yup.string().required("Please Enter your Address"),
      // country: Yup.string().required("Please Enter your Country Name"),
      // states: Yup.string().required("Please Enter your States"),
      order: Yup.string().required("Please Enter your Order Note"),
    }),
    onSubmit: (values: any) => {
      // console.log(values)
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <div>
          <Navbar />
        </div>

        <Container>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Checkout" />

          <div className="checkout-tabs">
            <Row>
              <Col xl={2} sm={3}>
                <Nav className="flex-column" pills>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        setActiveTab("1");
                      }}
                    >
                      <i className="bx bxs-truck d-block check-nav-icon mt-4 mb-2" />
                      <p className="fw-bold mb-4">Shipping Info</p>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        setActiveTab("2");
                      }}
                    >
                      <i className="bx bx-money d-block check-nav-icon mt-4 mb-2" />
                      <p className="fw-bold mb-4">Payment Info</p>
                    </NavLink>
                  </NavItem>
                  {/* <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "3" })}
                      onClick={() => {
                        setActiveTab("3");
                      }}
                    >
                      <i className="bx bx-badge-check d-block check-nav-icon mt-4 mb-2" />
                      <p className="fw-bold mb-4">Confirmation</p>
                    </NavLink>
                  </NavItem> */}
                </Nav>
              </Col>
              <Col xl={10} sm={9}>
                <Card>
                  <CardBody>
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="1">
                        <div>
                          <CardTitle tag="h4">Shipping information</CardTitle>
                          <p className="card-title-desc">
                            Fill all information below
                          </p>
                          <Form onSubmit={validation.handleSubmit}>
                            <FormGroup className="mb-4" row>
                              <Label
                                htmlFor="billing-name"
                                md="2"
                                className="col-form-label"
                              >
                                {" "}
                                Name
                              </Label>
                              <Col md={10}>
                                <Input
                                  type="text"
                                  id="billing-name"
                                  placeholder="Enter your name"
                                  name="name"
                                  value={validation.values.name}
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  invalid={
                                    validation.touched.name &&
                                    validation.errors.name
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.name &&
                                validation.errors.name ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.name}
                                  </FormFeedback>
                                ) : null}
                              </Col>
                            </FormGroup>
                            <FormGroup className="mb-4" row>
                              <Label
                                htmlFor="billing-email-address"
                                md="2"
                                className="col-form-label"
                              >
                                Email Address{" "}
                              </Label>
                              <Col md={10}>
                                <Input
                                  readOnly
                                  type="email"
                                  id="billing-email-address"
                                  // placeholder="Enter your email"
                                  name="email"
                                  value={email}
                                  // onChange={validation.handleChange}
                                  // onBlur={validation.handleBlur}
                                  // invalid={
                                  //   validation.touched.email &&
                                  //   validation.errors.email
                                  //     ? true
                                  //     : false
                                  // }
                                />
                                {/* {validation.touched.email &&
                                validation.errors.email ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.email}
                                  </FormFeedback>
                                ) : null} */}
                              </Col>
                            </FormGroup>
                            <FormGroup className="mb-4" row>
                              <Label
                                htmlFor="billing-phone"
                                md="2"
                                className="col-form-label"
                              >
                                Phone{" "}
                              </Label>
                              <Col md={10}>
                                <Input
                                  readOnly
                                  type="number"
                                  id="billing-phone"
                                  // placeholder="Enter your Phone no."
                                  name="phone"
                                  value={mobile}
                                  // value={validation.values.phone}

                                  // onChange={validation.handleChange}
                                  // onBlur={validation.handleBlur}
                                  // invalid={
                                  //   validation.touched.phone &&
                                  //   validation.errors.phone
                                  //     ? true
                                  //     : false
                                  // }
                                />
                                {/* {validation.touched.phone &&
                                validation.errors.phone ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.phone}
                                  </FormFeedback>
                                ) : null} */}
                              </Col>
                            </FormGroup>
                            <FormGroup className="mb-4" row>
                              <Label
                                htmlFor="billing-address"
                                md="2"
                                className="col-form-label"
                              >
                                Address
                              </Label>
                              <Col md={10}>
                                <Input
                                  tag="textarea"
                                  id="billing-address"
                                  rows={3}
                                  placeholder="Enter full address"
                                  name="address"
                                  value={validation.values.address}
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  invalid={
                                    validation.touched.address &&
                                    validation.errors.address
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.address &&
                                validation.errors.address ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.address}
                                  </FormFeedback>
                                ) : null}
                              </Col>
                            </FormGroup>

                            <div className="form-group row mb-0">
                              <Label
                                md={2}
                                className="col-form-label"
                                htmlFor="example-textarea"
                              >
                                Order Notes:
                              </Label>
                              <Col md={10}>
                                <Input
                                  tag="textarea"
                                  id="example-textarea"
                                  rows={3}
                                  placeholder="Write some note.."
                                  name="order"
                                  value={validation.values.order}
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  invalid={
                                    validation.touched.order &&
                                    validation.errors.order
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.order &&
                                validation.errors.order ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.order}
                                  </FormFeedback>
                                ) : null}
                              </Col>
                            </div>
                          </Form>
                        </div>
                      </TabPane>
                      <TabPane
                        tabId="2"
                        id="v-pills-payment"
                        role="tabpanel"
                        aria-labelledby="v-pills-payment-tab"
                      >
                        <div>
                          <CardTitle>Payment information</CardTitle>
                          <p className="card-title-desc">
                            Fill all information below
                          </p>
                          <div>
                            <FormGroup
                              check
                              className="form-check-inline font-size-16"
                            >
                              <Input
                                type="radio"
                                value="1"
                                id="customRadioInline1"
                                name="customRadioInline1"
                                className="form-check-input"
                                defaultChecked
                              />
                              <Label
                                check
                                className="font-size-13"
                                htmlFor="customRadioInline1"
                              >
                                <i className="fab fa-cc-mastercard me-1 font-size-20 align-top" />{" "}
                                Credit / Debit Card
                              </Label>
                            </FormGroup>
                            <div className="form-check form-check-inline font-size-16">
                              <Input
                                type="radio"
                                value="2"
                                id="customRadioInline2"
                                name="customRadioInline1"
                                className="form-check-input"
                              />
                              <Label
                                className="form-check-label font-size-13"
                                htmlFor="customRadioInline2"
                              >
                                <i className="fab fa-cc-paypal me-1 font-size-20 align-top" />{" "}
                                Paypal
                              </Label>
                            </div>
                            <div className="form-check form-check-inline font-size-16">
                              <Input
                                type="radio"
                                value="3"
                                id="customRadioInline3"
                                name="customRadioInline1"
                                className="form-check-input"
                              />
                              <Label
                                className="form-check-label font-size-13"
                                htmlFor="customRadioInline3"
                              >
                                <i className="far fa-money-bill-alt me-1 font-size-20 align-top" />{" "}
                                Cash on Delivery
                              </Label>
                            </div>
                          </div>

                          <h5 className="mt-5 mb-3 font-size-15">
                            For card Payment
                          </h5>
                          <div className="p-4 border">
                            <Form>
                              <div className="form-group mb-0">
                                <Label htmlFor="cardnumberInput">
                                  Card Number{" "}
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="cardNumberInput"
                                  placeholder="0000 0000 0000 0000"
                                />
                              </div>
                              <Row>
                                <Col lg="6">
                                  <div className="form-group mt-4 mb-0">
                                    <Label htmlFor="cardnameInput">
                                      Name on card{" "}
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="cardnameInput"
                                      placeholder="Name on Card"
                                    />
                                  </div>
                                </Col>
                                <Col lg="3">
                                  <div className="form-group mt-4 mb-0">
                                    <Label htmlFor="expirydateInput">
                                      {" "}
                                      Expiry date{" "}
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="expirydateInput"
                                      placeholder="MM/YY"
                                    />
                                  </div>
                                </Col>
                                <Col lg="3">
                                  <div className="form-group mt-4 mb-0">
                                    <Label htmlFor="cvvcodeInput">
                                      {" "}
                                      CVV Code
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="cvvcodeInput"
                                      placeholder="Enter CVV Code"
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </Form>
                          </div>
                        </div>
                      </TabPane>
                      {/* <TabPane tabId="3" id="v-pills-confir" role="tabpanel">
                        <Card className="shadow-none border mb-0">
                          <CardBody>
                            <CardTitle className="mb-4">
                              {" "}
                              Order Summary
                            </CardTitle>

                            <div className="table-responsive">
                              <Table className="table align-middle mb-0 table-nowrap">
                                <thead className="table-light">
                                  <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Product Desc</th>
                                    <th scope="col">Price</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {(cart || [])?.map(
                                    (cartItem: cart, key: number) => (
                                      <tr key={"_orderSummary_" + key}>
                                        <th scope="row">
                                          <img
                                            src={cartItem.img}
                                            alt="product-img"
                                            title="product-img"
                                            className="avatar-md"
                                          />
                                        </th>
                                        <td>
                                          <h5 className="font-size-14 text-truncate">
                                            <Link
                                              to={`/ecommerce-product-detail/${cartItem.id}`}
                                              className="text-dark"
                                            >
                                              {cartItem.name}
                                            </Link>
                                          </h5>
                                          <p className="text-muted mb-0">
                                            Rs. {cartItem.basePrice}
                                            <br />
                                            <span className="text-success">
                                              {" "}
                                              {cartItem.isOffer
                                                ? `${cartItem.offer}% offer Applied`
                                                : null}
                                            </span>
                                          </p>
                                        </td>
                                        <td>
                                          Rs.
                                          {cartItem.basePrice -
                                            ((cartItem.basePrice *
                                              cartItem.offer) as number) /
                                              100}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                  <tr>
                                    <td colSpan={2}>
                                      <h6 className="m-0 text-end">
                                        Sub Total:
                                      </h6>
                                    </td>
                                    <td>$ 675</td>
                                  </tr>
                                  <tr>
                                    <td colSpan={3}>
                                      <div className="bg-primary-subtle p-3 rounded">
                                        <h5 className="font-size-14 text-primary mb-0">
                                          <i className="fas fa-shipping-fast me-2" />{" "}
                                          Shipping{" "}
                                          <span className="float-end">
                                            Free
                                          </span>
                                        </h5>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={2}>
                                      <h6 className="m-0 text-end">Total:</h6>
                                    </td>
                                    <td>Rs. 675</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                          </CardBody>
                        </Card>
                      </TabPane> */}
                    </TabContent>
                  </CardBody>
                </Card>
                <Row className="mt-4">
                  <Col sm="6">
                    <Link
                      to="/ecommerce-cart"
                      className="btn text-muted d-none d-sm-inline-block btn-link"
                    >
                      <i className="mdi mdi-arrow-left me-1" /> Back to Shopping
                      Cart{" "}
                    </Link>
                  </Col>

                  <Col sm="6">
                    <div className="text-sm-end">
                      <Link
                        to="/ecommerce-checkout"
                        className="btn btn-success"
                      >
                        <i className="mdi mdi-truck-fast me-1" /> Proceed to
                        Shipping{" "}
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceCheckout;
