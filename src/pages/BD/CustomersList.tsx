import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  Form,
  ModalBody,
  Button,
  Input,
  Label,
  FormFeedback,
  CardTitle,
} from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import TableContainer from "common/TableContainer";

import { createSelector } from "reselect";
import Spinners from "Components/Common/Spinner";
import { ToastContainer } from "react-toastify";
import { EcoActionBD } from "./types";
import {
  getCustomersLast30records,
  getCustomersList,
  getCustomersMonthlyCount,
  registerCustomer,
} from "../../slices/BD/thunk";
import { getDateAndTime } from "./CallBacksList";

import CustomerRecordsLast30Count from "../../pages/Allcharts/apex/CustomerRecordsLast30Count";
import CustomersMonthlyGraph from "../../pages/Allcharts/apex/CustomersMonthlyGraph";

import { Link, useNavigate } from "react-router-dom";

const CustomersList = () => {
  document.title = "Customers list | KDM Engineers Group";

  const [modal, setModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const selectedProperties = createSelector(
    (state: EcoActionBD) => state.bd,
    (bd) => ({
      customers: bd.customers,
      loading: bd.loading,
      customersLast30Recs: bd.customersLast30Recs,
      customersMonthlyRec: bd.customersMonthlyRec,
    })
  );

  const { customers, loading, customersLast30Recs, customersMonthlyRec }: any =
    useSelector(selectedProperties);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getCustomersList());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCustomersMonthlyCount());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCustomersLast30records());
  }, [dispatch]);

  // const validation: any = useFormik({
  //   enableReinitialize: true,
  //   initialValues: {
  //     name: "",
  //     email: "",
  //     mobile: "",
  //     gst: "",
  //     pan: "",
  //     customer_address: "",
  //   },

  //   validationSchema: Yup.object({
  //     name: Yup.string().required("Please Enter Customer Name"),
  //     mobile: Yup.string()
  //       .matches(/^[0-9]{10}$/)
  //       .required("Please Enter Customer's Phone No"),

  //     gst: Yup.string()
  //       .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9]{1}$/)
  //       .required("Please Enter a valid GST Number"),
  //     pan: Yup.string()
  //       .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/)
  //       .required("Please Enter a valid PAN Numebr"),
  //     customer_address: Yup.string().required("Please Customer's Address"),
  //   }),
  //   // onSubmit: (values: any) => {
  //   //   console.log(values);
  //   //   dispatch(registerCustomer(values));
  //   // },

  //   onSubmit: async (values, { resetForm }) => {
  //     try {
  //       console.log(values);
  //       await dispatch(registerCustomer(values));
  //       resetForm();
  //       // toggle();
  //     } catch (error) { }
  //   },
  // });

  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <>
              <p className="text-muted mb-0">{cellProps.row.original.name}</p>
            </>
          );
        },
      },
      {
        header: "Mobile",
        accessorKey: "contact",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <>
              <p className="text-muted mb-0">
                {cellProps.row.original.contact}
              </p>
            </>
          );
        },
      },

      {
        header: "Date of Reg",
        accessorKey: "created_at",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <>
              <p className="text-muted mb-0">
                {getDateAndTime(cellProps.row.original.created_at)}
              </p>
            </>
          );
        },
      },

      {
        header: "Pan Number",
        accessorKey: "pan_number",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <>
              <p className="text-muted mb-0">
                {cellProps.row.original.pan_number}
              </p>
            </>
          );
        },
      },
      {
        header: "GST Number",
        accessorKey: "gst_number",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <>
              <p className="text-muted mb-0">
                {cellProps.row.original.gst_number}
              </p>
            </>
          );
        },
      },

      {
        header: "Address",
        accessorKey: "address",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {

          return (
            <div
              className="address-column"
              style={{
                maxWidth: "200px",
                whiteSpace: "normal",
                wordBreak: "break-word",
              }}
            >
              <p className="text-muted mb-0">
                {cellProps.row.original.address}
              </p>
            </div>
          );
        },
      },

      {
        header: "Edit",
        accessorKey: "edit",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          // console.log(cellProps, 'cellProps')
          return (
            <div
              className="address-column"
              style={{
                maxWidth: "200px",
                whiteSpace: "normal",
                wordBreak: "break-word",
              }}
            >
              <Link to={`/bd/cust/${cellProps.row.original.customer_id}`}>
                <i className="mdi mdi-pencil-outline"></i>
              </Link>
            </div>
          );
        },
      },


    ],
    []
  );

  // const toggle = useCallback(() => {
  //   if (modal) {
  //     setModal(false);
  //   } else {
  //     setModal(true);
  //   }
  // }, [modal]);

  const onClickAddCustomer = () => {
    // toggle();
    navigate('/bd/cust')
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle tag="h6" className="mb-4">
                    Customers Daily Record
                  </CardTitle>
                  <CustomerRecordsLast30Count
                    data={customersLast30Recs || []}
                    dataColors='["--bs-success"]'
                  />
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle tag="h6" className="mb-4">
                    Customers Monthly Record
                  </CardTitle>
                  <CustomersMonthlyGraph
                    data={customersMonthlyRec || []}
                    dataColors='["--bs-primary"]'
                  />
                </CardBody>
              </Card>
            </Col>
            <Col lg="12">
              {loading ? (
                <Spinners />
              ) : (
                <Card>
                  <CardBody>
                    <TableContainer
                      columns={columns}
                      data={customers || []}
                      isGlobalFilter={true}
                      isPagination={true}
                      SearchPlaceholder="Search Customer.."
                      isAddButton={true}
                      handleUserClick={onClickAddCustomer}
                      buttonClass="btn btn-success waves-effect waves-light addContact-modal"
                      buttonName="Add Customer"
                      tableClass="align-middle table-nowrap table-hover dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                      theadClass="table-light"
                      paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                      pagination="pagination"
                    />
                  </CardBody>
                </Card>
              )}
            </Col>
          </Row>

          {/* <Modal size="lg" isOpen={modal} toggle={toggle}>
            <ModalBody>
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
                    <Col xl={12}>
                      <div className="mb-3">
                        <Label>Customer's Name</Label>
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
                          <span className="text-danger">
                            {validation.errors.name}
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
                          value={validation.values.pan.toUpperCase() || ""}
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
                          value={validation.values.gst.toUpperCase() || ""}
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
                      Add Customer
                    </Button>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal> */}
          <ToastContainer />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CustomersList;
