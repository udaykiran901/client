import { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Row, Table } from "reactstrap";
import { getAllSampleMaterials } from "slices/thunk";
import { createSelector } from "reselect";
import {
  EcoActionBD,
  Orders,
  OrderSampleSelectedParams,
  Param,
  Samples,
} from "./types";
import { useSelector } from "react-redux";
import React from "react";
import { greenBadge, infoBadge } from "./OrdersList";

import {
  ACCEPTED,
  ACCEPTED_TEXT,
  ASSIGNED_TO_ANALYST,
  ASSIGNED_TO_ANALYST_TEXT,
  CHEMICAL,
  IN_PROGRESS,
  IN_PROGRESS_TEXT,
  NOT_YET_ASSIGNED,
  NOT_YET_ASSIGNED_TEXT,
  REJECTED,
  REJECTED_TEXT,
  UNDER_REVIEW,
  UNDER_REVIEW_TEXT,
} from "common/tokens";

import Spinners from "Components/Common/Spinner";
import { Col } from "reactstrap";

export const renderParameter = (arr: OrderSampleSelectedParams[]) => {
  return arr.map((eachTest) => (
    <div className="d-flex" key={eachTest.test_id}>
      <i className="mdi mdi-circle-medium align-middle text-primary me-1" />
      <p
        className="address-column"
        style={{
          whiteSpace: "normal",
          wordBreak: "break-word",
        }}
      >
        {eachTest.testName}
      </p>
    </div>
  ));
};

export const renderParamText = (status: string): ReactElement => {
  let statusText: ReactElement;
  switch (status) {
    case NOT_YET_ASSIGNED:
      statusText = <p className="text-danger">{NOT_YET_ASSIGNED_TEXT}</p>;
      break;

    case ASSIGNED_TO_ANALYST:
      statusText = <p className="text-success">{ASSIGNED_TO_ANALYST_TEXT}</p>;
      break;

    case IN_PROGRESS:
      statusText = <p className="text-warning">{IN_PROGRESS_TEXT}</p>;
      break;

    case UNDER_REVIEW:
      statusText = <p className="text-info">{UNDER_REVIEW_TEXT}</p>;
      break;

    case ACCEPTED:
      statusText = <p className="text-success">{ACCEPTED_TEXT}</p>;
      break;

    case REJECTED:
      statusText = <p className="text-danger">{REJECTED_TEXT}</p>;
      break;

    default:
      statusText = <p></p>;
  }

  return statusText;
};

export const renderSamplesTable = (
  eachParam: Param,
  complete_info: boolean
) => (
  <React.Fragment key={eachParam.param_id}>
    <tr>
      <td style={{ width: "300px" }}>
        {renderParameter(eachParam.params_info)}
      </td>
      <td style={{ width: "100px" }}>
        {eachParam.param.discipline === CHEMICAL
          ? greenBadge("Chemical")
          : infoBadge("Physical")}
      </td>

      <td>{renderParamText(eachParam.status)}</td>
      {complete_info && <td>Bench Record</td>}
    </tr>
  </React.Fragment>
);

interface TrackSampleType {
  order_id: string;
  complete_info: boolean;
}
const TrackSample: React.FC<TrackSampleType> = ({
  order_id,
  complete_info,
}) => {
  const selectedProperties = createSelector(
    (state: EcoActionBD) => state.bd,
    (bd) => ({
      loadingBD: bd.loading,
      allOrderSamples: bd.allOrderSamples,
    })
  );
  const { allOrderSamples, loadingBD } = useSelector(selectedProperties);

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getAllSampleMaterials(order_id));
  }, [dispatch, order_id]);

  const getCompleteOrderDetails = (order: Orders) => {
    const { samples } = order;
    return (
      <Row>
        <div className="text-center"> {loadingBD && <Spinners />}</div>

        {!loadingBD &&
          (samples || []).map((eachSample: Samples) => (
            <Col lg={12} key={eachSample.sample_id}>
              <p className="text-primary">
                {" "}
                {eachSample.product.name}{" "}
                <code className="text-danger">({eachSample.sample_code})</code>
              </p>

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
                      {complete_info && (
                        <>
                          <td style={{ color: "#a6b0cf" }}>Bench Record</td>
                        </>
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {eachSample.params.map((eachParam: Param) =>
                      renderSamplesTable(eachParam, complete_info)
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>
          ))}
      </Row>
    );
  };

  return (
    <div>
      {allOrderSamples.map((eachOrder: Orders) => (
        <Col> {getCompleteOrderDetails(eachOrder)}</Col>
      ))}
    </div>
  );
};

export default TrackSample;
