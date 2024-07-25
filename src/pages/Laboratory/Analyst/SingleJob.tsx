import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { Container, Row, Col } from "reactstrap";
import { ToastContainer } from "react-toastify";
import { createSelector } from "reselect";

import { getMyJobs } from "slices/thunk";
import Spinners from "Components/Common/Spinner";

import { RootState } from "slices";
import { LabInitialState } from "slices/Lab/reducer";

const SingleJob = () => {
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>{loadingLab && <Spinners />}</Col>
          </Row>

          <ToastContainer />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SingleJob;
