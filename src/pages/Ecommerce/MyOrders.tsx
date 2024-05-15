import React, { useEffect } from "react";

import {
  Container,
  Row,
  Col,
  CardBody,
  Table,
  UncontrolledTooltip,
  Card,
  Button,
} from "reactstrap";

import Navbar from "pages/Welcome/Navbar/Navbar";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { getMyOrdersPartial as onGetMyOrdersPartailData } from "slices/thunk";
import {
  EcoAction,
  MyOrder,
  MyParam,
  MySamples,
  MySelectedParam,
} from "./type";
import { ToastContainer } from "react-toastify";
import Spinners from "Components/Common/Spinner";

import { Link, useNavigate } from "react-router-dom";

const MyOrders = () => {
  document.title = "My Orders | KDM Engineers Group";

  const selectProperties = createSelector(
    (state: EcoAction) => state.ecommerce,
    (ecommerce) => ({
      loading: ecommerce.loading,
      myOrders: ecommerce.myOrders,
    })
  );

  const { loading, myOrders } = useSelector(selectProperties);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch]);

  useEffect(() => {
    dispatch(onGetMyOrdersPartailData());
  }, [dispatch]);

  const download = () => window.print();

  const navigate = useNavigate();

  const renderEmptyListMessage = () => (
    <div className="text-center mt-5">
      <p className=" text-warning">
        Oops! It looks like you haven't placed any orders yet. Your orders list
        is empty.
      </p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => navigate("/material")}
      >
        Continue Shopping
      </button>
    </div>
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Navbar />
        <Container>
          <Row>
            <h4 className="text-success">My Orders</h4>
            <p>
              Welcome to your orders dashboard! Here, you can conveniently
              manage all your past orders in one place. From tracking your order
              status to reviewing past purchases, everything you need is right
              here. Take a stroll through your order history and explore the
              details of your previous transactions. Let's get started
            </p>
            {loading && <Spinners />}

            <Row>
              <Col className="col-12">
                {myOrders.length === 0 ? (
                  renderEmptyListMessage()
                ) : (
                  <CardBody>
                    <div className="table-responsive">
                      <Table className="table  mb-0 ">
                        {loading && <Spinners />}

                        <tbody>
                          {myOrders?.map((eachOrder: MyOrder) => {
                            return (
                              <Card>
                                <small>
                                  <b className="text-warning">Order Id</b> :{" "}
                                  {eachOrder.order_id}
                                </small>
                                <tr>
                                  <td style={{ width: "150px" }}>
                                    <div className="avatar-group">
                                      {eachOrder.samplesList.map(
                                        (
                                          eachSample: MySamples,
                                          idx: number
                                        ) => {
                                          return (
                                            <React.Fragment key={idx}>
                                              <div className="avatar-group-item">
                                                <Link
                                                  to={`/ecommerce-product-detail/${eachSample.product_id}`}
                                                  className="d-inline-block"
                                                >
                                                  <img
                                                    src={eachSample.image}
                                                    className="rounded-circle avatar-sm"
                                                    alt=""
                                                    id={
                                                      "sample" +
                                                      eachSample.sample_id
                                                    }
                                                  />

                                                  <UncontrolledTooltip
                                                    placement="bottom"
                                                    target={
                                                      "sample" +
                                                      eachSample.sample_id
                                                    }
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
                                  </td>
                                  <td
                                    style={{ width: "600px" }}
                                    className="p-0"
                                  >
                                    {eachOrder.samplesList.map(
                                      (
                                        eachSample: MySamples,
                                        index: number
                                      ) => {
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
                                                to={`/ecommerce-product-detail/${eachSample.product_id}`}
                                                className="d-inline-block"
                                              >
                                                {" "}
                                                {eachSample.name}
                                                {"   "}
                                              </Link>
                                              <small style={{ color: "#000" }}>
                                                ({"    "} SampleId :{" "}
                                                {eachSample.sample_id})
                                              </small>
                                            </p>
                                            <div>
                                              <small
                                                className={`mb-3 text-${
                                                  eachSample.chemicalParams
                                                    .length === 0
                                                    ? "danger"
                                                    : "warning"
                                                }`}
                                              >
                                                {eachSample.chemicalParams
                                                  .length !== 0 &&
                                                  "CHEMICAL PARAMETERS"}
                                              </small>
                                              {eachSample.chemicalParams.map(
                                                (eachParam: MyParam) =>
                                                  eachParam.selectedParams.map(
                                                    (
                                                      eachSelectedParam: MySelectedParam
                                                    ) => (
                                                      <p>
                                                        <i
                                                          className={`mdi mdi-circle-medium align-middle text-${
                                                            index % 2 !== 0
                                                              ? "success"
                                                              : "warning"
                                                          } me-1`}
                                                        />

                                                        {
                                                          eachSelectedParam.testName
                                                        }
                                                      </p>
                                                    )
                                                  )
                                              )}

                                              <small
                                                className={`mb-3 text-${
                                                  eachSample.physicalParams
                                                    .length === 0
                                                    ? "danger"
                                                    : "warning"
                                                }`}
                                              >
                                                {eachSample.physicalParams
                                                  .length !== 0 &&
                                                  "PHYSICAL PARAMETERS"}
                                              </small>

                                              {eachSample.physicalParams.map(
                                                (eachParam: MyParam) =>
                                                  eachParam.selectedParams.map(
                                                    (
                                                      eachSelectedParam: MySelectedParam
                                                    ) => (
                                                      <p>
                                                        <i
                                                          className={`mdi mdi-circle-medium align-middle text-${
                                                            index % 2 !== 0
                                                              ? "success"
                                                              : "warning"
                                                          } me-1`}
                                                        />
                                                        {
                                                          eachSelectedParam.testName
                                                        }
                                                      </p>
                                                    )
                                                  )
                                              )}
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                  </td>
                                  <td className=" border-1 p-0 mt-0 border-top-0">
                                    <tr>
                                      <td className="align-top">
                                        <small>Ordered On</small>
                                      </td>
                                      <td>{eachOrder.placedOn.slice(0, 10)}</td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <small>Delevery Date</small>
                                      </td>{" "}
                                      <td>
                                        {eachOrder.due_date
                                          ? eachOrder.due_date
                                          : "Delivery date is estimated within 12Hrs after an order is placed"}
                                      </td>
                                    </tr>{" "}
                                    <tr>
                                      <td>
                                        <small>Total Samples</small>
                                      </td>{" "}
                                      <td>
                                        {eachOrder.samplesList.length} Samples
                                      </td>
                                    </tr>{" "}
                                    <tr className="border border-bottom-1">
                                      <td>
                                        <small>Total tests</small>
                                      </td>{" "}
                                      <td>
                                        {eachOrder.samplesList.reduce(
                                          (accum, eachSample) =>
                                            accum +
                                            eachSample.chemicalParams.length +
                                            eachSample.physicalParams.length,
                                          0
                                        )}
                                      </td>
                                    </tr>
                                    <Button
                                      color="primary"
                                      type="button"
                                      className="btn w-100 mt-1"
                                      onClick={download}
                                    >
                                      <i className="mdi mdi-download font-size-12 mr-2"></i>{" "}
                                      Download Invoice
                                    </Button>
                                  </td>
                                </tr>
                              </Card>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                )}
              </Col>
            </Row>
          </Row>
          <ToastContainer />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default MyOrders;
