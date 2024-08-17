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

import { AppDispatch } from "index";

import { useParams } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";

import { createSelector } from "reselect";
import { UseSelector } from "react-redux";


import { registerCustomer } from "slices/thunk";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

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

const AddCustomer = () => {
    document.title = "Add Customer | KDM Engineers Group";

    const dispatch = useDispatch<AppDispatch>();



    const selectedProperties = createSelector((state: any) => state.bd, (bd: any) => ({
        allCustomers: bd.customers

    }));

    const { allCustomers } = useSelector(selectedProperties);

    // console.log(allCustomers, 'cust det')

    const validation: any = useFormik({
        // enableReinitialize: true,
        initialValues: {
            id: null,
            customerName: "",
            email: "",
            mobile: "",
            gst: "",
            pan: "",
            customer_address: "",
        },

        validationSchema: Yup.object({
            customerName: Yup.string().required("Please Enter Customer Name"),
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
        // onSubmit: (values: any) => {
        //   console.log(values);
        //   dispatch(registerCustomer(values));
        // },

        onSubmit: async (values, { resetForm }) => {
            try {
                // console.log(values, 'customer final values');
                await dispatch(registerCustomer(values));
                resetForm();
                // toggle();
            } catch (error) { }
        },
    });

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const neededCustomer = allCustomers.find((eachCust: any) => eachCust.customer_id === id);

            // console.group(neededCustomer, 'neededCust');
            validation.setValues({
                id: id,
                customerName: neededCustomer.name,
                email: neededCustomer.email,
                mobile: neededCustomer.contact,
                gst: neededCustomer.gst_number,
                pan: neededCustomer.pan_number,
                customer_address: neededCustomer.address,
            })
        }
    }, [dispatch, id]);


    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <CardBody>
                                    <h6 className="mb-4 card-title">
                                        Fill the form to add Customer
                                    </h6>

                                    <Form
                                        onSubmit={validation.handleSubmit}
                                    >
                                        <Row>
                                            {/* <h6 className="text-primary text-center mb-4">
                                                Fill the form and hit submit button
                                            </h6> */}
                                            <Row>
                                                <Col xl={6}>
                                                    <div className="mb-3">
                                                        <Label>Customer's Name</Label>
                                                        <Input
                                                            name="customerName"
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Enter Customer's Name "
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.customerName || ""}
                                                        />
                                                        {validation.touched.customerName && validation.errors.customerName ? (
                                                            <span className="text-danger">
                                                                {validation.errors.customerName}
                                                            </span>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                                <Col xl={6}>
                                                    <div className="mb-3">
                                                        <Label>Customer Contact</Label>
                                                        <Input
                                                            name="mobile"
                                                            type="number"
                                                            className="form-control"
                                                            placeholder="Enter phone no"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.mobile || ""}
                                                        />
                                                        {validation.touched.mobile &&
                                                            validation.errors.mobile ? (
                                                            <span className="text-danger">
                                                                {validation.errors.mobile}
                                                            </span>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xl={6}>
                                                    <div className="mb-3">
                                                        <Label>PAN Number</Label>
                                                        <Input
                                                            name="pan"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.pan || ""}
                                                            placeholder="Enter Pan XXXXX9999X Number"
                                                            invalid={
                                                                validation.touched.pan && validation.errors.pan
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {validation.touched.pan && validation.errors.pan ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.pan}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xl={6}>
                                                    <div className="mb-3">
                                                        <Label>GST Number</Label>
                                                        <Input
                                                            name="gst"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.gst || ""}
                                                            placeholder="Enter GST - XXABCDEXXXXZXZX Number"
                                                            invalid={
                                                                validation.touched.gst && validation.errors.gst
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {validation.touched.gst && validation.errors.gst ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.gst}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xl={6}>
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
                                                </Col>

                                                <Col xl={12}>
                                                    <div className="mb-3">
                                                        <Label>Customer's Address</Label>
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
                                                </Col>
                                            </Row>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Button type="submit" color="primary">
                                                    {id ? 'Update Customer' : 'Add Customer'}
                                                </Button>
                                            </Col>
                                        </Row>
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

export default AddCustomer;
