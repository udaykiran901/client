import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import withRouter from "Components/Common/withRouter";

import { Col, Container, Row, Card, Table, Spinner } from "reactstrap";

import { useDispatch } from "react-redux";
import { OrderSamples, Orders } from "pages/BD/types";
import { getDateAndTime } from "pages/BD/CallBacksList";

import { getCompleteOrderDetails, convertToTaxRequested } from "slices/thunk";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { ONLINE } from "common/tokens";
import { Link } from "react-router-dom";
import Spinners from "Components/Common/Spinner";

//customers data has to display appropriately
// have to revise form fields
// have to cross check all the fields

export const renderParameterDetails = (
  eachSample: OrderSamples,
  index: number
) => {
  return (
    <div>
      <small
        className={`mb-5 text-${
          eachSample.chemicalParams.length === 0 ? "danger" : "warning"
        }`}
      >
        {eachSample.chemicalParams.length !== 0 && "CHEMICAL PARAMETERS"}
      </small>
      {eachSample.chemicalParams.map((eachParam) =>
        eachParam.selectedParams.map((eachSelectedParam) => (
          <p>
            <i
              className={`mdi mdi-circle-medium align-middle text-${
                index % 2 !== 0 ? "success" : "warning"
              } me-1`}
            />
            {eachSelectedParam.testName}
          </p>
        ))
      )}

      <small
        className={`mb-5 text-${
          eachSample.physicalParams.length === 0 ? "danger" : "warning"
        }`}
      >
        {eachSample.physicalParams.length !== 0 && "PHYSICAL PARAMETERS"}
      </small>
      {eachSample.physicalParams.map((eachParam) =>
        eachParam.selectedParams.map((eachSelectedParam) => (
          <p>
            <i
              className={`mdi mdi-circle-medium align-middle text-${
                index % 2 !== 0 ? "success" : "warning"
              } me-1`}
            />
            {eachSelectedParam.testName}
          </p>
        ))
      )}
    </div>
  );
};

const getTaxRelatedColumns = (orderDetails: Orders) => {
  return (
    <>
      <tr>
        <th> Tax Converted Date</th>
        <td>{getDateAndTime(orderDetails.tax_converted_date)}</td>
      </tr>
      <tr>
        <th> Tax Number</th>
        <td>Invoice - {orderDetails.tax_number}</td>
      </tr>
    </>
  );
};

const OrderInfo = (props: any) => {
  const params = props.router.params;
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (params && params.id) {
      dispatch(getCompleteOrderDetails(params.id));
    }
  }, [dispatch, params]);

  const selectedProperties = createSelector(
    (state) => state.bd,
    (bd) => ({
      orderInfo: bd.orderInfo,
      loading: bd.loading,
    })
  );

  const { orderInfo, loading }: any = useSelector(selectedProperties);

  const order: Orders = orderInfo;

  const convertToTaxClicked = (id: number) => {
    dispatch(
      convertToTaxRequested({ order_number: id, orderId: order.order_id })
    );
  };

  const samples = (order.samplesList || []).map((eachSample) => ({
    sample_id: eachSample.sample_id,
    source: eachSample.source || null,
    quantity: eachSample.quantity || null,
    grade: eachSample.grade || null,
    brandName: eachSample.brandName || null,
    week_no: eachSample.week_no || null,
    ref_code: eachSample.ref_code || null,
    sample_id_optional_field: eachSample.sample_id_optional_field || null,
    site_name: null,
  }));

  const renderInputField = (key: any, index: any) => {
    const shallReturn = samples[index][key] ? true : false;

    const tableRow = () => (
      <tr key={index}>
        <td className="p-1" style={{ width: "180px" }}>
          {key}
        </td>
        <td className="p-1">{samples[index][key]}</td>
      </tr>
    );

    return shallReturn ? tableRow() : <React.Fragment></React.Fragment>;
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {loading && <Spinners />}
          {!loading && (
            <Row>
              <Col>
                <Card className="p-3">
                  <h5 className="text-primary">Order Details </h5>
                  <div className="table-responsive">
                    <Table
                      className="table table-bordered"
                      style={{ borderColor: "#eff2f7" }}
                    >
                      <tbody>
                        {order.mode === ONLINE && (
                          <tr>
                            <th style={{ maxWidth: "100px" }}> Razorpay Id</th>
                            <code>{order.razorpay_payment_id}</code>
                          </tr>
                        )}
                        <tr>
                          <th style={{ maxWidth: "100px" }}> Order Number</th>
                          <td>
                            ORD-{order.order_number}{" "}
                            <Link to={`/bd/order/edit/${order.order_id}`}>
                              {" "}
                              <i className="mdi mdi-pencil-outline"></i>
                            </Link>
                          </td>
                        </tr>
                        {order.registration_done && (
                          <tr>
                            <th style={{ maxWidth: "100px" }}>
                              Proforma Invoice , Work Order{" "}
                              {order.converted_to_tax ? ", Tax Invoice" : null}
                            </th>
                            <td>
                              <a href={order.proforma} target="_blank">
                                <i className="bx bxs-file-pdf fs-1 align-middle text-danger me-2"></i>
                              </a>
                              <a href={order.client_letter} target="_blank">
                                <i className="bx bxs-file-pdf fs-1 align-middle text-success me-2"></i>
                              </a>

                              {order.converted_to_tax && (
                                <a href={order.tax_invoice} target="_blank">
                                  <i className="bx bxs-file-pdf fs-1 align-middle text-primary me-2"></i>
                                </a>
                              )}
                            </td>
                          </tr>
                        )}
                        {!order.converted_to_tax && order.registration_done && (
                          <tr>
                            <th style={{ maxWidth: "100px" }}>
                              Convert to tax
                            </th>
                            <td>
                              {" "}
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() =>
                                  convertToTaxClicked(order.order_number)
                                }
                              >
                                {" "}
                                Convert to Tax{" "}
                                {loading ? (
                                  <i className="bx bx-loader bx-spin "></i>
                                ) : null}
                              </button>
                            </td>
                          </tr>
                        )}
                        {order.converted_to_tax && getTaxRelatedColumns(order)}
                        <tr>
                          <th style={{ maxWidth: "100px" }}>Order Placed On</th>
                          <td>{getDateAndTime(order.created_at)}</td>
                        </tr>{" "}
                        <tr>
                          <th style={{ maxWidth: "100px" }}>Project Name</th>
                          <td>{order.project_name}</td>
                        </tr>{" "}
                        <tr>
                          <th style={{ maxWidth: "100px" }}>Subject</th>
                          <td>{order.subject}</td>
                        </tr>{" "}
                        <tr>
                          <th style={{ maxWidth: "100px" }}>Assigned lab</th>
                          <td>{getDateAndTime(order.created_at)}</td>
                        </tr>{" "}
                        <tr>
                          <th style={{ maxWidth: "100px" }}>Ref</th>
                          <td>{order.ref}</td>
                        </tr>
                        <tr>
                          <th style={{ maxWidth: "100px" }}>
                            Expected Dilevery Date
                          </th>
                          <td>{order.due_date}</td>
                        </tr>
                        <tr>
                          <th style={{ maxWidth: "100px" }}>Letter</th>
                          <td>{order.due_date}</td>
                        </tr>
                        <tr>
                          <th style={{ maxWidth: "100px" }}>
                            Additional Information
                          </th>
                          <td>{order.additional_info}</td>
                        </tr>
                        {order.parent_ref_bool && (
                          <tr>
                            <th style={{ maxWidth: "100px" }}>
                              Parent Reference
                            </th>
                            <td>{order.parent_ref}</td>
                          </tr>
                        )}
                        {order.nhai_bool && (
                          <tr>
                            <th style={{ maxWidth: "100px" }}></th>
                            <td>{order.nhai_hq_letter}</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                </Card>

                <Card className="p-3">
                  <h5 className="text-primary">Customer's Details </h5>

                  <div className="table-responsive">
                    <Table
                      className="table table-bordered"
                      style={{ borderColor: "#eff2f7" }}
                    >
                      <tbody>
                        <tr>
                          <th style={{ maxWidth: "100px" }}> Customer Id</th>
                          <code>{order.customer_id}</code>
                        </tr>
                        <tr>
                          <th style={{ maxWidth: "100px" }}> Discount</th>
                          <td>{order.discount} %</td>
                        </tr>
                        <tr>
                          <th style={{ maxWidth: "100px" }}>
                            Transportation Fee
                          </th>
                          <td>{order.transportation_fee}</td>
                        </tr>{" "}
                      </tbody>
                    </Table>
                  </div>
                </Card>

                <Card className="p-3 shadow-lg">
                  <h5 className="text-primary mb-3">Sample's data</h5>
                  <Row>
                    {order &&
                      order.samplesList &&
                      order.samplesList.map(
                        (eachSample: OrderSamples, index: number) => (
                          <div key={eachSample.sample_id}>
                            <div className="d-flex">
                              <div className="flex-shrink-0 me-3">
                                <img
                                  src={eachSample.image}
                                  alt={eachSample.image}
                                  className="rounded avatar-md"
                                />
                              </div>

                              <div className="flex-grow-1">
                                <p className="mb-lg-0">
                                  <code>Sample - {index + 1 + "   "}</code>
                                  <code>({eachSample.sample_id})</code>
                                </p>
                                <h6 className="mt-2">{eachSample.name}</h6>
                                {renderParameterDetails(eachSample, index)}

                                <div className="table-responsive">
                                  <Table
                                    className="table table-bordered"
                                    style={{ borderColor: "#eff2f7" }}
                                  >
                                    <tbody>
                                      {renderInputField(`source`, index)}
                                      {renderInputField(`quantity`, index)}
                                      {renderInputField(`brandName`, index)}
                                      {renderInputField(`grade`, index)}
                                      {renderInputField(`week_no`, index)}
                                      {renderInputField(`ref_code`, index)}
                                      {renderInputField(
                                        `sample_id_optional_field`,
                                        index
                                      )}
                                      {renderInputField(`site_name`, index)}
                                    </tbody>
                                  </Table>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                  </Row>
                </Card>
              </Col>
            </Row>
          )}
          <ToastContainer />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(OrderInfo);
