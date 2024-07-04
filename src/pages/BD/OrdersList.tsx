import React, { useEffect, useMemo } from "react";

import {
  Container,
  Row,
  Col,
  CardBody,
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Card,
  CardTitle,
} from "reactstrap";
import { ONLINE, OFFLINE } from "common/tokens";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { EcoActionBD, Orders } from "./types";
import { ToastContainer } from "react-toastify";
import Spinners from "Components/Common/Spinner";

import { Link, useNavigate } from "react-router-dom";
import {
  getAllOrders,
  getOrdersDailyRecord,
  getOrdersMonthlyRecord,
} from "slices/thunk";
import TableContainer from "common/TableContainer";
import { getDateAndTime, getOnlyDate } from "./CallBacksList";
import LinerGraph from "pages/Allcharts/apex/LinerGraph";

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

export const greenBadge = (text: string) => (
  <Badge className="font-size-10 badge-soft-success m-1">{text}</Badge>
);

export const redBadge = (text: string) => (
  <Badge className="font-size-10 badge-soft-danger m-1">{text}</Badge>
);

export const infoBadge = (text: string) => (
  <Badge className="font-size-10 badge-soft-info m-1">{text}</Badge>
);

const OrdersList = () => {
  document.title = "Orders | KDM Engineers Group";

  const selectProperties = createSelector(
    (state: EcoActionBD) => state.bd,
    (bd) => ({
      loading: bd.loading,
      orders: bd.orders,
      showOrderAdditionalInfoModal: bd.showOrderAdditionalInfoModal,
      step2loader: bd.step2loader,
      ordersDaily: bd.ordersDaily,
      ordersMonthly: bd.ordersMonthly,
    })
  );

  const { loading, orders, ordersDaily, ordersMonthly } =
    useSelector(selectProperties);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrdersMonthlyRecord());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getOrdersDailyRecord());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        header: "Project Name",
        accessorKey: "project_name",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cellProps: any) => {
          const projectName = cellProps.row.original.project_name;
          const columnStyle: React.CSSProperties = {
            // minWidth: "100px",
            maxWidth: "400px",

            whiteSpace: "normal",
            wordWrap: "break-word",
          };
          return (
            <div style={columnStyle}>
              {projectName === null ? (
                redBadge("Under Review")
              ) : (
                <span>{projectName}</span>
              )}
            </div>
          );
        },
      },

      {
        header: "Proforma ",
        accessorKey: "proforma",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cellProps: any) => (
          <div style={{ cursor: "pointer" }}>
            {cellProps.row.original.proforma ? (
              <a
                href={cellProps.row.original.proforma}
                target="_blank"
                className="text-success"
              >
                {" "}
                <i className="bx bxs-file-pdf fs-1 align-middle text-danger me-2"></i>
              </a>
            ) : (
              redBadge("Under Review")
            )}
          </div>
        ),
      },

      {
        header: "Mode",
        accessorKey: "mode",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cellProps: any) => {
          return (
            <p>
              {cellProps.row.original.mode === ONLINE
                ? greenBadge("Online")
                : infoBadge("Offline")}
            </p>
          );
        },
      },

      {
        header: "Placed On",
        accessorKey: "placedOn",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cellProps: any) => {
          return <p>{getDateAndTime(cellProps.row.original.placedOn)}</p>;
        },
      },

      {
        header: "Expected Due Date",
        accessorKey: "due_date",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cellProps: any) => {
          return (
            <p>
              {cellProps.row.original.due_date ? (
                getOnlyDate(cellProps.row.original.due_date)
              ) : (
                <Badge className="font-size-10 badge-soft-danger m-1">
                  Not Yet Reviewed
                </Badge>
              )}
            </p>
          );
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
                <Link to={`/bd/orders/${cellProps.row.original.order_id}`}>
                  <DropdownItem>
                    <i
                      className="mdi mdi-eye-outline font-size-16 text-success me-1 mr-2"
                      id="edittooltip"
                    ></i>
                    Order Info
                    <UncontrolledTooltip placement="top" target="edittooltip">
                      Order Info
                    </UncontrolledTooltip>
                  </DropdownItem>
                </Link>

                <DropdownItem
                  href="#"
                  onClick={() => {
                    // console.log("Edit trigered");
                  }}
                >
                  <i
                    className="mdi mdi-ambulance font-size-16 text-success me-1 mr-2"
                    id="edittooltip"
                  ></i>
                  Driver Details
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Driver Info
                  </UncontrolledTooltip>
                </DropdownItem>

                <DropdownItem
                  href="#"
                  onClick={() => {
                    // console.log("Edit trigered");
                  }}
                >
                  <i
                    className="mdi mdi-ambulance font-size-16 text-success me-1 mr-2"
                    id="edittooltip"
                  ></i>
                  Customer Info
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Customer Info
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

  const navigate = useNavigate();

  const handleUserClicks = () => {
    navigate("/bd/offline-order-registration");
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle tag="h6" className="mb-4">
                    Orders Monthly Record
                  </CardTitle>
                  <LinerGraph
                    data={ordersMonthly || []}
                    dataColors='["--bs-primary"]'
                    titles={["Orders", "Month"]}
                  />
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle tag="h6" className="mb-4">
                    Orders Daily Record
                  </CardTitle>
                  <LinerGraph
                    data={ordersDaily || []}
                    dataColors='["--bs-success"]'
                    titles={["Orders", "Day"]}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col className="col-12">
              {loading && <Spinners />}
              {orders && (
                <CardBody style={{ backgroundColor: "White" }}>
                  <button
                    className="btn btn-primary m-2"
                    type="button"
                    onClick={handleUserClicks}
                  >
                    Create Order
                  </button>
                  <TableContainer
                    columns={columns}
                    data={orders || []}
                    isPagination={true}
                    tableClass="align-middle table-nowrap table-hover dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                    theadClass="table-light"
                    paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                    pagination="pagination"
                  />
                </CardBody>
              )}
            </Col>
          </Row>

          <ToastContainer />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default OrdersList;
