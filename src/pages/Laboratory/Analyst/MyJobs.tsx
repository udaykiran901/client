import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { Container, Row, Col, Card } from "reactstrap";
import { ToastContainer } from "react-toastify";
import { createSelector } from "reselect";

import { getMyJobs } from "slices/thunk";
import Spinners from "Components/Common/Spinner";

import { RootState } from "slices";
import { LabInitialState } from "slices/Lab/reducer";
import { Job } from "../type";

import { renderParameter, renderParamText } from "pages/BD/TrackSample";
import { getOnlyDate } from "pages/BD/CallBacksList";
import { Link } from "react-router-dom";

const MyJobs = () => {
  document.title = "Laboratory | KDM Engineers Group";
  const dispatch = useDispatch<any>();

  const selectPropertiesLAB = createSelector(
    (state: RootState) => state.lab,
    (lab: LabInitialState) => ({
      loadingLab: lab.loading,
      myJobs: lab.myJobs,
    })
  );

  const { loadingLab, myJobs } = useSelector(selectPropertiesLAB);

  useEffect(() => {
    dispatch(getMyJobs());
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
        <Col lg={2}>
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
          <Link to={`/analyst/my-jobs/${eachJob.param_pk}`}>
            <code>
              <i className="mdi mdi-arrow-right"></i>
            </code>
          </Link>
        </Col>
      </Row>
    </Card>
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>{loadingLab && <Spinners />}</Col>
            {(myJobs || []).map((eachJob: Job, idx: number) =>
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
