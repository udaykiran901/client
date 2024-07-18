import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { Params } from "pages/Ecommerce/type";
import { Employee } from "pages/HRandAdmin/types";

export const renderOrderBasicDetails = (order: Orders) => {
  return (
    <Alert className="alert-primary mb-3" role="alert">
      <div className="table-responsive ">
        <Table
          className="table table-bordered"
          style={{ borderColor: "transparent" }}
        >
          <tbody style={{ borderColor: "transparent" }}>
            <tr style={{ borderColor: "transparent" }}>
              <th style={{ borderColor: "transparent" }}>Order ID</th>
              <td style={{ borderColor: "transparent" }}>
                <a href={`/bd/orders/${order.order_id}`}>
                  {`KDMEI/${order.lab}/${order.order_number}`}
                </a>
              </td>
            </tr>
            <tr style={{ borderColor: "transparent" }}>
              <th style={{ borderColor: "transparent" }}>Project Name</th>
              <td style={{ borderColor: "transparent" }}>
                {order.project_name}
              </td>
            </tr>
            <tr style={{ borderColor: "transparent" }}>
              <th style={{ width: "200px", borderColor: "transparent" }}>
                {" "}
                Subject{" "}
              </th>
              <td style={{ borderColor: "transparent" }}>{order.subject}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Alert>
  );
};

export const renderSampleBasicInfo = (sample: Samples) => {
  return (
    <React.Fragment>
      <div className="table-responsive">
        <Table
          className="table table-bordered w-lg-50"
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
          </tbody>
        </Table>
      </div>
    </React.Fragment>
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
              status: true,
              sampleId: sampleId,
              parameters: sampleParameters,
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
              {loadingLab && <Spinners />}
              {!loadingLab &&
                (sampleAllocationPending || []).map((eachOrder: Orders) => (
                  <Card
                    key={eachOrder.order_id}
                    className="p-3 mb-5 w-100 shadow-lg"
                    style={{
                      borderLeft: "4px solid #2a3042",
                      display: "inline-block",
                    }}
                  >
                    <a
                      className="mb-4"
                      href={`/bd/orders/${eachOrder.order_id}`}
                    >
                      View Order
                    </a>

                    {eachOrder.samples.map((eachSample: Samples) => (
                      <div key={eachSample.sample_id}>
                        {!eachSample.job_assigned &&
                          renderSampleNotAssigned(
                            eachSample.sample_id,
                            eachSample.params
                          )}
                        {renderSampleBasicInfo(eachSample)}
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
                                <td
                                  style={{ color: "#a6b0cf", width: "300px" }}
                                >
                                  Status
                                </td>
                                <td
                                  style={{ color: "#a6b0cf", width: "300px" }}
                                >
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
        isOpen={assignModal.status}
        toggle={() => {
          setAssignModal({
            ...assignModal,
            status: !assignModal.status,
          });
        }}
        centered
      >
        <ModalHeader
          toggle={() => {
            setAssignModal({
              ...assignModal,
              status: !assignModal.status,
            });
          }}
        >
          <div className="modal-title mt-0 h5">Assign Sample to Analyst</div>
        </ModalHeader>
        <div className="modal-body">
          <Assign assignModal={assignModal} />
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default LabHome;
