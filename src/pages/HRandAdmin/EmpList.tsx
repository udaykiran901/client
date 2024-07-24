import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import withRouter from "Components/Common/withRouter";
import TableContainer from "common/TableContainer";

//Import Breadcrumb
// import Breadcrumbs from "../../../Components/Common/Breadcrumb";
// import DeleteModal from "../../../Components/Common/DeleteModal";

import { getEmployees as onGetEmployees } from "../../slices/HRandAdmin/thunk";
import { createSelector } from "reselect";
import Spinners from "Components/Common/Spinner";
import { ToastContainer } from "react-toastify";
import DeleteModal from "common/DeleteModal";

const EmpList = () => {
  document.title = "Employee's List | KDM Engineers Group";

  const selectedProperties = createSelector(
    (state: any) => state.hrAndAdmin,
    (hrAndAdmin) => ({
      employees: hrAndAdmin.employees,
      loading: hrAndAdmin.loading,
    })
  );

  const navigate = useNavigate();

  const { employees, loading }: any = useSelector(selectedProperties);

  // const [isLoading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(onGetEmployees());
  }, [dispatch]);

  // const [modal, setModal] = useState<boolean>(false);

  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  // const onClickDelete = (users: any) => {
  //   // setContact(users.id);
  //   setDeleteModal(true);
  // };

  const handleDeleteUser = () => {
    //dispatch delete user
    setDeleteModal(false);
  };

  // const toggle = useCallback(() => {
  //   setModal(!modal);
  // }, [modal]);

  const columns = useMemo(
    () => [
      {
        header: "Employee Id",
        accessorKey: "emp_id",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <>
              {!cellProps.row.original.img ? (
                <div className="avatar-xs">
                  <span className="avatar-title rounded-circle">
                    {cellProps.row.original.first_name.charAt(0)}{" "}
                  </span>
                </div>
              ) : (
                <div>
                  <img
                    className="rounded-circle avatar-xs"
                    src={cellProps.row.original.profile_img}
                    alt=""
                  />
                </div>
              )}
            </>
          );
        },
      },
      {
        header: "Name",
        accessorKey: "first_name",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <>
              {/* <h5 className="font-size-14 mb-1">
                <Link to="#" className="text-dark">
                  {cellProps.getValue()}
                </Link>
              </h5> */}
              <p className="text-muted mb-0">
                {cellProps.row.original.first_name +
                  " " +
                  cellProps.row.original.last_name}
              </p>
            </>
          );
        },
      },

      {
        header: "Email",
        accessorKey: "email",
        enableColumnFilter: false,
        enableSorting: true,
      },

      {
        header: "Contact",
        accessorKey: "phone_number",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Branch",
        accessorKey: "branch",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "DOB",
        accessorKey: "dob",
        enableColumnFilter: false,
        enableSorting: true,
      },

      // {
      //   header: "Email",
      //   accessorKey: "email",
      //   enableColumnFilter: false,

      //   enableSorting: true,
      // },
      // {
      //   header: "Tags",
      //   accessorKey: "tags",
      //   enableColumnFilter: false,
      //   enableSorting: true,
      //   cell: (cellProps: any) => {
      //     return (
      //       <div>
      //         {cellProps.row.original.tags?.map((item: any, index: number) => (
      //           <Link
      //             to="#1"
      //             className="badge badge-soft-primary font-size-11 m-1"
      //             key={index}
      //           >
      //             {item}
      //           </Link>
      //         ))}
      //       </div>
      //     );
      //   },
      // },
      // {
      //   header: "Projects",
      //   accessorKey: "projects",
      //   enableColumnFilter: false,
      //   enableSorting: true,
      // },
      {
        header: "Action",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cellProps: any) => {
          return (
            <div className="d-flex gap-3">
              <Link
                to="#!"
                className="text-success"
                onClick={(event: any) => {
                  event.preventDefault();
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
              </Link>
              <Link
                to="#!"
                className="text-danger"
                onClick={(event: any) => {
                  event.preventDefault();
                  // const employeeData = cellProps.row.original;
                  // onClickDelete(employeeData);
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
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="12">
              {loading ? (
                <Spinners />
              ) : (
                <Card>
                  <CardBody>
                    <TableContainer
                      columns={columns}
                      data={employees || []}
                      isGlobalFilter={true}
                      isPagination={true}
                      SearchPlaceholder="Search..."
                      isCustomPageSize={true}
                      isAddButton={true}
                      handleUserClick={handleUserClicks}
                      buttonClass=" waves-effect waves-light  mb-2 btn btn-primary"
                      buttonName="Add Employee"
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

export default withRouter(EmpList);
