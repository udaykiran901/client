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
  ModalHeader, Form, Input
} from "reactstrap";
import { ToastContainer } from "react-toastify";
import { createSelector } from "reselect";
import { Orders, Param, Samples } from "pages/BD/types";
import { LabAction } from "./type";
import { getAnalysts, getPendingAssigningJobs, getAllOrders } from "slices/thunk";
import Spinners from "Components/Common/Spinner";
import { renderSamplesTable } from "pages/BD/TrackSample";
import { Link } from "react-router-dom";
import { Assign } from "./Modals/Assign";

import { Employee } from "pages/HRandAdmin/types";
import { CHEMICAL, PHYSICAL } from "common/tokens";

// export const renderSampleBasicInfo = (sample: Samples, due_date: string) => {
//   return (
//     <div className="table-responsive">
//       <Table
//         className="table table-bordered"
//         style={{ borderColor: "#eff2f7", display: "inline-block" }}
//       >
//         <tbody>
//           <tr>
//             <th>Sample ID</th>
//             <td>
//               <code className="text-danger">{sample.sample_code}</code>
//             </td>
//           </tr>
//           <tr>
//             <th style={{ width: "200px" }}> Source </th>
//             <td>{sample.source}</td>
//           </tr>

//           <tr>
//             <th style={{ width: "200px" }}> Quantity </th>
//             <td>{sample.quantity}</td>
//           </tr>

//           {sample.grade && (
//             <tr>
//               <th style={{ width: "200px" }}> Grade </th>
//               <td>{sample.grade}</td>
//             </tr>
//           )}

//           {sample.job_assigned && (
//             <>
//               <tr>
//                 <th>Job Assigned on </th>
//                 <td>
//                   <code className="text-danger">
//                     {sample.doa.substring(0, 10)}
//                   </code>
//                 </td>
//               </tr>

//               <tr>
//                 <th>Due Date </th>
//                 <td>
//                   This sample reports are expected to be delivered to client on
//                   or before{" "}
//                   <code className="text-danger">
//                     {due_date.substring(0, 10)}
//                   </code>
//                 </td>
//               </tr>
//             </>
//           )}
//         </tbody>
//       </Table>
//     </div>
//   );
// };

export const renderOrderBasicInfo = (sample: any, due_date: string) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '1100px', paddingTop: 12
      }}
    >
      <Table
        style={{
          border: '1px solid #eff2f7',
          width: '48%',
          borderCollapse: 'collapse',
        }}
      >
        <tbody>
          <tr>
            <th style={{ width: '200px', border: '1px solid #666665', paddingLeft: 10, color: '#f56f5d' }}>Order ID</th>
            <td className="alert-link" style={{ border: '1px solid #666665', paddingLeft: 10, }}>{sample.order_number}</td>
          </tr>
          <tr>
            <th style={{ width: '200px', border: '1px solid #666665', paddingLeft: 10, color: '#f56f5d' }}>Project Name</th>
            <td className="alert-link" style={{ border: '1px solid #666665', paddingLeft: 10, }}>{sample.project_name}</td>
          </tr>
        </tbody>
      </Table>

      <Table
        style={{
          border: '1px solid #eff2f7',
          width: '48%',
          borderCollapse: 'collapse',
        }}
      >
        <tbody>
          <tr>
            <th style={{ width: '200px', border: '1px solid #666665', paddingLeft: 10, color: '#f56f5d' }}>Customer Name</th>

            <td className="alert-link" style={{ border: '1px solid #666665', paddingLeft: 10, }}>Virat Kohli</td>
          </tr>
          <tr>
            <th style={{ width: '200px', border: '1px solid #666665', paddingLeft: 10, color: '#f56f5d' }}>Company</th>
            <td className="alert-link" style={{ border: '1px solid #666665', paddingLeft: 10, }}>RCB</td>
          </tr>
        </tbody>
      </Table>
    </div >
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

  // console.log(chemist, 'pic sam')
  // console.log(physicist, 'pic sam 2')


  return (
    <div className="d-flex flex-column" >
      {chemist && (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <>
            <span style={{ paddingLeft: 20 }}> Chemical Tests Assigned to : </span>
            <br /></>
          <>
            <Link to="#" className="mt-2 mb-lg-0">
              <img
                src={
                  chemist.employee.profile_photo
                    ? chemist.employee.profile_photo
                    : undefinedProfile
                }
                alt="src"
                // className="rounded avatar-lg"
                className="rounded avatar-md" style={{ paddingLeft: 14 }}
              />
            </Link></>
        </div>
      )}
      <br />
      {physicist && (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <span style={{ paddingLeft: 20 }}>Mechanical Tests Assigned to :</span> <br />
          <Link to="#" className="mt-2 mb-lg-0 ">
            <img
              src={
                physicist.employee.profile_photo
                  ? physicist.employee.profile_photo
                  : undefinedProfile
              }
              alt="src"
              className="rounded avatar-md" style={{ paddingLeft: 14 }}
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

  // const [key, setKey] = useState('');

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
  console.log(sampleAllocationPending, 'sampleAllocationPending');



  // const selectProperties = createSelector(
  //   (state: any) => state.bd,
  //   (bd) => ({
  //     loading: bd.loading,
  //     orders: bd.orders,
  //     showOrderAdditionalInfoModal: bd.showOrderAdditionalInfoModal,
  //     step2loader: bd.step2loader,
  //     ordersDaily: bd.ordersDaily,
  //     ordersMonthly: bd.ordersMonthly,
  //   })
  // );

  // const { loading, orders, ordersDaily, ordersMonthly } =
  //   useSelector(selectProperties);
  // console.log(orders, 'orders');

  // useEffect(() => {
  //   dispatch(getAllOrders());
  // }, [dispatch]);


  // const samplesList = sampleAllocationPending.filter((eachSample) => eachSample.order_number.toString().includes((key)));
  // console.log(samplesList, 'samplesList');


  const [sampleId, setSampleId] = useState('');
  const [customerDetails, setCustomerDetails] = useState('');
  const [date, setDate] = useState('');

  const filteredData = sampleAllocationPending.filter(order => {
    // Filter by order ID if provided

    // Filter by date if provided
    const dateMatch = date ? order.created_at.startsWith(date) : true;

    // Filter by customerDetails (project_name or subject) if provided
    const customerMatch = customerDetails
      ? order.project_name?.toLowerCase().includes(customerDetails)
      : true;

    // Filter by sampleId if provided
    const sampleMatch = sampleId
      ? order.order_number.toString().includes(sampleId)
      : true;

    return dateMatch && customerMatch && sampleMatch;
  });

  console.log(filteredData, 'seardfilteredlist')

  // console.log('Searching for:', {
  //   sampleId,
  //   customerDetails,
  //   date,
  // });

  // const handleSearch = () => {
  //   // Perform the search logic here, e.g., send a request with the search fields
  //   console.log('Searching for:', {
  //     sampleId,
  //     customerDetails,
  //     date,
  //   });

  //   // You can make an API call to search for data
  //   // Example: searchProducts({ sampleId, customerDetails, date, orderId });
  // };

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

  const renderAlertNotAssigned = (

  ) => {
    return (
      <Alert
        className="mt-2"
        color="danger"
        style={{ display: "inline-block" }}
      >
        This Sample is not yet assigned{" "}
      </Alert>
    );
  };

  return (
    <React.Fragment>
      <div className="page-content" >
        <Container fluid>

          <Row className="mb-3">
            <Col xl={4} sm={6}>
              <div className="mt-2">
                <h5>Samples List</h5>
              </div>
            </Col>


            <Col lg={8} sm={6}>
              <Form
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1rem',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  backgroundColor: '#f8f9fa',
                  padding: '5px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >



                {/* Sample ID Search */}
                <div style={{ flex: 1, position: 'relative' }}>
                  <Input
                    type="text"
                    placeholder="Order Number"
                    style={{
                      width: '100%',
                      padding: '10px 15px',
                      border: '1px solid #ced4da',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      fontSize: '12px', height: 30,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#007bff')}
                    onBlur={(e) => (e.target.style.borderColor = '#ced4da')}
                    onChange={(e) => setSampleId(e.target.value)}

                  />

                </div>

                {/* Customer Details Search */}
                <div style={{ flex: 1, position: 'relative' }}>
                  <Input
                    type="text"
                    placeholder="Project Name"
                    style={{
                      width: '100%',
                      padding: '10px 15px',
                      border: '1px solid #ced4da',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      fontSize: '12px', height: 30,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#007bff')}
                    onBlur={(e) => (e.target.style.borderColor = '#ced4da')}
                    onChange={(e) => setCustomerDetails(e.target.value)}
                  />
                </div>

                {/* Date Search */}
                <div style={{ flex: 1, position: 'relative' }}>
                  <Input
                    type="date"
                    style={{
                      width: '100%',
                      padding: '10px 15px',
                      border: '1px solid #ced4da',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      fontSize: '12px', height: 30,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#007bff')}
                    onBlur={(e) => (e.target.style.borderColor = '#ced4da')}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>


                {/* Search Button */}
                <div
                  style={{
                    padding: '6px 15px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    transition: 'background-color 0.3s ease', height: 30, width: 50
                  }}
                // onMouseEnter={(e) => (e.target.style.backgroundColor = '#0056b3')}
                // onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
                // onClick={handleSearch}
                >
                  <i className="bx bx-search-alt search-icon" />
                </div>
              </Form>
            </Col>

          </Row>


          <Row>
            <Col>
              {loadingLab && !assignModal.status && <Spinners />}
              {(filteredData || []).map((eachOrder: Orders) => (
                <Card
                  key={eachOrder.order_id}
                  className="p-2 mb-5 w-100 shadow-lg"
                  style={{
                    borderLeft: `4px solid #2a3042`,
                    display: "inline-block",
                  }}
                >
                  <a className="mb-4" href={`/bd/orders/${eachOrder.order_id}`} style={{ fontWeight: "bold" }}>
                    View Order
                  </a>

                  <Row>
                    <Col lg={6}>
                      {renderOrderBasicInfo(
                        eachOrder,
                        eachOrder.due_date as string
                      )}
                    </Col>
                  </Row>


                  {
                    eachOrder.samples.some((sample) => !sample.job_assigned) && (
                      (() => {
                        return renderAlertNotAssigned();
                      })()
                    )
                  }


                  {/* {eachOrder.samples.map((eachSample: Samples) => (
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
                  ))} */}

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
    </React.Fragment >
  );
};

export default LabHome;
