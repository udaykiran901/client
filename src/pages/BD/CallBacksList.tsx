import React, { useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import withRouter from "Components/Common/withRouter";
import TableContainer from "common/TableContainer";

import { createSelector } from "reselect";
import Spinners from "Components/Common/Spinner";
import { ToastContainer } from "react-toastify";
import { EcoActionBD } from "./types";
import {
  getRequestCallBacks,
  uploadCustomerRequestAudio,
} from "../../slices/BD/thunk";

export const getDateAndTime = (dateStr: string) => {
  const date = new Date(dateStr);

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  let hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  const amOrPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return ` ${day}-${month}-${year}  ${hours}:${minutes}:${seconds}  ${amOrPm}`;
};

export const getOnlyDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return ` ${day}-${month}-${year} `;
};

const CallBacksList = () => {
  document.title = "Call Back Requests | KDM Engineers Group";

  const selectedProperties = createSelector(
    (state: EcoActionBD) => state.bd,
    (bd) => ({
      callbacks: bd.callbacks,
      loading: bd.loading,
    })
  );

  const navigate = useNavigate();

  const { callbacks, loading }: any = useSelector(selectedProperties);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getRequestCallBacks());
  }, [dispatch]);

  const fileInputRef: any = useRef(null);

  const handleUpload = (req_id) => {
    const fileInput = document.getElementById(`fileInput_${req_id}`);
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = (requestId: any, file: any) => {
    const data = {
      requestId,
      audio: file,
    };
    dispatch(uploadCustomerRequestAudio(data));
  };

  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.name}</p>
          );
        },
      },
      {
        header: "Mobile",
        accessorKey: "mobile",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <p className="text-muted mb-0">{cellProps.row.original.mobile}</p>
          );
        },
      },

      {
        header: "Whatsapp Concent",
        accessorKey: "whatsapp_consent",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <p className="text-muted mb-0">
              {cellProps.row.original.whatsapp_consent ? "Yes" : "No"}
            </p>
          );
        },
      },

      {
        header: "Requested At",
        accessorKey: "requested_at",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <p className="text-muted mb-0">
              {getDateAndTime(cellProps.row.original.requested_at)}
            </p>
          );
        },
      },
      {
        header: "Query Status",
        accessorKey: "addressed",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <>
              <p className="text-muted mb-0">
                {cellProps.row.original.addressed
                  ? "Addressed"
                  : "Yet to be addressed"}
              </p>
            </>
          );
        },
      },
      {
        header: "Call Recording",
        accessorKey: "request_id",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <div style={{ width: "250px", textAlign: "center" }}>
              <input
                type="file"
                accept="audio/*"
                onChange={(e: any) => {
                  e.preventDefault();
                  const file = e.target.files[0];
                  if (file) {
                    handleFileChange(cellProps.row.original.request_id, file);
                  }
                }}
                ref={fileInputRef}
                style={{ display: "none" }}
                id={`fileInput_${cellProps.row.original.request_id}`} // Assign a unique ID to each file input
              />
              {!cellProps.row.original.callrecording && (
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() =>
                    handleUpload(cellProps.row.original.request_id)
                  }
                >
                  <i className="mdi mdi-upload font-size-12"></i> Upload
                </button>
              )}

              {cellProps.row.original.callrecording && (
                <div>
                  <audio controls>
                    <source
                      src={cellProps.row.original.callrecording}
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio for this
                    application.
                  </audio>
                </div>
              )}
            </div>
          );
        },
      },

      {
        header: "Action",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cellProps: any) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#!"
                className="text-danger"
                onClick={(event: any) => {
                  event.preventDefault();
                }}
              >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
              </Link>
            </div>
          );
        },
      },
    ],
    []
  );

  const handleUserClicks = () => {
    navigate("/hr/add-emp");
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="12">
              {loading ? (
                <Spinners />
              ) : (
                <Card>
                  <CardBody>
                    <h1>change this</h1>
                    <TableContainer
                      columns={columns}
                      data={callbacks || []}
                      // isGlobalFilter={true}
                      isPagination={true}
                      // SearchPlaceholder="Search..."
                      // isCustomPageSize={true}
                      // isAddButton={true}
                      handleUserClick={handleUserClicks}
                      // buttonClass="btn btn-success btn-rounded waves-effect waves-light addContact-modal mb-2"
                      // buttonName="Add Employee"
                      tableClass="align-middle table-nowrap table-hover dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                      theadClass="table-light"
                      paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                      pagination="pagination"
                    />
                  </CardBody>
                </Card>
              )}
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(CallBacksList);
