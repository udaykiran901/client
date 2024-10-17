import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { Container, Row, Col, Card, Input, Form } from "reactstrap";
import { ToastContainer } from "react-toastify";
import { createSelector } from "reselect";

import { getMyJobs, } from "slices/thunk";
import Spinners from "Components/Common/Spinner";

import { RootState } from "slices";
import { LabInitialState } from "slices/Lab/reducer";
import { Job } from "../type";

import { renderParameter, renderParamText } from "pages/BD/TrackSample";
import { getOnlyDate } from "pages/BD/CallBacksList";
import { Link } from "react-router-dom";

import { EMPLOYEE_LOCAL_STORAGE_KEY } from "common/tokens";
import Cookies from "js-cookie";


const MyJobs = () => {
  document.title = "Laboratory | KDM Engineers Group";
  const dispatch = useDispatch<any>();

  const [key, setKey] = useState<string>("");


  const selectPropertiesLAB = createSelector(
    (state: RootState) => state.lab,
    (lab: LabInitialState) => ({
      loadingLab: lab.loading,
      myJobs: lab.myJobs,
    })
  );

  const token = Cookies.get(EMPLOYEE_LOCAL_STORAGE_KEY);
  const { emp_id } = JSON.parse(token);
  // console.log(emp_id, 'employes data')


  const { loadingLab, myJobs } = useSelector(selectPropertiesLAB);
  console.log(myJobs, 'my jobs')

  const filteredJobs = myJobs.filter(job =>
    job.sample.sample_code.toLowerCase().includes(key.toLowerCase())
  );

  useEffect(() => {
    dispatch(getMyJobs(emp_id));
  }, [dispatch]);

  const renderMyJob = (eachJob: Job, idx: number) => (
    <Card
      key={idx}
      className="p-3"
      style={{
        borderLeft: `4px solid #2a3042`,
        display: "inline-block",
      }}
    >
      <Row>
        <Col lg={3}>
          <code>Sample ID</code>
          <p> {eachJob.sample.sample_code}</p>
        </Col>

        <Col lg={3}>
          <code>Parameter</code>
          <div> {renderParameter(eachJob.params_info)}</div>
        </Col>

        <Col lg={2}>
          <code>Due Date</code>
          <p> {eachJob.sample.order.due_date}</p>
          <code>Assigned On</code>
          <p> {getOnlyDate(eachJob.sample.doa)}</p>
        </Col>

        <Col lg={2}>
          <code>status</code>
          <p> {renderParamText(eachJob.status)}</p>
        </Col>

        <Col lg={1}>
          {/* <Link to={`/analyst/my-jobs/${eachJob.param_pk}`}> */}
          {eachJob.status === 'ASSIGNED_TO_ANALYST' &&
            <Link to={`/test/${eachJob.param_pk}/${eachJob.param_id}`}>
              <code>
                <i className="mdi mdi-arrow-right"></i> Open
              </code>
            </Link>}
          {eachJob.status === 'SUBMITTED_BY_ANALYST' &&
            <code style={{ cursor: 'pointer' }}>
              <i className="mdi mdi-arrow-right"></i> In Review
            </code>
          }
        </Col>
      </Row>
    </Card>
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Row className="mb-3">
            <Col xl={4} sm={6}>
              <div className="mt-2">
                <h5>My Jobs</h5>
              </div>
            </Col>
            <Col lg={8} sm={6}>
              <Form className="mt-4 mt-sm-0 shadow ">
                <div className="search-box">
                  <div className="position-relative">
                    <Input
                      readOnly={loadingLab}
                      type="text"
                      className="border-0"
                      placeholder="Search here.."
                      onChange={(e: any) => setKey(e.target.value)}
                    />
                    <i className="bx bx-search-alt search-icon" />
                  </div>
                </div>
              </Form>
            </Col>
          </Row>

          <Row>
            <Col>{loadingLab && <Spinners />}</Col>
            {(filteredJobs || []).map((eachJob: Job, idx: number) =>
              renderMyJob(eachJob, idx)
            )}
          </Row>

          <ToastContainer />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default MyJobs;
