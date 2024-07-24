import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import undefinedProfile from "../../assets/images/undefined-profile.jpg";
import React from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Alert,
  Modal,
  ModalHeader,
} from "reactstrap";
import { ToastContainer } from "react-toastify";
import { createSelector } from "reselect";
import { Orders, Param, Samples } from "pages/BD/types";
import { LabAction } from "./type";
import { getAnalysts, getPendingAssigningJobs } from "slices/thunk";
import Spinners from "Components/Common/Spinner";
import { renderSamplesTable } from "pages/BD/TrackSample";
import { Link } from "react-router-dom";
import { Assign } from "./Modals/Assign";

import { Employee } from "pages/HRandAdmin/types";
import { CHEMICAL, PHYSICAL } from "common/tokens";

export const renderSampleBasicInfo = (sample: Samples, due_date: string) => {
  return (
    <div className="table-responsive">
      <Table
        className="table table-bordered"
        style={{ borderColor: "#eff2f7", display: "inline-block" }}
      >
        <tbody>
          <tr>
            <th>Sample ID</th>
            <td>
              <code className="text-danger">{sample.sample_code}</code>
            </td>
          </tr>
          <tr>
            <th style={{ width: "200px" }}> Source </th>
            <td>{sample.source}</td>
          </tr>

          <tr>
            <th style={{ width: "200px" }}> Quantity </th>
            <td>{sample.quantity}</td>
          </tr>

          {sample.grade && (
            <tr>
              <th style={{ width: "200px" }}> Grade </th>
              <td>{sample.grade}</td>
            </tr>
          )}

          {sample.job_assigned && (
            <>
              <tr>
                <th>Job Assigned on </th>
                <td>
                  <code className="text-danger">
                    {sample.doa.substring(0, 10)}
                  </code>
                </td>
              </tr>

              <tr>
                <th>Due Date </th>
                <td>
                  This sample reports are expected to be delivered to client on
                  or before{" "}
                  <code className="text-danger">
                    {due_date.substring(0, 10)}
                  </code>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </Table>
    </div>
  );
};

function checkDisciplineSample(
  params: Param[],
  discipline: string
): Param | undefined {
  const analyst = params.filter(
    (eachPram: Param) => eachPram.param.discipline === discipline
  )[0];

  return analyst;
}

export const renderJobAssignedScreen = (eachSample: Samples) => {
  const chemist: Param | undefined = checkDisciplineSample(
    eachSample.params,
    CHEMICAL
  );
  const physicist: Param | undefined = checkDisciplineSample(
    eachSample.params,
    PHYSICAL
  );

  return (
    <div className="d-flex flex-column">
      {chemist && (
        <div>
          <span> Chemical Tests Assigned to : </span>
          <br />
          <Link to="#" className="mt-2 mb-lg-0">
            <img
              src={
                chemist.employee.profile_photo
                  ? chemist.employee.profile_photo
                  : undefinedProfile
              }
              alt=""
              className="rounded avatar-lg"
            />
          </Link>
        </div>
      )}
      <br />
      {physicist && (
        <div>
          <span>Mechanical Tests Assigned to :</span> <br />
          <Link to="#" className="mt-2 mb-lg-0 ">
            <img
              src={
                physicist.employee.profile_photo
                  ? physicist.employee.profile_photo
                  : undefinedProfile
              }
              alt=""
              className="rounded avatar-lg"
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export interface AssignModalType {
  status: boolean;
  sampleId: string;
  parameters: Param[];
  labStaff?: Employee[];
}

const LabHome = () => {
  document.title = "Laboratory | KDM Engineers Group";
  const dispatch = useDispatch<any>();

  const [assignModal, setAssignModal] = useState<AssignModalType>({
    status: false,
    sampleId: "",
    parameters: [],
    labStaff: [],
  });

  const selectPropertiesLAB = createSelector(
    (state: LabAction) => state.lab,
    (lab) => ({
      loadingLab: lab.loading,
      sampleAllocationPending: lab.sampleAllocationPending,
      labStaff: lab.labStaff,
    })
  );

  const { sampleAllocationPending, loadingLab, labStaff } =
    useSelector(selectPropertiesLAB);

  useEffect(() => {
    dispatch(getPendingAssigningJobs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAnalysts());
  }, [dispatch]);

  useEffect(() => {
    if (labStaff.length > 0) {
      setAssignModal({ ...assignModal, labStaff: labStaff });
    }
  }, [labStaff]);

  useEffect(() => {
    setAssignModal({ ...assignModal, status: false });
  }, [sampleAllocationPending]);

  const renderSampleNotAssigned = (
    sampleId: string,
    sampleParameters: Param[]
  ) => {
    return (
      <Alert
        className="mt-2"
        color="danger"
        style={{ display: "inline-block" }}
      >
        This Sample is not yet assigned{" "}
        <Link
          to="#"
          onClick={() =>
            setAssignModal({
              status: !assignModal.status,
              sampleId: sampleId,
              parameters: sampleParameters,
              labStaff: labStaff,
            })
          }
          className="alert-link"
        >
          Click here{" "}
        </Link>
        to Assign
      </Alert>
    );
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              {loadingLab && !assignModal.status && <Spinners />}
              {(sampleAllocationPending || []).map((eachOrder: Orders) => (
                <Card
                  key={eachOrder.order_id}
                  className="p-3 mb-5 w-100 shadow-lg"
                  style={{
                    borderLeft: `4px solid #2a3042`,
                    display: "inline-block",
                  }}
                >
                  <a className="mb-4" href={`/bd/orders/${eachOrder.order_id}`}>
                    View Order
                  </a>

                  {eachOrder.samples.map((eachSample: Samples) => (
                    <div key={eachSample.sample_id}>
                      {!eachSample.job_assigned &&
                        renderSampleNotAssigned(
                          eachSample.sample_id,
                          eachSample.params
                        )}
                      <Row>
                        <Col lg={6}>
                          {renderSampleBasicInfo(
                            eachSample,
                            eachOrder.due_date as string
                          )}
                        </Col>
                        <Col lg={5}>
                          {eachSample.job_assigned
                            ? renderJobAssignedScreen(eachSample)
                            : null}
                        </Col>
                      </Row>
                      <div className="table-responsive">
                        <Table
                          className="table table-bordered w-100"
                          style={{ borderColor: "#eff2f7" }}
                        >
                          <thead
                            style={{
                              backgroundColor: "#2a3042",
                            }}
                          >
                            <tr>
                              <td style={{ color: "#a6b0cf" }}>Parameters</td>
                              <td style={{ color: "#a6b0cf" }}>Discipline</td>
                              <td style={{ color: "#a6b0cf", width: "300px" }}>
                                Status
                              </td>
                              <td style={{ color: "#a6b0cf", width: "300px" }}>
                                Bench Record
                              </td>
                            </tr>
                          </thead>

                          <tbody>
                            {eachSample.params.map((eachParam: Param) =>
                              renderSamplesTable(eachParam, true)
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  ))}
                </Card>
              ))}
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </div>

      <Modal
        size="lg"
        isOpen={assignModal.status}
        toggle={() => {
          setAssignModal({
            ...assignModal,
            status: !assignModal.status,
          });
        }}
      >
        <ModalHeader
          toggle={() => {
            setAssignModal({
              ...assignModal,
              status: !assignModal.status,
            });
          }}
        >
          <div className="modal-title mt-0 h4">Assign Sample to Analyst</div>
        </ModalHeader>
        <div className="modal-body">
          <Assign assignModal={assignModal} />
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default LabHome;
