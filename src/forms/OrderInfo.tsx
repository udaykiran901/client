import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import withRouter from "Components/Common/withRouter";
import Flatpickr from "react-flatpickr";
import moment from "moment";
import Select from "react-select";

import {
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
  Button,
  FormFeedback,
  Card,
  Table,
  Spinner,
} from "reactstrap";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { Branch, Customer, OrderSamples, Orders } from "pages/BD/types";
import { getDateAndTime } from "pages/BD/CallBacksList";
import { renderParameterDetails } from "pages/BD/OrdersList";
import {
  completeRegistration,
  getBranches,
  getCompleteOrderDetails,
  getCustomersList,
} from "slices/thunk";
import { createSelector } from "reselect";
import { EcoAction } from "pages/Ecommerce/type";
import { useSelector } from "react-redux";

// const drivers = [
//   { key: "001", label: "Mahesh Babu Gattamaneni" },
//   { key: "002", label: "Allu Arjun" },
//   { key: "003", label: "Prabhas surname" },
//   { key: "004", label: "Nikhil Surname" },
//   { key: "005", label: "Some other Guy" },
// ];

export const formatSelectOptions = (options: any) => {
  return [
    {
      label: "Select From Below",
      options: (options || []).map((eachOption: any) => ({
        label: eachOption.label,
        value: eachOption.id,
      })),
    },
  ];
};

const OrderInfo = (props: any) => {
  const params = props.router.params;
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (params && params.id) {
      dispatch(getCompleteOrderDetails(params.id));
    }
  }, [dispatch, params]);

  const selectedProperties = createSelector(
    (state) => state.bd,
    (bd) => ({
      orderInfo: bd.orderInfo,
      loading: bd.loading,
      step2loader: bd.step2loader,
      customers: bd.customers,
    })
  );

  const hrSelectedProperties = createSelector(
    (state: any) => state.hrAndAdmin,
    (hrAndAdmin) => ({
      branches: hrAndAdmin.branches,
      loading2: hrAndAdmin.loading,
    })
  );

  const { orderInfo, loading, step2loader, customers }: any =
    useSelector(selectedProperties);

  const { branches, loading2 } = useSelector(hrSelectedProperties);

  const order: Orders = orderInfo;

  const readOnlyForm = order.registration_done ? true : false;

  useEffect(() => {
    dispatch(getCustomersList());
  }, [dispatch, readOnlyForm]);

  useEffect(() => {
    dispatch(getBranches());
  }, [dispatch, readOnlyForm]);

  const [parentRef, setParentRef] = useState<boolean>(false);
  const [nhaiBool, setNhaiBool] = useState<boolean>(false);
  //select customer variable
  const [selectedGroup, setselectedGroup] = useState(null) as any[];
  const [selectedGroup2, setselectedGroup2] = useState(null) as any[];

  const handleSelectGroup = (setselectedGroup: any, selectedOption: any) => {
    setselectedGroup(selectedOption);
    validation.setFieldValue("customer_id", selectedOption.value);
  };

  const handleSelectGroup2 = (setselectedGroup2: any, selectedOption: any) => {
    setselectedGroup2(selectedOption);
    validation.setFieldValue("lab", selectedOption.value);
  };

  //end of this fucking variables
  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      order_id: order.order_id,
      project_name: (order && order.project_name) || "",
      subject: (order && order.subject) || "",
      parent_ref: (order && order.parent_ref) || "",
      nhai_hq_letter: (order && order.nhai_hq_letter) || "",
      additional_info: (order && order.additional_info) || "",
      letter: null,
      due_date: (order && order.due_date) || "",

      //samples info
      samples: (order.samplesList || []).map((eachSample) => ({
        sample_id: eachSample.sample_id,
        source: eachSample.source || "",
        quantity: eachSample.quantity || "",
        grade: eachSample.grade || "",
        brandName: eachSample.brandName || "",
        week_no: eachSample.week_no || "",
        ref_code: eachSample.ref_code || "",
        sample_id_optional_field: eachSample.sample_id_optional_field || "",
        site_name: "", //update sitename in data base
      })),

      samples_address: (order && order.samples_collection_address) || "",
      customer_id: "",

      //lab details
      lab: (order && order.lab) || "",
    },

    validationSchema: Yup.object({
      project_name: Yup.string().required("Please Enter Project Name"),
      subject: Yup.string().required("Please Enter Subject"),
      letter: Yup.mixed().required("Letter is required"),
      due_date: Yup.date().required("Expected Delivery Date is required"),

      //samples data
      samples: Yup.array().of(
        Yup.object().shape({
          source: Yup.string().required("Please provide sample source"),
          quantity: Yup.string().required("Please provide sample quantity"),
          brandName: Yup.string(),
          grade: Yup.string(),
          week_no: Yup.string(),
          ref_code: Yup.string(),
          sample_id_optional_field: Yup.string(),
          site_name: Yup.string(),
        })
      ),
      samples_address: Yup.string().required("This Field is required"),

      //customer_Info
      customer_id: Yup.string().required("Customer is required"),
      lab: Yup.string().required("Please assign the lab"),
    }),
    onSubmit: (values: any) => {
      const data = {
        ...values,
        nhai_bool: nhaiBool,
        parent_ref_bool: parentRef,
      };

      console.log(data);

      dispatch(completeRegistration(data));
    },
  });

  const renderInputField = (key: any, placeholder: any, index: any) => (
    <tr>
      <td className="p-1" style={{ width: "200px" }}>
        <small>{placeholder}</small>
      </td>
      <td
        className="p-1"
        style={{ backgroundColor: readOnlyForm ? "#e9ecef" : "transparent" }}
      >
        <Input
          name={`samples[${index}].${key}`}
          type="text"
          onChange={validation.handleChange}
          onBlur={validation.handleBlur}
          value={validation.values.samples[index]?.[key] || ""}
          placeholder={placeholder}
          className="border-0 m-0 p-0"
          readOnly={readOnlyForm}
        />
      </td>
    </tr>
  );

  const formattedCustomersRecords = (customers || []).map(
    (eachCustomer: Customer) => ({
      label: `${eachCustomer.name} - ${eachCustomer.contact} - ${eachCustomer.pan_number}`,
      id: eachCustomer.customer_id,
    })
  );

  const formattedLabs = (branches || []).map((eachBranch: Branch) => ({
    label: eachBranch.branch,
    id: eachBranch.branch_id,
  }));

  const optionsList = formatSelectOptions(formattedCustomersRecords);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              {loading && <Spinner />}
              <Form
                onSubmit={(e: any) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <p className="text-danger">
                  Please note: Completing this form is a one-time process.
                  However, should you need to make any changes, you can submit a
                  request to edit the form.
                </p>

                <div className="table-responsive">
                  <Table
                    className="table table-bordered"
                    style={{ borderColor: "#eff2f7" }}
                  >
                    <tbody>
                      <tr>
                        <th>Order Id</th>
                        <td>
                          <code>{order.order_id}</code>
                        </td>
                      </tr>
                      <tr>
                        <th>Razorpay Id</th>
                        <code>{order.razorpay_payment_id}</code>
                      </tr>
                      <tr>
                        <th>Order Placed On</th>
                        <td>{getDateAndTime(order.placedOn)}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                <Card
                  className="p-3"
                  style={{
                    backgroundColor: readOnlyForm ? "#e9ecef" : "transparent",
                  }}
                >
                  <h5 className="text-primary mb-2">Order Info</h5>
                  <Row>
                    <Col xl={12}>
                      <div className="mb-3">
                        <Label>Project Name</Label>
                        <Input
                          name="project_name"
                          readOnly={readOnlyForm}
                          type="textarea"
                          rows="3"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.project_name || ""}
                          placeholder="Enter Project Name"
                          invalid={
                            validation.touched.project_name &&
                            validation.errors.project_name
                              ? true
                              : false
                          }
                        />
                        {validation.touched.project_name &&
                        validation.errors.project_name ? (
                          <FormFeedback type="invalid">
                            {validation.errors.project_name}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col xl={12}>
                      <div className="mb-3">
                        <Label>Subject</Label>
                        <Input
                          readOnly={readOnlyForm}
                          name="subject"
                          type="textarea"
                          rows={2}
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.subject || ""}
                          placeholder="Enter Subject"
                          invalid={
                            validation.touched.subject &&
                            validation.errors.subject
                              ? true
                              : false
                          }
                        />
                        {validation.touched.subject &&
                        validation.errors.subject ? (
                          <FormFeedback type="invalid">
                            {validation.errors.subject}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={12}>
                      <div className="mb-3">
                        <Label>Assign Lab </Label>
                        <Select
                          onBlur={() => validation.setFieldTouched("lab", true)}
                          value={selectedGroup2}
                          onChange={(selectedOption) => {
                            handleSelectGroup2(selectedGroup2, selectedOption);
                          }}
                          options={formattedLabs}
                          className="select2-selection"
                        />
                        {validation.touched.lab && validation.errors.lab && (
                          <span className="text-danger">
                            {validation.errors.lab}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col xl={6}>
                      <div className="form-check ml-3">
                        <input
                          readOnly={readOnlyForm}
                          id="perentRef"
                          type="checkbox"
                          checked={parentRef}
                          className="form-check-input"
                          onChange={() => setParentRef(!parentRef)}
                        />
                        <Label htmlFor="perentRef">Note Parent Ref</Label>
                      </div>
                    </Col>
                    <Col xl={6}>
                      <div className="form-check ml-3">
                        <input
                          readOnly={readOnlyForm}
                          id="nhai_Letter"
                          type="checkbox"
                          checked={nhaiBool}
                          className="form-check-input"
                          onChange={() => setNhaiBool(!nhaiBool)}
                        />
                        <Label htmlFor="nhai_Letter">Note NHAI HQ</Label>
                      </div>
                    </Col>
                    {parentRef && (
                      <Col xl={6}>
                        <div className="mb-3">
                          <Label>Parent Reference</Label>
                          <Input
                            readOnly={readOnlyForm}
                            name="parent_ref"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.parent_ref || ""}
                            placeholder="Enter Parent Reference"
                          />
                        </div>
                      </Col>
                    )}
                    {nhaiBool && (
                      <Col xl={6}>
                        <div className="mb-3">
                          <Label>NHAI HQ Letter</Label>
                          <Input
                            readOnly={readOnlyForm}
                            name="nhai_hq_letter"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.nhai_hq_letter || ""}
                            placeholder="Enter NHAI HQ"
                          />
                        </div>
                      </Col>
                    )}

                    <Col xl={6}>
                      <div className="mb-3">
                        <Label>Expected Delivery Date</Label>

                        <Flatpickr
                          type="date"
                          name="due_date"
                          className="form-control d-block"
                          placeholder="Select Expected Delivery Date"
                          options={{
                            mode: "single",
                            dateFormat: "d M, Y",
                          }}
                          value={validation.values.due_date}
                          onChange={(date) => {
                            validation.setFieldValue(
                              "due_date",
                              date[0]
                                ? moment(date[0]).format("YYYY-MM-DD")
                                : "" // Format the date if selected, otherwise set to empty string
                            );
                            if (!date[0]) {
                              validation.setFieldTouched("due_date", true); // Mark the field as touched only if date is not selected
                            }
                          }}
                        />
                        {validation.touched.due_date &&
                          !validation.values.due_date && ( // Display error message only if the field is touched and no date is selected
                            <span className="text-danger">
                              {validation.errors.due_date}
                            </span>
                          )}
                      </div>
                    </Col>
                    {!readOnlyForm && (
                      <Col lg={6}>
                        <div className="mb-3">
                          <Label htmlFor="image">Letter</Label>
                          <Input
                            readOnly={readOnlyForm}
                            type="file"
                            id="letter"
                            name="letter"
                            onChange={(event) => {
                              const file =
                                event.currentTarget.files &&
                                event.currentTarget.files[0];
                              if (file) {
                                validation.setFieldValue("letter", file);
                              }
                            }}
                            onBlur={validation.handleBlur}
                          />
                          {validation.errors.letter &&
                          validation.touched.letter ? (
                            <span className="text-danger">
                              {validation.errors.letter}
                            </span>
                          ) : null}
                        </div>
                      </Col>
                    )}
                    <Col xl={12}>
                      <div className="mb-3">
                        <Label>Additional Information</Label>
                        <Input
                          readOnly={readOnlyForm}
                          name="additional_info"
                          type="textarea"
                          rows="3"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.additional_info || ""}
                          placeholder="Any additional Info"
                        />
                      </div>
                    </Col>
                  </Row>
                </Card>

                <Card
                  className="p-3 shadow-lg"
                  style={{
                    backgroundColor: readOnlyForm ? "#e9ecef" : "transparent",
                  }}
                >
                  <h5 className="text-primary mb-3">Sample's data</h5>

                  <Row>
                    {order &&
                      order.samplesList &&
                      order.samplesList.map(
                        (eachSample: OrderSamples, index: number) => (
                          <div key={eachSample.sample_id}>
                            <div className="d-flex">
                              <div className="flex-shrink-0 me-3">
                                <img
                                  src={eachSample.image}
                                  alt={eachSample.image}
                                  className="rounded avatar-md"
                                />
                              </div>

                              <div className="flex-grow-1">
                                <p className="mb-lg-0">
                                  <code>Sample - {index + 1 + "   "}</code>
                                  <code>({eachSample.sample_id})</code>
                                </p>
                                <h6 className="mt-2">{eachSample.name}</h6>
                                {renderParameterDetails(eachSample, index)}

                                <div className="table-responsive">
                                  <p className="text-success m-0">
                                    * Please fill the table
                                  </p>
                                  <Table
                                    className="table table-bordered"
                                    style={{ borderColor: "#eff2f7" }}
                                  >
                                    <tbody>
                                      {renderInputField(
                                        `source`,
                                        "Enter Source *",
                                        index
                                      )}
                                      {renderInputField(
                                        `quantity`,
                                        "Enter Qty",
                                        index
                                      )}
                                      {renderInputField(
                                        `brandName`,
                                        "Brand Name (Optional)",
                                        index
                                      )}
                                      {renderInputField(
                                        `grade`,
                                        "Grade Name (Optional)",
                                        index
                                      )}
                                      {renderInputField(
                                        `week_no`,
                                        "Week Number (Optional)",
                                        index
                                      )}
                                      {renderInputField(
                                        `ref_code`,
                                        "Reference Code (Optional)",
                                        index
                                      )}
                                      {renderInputField(
                                        `sample_id_optional_field`,
                                        "Sample ID (Optional)",
                                        index
                                      )}
                                      {renderInputField(
                                        `site_name`,
                                        "Site Name (Optional)",
                                        index
                                      )}
                                    </tbody>
                                  </Table>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    <Col xl={12}>
                      <div className="mb-3">
                        <Label>Sample Collection Address</Label>
                        <Input
                          readOnly={readOnlyForm}
                          name="samples_address"
                          type="textarea"
                          rows="3"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.samples_address || ""}
                          placeholder="Any additional Info"
                          invalid={
                            validation.touched.samples_address &&
                            validation.errors.samples_address
                              ? true
                              : false
                          }
                        />
                        {validation.touched.samples_address &&
                        validation.errors.samples_address ? (
                          <FormFeedback type="invalid">
                            {validation.errors.samples_address}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                </Card>

                <Card
                  className="p-3 shadow-lg"
                  style={{
                    backgroundColor: readOnlyForm ? "#e9ecef" : "transparent",
                  }}
                >
                  <h5 className="text-primary mb-3">Customer's Data</h5>

                  {!readOnlyForm && (
                    <Row>
                      <Col lg={12}>
                        <div className="mb-3">
                          <Label>Select Customer</Label>
                          <Select
                            onBlur={() =>
                              validation.setFieldTouched("customer_id", true)
                            }
                            value={selectedGroup}
                            onChange={(selectedOption) => {
                              handleSelectGroup(
                                setselectedGroup,
                                selectedOption
                              );
                            }}
                            options={optionsList}
                            className="select2-selection"
                          />
                          {validation.touched.customer_id &&
                            validation.errors.customer_id && (
                              <span className="text-danger">
                                {validation.errors.customer_id}
                              </span>
                            )}
                        </div>
                      </Col>
                    </Row>
                  )}
                </Card>

                {!readOnlyForm && (
                  <Row>
                    <Col>
                      <div className="text-end">
                        <Button
                          type="submit"
                          color="success"
                          className="save-customer"
                          disabled={step2loader}
                        >
                          {step2loader ? (
                            <>
                              Submit <i className="bx bx-loader bx-spin "></i>
                            </>
                          ) : (
                            "Submit"
                          )}
                        </Button>
                      </div>
                    </Col>
                  </Row>
                )}
              </Form>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(OrderInfo);
