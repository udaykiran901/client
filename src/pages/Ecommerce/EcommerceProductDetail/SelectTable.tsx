import React, { useMemo } from "react";

import { Badge, Card, CardBody } from "reactstrap";
// import EcommerenceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal";

import TableContainer from "Components/Common/TableContainer";
// import { getTransaction as onGetTransaction } from "slices/thunk";
// import { useDispatch, useSelector } from "react-redux";
// import { createSelector } from "reselect";
// import { LatestTransactions } from "./type";

import { CHEMICAL } from "common/tokens";
import { offerDetails } from "../type";
import { darkGreenBadge } from "Components/Common/Badges";

interface TableProps {
  toggleTest: (id: any) => void;
  offerDetails: offerDetails;
  data: {
    paramId: string;
    price: number;
    common_req: boolean;
    requirement: string;
    isNabl: boolean;
    discipline: string;
    params: any;
    popular: boolean;
  }[];
}

const SelectTable: React.FC<TableProps> = ({
  data,
  toggleTest,
  offerDetails,
}) => {
  const columns = useMemo(
    () => [
      {
        header: "Select",
        accessorKey: "id",
        enableColumnFilter: false,

        cell: (cellProps: any) => {
          return (
            <div className="form-check ml-3">
              <input
                type="checkbox"
                checked={cellProps.row.original.selected}
                className="form-check-input"
                onChange={() => toggleTest(cellProps.row.original.paramId)}
              />
            </div>
          );
        },
      },

      {
        header: "Parameter",
        accessorKey: "testName",
        enableColumnFilter: false,
        cell: (cellProps: any) => {
          return (
            <div>
              {cellProps.row.original.popular === "1"
                ? darkGreenBadge("Popular Test")
                : ""}
              {cellProps.row.original.params.map((eachParam) => (
                <div className="d-flex">
                  <i className="mdi mdi-circle-medium align-middle text-primary me-1" />
                  <p
                    key={eachParam.test_id}
                    className="address-column"
                    style={{
                      maxWidth: "350px",
                      minWidth: "200px",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    {eachParam.testName}
                  </p>
                </div>
              ))}
            </div>
          );
        },
      },

      {
        header: "Requirements",
        accessorKey: "requirement",
        enableColumnFilter: false,
        // enableSorting: true,
        cell: (cellProps: any) => {
          if (cellProps.row.original.common_req)
            return <p>{cellProps.row.original.requirement} </p>;
          else {
            cellProps.row.original.params.map((eachParam) => (
              <p key={eachParam.test_id}>
                <i className="mdi mdi-circle-medium align-middle text-primary me-1" />
                {eachParam.requirement}
              </p>
            ));
          }
        },
      },

      {
        header: offerDetails.isOffer
          ? `Price (${offerDetails.offerPercentage}% Off)`
          : "Price",
        accessorKey: "price",
        enableColumnFilter: false,
        // enableSorting: true,

        cell: (cellProps: any) => {
          return (
            <div>
              {/* {offerDetails.isOffer ? (
                <div>
                  <span className="text-muted me-2">
                    <small>
                      <del className="text-danger">
                        {" "}
                        Rs. {cellProps.row.original.price}
                      </del>{" "}
                    </small>
                  </span>{" "}
                  <br />
                  <b className="text-success">
                    Rs.{" "}
                    {cellProps.row.original.price -
                      ((cellProps.row.original.price *
                        offerDetails.offerPercentage) as number) /
                        100}
                    /-
                  </b>
                </div>
              ) : ( */}
              <b className="text-success">
                Rs. {cellProps.row.original.price} /-
              </b>
              {/* )} */}
            </div>
          );
        },
      },
      {
        header: "Param Id",
        accessorKey: "paramId",
        enableColumnFilter: false,
        cell: (cellProps: any) => (
          <div>
            <p>{cellProps.row.original.paramId}</p>
            {cellProps.row.original.isNabl ? (
              <Badge className="font-size-9 badge-soft-success">NABL</Badge>
            ) : (
              <Badge className="font-size-9 badge-soft-danger">NON-NABL</Badge>
            )}
          </div>
        ),
      },
      {
        header: "Discipline",
        accessorKey: "discipline",
        enableColumnFilter: false,
        // enableSorting: true,
        cell: (cellProps: any) => {
          return (
            <Badge
              className={
                "font-size-11 badge-soft-" +
                (cellProps.row.original.discipline === CHEMICAL
                  ? "success"
                  : "danger")
              }
            >
              {cellProps.row.original.discipline}
            </Badge>
          );
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <Card>
        <CardBody id="paramTable">
          <p className="mb-2 mt-2 text-primary">
            * Select Parameters and hit on Add To cart Button
          </p>
          <TableContainer
            columns={columns}
            data={data}
            isGlobalFilter={false}
            tableClass="align-middle table-nowrap mb-0"
            theadClass="table-light"
            // isPagination={data.length > 10 ? true : false}
            // tableClass="align-middle table-nowrap table-hover dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
            // theadClass="table-light"
            // paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
            // pagination="pagination"
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default SelectTable;
