import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import withRouter from "Components/Common/withRouter";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Card,
  Button,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  FormGroup,

  // Table,
} from "reactstrap";

import classnames from "classnames";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAddingNewProduct } from "slices/thunk";

const categories = [
  {
    category_id: "BUILDING_MATERIALS",
    label: "Building Materials",
  },
  {
    category_id: "WATER",
    label: "Water",
  },
  {
    category_id: "RAW_MATERIALS",
    label: "Raw Materials",
  },
];

const AddProduct = () => {
  const [activeTabVartical, setoggleTabVertical] = useState<number>(1);
  const [passedStepsVertical, setPassedStepsVertical] = useState([1]);

  function toggleTabVertical(tab: any) {
    if (activeTabVartical !== tab) {
      var modifiedSteps = [...passedStepsVertical, tab];

      if (tab >= 1 && tab <= 4) {
        setoggleTabVertical(tab);
        setPassedStepsVertical(modifiedSteps);
      }
    }
  }

  const dispatch: any = useDispatch();

  const verticalformik: any = useFormik({
    initialValues: {
      name: "",
      category: "",

      base_price: "",
      isOffer: false,
      offer: "",
      prefix: "",
      complete_pack: false,
      description: "",
      no_of_days: "",
      interim_report: false,
      interim_report_days: "0",

      //tab2
      image: null,
      image_lg: null,
      features: [
        { short_feature: "", description: "" },
        { short_feature: "", description: "" },
        { short_feature: "", description: "" },
        { short_feature: "", description: "" },
        { short_feature: "", description: "" },
      ],
    },

    validationSchema: Yup.object({
      //tab-1
      name: Yup.string().required("Product name is required"),
      category: Yup.string().required("Product category is required"),
      description: Yup.string().required("Product Description is required"),

      isOffer: Yup.boolean(),

      offer: Yup.number()
        .required("Offer is required")
        .min(1, "Offer must be greater than or equal to 1")
        .max(100, "Offer must be less than or equal to 100"),

      prefix: Yup.string()
        .required("Prefix is required")
        .matches(
          /^[A-Z]{1,8}$/,
          "Prefix must be a maximum of 5 capital letters"
        ),

      rating: Yup.number()
        .min(0, "Rating must be greater than or equal to 0")
        .nullable(),

      base_price: Yup.number()
        .required("Base price is required")
        .min(0, "Base price must be greater than or equal to 0"),

      complete_pack: Yup.boolean(),

      no_of_days: Yup.number()
        .required("Number of days is required")
        .min(0, "Number of days must be greater than or equal to 0")
        .integer("Number of days must be an integer"),

      interim_report: Yup.boolean().required("Interim report is required"),
      interim_report_days: Yup.number()
        .required("Number of interim Days is required")
        .min(0, "Number of days must be greater than or equal to 0")
        .integer("Number of days must be an integer"),

      //Tab 2
      image: Yup.mixed().required("Image is required"),
      image_lg: Yup.mixed().required("Large image is required"),
      features: Yup.array().of(
        Yup.object().shape({
          short_feature: Yup.string().required("Short feature is required"),
          description: Yup.string().required("Description is required"),
        })
      ),
    }),

    onSubmit: async (values) => {
      dispatch(onAddingNewProduct(values));
    },
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <h4 className="card-title mb-4">Registering a product</h4>
                  <div className="vertical-wizard wizard clearfix vertical">
                    <div className="steps clearfix">
                      <ul>
                        <NavItem
                          className={classnames({
                            current: activeTabVartical === 1,
                          })}
                        >
                          <NavLink
                            className={classnames({
                              active: activeTabVartical === 1,
                            })}
                            onClick={() => {
                              toggleTabVertical(1);
                            }}
                            disabled={!(passedStepsVertical || []).includes(1)}
                          >
                            <span className="number">1.</span> Product Details
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({
                            current: activeTabVartical === 2,
                          })}
                        >
                          <NavLink
                            className={classnames({
                              active: activeTabVartical === 2,
                            })}
                            onClick={() => {
                              toggleTabVertical(2);
                            }}
                            disabled={!(passedStepsVertical || []).includes(2)}
                          >
                            <span className="number">2.</span>{" "}
                            <span>Product Features/Specifications</span>
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({
                            current: activeTabVartical === 3,
                          })}
                        >
                          <NavLink
                            className={
                              (classnames({
                                active: activeTabVartical === 3,
                              }),
                              "done")
                            }
                            onClick={() => {
                              toggleTabVertical(3);
                            }}
                            disabled={!(passedStepsVertical || []).includes(3)}
                          >
                            <span className="number">3.</span> Conformation
                          </NavLink>
                        </NavItem>
                        {/* <NavItem
                          className={classnames({
                            current: activeTabVartical === 4,
                          })}
                        >
                          <NavLink
                            className={
                              (classnames({
                                active: activeTabVartical === 4,
                              }),
                              "done")
                            }
                            onClick={() => {
                              toggleTabVertical(4);
                            }}
                            disabled={!(passedStepsVertical || []).includes(4)}
                          >
                            <span className="number">4.</span> Confirm Detail
                          </NavLink>
                        </NavItem> */}
                      </ul>
                    </div>
                    <div className="content clearfix">
                      <Form onSubmit={verticalformik.handleSubmit}>
                        <TabContent
                          activeTab={activeTabVartical}
                          className="body"
                        >
                          <TabPane tabId={1}>
                            <Row>
                              <Col lg="6">
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-firstname-input12">
                                    Name of the Material
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    id="basicpill-firstname-input12"
                                    placeholder="Enter Material Name"
                                    value={verticalformik.values.name}
                                    onChange={verticalformik.handleChange}
                                    onBlur={verticalformik.handleBlur}
                                  />
                                  {verticalformik.errors.name &&
                                  verticalformik.touched.name ? (
                                    <span className="text-danger">
                                      {verticalformik.errors.name}
                                    </span>
                                  ) : null}
                                </FormGroup>
                              </Col>

                              <Col lg={6}>
                                <div className="mb-3">
                                  <label>Select Category</label>
                                  <div>
                                    <select
                                      className="form-control"
                                      name="category"
                                      id="basicpill-blood-input1"
                                      value={verticalformik.values.category}
                                      onChange={verticalformik.handleChange}
                                      onBlur={verticalformik.handleBlur}
                                    >
                                      <option value="" disabled>
                                        Select Material Category
                                      </option>

                                      {categories?.map((eachCategory) => (
                                        <option
                                          value={eachCategory.category_id}
                                          key={eachCategory.category_id}
                                        >
                                          {eachCategory.label}
                                        </option>
                                      ))}
                                    </select>
                                    {verticalformik.errors.category &&
                                    verticalformik.touched.category ? (
                                      <span className="text-danger">
                                        {verticalformik.errors.category}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </Col>

                              <Col lg={12}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="basicpill-description-input12">
                                    Product Description
                                  </Label>
                                  <textarea
                                    id="basicpill-description-input12"
                                    className="form-control"
                                    rows={4}
                                    name="description"
                                    placeholder="Enter Product Description"
                                    value={verticalformik.values.description}
                                    onChange={verticalformik.handleChange}
                                    onBlur={verticalformik.handleBlur}
                                  />
                                  {verticalformik.errors.description &&
                                  verticalformik.touched.description ? (
                                    <span className="text-danger">
                                      {verticalformik.errors.description}
                                    </span>
                                  ) : null}
                                </FormGroup>
                              </Col>

                              <Col lg={4}>
                                <FormGroup check className="mb-3">
                                  <Label check>
                                    <Input
                                      type="checkbox"
                                      id="isOffer"
                                      name="isOffer"
                                      checked={verticalformik.values.isOffer}
                                      onChange={verticalformik.handleChange}
                                      onBlur={verticalformik.handleBlur}
                                    />
                                    Offer Available
                                  </Label>
                                </FormGroup>
                              </Col>

                              <Col lg={4}>
                                <FormGroup check className="mb-3">
                                  <Label check>
                                    <Input
                                      type="checkbox"
                                      id="interim_report"
                                      name="interim_report"
                                      checked={
                                        verticalformik.values.interim_report
                                      }
                                      onChange={verticalformik.handleChange}
                                      onBlur={verticalformik.handleBlur}
                                    />{" "}
                                    Interim Report
                                  </Label>
                                </FormGroup>
                              </Col>

                              <Col lg={4}>
                                <FormGroup check className="mb-3">
                                  <Label check>
                                    <Input
                                      type="checkbox"
                                      id="complete_pack"
                                      name="complete_pack"
                                      checked={
                                        verticalformik.values.complete_pack
                                      }
                                      onChange={verticalformik.handleChange}
                                      onBlur={verticalformik.handleBlur}
                                    />
                                    Complete Pack
                                  </Label>
                                </FormGroup>
                              </Col>

                              {verticalformik.values.isOffer && (
                                <>
                                  <Col lg={6}>
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="offer">
                                        Offer Percentage
                                      </Label>
                                      <Input
                                        type="number"
                                        id="offer"
                                        name="offer"
                                        placeholder="Enter offer"
                                        value={verticalformik.values.offer}
                                        onChange={verticalformik.handleChange}
                                        onBlur={verticalformik.handleBlur}
                                      />
                                      {verticalformik.errors.offer &&
                                      verticalformik.touched.offer ? (
                                        <span className="text-danger">
                                          {verticalformik.errors.offer}
                                        </span>
                                      ) : null}
                                    </FormGroup>
                                  </Col>

                                  <Col lg={6}>
                                    {verticalformik.values.interim_report && (
                                      <FormGroup className="mb-3">
                                        <Label htmlFor="interim_report_days">
                                          Interim Report Days
                                        </Label>
                                        <Input
                                          type="number"
                                          id="interim_report_days"
                                          name="interim_report_days"
                                          placeholder="Enter interim report days"
                                          value={
                                            verticalformik.values
                                              .interim_report_days
                                          }
                                          onChange={verticalformik.handleChange}
                                          onBlur={verticalformik.handleBlur}
                                        />
                                        {verticalformik.errors
                                          .interim_report_days &&
                                        verticalformik.touched
                                          .interim_report_days ? (
                                          <span className="text-danger">
                                            {
                                              verticalformik.errors
                                                .interim_report_days
                                            }
                                          </span>
                                        ) : null}
                                      </FormGroup>
                                    )}
                                  </Col>
                                </>
                              )}

                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="prefix">
                                    Prefix (Max 5 capital letters)
                                  </Label>
                                  <Input
                                    type="text"
                                    id="prefix"
                                    name="prefix"
                                    placeholder="Enter prefix"
                                    value={verticalformik.values.prefix}
                                    onChange={verticalformik.handleChange}
                                    onBlur={verticalformik.handleBlur}
                                  />
                                  {verticalformik.errors.prefix &&
                                  verticalformik.touched.prefix ? (
                                    <span className="text-danger">
                                      {verticalformik.errors.prefix}
                                    </span>
                                  ) : null}
                                </FormGroup>
                              </Col>

                              <Col lg={4}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="base_price">Base Price</Label>
                                  <Input
                                    type="number"
                                    id="base_price"
                                    name="base_price"
                                    placeholder="Enter base price"
                                    value={verticalformik.values.base_price}
                                    onChange={verticalformik.handleChange}
                                    onBlur={verticalformik.handleBlur}
                                  />
                                  {verticalformik.errors.base_price &&
                                  verticalformik.touched.base_price ? (
                                    <span className="text-danger">
                                      {verticalformik.errors.base_price}
                                    </span>
                                  ) : null}
                                </FormGroup>
                              </Col>

                              <Col lg={4}>
                                {" "}
                                <FormGroup className="mb-3">
                                  <Label htmlFor="no_of_days">
                                    Minunum No.of Days to test Sample
                                  </Label>
                                  <Input
                                    type="number"
                                    id="no_of_days"
                                    name="no_of_days"
                                    placeholder="Enter number of days"
                                    value={verticalformik.values.no_of_days}
                                    onChange={verticalformik.handleChange}
                                    onBlur={verticalformik.handleBlur}
                                  />
                                  {verticalformik.errors.no_of_days &&
                                  verticalformik.touched.no_of_days ? (
                                    <span className="text-danger">
                                      {verticalformik.errors.no_of_days}
                                    </span>
                                  ) : null}
                                </FormGroup>
                              </Col>
                            </Row>
                          </TabPane>
                          <TabPane tabId={2}>
                            <Row>
                              <Col lg={6}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="image">Image</Label>
                                  <Input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={(event) => {
                                      const file =
                                        event.currentTarget.files &&
                                        event.currentTarget.files[0];
                                      if (file) {
                                        verticalformik.setFieldValue(
                                          "image",
                                          file
                                        );
                                      }
                                    }}
                                    onBlur={verticalformik.handleBlur}
                                  />
                                  {verticalformik.errors.image &&
                                  verticalformik.touched.image ? (
                                    <span className="text-danger">
                                      {verticalformik.errors.image}
                                    </span>
                                  ) : null}
                                </FormGroup>
                              </Col>
                              <Col lg={6}>
                                <FormGroup className="mb-3">
                                  <Label htmlFor="image_lg">Large Image</Label>
                                  <Input
                                    type="file"
                                    id="image_lg"
                                    name="image_lg"
                                    onChange={(event) => {
                                      const file =
                                        event.currentTarget.files &&
                                        event.currentTarget.files[0];
                                      if (file) {
                                        verticalformik.setFieldValue(
                                          "image_lg",
                                          file
                                        );
                                      }
                                    }}
                                    onBlur={verticalformik.handleBlur}
                                  />
                                  {verticalformik.errors.image_lg &&
                                  verticalformik.touched.image_lg ? (
                                    <span className="text-danger">
                                      {verticalformik.errors.image_lg}
                                    </span>
                                  ) : null}
                                </FormGroup>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg={12}>
                                <div>
                                  {verticalformik.values.features.map(
                                    (feature, index) => (
                                      <Row key={index}>
                                        <Col lg={6} className="m-0">
                                          <FormGroup>
                                            <Input
                                              type="text"
                                              id={`short_feature_${index}`}
                                              name={`features[${index}].short_feature`}
                                              placeholder="Enter short feature"
                                              value={
                                                verticalformik.values.features[
                                                  index
                                                ].short_feature
                                              }
                                              onChange={
                                                verticalformik.handleChange
                                              }
                                              onBlur={verticalformik.handleBlur}
                                            />
                                            {verticalformik.errors.features &&
                                            verticalformik.errors.features[
                                              index
                                            ] &&
                                            verticalformik.errors.features[
                                              index
                                            ].short_feature ? (
                                              <span className="text-danger">
                                                {
                                                  verticalformik.errors
                                                    .features[index]
                                                    .short_feature
                                                }
                                              </span>
                                            ) : null}
                                          </FormGroup>
                                        </Col>

                                        <Col lg={6}>
                                          <FormGroup>
                                            <Input
                                              type="text"
                                              id={`description_${index}`}
                                              name={`features[${index}].description`}
                                              placeholder="Enter description"
                                              value={
                                                verticalformik.values.features[
                                                  index
                                                ].description
                                              }
                                              onChange={
                                                verticalformik.handleChange
                                              }
                                              onBlur={verticalformik.handleBlur}
                                            />
                                            {verticalformik.errors.features &&
                                            verticalformik.errors.features[
                                              index
                                            ] &&
                                            verticalformik.errors.features[
                                              index
                                            ].description ? (
                                              <span className="text-danger">
                                                {
                                                  verticalformik.errors
                                                    .features[index].description
                                                }
                                              </span>
                                            ) : null}
                                          </FormGroup>
                                        </Col>
                                      </Row>
                                    )
                                  )}
                                </div>
                              </Col>
                            </Row>

                            <div>
                              <Button
                                type="submit"
                                color="success"
                                className="w-md"
                              >
                                Submit
                              </Button>
                            </div>
                          </TabPane>
                          <TabPane tabId={3}>
                            <div>
                              <Form>
                                <Row>
                                  <Col lg="6">
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="basicpill-namecard-input112">
                                        Name on Card
                                      </Label>
                                      <Input
                                        type="text"
                                        name="card"
                                        className="form-control"
                                        id="basicpill-namecard-input112"
                                        placeholder="Enter Your Name on Card"
                                        value={verticalformik.values.card}
                                        onChange={verticalformik.handleChange}
                                        onBlur={verticalformik.handleBlur}
                                      />
                                      {verticalformik.errors.card &&
                                      verticalformik.touched.card ? (
                                        <span className="text-danger">
                                          {verticalformik.errors.card}
                                        </span>
                                      ) : null}
                                    </FormGroup>
                                  </Col>

                                  <Col lg="6">
                                    <FormGroup className="mb-3">
                                      <Label>Credit Card Type</Label>
                                      <select
                                        className="form-select"
                                        name="creditcard"
                                        value={verticalformik.values.creditcard}
                                        onChange={verticalformik.handleChange}
                                        onBlur={verticalformik.handleBlur}
                                      >
                                        <option>Select Card Type</option>
                                        <option>American Express</option>
                                        <option>Visa</option>
                                        <option>MasterCard</option>
                                        <option>Discover</option>
                                      </select>
                                      {verticalformik.errors.creditcard &&
                                      verticalformik.touched.creditcard ? (
                                        <span className="text-danger">
                                          {verticalformik.errors.creditcard}
                                        </span>
                                      ) : null}
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg="6">
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="basicpill-cardno-input122">
                                        Credit Card Number
                                      </Label>
                                      <Input
                                        type="text"
                                        name="creditno"
                                        className="form-control"
                                        id="basicpill-cardno-input122"
                                        placeholder="Enter Your Card Number"
                                        value={verticalformik.values.creditno}
                                        onChange={verticalformik.handleChange}
                                        onBlur={verticalformik.handleBlur}
                                      />
                                      {verticalformik.errors.creditno &&
                                      verticalformik.touched.creditno ? (
                                        <span className="text-danger">
                                          {verticalformik.errors.creditno}
                                        </span>
                                      ) : null}
                                    </FormGroup>
                                  </Col>

                                  <Col lg="6">
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="basicpill-card-verification-input">
                                        Card Verification Number
                                      </Label>
                                      <Input
                                        type="text"
                                        name="cardvarification"
                                        className="form-control"
                                        id="basicpill-card-verification-input"
                                        placeholder="Card Verification Number"
                                        value={
                                          verticalformik.values.cardvarification
                                        }
                                        onChange={verticalformik.handleChange}
                                        onBlur={verticalformik.handleBlur}
                                      />
                                      {verticalformik.errors.cardvarification &&
                                      verticalformik.touched
                                        .cardvarification ? (
                                        <span className="text-danger">
                                          {
                                            verticalformik.errors
                                              .cardvarification
                                          }
                                        </span>
                                      ) : null}
                                    </FormGroup>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg="6">
                                    <FormGroup className="mb-3">
                                      <Label htmlFor="basicpill-expiration-input132">
                                        Expiration Date
                                      </Label>
                                      <Input
                                        type="text"
                                        name="expiratdata"
                                        className="form-control"
                                        id="basicpill-expiration-input132"
                                        placeholder="Card Expiration Date"
                                        value={
                                          verticalformik.values.expiratdata
                                        }
                                        onChange={verticalformik.handleChange}
                                        onBlur={verticalformik.handleBlur}
                                      />
                                      {verticalformik.errors.expiratdata &&
                                      verticalformik.touched.expiratdata ? (
                                        <span className="text-danger">
                                          {verticalformik.errors.expiratdata}
                                        </span>
                                      ) : null}
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </Form>
                            </div>
                          </TabPane>
                          <TabPane tabId={4}>
                            <div className="row justify-content-center">
                              <Col lg="6">
                                <div className="text-center">
                                  <div className="mb-4">
                                    <i className="mdi mdi-check-circle-outline text-success display-4" />
                                  </div>
                                  <div>
                                    <h5>Confirm Detail</h5>
                                    <p className="text-muted">
                                      If several languages coalesce, the grammar
                                      of the resulting
                                    </p>
                                  </div>
                                </div>
                              </Col>
                            </div>
                          </TabPane>
                        </TabContent>
                      </Form>
                    </div>
                    <div className="actions clearfix">
                      <ul>
                        <li
                          className={
                            activeTabVartical === 1
                              ? "previous disabled"
                              : "previous"
                          }
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTabVertical(activeTabVartical - 1);
                            }}
                          >
                            Previous
                          </Link>
                        </li>
                        <li
                          className={
                            activeTabVartical === 4 ? "next disabled" : "next"
                          }
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTabVertical(activeTabVartical + 1);
                            }}
                          >
                            Next
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(AddProduct);
