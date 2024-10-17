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


import { registerCustomer, getCustomersList } from "slices/thunk";
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
            gst_number_1: "",
            gst_number_2: '',
            gst_number_3: '',
            pan: "",
            customer_address: "",
        },

        validationSchema: Yup.object({
            customerName: Yup.string().required("Please Enter Customer Name"),
            mobile: Yup.string()
                .matches(/^[0-9]{10}$/)
                .required("Please Enter Customer's Phone No"),

            // gst: Yup.string()
            //     .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9]{1}$/)
            //     .required("Please Enter a valid GST Number"),
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
                console.log(values, 'customer final values');
                await dispatch(registerCustomer(values));
                resetForm();
                // toggle();
            } catch (error) { }
        },
    });

    const { id } = useParams();

    // useEffect(() => {
    //     dispatch(getCustomersList());
    // }, []);

    useEffect(() => {
        if (id) {
            const neededCustomer = allCustomers.find((eachCust: any) => eachCust.customer_id == id);

            console.log(neededCustomer, 'neededCustomer');

            if (!neededCustomer) {
                dispatch(getCustomersList());
            }

            if (neededCustomer) {



                const gstNumbers = neededCustomer.gst.map(item => item.gst_number);

                const rowNumbers = neededCustomer.gst.map(item => item.row_id);

                console.log(gstNumbers)

                let gst1 = '';
                let gst2 = '';
                let gst3 = '';

                let row1 = '';
                let row2 = '';
                let row3 = '';


                if (gstNumbers.length >= 1) {
                    gst1 = gstNumbers[0];
                    row1 = rowNumbers[0];
                    // console.log(row1);
                    // console.log(gst1);
                }

                if (gstNumbers.length >= 2) {
                    gst2 = gstNumbers[1];
                    row2 = rowNumbers[1];
                    // console.log(row2);
                    // console.log(gst2);
                }

                if (gstNumbers.length >= 3) {
                    gst3 = gstNumbers[2];
                    row3 = rowNumbers[2];
                    // console.log(row3);
                    // console.log(gst3);
                }

                // console.log(gst1);
                // console.log(gst2);
                // console.log(gst3);

                validation.setValues({
                    id: id,
                    customerName: neededCustomer.name,
                    email: neededCustomer.email,
                    mobile: neededCustomer.contact,
                    row_id1: row1,
                    row_id2: row2,
                    row_id3: row3,
                    gst_number_1: gst1,
                    gst_number_2: gst2,
                    gst_number_3: gst3,
                    pan: neededCustomer.pan_number,
                    customer_address: neededCustomer.address,
                })

                // validation.setValues({
                //     id: 'id',
                //     customerName: 'neededCustomer.name',
                //     email: 'neededCustomer.email',
                //     mobile: 'neededCustomer.contact',
                //     row_id1: 'row1',
                //     row_id2: 'row2',
                //     row_id3: 'row3',
                //     gst_number_1: 'gst1',
                //     gst_number_2: 'gst2',
                //     gst_number_3: 'gst3',
                //     pan: 'neededCustomer.pan_number',
                //     customer_address: 'neededCustomer.address',
                // })

            }




        }
    }, [dispatch, id, allCustomers]);




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
                                                        <Label>GST Number 1</Label>
                                                        <Input
                                                            name="gst_number_1"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.gst_number_1 || ""}
                                                            placeholder="Enter GST - XXABCDEXXXXZXZX Number"
                                                            invalid={
                                                                validation.touched.gst_number_1 && validation.errors.gst_number_1
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {validation.touched.gst_number_1 && validation.errors.gst_number_1 ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.gst_number_1}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xl={6}>
                                                    <div className="mb-3">
                                                        <Label>GST Number 2</Label>
                                                        <Input
                                                            name="gst_number_2"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.gst_number_2 || ""}
                                                            placeholder="Enter GST - XXABCDEXXXXZXZX Number"
                                                            invalid={
                                                                validation.touched.gst_number_2 && validation.errors.gst_number_2
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {validation.touched.gst_number_2 && validation.errors.gst_number_2 ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.gst_number_2}
                                                            </FormFeedback>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xl={6}>
                                                    <div className="mb-3">
                                                        <Label>GST Number 3</Label>
                                                        <Input
                                                            name="gst_number_3"
                                                            type="text"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.gst_number_3 || ""}
                                                            placeholder="Enter GST - XXABCDEXXXXZXZX Number"
                                                            invalid={
                                                                validation.touched.gst_number_3 && validation.errors.gst_number_3
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        {validation.touched.gst_number_3 && validation.errors.gst_number_3 ? (
                                                            <FormFeedback type="invalid">
                                                                {validation.errors.gst_number_3}
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
