import React, { useEffect, useMemo } from "react";
import SubscribersGraphComponent from "../Allcharts/apex/SubscribersGraphComponent";
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "common/TableContainer";
import { createSelector } from "reselect";
import Spinners from "Components/Common/Spinner";
import { ToastContainer } from "react-toastify";
import { EcoActionBD } from "./types";
import {
  getGraphSubscribers,
  getSubscribers,
  getSubscribersLast30Records,
} from "../../slices/BD/thunk";
import { getDateAndTime } from "./CallBacksList";
import Last30SubscribersGraph from "pages/Allcharts/apex/Last30SubscribersGraph";

const SubscribersList = () => {
  document.title = "Subscribers | KDM Engineers Group";

  const selectedProperties = createSelector(
    (state: EcoActionBD) => state.bd,
    (bd) => ({
      loading: bd.loading,
      subscribers: bd.subscribers,
      subscribersGraph: bd.subscribersGraph,
      subscribersLast30Records: bd.subscribersLast30Records,
    })
  );

  const {
    subscribers,
    loading,
    subscribersGraph,
    subscribersLast30Records,
  }: any = useSelector(selectedProperties);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getSubscribers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSubscribersLast30Records());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getGraphSubscribers());
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        header: "Mail",
        accessorKey: "email",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cellProps: any) => {
          return (
            <>
              <p className="text-muted mb-0">{cellProps.row.original.email}</p>
            </>
          );
        },
      },
      {
        header: "Date & Time",
        accessorKey: "subscribed_at",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cellProps: any) => {
          return (
            <>
              <p className="text-muted mb-0">
                {getDateAndTime(cellProps.row.original.subscribed_at)}
              </p>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            {loading ? (
              <Spinners />
            ) : (
              <React.Fragment>
                <Col lg={12}>
                  <Card>
                    <CardBody>
                      <CardTitle tag="h6" className="mb-4">
                        Last 30 days
                      </CardTitle>
                      <Last30SubscribersGraph
                        data={subscribersLast30Records || []}
                        dataColors='["--bs-primary", "--bs-success"]'
                      />
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={6}>
                  <Card>
                    <CardBody>
                      <TableContainer
                        columns={columns}
                        data={subscribers || []}
                        // isGlobalFilter={true}
                        isPagination={true}
                        // SearchPlaceholder="Search Customer.."
                        // isAddButton={true}
                        // handleUserClick={onClickAddCustomer}
                        // buttonClass="btn btn-success waves-effect waves-light addContact-modal"
                        // buttonName="Add Customer"
                        tableClass="align-middle table-nowrap table-hover dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                        theadClass="table-light"
                        paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                        pagination="pagination"
                      />
                    </CardBody>
                  </Card>
                </Col>
                <Col lg={6}>
                  {" "}
                  <Card>
                    <CardBody>
                      <CardTitle tag="h6" className="mb-4">
                        Subscibers Statistics
                      </CardTitle>
                      <SubscribersGraphComponent
                        data={subscribersGraph || []}
                        dataColors='["--bs-primary", "--bs-success"]'
                      />
                    </CardBody>
                  </Card>
                </Col>
              </React.Fragment>
            )}
          </Row>

          <ToastContainer />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default SubscribersList;
