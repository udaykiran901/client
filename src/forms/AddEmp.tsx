import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import withRouter from "Components/Common/withRouter";

import {
  getAccessKeys,
  getBranches,
  getDepartments,
  getRoles,
  onRegisterEmployee,
  getEmployees,
} from "slices/thunk";

import {
  Card,
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
  Button,
  // Table,
} from "reactstrap";

import classnames from "classnames";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

//Import Breadcrumb
// import Breadcrumbs from "../../Components/Common/Breadcrumb";

import { useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
  AccessKey,
  Branch,
  Department,
  EcoActionHRandAdmin,
  Employee,
  Role,
} from "pages/HRandAdmin/types";
import { useSelector } from "react-redux";

export const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
  "Not Specified",
];

const AddEmp = (props: any) => {
  document.title = "Employee Details | KDM Engineers Group";
  const [activeTab, setactiveTab] = useState<number>(1);
  const [passedSteps, setPassedSteps] = useState([1]);

  const dispatch: any = useDispatch();

  const selectProperties = createSelector(
    (state: EcoActionHRandAdmin) => state.hrAndAdmin,
    (hrAndAdmin) => ({
      employees: hrAndAdmin.employees,
      roles: hrAndAdmin.roles,
      departments: hrAndAdmin.departments,
      branches: hrAndAdmin.branches,
      accessKeys: hrAndAdmin.accessKeys,
      loading: hrAndAdmin.loading,
      error: hrAndAdmin.error,
    })
  );

  const { employees, roles, departments, branches, accessKeys } =
    useSelector(selectProperties);

  useEffect(() => {
    dispatch(getRoles());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBranches());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAccessKeys());
  }, [dispatch]);

  function toggleTab(tab: any) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];
      if (tab >= 1 && tab <= 4) {
        setactiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
  }

  const [married, setMarried] = useState(false);

  const navigate = useNavigate();

  const wizardformik: any = useFormik({
    initialValues: {
      //employee Details
      emp_id: "",
      dob: "1999-11-10",
      firstname: "",
      lastname: "",
      phoneno: "7788997788",
      email: "fakegmail@gmail.com",
      address:
        "KDM ENGINEERS (INDIA) PVT. LTD. Regd. & Corporate Office:- Plot No. 401, Sri Ramana Colony, Karmanghat, Saroornagar (M), Hyderabad 500079.",
      gender: "",

      //personnel
      // married: "",
      spouse_name: "",
      spouse_contact: "",

      father_name: "Some Name",
      emergency_contact: "8877995566",
      blood: "",

      //tab 2
      dept: "",
      role: "",
      doa: "",
      salary: "10000",
      branch: "",
      reportingTo: "",
      access_to: "",

      //tab 2
      // panNo: "",
      // vatNo: "",
      // cstNo: "",
      // taxNo: "",
      // uin: "",
      // declaration: "",
      //tab 3
      // card: "",
      // creditcard: "",
      // creditno: "",
      // cardvarification: "",
      // expiratdata: "",
    },

    validationSchema: Yup.object({
      emp_id: Yup.string().required("This field is required"),
      dob: Yup.string().required("This field is required"),
      firstname: Yup.string().required("This field is required"),
      lastname: Yup.string().required("This field is required"),
      phoneno: Yup.string()
        .matches(/^[0-9]{10}$/)
        .required("Please Enter Your Phone No"),
      email: Yup.string()
        .email()
        .matches(/^(?!.*@[^,]*,)/)
        .required("Please Enter Your Email"),
      address: Yup.string().required("This field is required"),

      // spouse_name: Yup.string().required("This field is required"),
      // spouse_contact: Yup.string()
      //   .matches(/^[0-9]{10}$/)
      //   .required("Please Enter Your Phone No"),

      father_name: Yup.string().required("This field is required"),
      emergency_contact: Yup.string()
        .matches(/^[0-9]{10}$/)
        .required("Please Enter Your Phone No"),
      blood: Yup.string().required("This field is required"),

      //tab 2
      dept: Yup.string().required("Dept is required"),
      role: Yup.string().required("Role is required"),
      doa: Yup.string().required("Date of appointment is required"),
      salary: Yup.string().required("Salary is required"),
      branch: Yup.string().required("Branch is required"),
      access_to: Yup.string().required("Branch is required and it is one time"),
      reportingTo: Yup.string().required(
        "Assigning Reporting manager Mandatory"
      ),

      // reportingTo: Yup.string().required("This field is required"),

      // panNo: Yup.string().required("This field is required"),
      // vatNo: Yup.string().required("This field is required"),
      // cstNo: Yup.string().required("This field is required"),
      // taxNo: Yup.string().required("This field is required"),
      // uin: Yup.string().required("This field is required"),
      // declaration: Yup.string().required("This field is required"),
      //tab 3

      // card: Yup.string().required("This field is required"),
      // creditcard: Yup.string().required("This field is required"),
      // creditno: Yup.string().required("This field is required"),
      // cardvarification: Yup.string().required("This field is required"),
      // expiratdata: Yup.string().required("This field is required"),
    }),

    onSubmit: async (values: any) => {
      const data = { ...values, married, selectedGender };

      dispatch(onRegisterEmployee(data));
    },
  });

  const [selectedGender, setSelectedGender] = useState("");
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Row>
                    <Col lg={6}>
                      {" "}
                      <h4 className="card-title mb-4">Employee Form</h4>
                    </Col>
                    <Col className="text-right">
                      <Button
                        color="success"
                        className="btn btn-success "
                        type="button"
                        onClick={() => navigate("/hr/emp-list")}
                      >
                        Employee's List
                      </Button>
                    </Col>
                  </Row>

                  <div className="wizard clearfix">
                    <div className="steps clearfix">
                      <ul>
                        <NavItem
                          className={classnames({ current: activeTab === 1 })}
                        >
                          <NavLink
                            className={classnames({ current: activeTab === 1 })}
                            onClick={() => {
                              setactiveTab(1);
                            }}
                            disabled={!(passedSteps || []).includes(1)}
                          >
                            <span className="number">1.</span> Employee Details
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 2 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 2 })}
                            onClick={() => {
                              setactiveTab(2);
                            }}
                            disabled={!(passedSteps || []).includes(2)}
                          >
                            <span className="number">2.</span> Work Profile
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 3 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 3 })}
                            onClick={() => {
                              setactiveTab(3);
                            }}
                            disabled={!(passedSteps || []).includes(3)}
                          >
                            <span className="number">3.</span> Documents
                          </NavLink>
                        </NavItem>
                        <NavItem
                          className={classnames({ current: activeTab === 4 })}
                        >
                          <NavLink
                            className={classnames({ active: activeTab === 4 })}
                            onClick={() => {
                              setactiveTab(4);
                            }}
                            disabled={!(passedSteps || []).includes(4)}
                          >
                            <span className="number">4.</span>Conformation
                          </NavLink>
                        </NavItem>
                      </ul>
                    </div>
                    <div className="content clearfix">
                      <Form onSubmit={wizardformik.handleSubmit}>
                        <TabContent activeTab={activeTab} className="body">
                          <TabPane tabId={1}>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-emp_id-input1">
                                    Employee Id
                                  </Label>
                                  <Input
                                    type="number"
                                    name="emp_id"
                                    className="form-control"
                                    id="basicpill-emp_id-input1"
                                    placeholder="Enter Employee Id"
                                    value={wizardformik.values.emp_id}
                                    onChange={wizardformik.handleChange}
                                    onBlur={wizardformik.handleBlur}
                                  />
                                  {wizardformik.errors.emp_id &&
                                  wizardformik.touched.emp_id ? (
                                    <span className="text-danger">
                                      {wizardformik.errors.emp_id}
                                    </span>
                                  ) : null}
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <label htmlFor="example-date-input">
                                    Date of birth
                                  </label>
                                  <Input
                                    className="form-control"
                                    type="date"
                                    name="dob"
                                    id="example-date-input"
                                    value={wizardformik.values.dob}
                                    onChange={wizardformik.handleChange}
                                    onBlur={wizardformik.handleBlur}
                                  />
                                  {wizardformik.errors.dob &&
                                  wizardformik.touched.dob ? (
                                    <span className="text-danger">
                                      {wizardformik.errors.dob}
                                    </span>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-firstname-input1">
                                    First name
                                  </Label>
                                  <Input
                                    type="text"
                                    name="firstname"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    placeholder="Enter Your First Name"
                                    value={wizardformik.values.firstname}
                                    onChange={wizardformik.handleChange}
                                    onBlur={wizardformik.handleBlur}
                                  />
                                  {wizardformik.errors.firstname &&
                                  wizardformik.touched.firstname ? (
                                    <span className="text-danger">
                                      {wizardformik.errors.firstname}
                                    </span>
                                  ) : null}
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-lastname-input2">
                                    Last name
                                  </Label>
                                  <Input
                                    type="text"
                                    className="form-control"
                                    name="lastname"
                                    id="basicpill-lastname-input2"
                                    placeholder="Enter Your Last Name"
                                    value={wizardformik.values.lastname}
                                    onChange={wizardformik.handleChange}
                                    onBlur={wizardformik.handleBlur}
                                  />
                                  {wizardformik.errors.lastname &&
                                  wizardformik.touched.lastname ? (
                                    <span className="text-danger">
                                      {wizardformik.errors.lastname}
                                    </span>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-phoneno-input3">
                                    Phone
                                  </Label>
                                  <Input
                                    type="text"
                                    name="phoneno"
                                    className="form-control"
                                    id="basicpill-phoneno-input3"
                                    placeholder="Enter Your Phone No."
                                    value={wizardformik.values.phoneno}
                                    onChange={wizardformik.handleChange}
                                    onBlur={wizardformik.handleBlur}
                                  />
                                  {wizardformik.errors.phoneno &&
                                  wizardformik.touched.phoneno ? (
                                    <span className="text-danger">
                                      {wizardformik.errors.phoneno}
                                    </span>
                                  ) : null}
                                </div>
                              </Col>
                              <Col lg="6">
                                <div className="mb-3">
                                  <Label for="basicpill-email-input4">
                                    Email
                                  </Label>
                                  <Input
                                    type="email"
                                    className="form-control"
                                    id="basicpill-email-input4"
                                    name="email"
                                    placeholder="Enter Your Email ID"
                                    value={wizardformik.values.email}
                                    onChange={wizardformik.handleChange}
                                    onBlur={wizardformik.handleBlur}
                                  />
                                  {wizardformik.errors.email &&
                                  wizardformik.touched.email ? (
                                    <span className="text-danger">
                                      {wizardformik.errors.email}
                                    </span>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg="12">
                                <div className="mb-3">
                                  <Label for="basicpill-address-input1">
                                    Address
                                  </Label>
                                  <textarea
                                    id="basicpill-address-input1"
                                    className="form-control"
                                    name="address"
                                    rows={2}
                                    placeholder="Enter Your Address"
                                    value={wizardformik.values.address}
                                    onChange={wizardformik.handleChange}
                                    onBlur={wizardformik.handleBlur}
                                  />
                                  {wizardformik.errors.address &&
                                  wizardformik.touched.address ? (
                                    <span className="text-danger">
                                      {wizardformik.errors.address}
                                    </span>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              {/* <Col lg={6}> */}
                              <div className="d-flex justify-content-between w-25">
                                <div className="form-check form-radio-outline form-radio-primary mb-3 mr-5">
                                  <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="male"
                                    className="form-check-input"
                                    onChange={handleGenderChange}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="male"
                                  >
                                    Male
                                  </label>
                                </div>

                                <div className="form-check form-radio-outline form-radio-primary mb-3 ml-2">
                                  <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="female"
                                    className="form-check-input"
                                    onChange={handleGenderChange}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="female"
                                  >
                                    Female
                                  </label>
                                </div>
                              </div>

                              <Col lg={12}>
                                <div className="form-check form-checkbox-outline form-check-primary mb-3">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="customCheck-outlinecolor1"
                                    checked={married}
                                    onChange={() => {
                                      setMarried(!married);
                                    }}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="customCheck-outlinecolor1"
                                  >
                                    Married
                                  </label>
                                </div>
                              </Col>

                              {married && (
                                <Row>
                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="basicpill-spouse_name-input1">
                                        Spouse Name
                                      </Label>
                                      <Input
                                        type="text"
                                        name="spouse_name"
                                        className="form-control"
                                        id="basicpill-spouse_name-input1"
                                        placeholder="Enter Your First Name"
                                        value={wizardformik.values.spouse_name}
                                        onChange={wizardformik.handleChange}
                                        onBlur={wizardformik.handleBlur}
                                      />

                                      {married &&
                                      wizardformik.touched.spouse_name ? (
                                        <span className="text-danger">
                                          This is mandatory field
                                        </span>
                                      ) : null}
                                    </div>
                                  </Col>

                                  <Col lg="6">
                                    <div className="mb-3">
                                      <Label for="basicpill-spouse_contact-input3">
                                        Spouse/Emergency Contact
                                      </Label>
                                      <Input
                                        type="number"
                                        name="spouse_contact"
                                        className="form-control"
                                        id="basicpill-spouse_contact-input3"
                                        placeholder="Enter Spouse Contact"
                                        value={wizardformik.spouse_contact}
                                        onChange={wizardformik.handleChange}
                                        onBlur={wizardformik.handleBlur}
                                        required={married}
                                      />
                                      {/* {married &&
                                      wizardformik.touched.spouse_contact &&
                                      wizardformik.spouse_contact === "" ? (
                                        <span className="text-danger">
                                          This is required field
                                        </span>
                                      ) : null} */}
                                    </div>
                                  </Col>
                                </Row>
                              )}

                              <Row>
                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-firstname-input1">
                                      Father/Guardian Name
                                    </Label>
                                    <Input
                                      type="text"
                                      name="father_name"
                                      className="form-control"
                                      id="basicpill-father_name-input1"
                                      placeholder="Enter Employee's father/guardian name"
                                      value={wizardformik.values.father_name}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    />
                                    {wizardformik.errors.father_name &&
                                    wizardformik.touched.father_name ? (
                                      <span className="text-danger">
                                        {wizardformik.errors.father_name}
                                      </span>
                                    ) : null}
                                  </div>
                                </Col>

                                <Col lg="6">
                                  <div className="mb-3">
                                    <Label for="basicpill-emergency_contact-input3">
                                      Father/Guardian Contact
                                    </Label>
                                    <Input
                                      type="text"
                                      name="emergency_contact"
                                      className="form-control"
                                      id="basicpill-emergency_contact-input3"
                                      placeholder="Enter Your Phone No."
                                      value={
                                        wizardformik.values.emergency_contact
                                      }
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    />
                                    {wizardformik.errors.emergency_contact &&
                                    wizardformik.touched.emergency_contact ? (
                                      <span className="text-danger">
                                        {wizardformik.errors.emergency_contact}
                                      </span>
                                    ) : null}
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col lg="4">
                                  <div className="mb-3">
                                    <label> Blood Group</label>
                                    <div>
                                      <select
                                        className="form-control"
                                        name="blood"
                                        id="basicpill-blood-input1"
                                        value={wizardformik.values.blood}
                                        onChange={wizardformik.handleChange}
                                        onBlur={wizardformik.handleBlur}
                                      >
                                        <option value="" disabled>
                                          Select Blood Group
                                        </option>

                                        {bloodGroups?.map(
                                          (eachBloodGroup: string) => (
                                            <option
                                              value={eachBloodGroup}
                                              key={eachBloodGroup}
                                            >
                                              {eachBloodGroup}
                                            </option>
                                          )
                                        )}
                                      </select>
                                      {wizardformik.errors.blood &&
                                      wizardformik.touched.blood ? (
                                        <span className="text-danger">
                                          {wizardformik.errors.blood}
                                        </span>
                                      ) : null}
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </Row>
                          </TabPane>

                          <TabPane tabId={2}>
                            <Row>
                              <Col lg="4">
                                <div className="mb-3">
                                  <label> Select Department</label>
                                  <div>
                                    <select
                                      className="form-control"
                                      name="dept"
                                      id="basicpill-emp_id-input1"
                                      value={wizardformik.values.dept}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    >
                                      <option value="" disabled>
                                        Select Department
                                      </option>

                                      {departments?.map(
                                        (eachDept: Department) => (
                                          <option
                                            value={eachDept.dept_id}
                                            key={eachDept.dept_id}
                                          >
                                            {eachDept.department}
                                          </option>
                                        )
                                      )}
                                    </select>
                                    {wizardformik.errors.dept &&
                                    wizardformik.touched.dept ? (
                                      <span className="text-danger">
                                        {wizardformik.errors.dept}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </Col>

                              <Col lg={4}>
                                <div className="mb-3">
                                  <label>Select Role</label>
                                  <div>
                                    <select
                                      className="form-control"
                                      name="role"
                                      value={wizardformik.values.role}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    >
                                      <option value="" disabled>
                                        Select Role
                                      </option>

                                      {roles
                                        ?.filter(
                                          (eachRole: Role) =>
                                            eachRole.department ===
                                            wizardformik.values.dept
                                        )
                                        .map((eachRole: Role) => (
                                          <option
                                            value={eachRole.role_id}
                                            key={eachRole.role_id}
                                          >
                                            {eachRole.role}
                                          </option>
                                        ))}
                                    </select>
                                    {wizardformik.errors.role &&
                                    wizardformik.touched.role ? (
                                      <span className="text-danger">
                                        {wizardformik.errors.role}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </Col>

                              <Col lg="4">
                                <div className="mb-3">
                                  <label>Date of Appointment</label>
                                  <Input
                                    className="form-control"
                                    type="date"
                                    name="doa"
                                    id="example-date-input"
                                    value={wizardformik.values.doa}
                                    onChange={wizardformik.handleChange}
                                    onBlur={wizardformik.handleBlur}
                                  />
                                  {wizardformik.errors.doa &&
                                  wizardformik.touched.doa ? (
                                    <span className="text-danger">
                                      {wizardformik.errors.doa}
                                    </span>
                                  ) : null}
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={4}>
                                <div className="mb-3">
                                  <label>Select Branch</label>
                                  <div>
                                    <select
                                      className="form-control"
                                      name="branch"
                                      value={wizardformik.values.branch}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    >
                                      <option value="" disabled>
                                        Select Branch
                                      </option>

                                      {branches?.map((eachBranch: Branch) => (
                                        <option
                                          key={eachBranch.branch_id}
                                          value={eachBranch.branch_id}
                                        >
                                          {eachBranch.branch}
                                        </option>
                                      ))}
                                    </select>
                                    {wizardformik.errors.branch &&
                                    wizardformik.touched.branch ? (
                                      <span className="text-danger">
                                        {wizardformik.errors.branch}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </Col>

                              <Col lg={4}>
                                <div className="mb-3">
                                  <label>Select Reporting Manager</label>
                                  <div>
                                    <select
                                      className="form-control"
                                      name="reportingTo"
                                      value={wizardformik.values.reportingTo}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    >
                                      <option value="" disabled>
                                        Select Reporting Manager
                                      </option>

                                      {(employees || []).map(
                                        (eachEmployee: Employee) => (
                                          <option
                                            value={eachEmployee.emp_id}
                                            key={eachEmployee.emp_id}
                                          >
                                            {eachEmployee.first_name +
                                              "  " +
                                              eachEmployee.last_name}
                                          </option>
                                        )
                                      )}
                                    </select>
                                    {wizardformik.errors.reportingTo &&
                                    wizardformik.touched.reportingTo ? (
                                      <span className="text-danger">
                                        {wizardformik.errors.reportingTo}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </Col>

                              <Col lg={4}>
                                <div className="mb-3">
                                  <label>Enter Salary</label>
                                  <div>
                                    <Input
                                      type="number"
                                      name="salary"
                                      className="form-control"
                                      id="basicpill-emp_id-input1"
                                      placeholder="Enter Salary"
                                      value={wizardformik.values.salary}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    />
                                    {wizardformik.errors.salary &&
                                    wizardformik.touched.salary ? (
                                      <span className="text-danger">
                                        {wizardformik.errors.salary}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col lg={4}>
                                <div className="mb-3">
                                  <label>Allocate Access</label>
                                  <div>
                                    <select
                                      className="form-control"
                                      name="access_to"
                                      value={wizardformik.values.access_to}
                                      onChange={wizardformik.handleChange}
                                      onBlur={wizardformik.handleBlur}
                                    >
                                      <option value="" disabled>
                                        Select Access key
                                      </option>

                                      {accessKeys?.map(
                                        (eachAccessKey: AccessKey) => (
                                          <option
                                            key={eachAccessKey.access_id}
                                            value={eachAccessKey.access_id}
                                          >
                                            {eachAccessKey.label}
                                          </option>
                                        )
                                      )}
                                    </select>
                                    {wizardformik.errors.access_to &&
                                    wizardformik.touched.access_to ? (
                                      <span className="text-danger">
                                        {wizardformik.errors.access_to}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </TabPane>

                          <TabPane tabId={3}>
                            <Row>
                              <Col sm={6}>
                                <div className="mt-3">
                                  <Label
                                    htmlFor="aadhar"
                                    className="form-label"
                                  >
                                    Upload Aadhar Card
                                  </Label>
                                  <Input
                                    className="form-control"
                                    type="file"
                                    id="aadhar"
                                  />
                                </div>
                              </Col>
                              <Col sm={6}>
                                <div className="mt-3">
                                  <Label
                                    htmlFor="pancard"
                                    className="form-label"
                                  >
                                    PAN Card
                                  </Label>
                                  <Input
                                    className="form-control"
                                    type="file"
                                    id="pancard"
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col sm={6}>
                                <div className="mt-3">
                                  <Label htmlFor="ssc" className="form-label">
                                    SSC Memo
                                  </Label>
                                  <Input
                                    className="form-control"
                                    type="file"
                                    id="ssc"
                                  />
                                </div>
                              </Col>
                              <Col sm={6}>
                                <div className="mt-3">
                                  <Label
                                    htmlFor="intermediate"
                                    className="form-label"
                                  >
                                    Intermediate Certificate
                                  </Label>
                                  <Input
                                    className="form-control"
                                    type="file"
                                    id="intermediate"
                                  />
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col sm={6}>
                                <div className="mt-3">
                                  <Label
                                    htmlFor="degree"
                                    className="form-label"
                                  >
                                    Degree/Graduation PDF
                                  </Label>
                                  <Input
                                    className="form-control"
                                    type="file"
                                    id="degree"
                                  />
                                </div>
                              </Col>

                              <Col sm={6}>
                                <div className="mt-3">
                                  <Label
                                    htmlFor="residence"
                                    className="form-label"
                                  >
                                    Residence
                                  </Label>
                                  <Input
                                    className="form-control"
                                    type="file"
                                    id="residence"
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row className="mt-5">
                              <Col lg={12}>
                                <h5 className="text-success">Bank Details</h5>
                              </Col>
                              <Col sm={6}>
                                <div className="mt-3">
                                  <Label
                                    htmlFor="bankbook"
                                    className="form-label"
                                  >
                                    Bank Book
                                  </Label>
                                  <Input
                                    className="form-control"
                                    type="file"
                                    id="bankbook"
                                  />
                                </div>
                              </Col>
                            </Row>
                          </TabPane>

                          <TabPane tabId={4}>
                            <div className="row justify-content-center">
                              <Col>
                                <div className="text-center">
                                  <div className="mb-4">
                                    <i className="mdi mdi-check-circle-outline text-success display-4" />
                                  </div>
                                  <div>
                                    {/* <h5>Confirm Detail</h5> */}
                                    <div>
                                      <Button
                                        type="submit"
                                        color="success"
                                        className="w-md"
                                      >
                                        Submit
                                      </Button>
                                    </div>

                                    {/* <div className="table-responsive mt-5">
                                      <Table className="table mb-0 table-bordered">
                                        <tbody>
                                          {Object.keys(
                                            wizardformik.initialValues
                                          ).map((key, index) => (
                                            <tr key={index}>
                                              <th
                                                scope="row"
                                                style={{ width: "200px" }}
                                                className={"text-capitalize"}
                                              >
                                                {key}
                                              </th>

                                              <td>
                                                {wizardformik.values[key]}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </Table>
                                    </div> */}
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
                            activeTab === 1 ? "previous disabled" : "previous"
                          }
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTab(activeTab - 1);
                            }}
                          >
                            Previous
                          </Link>
                        </li>
                        <li
                          className={activeTab === 4 ? "next disabled" : "next"}
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              toggleTab(activeTab + 1);
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

export default withRouter(AddEmp);
