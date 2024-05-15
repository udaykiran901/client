import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import withRouter from "Components/Common/withRouter";
import Flatpickr from "react-flatpickr";
import moment from "moment";

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
} from "reactstrap";

import { useFormik } from "formik";
import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { OrderSamples, Orders } from "pages/BD/types";
import { getDateAndTime } from "pages/BD/CallBacksList";
import { renderOrderTags, renderParameterDetails } from "pages/BD/OrdersList";
import { completeRegistration } from "slices/thunk";

// const drivers = [
//   { key: "001", label: "Mahesh Babu Gattamaneni" },
//   { key: "002", label: "Allu Arjun" },
//   { key: "003", label: "Prabhas surname" },
//   { key: "004", label: "Nikhil Surname" },
//   { key: "005", label: "Some other Guy" },
// ];

const OrderInfo = (props: any) => {
  const { orderData } = props;
  const order: Orders = orderData;

  const readOnlyForm = order.project_name !== null ? true : false;

  const dispatch: any = useDispatch();
  const [parentRef, setParentRef] = useState<boolean>(false);
  const [nhaiBool, setNhaiBool] = useState<boolean>(false);
  const [existingCustomerBool, setExistingCustomer] = useState<boolean>(false);

  const validation: any = useFormik({
    enableReinitialize: true,

    initialValues: {
      // Cannot edit
      order_id: order.order_id,
      project_name: (order && order.project_name) || "",
      subject: (order && order.subject) || "",
      parent_ref: (order && order.parent_ref) || "",
      nhai_hq_letter: (order && order.nhai_hq_letter) || "",
      additional_info: (order && order.additional_info) || "",
      letter: null,
      due_date: (order && order.due_date) || "",

      //samples info
      samples: order.samplesList.map((eachSample) => ({
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
      // customer_Info
      name: (order && order.customerData && order.customerData.name) || "",
      email: (order && order.customerData && order.customerData.email) || "",
      mobile: (order && order.customerData && order.customerData.contact) || "",
      gst: (order && order.customerData && order.customerData.gst_number) || "",
      pan: (order && order.customerData && order.customerData.pan_number) || "",
      customer_address:
        (order && order.customerData && order.customerData.address) || "",

      //hey Pav... this as reference to edit the form
      //   username: (customer && customer.username) || "",
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
    onSubmit: (values: any) => {
      console.log("submit is triggered");
      console.log(values);
      const data = {
        ...values,
        nhai_bool: nhaiBool,
        parent_ref_bool: parentRef,
        existing_customer: existingCustomerBool,
      };

      dispatch(completeRegistration(data));
    },
  });

  const renderInputField = (key, placeholder, index) => (
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

  console.log("This are the initial values");
  console.log(validation.values);
  return (
    <Container>
      <Row>
        <Col>
          <Form
            onSubmit={(e: any) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <p className="text-danger">
              Please note: Completing this form is a one-time process. However,
              should you need to make any changes, you can submit a request to
              edit the form.
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
              className="p-3 shadow-lg"
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
                        validation.touched.subject && validation.errors.subject
                          ? true
                          : false
                      }
                    />
                    {validation.touched.subject && validation.errors.subject ? (
                      <FormFeedback type="invalid">
                        {validation.errors.subject}
                      </FormFeedback>
                    ) : null}
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
                          date[0] ? moment(date[0]).format("YYYY-MM-DD") : "" // Format the date if selected, otherwise set to empty string
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
                    {validation.errors.letter && validation.touched.letter ? (
                      <span className="text-danger">
                        {validation.errors.letter}
                      </span>
                    ) : null}
                  </div>
                </Col>

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
                {order.samplesList.map(
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
              <h5 className="text-primary mb-2">Customer Info</h5>
              <Row>
                {!readOnlyForm && (
                  <Col xl={6}>
                    <div className="form-check ml-3">
                      <input
                        id="existingCustomer"
                        type="checkbox"
                        checked={existingCustomerBool}
                        className="form-check-input"
                        onChange={() =>
                          setExistingCustomer(!existingCustomerBool)
                        }
                      />
                      <Label htmlFor="existingCustomer">
                        Existing Customer
                      </Label>
                    </div>
                  </Col>
                )}

                <Col xl={12}>
                  <div className="mb-3">
                    <Label>Customer's Name</Label>
                    <Input
                      readOnly={readOnlyForm}
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
                      readOnly={readOnlyForm}
                      name="mobile"
                      type="number"
                      className="form-control"
                      placeholder="Enter phone no"
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.mobile || ""}
                    />
                    {validation.touched.mobile && validation.errors.mobile ? (
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
                      readOnly={readOnlyForm}
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
                      readOnly={readOnlyForm}
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
                      readOnly={readOnlyForm}
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
                      readOnly={readOnlyForm}
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
            </Card>

            {!readOnlyForm && (
              <Row>
                <Col>
                  <div className="text-end">
                    <Button
                      type="submit"
                      color="success"
                      className="save-customer"
                    >
                      Submit
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
  );
};

export default withRouter(OrderInfo);
