import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";

import { Col, Row, Form, Button, Input, Label, FormFeedback } from "reactstrap";

import { useDispatch } from "react-redux";

const AdditionalInfoForm = () => {
  document.title = "Customer's query | KDM Engineers Group";

  const dispatch: any = useDispatch();

  const validation: any = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      gst: "",
      pan: "",
      customer_address: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Customer Name"),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/)
        .required("Please Enter Customer's Phone No"),

      gst: Yup.string()
        .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9]{1}$/)
        .required("Please Enter a valid GST Number"),
      pan: Yup.string()
        .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/)
        .required("Please Enter a valid PAN Numebr"),
      customer_address: Yup.string().required("Please Customer's Address"),
    }),

    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      // try {
      //   console.log(values);
      //   await dispatch(registerCustomer(values));
      //   resetForm();
      //   toggle();
      // } catch (error) {}
    },
  });

  return (
    <Form
      onSubmit={(e: any) => {
        e.preventDefault();
        validation.handleSubmit();
        return false;
      }}
    >
      <Row>
        <h6 className="text-primary text-center mb-4">
          Fill the form and hit submit button
        </h6>
        <Row>
          <div className="mb-3">
            <Label>Your Name</Label>
            <Input
              name="name"
              type="text"
              className="form-control"
              placeholder="Enter Customer's Name "
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.name || ""}
            />
            {validation.touched.name && validation.errors.name ? (
              <span className="text-danger">{validation.errors.name}</span>
            ) : null}
          </div>

          <div className="mb-3">
            <Label>Your Contact</Label>
            <Input
              name="mobile"
              type="number"
              className="form-control"
              placeholder="Enter phone no"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.mobile || ""}
            />
            {validation.touched.mobile && validation.errors.mobile ? (
              <span className="text-danger">{validation.errors.mobile}</span>
            ) : null}
          </div>

          <div className="mb-3">
            <Label>Customer Email</Label>
            <Input
              name="email"
              type="email"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.email || ""}
              placeholder="Enter Customer Email"
            />
          </div>

          <div className="mb-3">
            <Label>Query</Label>
            <Input
              name="customer_address"
              type="textarea"
              rows="3"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.customer_address || ""}
              placeholder="Any additional Info"
              invalid={
                validation.touched.customer_address &&
                validation.errors.customer_address
                  ? true
                  : false
              }
            />
            {validation.touched.customer_address &&
            validation.errors.customer_address ? (
              <span className="text-danger">
                {validation.errors.customer_address}
              </span>
            ) : null}
          </div>
        </Row>
      </Row>
      <Row>
        <Col>
          <Button type="submit" color="success">
            Submit Query
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AdditionalInfoForm;
