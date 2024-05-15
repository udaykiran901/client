import React, { useEffect, useState, useMemo } from "react";

import {
  Container,
  Row,
  Col,
  CardBody,
  UncontrolledTooltip,
  Modal,
  ModalBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from "reactstrap";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import {
  EcoActionBD,
  OrderSampleParams,
  OrderSampleSelectedParams,
  OrderSamples,
  Orders,
} from "./types";
import { ToastContainer } from "react-toastify";
import Spinners from "Components/Common/Spinner";

import { Link } from "react-router-dom";
import { getAllOrders } from "slices/thunk";
import OrderInfo from "forms/OrderInfo";
import TableContainer from "common/TableContainer";

export const renderOrderTags = (order: Orders) => {
  return (
    <div style={{ maxWidth: "150px", display: "flex", flexWrap: "wrap" }}>
      {!order.proforma_issued && (
        <Badge className="font-size-10 badge-soft-danger m-1">
          Proforma invoice not yet issued
        </Badge>
      )}

      {order.proforma_issued && (
        <Badge className="font-size-10 badge-soft-success  m-1">
          Proforma invoice issued
        </Badge>
      )}
      {!order.driver_assigned && (
        <Badge className="font-size-10 badge-soft-danger  m-1">
          Driver not yet assigned
        </Badge>
      )}
      {order.driver_assigned && (
        <Badge className="font-size-10 badge-soft-success m-1">
          Driver Assigned
        </Badge>
      )}
      {!order.samples_received && (
        <Badge className="font-size-10 badge-soft-danger m-1">
          Sample not yet received
        </Badge>
      )}
      {order.samples_received && (
        <Badge className="font-size-10 badge-soft-success m-1">
          Sample Received
        </Badge>
      )}
    </div>
  );
};

export const renderParameterDetails = (
  eachSample: OrderSamples,
  index: number
) => (
  <div>
    <small
      className={`mb-5 text-${
        eachSample.chemicalParams.length === 0 ? "danger" : "warning"
      }`}
    >
      {eachSample.chemicalParams.length !== 0 && "CHEMICAL PARAMETERS"}
    </small>
    {eachSample.chemicalParams.map((eachParam: OrderSampleParams) =>
      eachParam.selectedParams.map(
        (eachSelectedParam: OrderSampleSelectedParams) => (
          <p>
            <i
              className={`mdi mdi-circle-medium align-middle text-${
                index % 2 !== 0 ? "success" : "warning"
              } me-1`}
            />

            {eachSelectedParam.testName}
          </p>
        )
      )
    )}

    <small
      className={`mb-5 text-${
        eachSample.physicalParams.length === 0 ? "danger" : "warning"
      }`}
    >
      {eachSample.physicalParams.length !== 0 && "PHYSICAL PARAMETERS"}
    </small>

    {eachSample.physicalParams.map((eachParam: OrderSampleParams) =>
      eachParam.selectedParams.map(
        (eachSelectedParam: OrderSampleSelectedParams) => (
          <p>
            <i
              className={`mdi mdi-circle-medium align-middle text-${
                index % 2 !== 0 ? "success" : "warning"
              } me-1`}
            />
            {eachSelectedParam.testName}
          </p>
        )
      )
    )}
  </div>
);

const OrdersList = () => {
  document.title = "Orders | KDM Engineers Group";
  const [modal, setModal] = useState<boolean>();
  const [modalData, setModalData] = useState<Orders>();

  const selectProperties = createSelector(
    (state: EcoActionBD) => state.bd,
    (bd) => ({
      loading: bd.loading,
      orders: bd.orders,
    })
  );

  const { loading, orders } = useSelector(selectProperties);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // const toggle = useCallback(() => {
  //   setModal(!modal);
  // }, [modal]);

  const showOrderInfoModal = () => {
    setModal(true);
  };

  function tog_large() {
    setModal(!modal);
  }

  const columns = useMemo(
    () => [
      {
        header: "Samples",
        accessorKey: "samplesList",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <>
              <div className="avatar-group">
                {cellProps.row.original.samplesList.map(
                  (eachSample: OrderSamples, idx: number) => {
                    return (
                      <React.Fragment key={idx}>
                        <div className="avatar-group-item">
                          <Link
                            to={`/bd/ecommerce-product-detail/${eachSample.product_id}`}
                            className="d-inline-block"
                          >
                            <img
                              src={eachSample.image}
                              className="rounded-circle avatar-sm"
                              alt=""
                              id={"sample" + eachSample.sample_id}
                            />

                            <UncontrolledTooltip
                              placement="bottom"
                              target={"sample" + eachSample.sample_id}
                            >
                              {eachSample.name}
                            </UncontrolledTooltip>
                          </Link>
                        </div>
                      </React.Fragment>
                    );
                  }
                )}
              </div>
            </>
          );
        },
      },
      {
        header: "Samples & Params",
        accessorKey: "order_id",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <div>
              {cellProps.row.original.samplesList.map(
                (eachSample: OrderSamples, index: number) => {
                  return (
                    <div
                      className={`p-2 `}
                      style={{
                        backgroundColor: `${
                          index % 2 !== 0
                            ? "rgba(158, 168, 161, 0.1)"
                            : "rgba(158, 168, 161,0.3)"
                        } `,
                      }}
                      key={index}
                    >
                      <p className="text-primary">
                        {index + 1 + ". "}
                        <Link
                          to={`/bd/ecommerce-product-detail/${eachSample.product_id}`}
                          className="d-inline-block"
                        >
                          {" "}
                          {eachSample.name}
                          {"   "}
                        </Link>
                        <small style={{ color: "#000" }}>
                          ({"    "} SampleId : {eachSample.sample_id})
                        </small>
                      </p>

                      {renderParameterDetails(eachSample, index)}
                    </div>
                  );
                }
              )}
            </div>
          );
        },
      },

      {
        header: "Tags",
        accessorKey: "tags",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return renderOrderTags(cellProps.row.original);
        },
      },

      {
        header: "Action",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cellProps: any) => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle tag="a" href="#" className="card-drop">
                <i className="mdi mdi-dots-horizontal font-size-18"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem
                  onClick={() => {
                    tog_large();
                    setModalData(cellProps.row.original);
                    showOrderInfoModal();
                  }}
                >
                  <i
                    className="mdi mdi-pencil font-size-16 text-success me-1 mr-2"
                    id="edittooltip"
                  ></i>
                  Order Info
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Order Info
                  </UncontrolledTooltip>
                </DropdownItem>

                <DropdownItem
                  href="#"
                  onClick={() => {
                    console.log("Edit trigered");
                  }}
                >
                  <i
                    className="mdi mdi-ambulance font-size-16 text-success me-1 mr-2"
                    id="edittooltip"
                  ></i>
                  Driver Info
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Driver Info
                  </UncontrolledTooltip>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Row>
            {loading && <Spinners />}

            {orders && orders.length === 0 && !loading ? (
              <h5 className="text-primary text-center mt-5 mb-5 m-auto">
                No Orders..
              </h5>
            ) : (
              <Row>
                <Col className="col-12">
                  {orders && (
                    <CardBody>
                      <TableContainer
                        columns={columns}
                        data={orders || []}
                        // isGlobalFilter={true}
                        isPagination={true}
                        // SearchPlaceholder="Search..."
                        // isCustomPageSize={true}
                        // isAddButton={true}
                        // handleUserClick={handleUserClicks}
                        // buttonClass="btn btn-success btn-rounded waves-effect waves-light addContact-modal mb-2"
                        // buttonName="Add Employee"
                        tableClass="align-middle table-nowrap table-hover dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                        theadClass="table-light"
                        paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                        pagination="pagination"
                      />
                    </CardBody>
                  )}
                </Col>
              </Row>
            )}
          </Row>

          <Modal
            size="lg"
            isOpen={modal}
            toggle={() => {
              tog_large();
            }}
          >
            <ModalBody>
              <OrderInfo orderData={modalData} />
            </ModalBody>
          </Modal>

          <ToastContainer />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default OrdersList;

// <CardBody>
//   <div className="table-responsive">
//     <Table className="table  mb-0 ">
//       {loading && <Spinners />}

//       <tbody>
//         {orders?.map((eachOrder: Orders) => {
//           return (
//             <Card>
//               <small>
//                 <b className="text-warning">Order Id</b> : {eachOrder.order_id}
//               </small>
//               <tr>
//                 <td style={{ width: "150px" }}>
//                   <div className="avatar-group">
//                     {eachOrder.samplesList.map(
//                       (eachSample: OrderSamples, idx: number) => {
//                         return (
//                           <React.Fragment key={idx}>
//                             <div className="avatar-group-item">
//                               <Link
//                                 to={`/bd/ecommerce-product-detail/${eachSample.product_id}`}
//                                 className="d-inline-block"
//                               >
//                                 <img
//                                   src={eachSample.image}
//                                   className="rounded-circle avatar-sm"
//                                   alt=""
//                                   id={"sample" + eachSample.sample_id}
//                                 />

//                                 <UncontrolledTooltip
//                                   placement="bottom"
//                                   target={"sample" + eachSample.sample_id}
//                                 >
//                                   {eachSample.name}
//                                 </UncontrolledTooltip>
//                               </Link>
//                             </div>
//                           </React.Fragment>
//                         );
//                       }
//                     )}
//                   </div>
//                 </td>
//                 <td style={{ width: "600px" }} className="p-0">
//                   {eachOrder.samplesList.map(
//                     (eachSample: OrderSamples, index: number) => {
//                       return (
//                         <div
//                           className={`p-2 `}
//                           style={{
//                             backgroundColor: `${
//                               index % 2 !== 0
//                                 ? "rgba(158, 168, 161, 0.1)"
//                                 : "rgba(158, 168, 161,0.3)"
//                             } `,
//                           }}
//                           key={index}
//                         >
//                           <p className="text-primary">
//                             {index + 1 + ". "}
//                             <Link
//                               to={`/bd/ecommerce-product-detail/${eachSample.product_id}`}
//                               className="d-inline-block"
//                             >
//                               {" "}
//                               {eachSample.name}
//                               {"   "}
//                             </Link>
//                             <small style={{ color: "#000" }}>
//                               ({"    "} SampleId : {eachSample.sample_id})
//                             </small>
//                           </p>
//                           <div>
//                             <small
//                               className={`mb-5 text-${
//                                 eachSample.chemicalParams.length === 0
//                                   ? "danger"
//                                   : "warning"
//                               }`}
//                             >
//                               {eachSample.chemicalParams.length !== 0 &&
//                                 "CHEMICAL PARAMETERS"}
//                             </small>
//                             {eachSample.chemicalParams.map(
//                               (eachParam: OrderSampleParams) =>
//                                 eachParam.selectedParams.map(
//                                   (
//                                     eachSelectedParam: OrderSampleSelectedParams
//                                   ) => (
//                                     <p>
//                                       <i
//                                         className={`mdi mdi-circle-medium align-middle text-${
//                                           index % 2 !== 0
//                                             ? "success"
//                                             : "warning"
//                                         } me-1`}
//                                       />

//                                       {eachSelectedParam.testName}
//                                     </p>
//                                   )
//                                 )
//                             )}

//                             <small
//                               className={`mb-5 text-${
//                                 eachSample.physicalParams.length === 0
//                                   ? "danger"
//                                   : "warning"
//                               }`}
//                             >
//                               {eachSample.physicalParams.length !== 0 &&
//                                 "PHYSICAL PARAMETERS"}
//                             </small>

//                             {eachSample.physicalParams.map(
//                               (eachParam: OrderSampleParams) =>
//                                 eachParam.selectedParams.map(
//                                   (
//                                     eachSelectedParam: OrderSampleSelectedParams
//                                   ) => (
//                                     <p>
//                                       <i
//                                         className={`mdi mdi-circle-medium align-middle text-${
//                                           index % 2 !== 0
//                                             ? "success"
//                                             : "warning"
//                                         } me-1`}
//                                       />
//                                       {eachSelectedParam.testName}
//                                     </p>
//                                   )
//                                 )
//                             )}
//                           </div>
//                         </div>
//                       );
//                     }
//                   )}
//                 </td>
//                 <td className=" border-1 p-0 mt-0 border-top-0">
//                   <tr>
//                     <td className="align-top">
//                       <small>Ordered On</small>
//                     </td>
//                     <td>{eachOrder.placedOn.slice(0, 10)}</td>
//                   </tr>
//                   <tr>
//                     <td>
//                       <small>Delevery Date</small>
//                     </td>{" "}
//                     <td>Expected on yyyy-mm-dd</td>
//                   </tr>{" "}
//                   <tr>
//                     <td>
//                       <small>Total Samples</small>
//                     </td>{" "}
//                     <td>{eachOrder.samplesList.length} Samples</td>
//                   </tr>{" "}
//                   <tr className="border border-bottom-1">
//                     <td>
//                       <small>Total tests</small>
//                     </td>{" "}
//                     <td>
//                       {eachOrder.samplesList.reduce(
//                         (accum, eachSample) =>
//                           accum +
//                           eachSample.chemicalParams.length +
//                           eachSample.physicalParams.length,
//                         0
//                       )}
//                     </td>
//                   </tr>
//                   <Button
//                     color="primary"
//                     type="button"
//                     className="btn w-100 mt-1"
//                     onClick={download}
//                   >
//                     <i className="mdi mdi-download font-size-12 mr-2"></i>{" "}
//                     Download Invoice
//                   </Button>
//                 </td>
//               </tr>
//             </Card>
//           );
//         })}
//       </tbody>
//     </Table>
//   </div>
// </CardBody>;
