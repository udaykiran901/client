import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Label,
  Input,
  Button,
  Container,
  FormFeedback,
} from "reactstrap";

import { useFormik } from "formik";
import * as Yup from "yup";
import { createSelector } from "reselect";
import { EcoAction, ProductPartialInfo } from "pages/Ecommerce/type";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { getProductsNameId } from "../slices/e-commerence/thunk";
import { getProducts as onGetProducts } from "../slices/e-commerence/thunk";
import { addingParam } from "slices/thunk";

export const generateUniqueID = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");
  const milliseconds = String(currentDate.getMilliseconds()).padStart(3, "0");
  const uniqueID = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  return uniqueID;
};

const AddParam = () => {
  document.title = "Add Parameter | KDM Engineers Group";

  const [rows1, setrows1] = useState([
    {
      test_id: generateUniqueID(),
      testName: "",
      method: "",
      requirement: "",
    },
  ]);

  const handleAddRowNested = () => {
    const newRow = {
      test_id: generateUniqueID(),
      testName: "",
      method: "",
      requirement: "",
    };
    setrows1([...rows1, newRow]);
  };

  const handleRemoveRow = (id: any) => {
    const updatedRows = rows1.filter((row: any) => row.test_id !== id);
    setrows1(updatedRows);
  };

  const handleInputChangeNested = (id: any, name: any, value: any) => {
    const updatedRows = rows1.map((row: any) => {
      if (row.test_id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setrows1(updatedRows);
  };

  const nestedformik: any = useFormik({
    initialValues: {
      id: generateUniqueID(),
      isNabl: "",
      price: "",
      discipline: "",
      additional_info: "",
      subgroup: "",
      requirements: "",
    },

    validationSchema: Yup.object({
      subgroup: Yup.string().required("This field is required"),
      // requirements: Yup.string().required("This field is required"),
      isNabl: Yup.string().required("This field is required"),
      price: Yup.string().required("This field is required"),
      discipline: Yup.string().required("This field is required"),
      // additional_info: Yup.string().required("This field is required"),
    }),

    onSubmit: (value: any) => {
      const formattedData = {
        ...value,
        params: JSON.stringify(rows1),
        common_req: common_req,
      };
      dispatch(addingParam(formattedData));
    },
  });

  const selectProperties = createSelector(
    (state: EcoAction) => state.ecommerce,
    (ecommerce) => ({
      loading: ecommerce.loading,
      productPartialInfo: ecommerce.productPartialInfo,
    })
  );

  const { productPartialInfo } = useSelector(selectProperties);

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(onGetProducts());
  }, [dispatch]);

  const [common_req, setCommon_req] = useState(true);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h6 className="mb-4 card-title">
                    Fill the form to add Parameter
                  </h6>
                  <Form
                    className="outer-repeater"
                    onSubmit={nestedformik.handleSubmit}
                  >
                    <div data-repeater-list="outer-group" className="outer">
                      <div data-repeater-item className="outer">
                        <Row>
                          <Col lg={8}>
                            <div className="mb-3">
                              <label> Select SubGroup</label>
                              <div>
                                <select
                                  className="form-control"
                                  name="subgroup"
                                  id="basicpill-subgroup-input1"
                                  value={nestedformik.values.subgroup}
                                  onChange={nestedformik.handleChange}
                                  onBlur={nestedformik.handleBlur}
                                >
                                  <option value="" disabled>
                                    Select Subgroup
                                  </option>

                                  {productPartialInfo?.map(
                                    (eachProduct: ProductPartialInfo) => (
                                      <option
                                        value={eachProduct.id}
                                        key={eachProduct.id}
                                      >
                                        {eachProduct.name}
                                      </option>
                                    )
                                  )}
                                </select>
                                {nestedformik.errors.subgroup &&
                                nestedformik.touched.subgroup ? (
                                  <span className="text-danger">
                                    {nestedformik.errors.blood}
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div className="mb-3">
                              <Label htmlFor="price">Test Id</Label>
                              <Input
                                onChange={nestedformik.handleChange}
                                type="text"
                                name="id"
                                id="id"
                                className="form-control"
                                value={`${nestedformik.values.id}${nestedformik.values.subgroup}`}
                                readOnly
                              />
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div className="mb-3">
                              <Label htmlFor="price">Price:</Label>
                              <Input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="Enter Price..."
                                className="form-control"
                                value={nestedformik.values.price}
                                onChange={nestedformik.handleChange}
                                onBlur={nestedformik.handleBlur}
                                invalid={
                                  nestedformik.touched.price &&
                                  nestedformik.errors.price
                                }
                              />
                              {nestedformik.errors.price &&
                              nestedformik.touched.price ? (
                                <FormFeedback type="invalid">
                                  {nestedformik.errors.price}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div className="mb-3">
                              <Label htmlFor="discipline">
                                Select Discipline
                              </Label>
                              <Input
                                type="select"
                                name="discipline"
                                id="discipline"
                                className="form-control"
                                value={nestedformik.values.discipline}
                                onChange={nestedformik.handleChange}
                                onBlur={nestedformik.handleBlur}
                                invalid={
                                  nestedformik.touched.discipline &&
                                  nestedformik.errors.discipline
                                }
                              >
                                <option value="" disabled>
                                  Select Discipline
                                </option>
                                <option value="CHEMICAL">Chemical</option>
                                <option value="PHYSICAL">Physical</option>
                              </Input>
                              {nestedformik.errors.discipline &&
                              nestedformik.touched.discipline ? (
                                <FormFeedback type="invalid">
                                  {nestedformik.errors.discipline}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={4}>
                            <div className="mb-3">
                              <Label htmlFor="isNabl">NABL Status:</Label>
                              <Input
                                type="select"
                                name="isNabl"
                                id="isNabl"
                                className="form-control"
                                value={nestedformik.values.isNabl}
                                onChange={nestedformik.handleChange}
                                onBlur={nestedformik.handleBlur}
                                invalid={
                                  nestedformik.touched.isNabl &&
                                  nestedformik.errors.isNabl
                                }
                              >
                                <option value="" disabled>
                                  Select NABL Status
                                </option>
                                <option value={"true"}>NABL</option>
                                <option value={"false"}>NON NABL</option>
                              </Input>
                              {nestedformik.errors.isNabl &&
                              nestedformik.touched.isNabl ? (
                                <FormFeedback type="invalid">
                                  {nestedformik.errors.isNabl}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg="12">
                            <div className="mb-3">
                              <Label for="basicpill-additional_info-input1">
                                additional_info
                              </Label>
                              <textarea
                                id="basicpill-additional_info-input1"
                                className="form-control"
                                name="additional_info"
                                rows={2}
                                placeholder="Enter Your additional_info"
                                value={nestedformik.values.additional_info}
                                onChange={nestedformik.handleChange}
                                onBlur={nestedformik.handleBlur}
                              />
                              {nestedformik.errors.additional_info &&
                              nestedformik.touched.additional_info ? (
                                <span className="text-danger">
                                  {nestedformik.errors.additional_info}
                                </span>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={12}>
                            <div className="form-check form-checkbox-outline form-check-primary mb-3">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="customCheck-outlinecolor1"
                                checked={common_req}
                                onChange={() => {
                                  setCommon_req(!common_req);
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="customCheck-outlinecolor1"
                              >
                                All the tests have common requirements
                              </label>
                            </div>
                          </Col>

                          {common_req && (
                            <Col lg={6}>
                              <div className="mb-3">
                                <Label htmlFor="price">
                                  Enter common requirements
                                </Label>
                                <Input
                                  type="text"
                                  name="requirements"
                                  id="requirements"
                                  placeholder="Enter requirements..."
                                  className="form-control"
                                  value={nestedformik.values.requirements}
                                  onChange={nestedformik.handleChange}
                                  onBlur={nestedformik.handleBlur}
                                  invalid={
                                    nestedformik.touched.requirements &&
                                    nestedformik.errors.requirements &&
                                    common_req
                                  }
                                />
                                {nestedformik.errors.requirements &&
                                nestedformik.touched.requirements ? (
                                  <FormFeedback type="invalid">
                                    {nestedformik.errors.requirements}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                          )}
                        </Row>

                        <div className="inner-repeater mb-4">
                          <Label>Test Names</Label>
                          <table style={{ width: "100%" }}>
                            <tbody>
                              {(rows1 || []).map((formRow, key) => (
                                <tr key={key}>
                                  <td>
                                    <Row className="mb-2">
                                      <Col ls={4}>
                                        <Input
                                          type="text"
                                          name={`testName${formRow.test_id}`}
                                          value={formRow.testName}
                                          className="inner form-control"
                                          placeholder="Enter Parameter"
                                          onChange={(e) =>
                                            handleInputChangeNested(
                                              formRow.test_id,
                                              "testName",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </Col>

                                      <Col ls={3}>
                                        <Input
                                          type="text"
                                          name={`method${formRow.test_id}`}
                                          value={formRow.method}
                                          className="inner form-control"
                                          placeholder="Enter method"
                                          onChange={(e) =>
                                            handleInputChangeNested(
                                              formRow.test_id,
                                              "method",
                                              e.target.value
                                            )
                                          }
                                        />
                                      </Col>

                                      {!common_req && (
                                        <Col ls={3}>
                                          <Input
                                            type="text"
                                            name={`requirement${formRow.test_id}`}
                                            value={formRow.requirement}
                                            className="inner form-control"
                                            placeholder="Enter requirement"
                                            onChange={(e) =>
                                              handleInputChangeNested(
                                                formRow.test_id,
                                                "requirement",
                                                e.target.value
                                              )
                                            }
                                          />
                                        </Col>
                                      )}

                                      <Col md="2" xs="4">
                                        <Button
                                          color="primary"
                                          className="btn-block inner"
                                          id="unknown-btn"
                                          style={{ width: "100%" }}
                                          onClick={() =>
                                            handleRemoveRow(formRow.test_id)
                                          }
                                        >
                                          Remove
                                        </Button>
                                      </Col>
                                    </Row>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <Button
                            onClick={() => {
                              handleAddRowNested();
                            }}
                            color="success"
                            className="mt-1"
                          >
                            Add Param
                          </Button>
                        </div>

                        <Button type="submit" color="primary">
                          Submit
                        </Button>
                      </div>
                    </div>
                  </Form>
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

export default AddParam;
