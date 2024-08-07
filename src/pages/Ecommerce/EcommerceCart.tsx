import React, { useEffect, useState } from "react";

import { Container, Row, Col, Card, CardBody, Table } from "reactstrap";
import { Link } from "react-router-dom";
import Navbar from "pages/Welcome/Navbar/Navbar";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import logo from "../../assets/images/logo-dark.png";

import {
  deleteCart as onDeleteCart,
  getCart as onGetCart,
  paymentSuccessfull,
} from "slices/thunk";
import {
  CartProduct,
  CartProductParameter,
  EcoAction,
  TestParams,
} from "./type";
import { ToastContainer } from "react-toastify";
import Spinners from "Components/Common/Spinner";
import { url } from "../../helpers/api_helper";

const EcommerceCart = () => {
  document.title = "Cart | KDM Engineers Group";
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);

  const selectProperties = createSelector(
    (state: EcoAction) => state.ecommerce,
    (ecommerce) => ({
      cart: ecommerce.cart,
      loading: ecommerce.loading,
    })
  );

  const { cart, loading } = useSelector(selectProperties);

  const dispatch = useDispatch<any>();

  let sum = 0;

  const total = (cart || []).reduce((accum, eachSample) => {
    return (
      accum +
      eachSample.parameters.reduce(
        (parameterAccum, eachParam) => parameterAccum + eachParam.price,
        0
      )
    );
  }, 0);

  const discountAmount = (cart || []).reduce((discount, eachSample) => {
    return (
      discount +
      eachSample.parameters.reduce((paramDiscount, eachParam) => {
        return (
          paramDiscount +
          (eachSample.isOffer
            ? eachParam.price - (eachParam.price * eachSample.offer) / 100
            : eachParam.price)
        );
      }, 0)
    );
  }, 0);

  const shippingCharges = 200;
  const taxAmount = discountAmount * (18 / 100);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch]);

  function removeCartItem(sampleId: string) {
    dispatch(onDeleteCart(sampleId));
  }

  useEffect(() => {
    dispatch(onGetCart());
  }, [dispatch]);

  const getPriceOf = (parametersList: CartProductParameter[]) => {
    const rate = parametersList.reduce(
      (currentValue, eachParam) => eachParam.price + currentValue,
      0
    );

    sum = sum + rate;
    return rate;
  };

  const getOfferPrice = (product: CartProductParameter[], offer: number) => {
    const rate = getPriceOf(product);
    const offerPrice = rate - rate * (offer / 100);
    return offerPrice;
  };

  const onCartCheckout = async (amount: number) => {
    setPaymentLoading(true);
    const response = await fetch(
      `${url}/ecommerce/cart/create-order-on-server`,
      {
        method: "POST",
        body: JSON.stringify({
          amount: amount * 100,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const order = await response.json();

    var options = {
      key: "rzp_test_gHKvCPTaMlouR1",
      amount: order.amount,
      currency: "INR",
      receipt: order.receipt,
      name: "KDM Engineers Group",
      description: "Testing Transaction",
      image: logo,
      order_id: order.id,
      handler: async function (response: any) {
        const paymentInfo = {
          ...response,
          amount,
        };
        console.log("just before Payment succcessfull ");
        dispatch(paymentSuccessfull(paymentInfo));
        console.log("payment successfull just after");
        //Heey...pav validate your payment here
      },
      prefill: {
        name: "Pavan Marapalli",
        email: "pavanmarapalli171862@gmail.com",
        contact: "8179769162",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#007bff",
      },
    };
    var rzp1 = new (window as any).Razorpay(options);
    rzp1.open();

    rzp1.on("payment.failed", function (response: any) {
      console.log("heey... payment failed");
      console.log(rzp1);
      console.log(response);

      alert(response.error.description);
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    setPaymentLoading(false);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Navbar />
        <Container>
          <Row>
            <Col xl={8}>
              <Card>
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table align-middle mb-0 table-nowrap">
                      <thead className="table-light">
                        <tr>
                          <th className="align-top">Product</th>
                          <th className="align-top">
                            Material & Choosed Parameters
                          </th>
                          <th className="align-top">
                            <>
                              Price <br />
                              <small>
                                Click arrow for <br /> Price classification
                              </small>
                            </>
                          </th>
                          <th className="align-top">Remove</th>
                        </tr>
                      </thead>

                      {loading && <Spinners />}

                      <tbody>
                        {cart?.map((sample: CartProduct) => {
                          return (
                            <>
                              <tr key={sample.sampleId}>
                                <td>
                                  <img
                                    src={sample.img}
                                    alt="product-img"
                                    title="product-img"
                                    className="avatar-md"
                                  />
                                </td>
                                <td
                                  style={{
                                    maxWidth: "350px",
                                    whiteSpace: "normal",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  <h5 className="font-size-14 text-truncate mb-3">
                                    <Link
                                      to={
                                        "/ecommerce-product-detail/" +
                                        sample.productId
                                      }
                                      className="text-primary"
                                    >
                                      {sample.productName}
                                    </Link>
                                  </h5>

                                  <div>
                                    {sample.parameters.map(
                                      (
                                        eachParam: CartProductParameter,
                                        index: number
                                      ) => (
                                        <div key={index} className="mt-2">
                                          <div className="d-flex">
                                            <i
                                              className={`mdi mdi-circle-medium align-middle text-${
                                                index % 2 !== 0
                                                  ? "success"
                                                  : "warning"
                                              } me-1`}
                                            />
                                            <p>
                                              {eachParam.params.map(
                                                (eachTest, index) => (
                                                  <span key={index}>
                                                    {eachTest.testName}
                                                    {index <
                                                      eachParam.params.length -
                                                        1 && <br />}
                                                  </span>
                                                )
                                              )}
                                            </p>
                                          </div>
                                          {/* {eachParam.params.map(
                                            (eachTest: TestParams) => (
                                              <div className="d-flex">
                                                <i
                                                  className={`mdi mdi-circle-medium align-middle text-${
                                                    index % 2 !== 0
                                                      ? "success"
                                                      : "warning"
                                                  } me-1`}
                                                />
                                                <p key={eachTest.test_id}>
                                                  {eachTest.testName}
                                                </p>
                                              </div>
                                            )
                                          )} */}
                                          <hr />
                                        </div>
                                      )
                                    )}
                                  </div>
                                </td>

                                <td>
                                  <>
                                    <div>
                                      {sample.isOffer ? (
                                        <>
                                          <span className="text-muted me-2">
                                            <small>
                                              <del className="text-danger">
                                                Rs.{" "}
                                                {getPriceOf(sample.parameters)}
                                              </del>{" "}
                                              ({sample.offer} % Off)
                                            </small>
                                          </span>{" "}
                                          <br />
                                          <b className="text-success">
                                            Rs.{" "}
                                            {getOfferPrice(
                                              sample.parameters,
                                              sample.offer
                                            )}
                                          </b>
                                        </>
                                      ) : (
                                        <b className="text-success">
                                          Rs. {getPriceOf(sample.parameters)} /-
                                        </b>
                                      )}

                                      <Link
                                        to={
                                          "/ecommerce-product-detail/" +
                                          sample.productId +
                                          "#paramTable"
                                        }
                                        className="text-primary"
                                      >
                                        <i className="mdi mdi-arrow-top-right"></i>{" "}
                                      </Link>
                                    </div>
                                  </>
                                </td>

                                <td>
                                  <Link
                                    to="#"
                                    onClick={() =>
                                      removeCartItem(`${sample.sampleId}`)
                                    }
                                    className="action-icon text-danger"
                                  >
                                    <p>
                                      <i className="mdi mdi-trash-can font-size-18" />
                                    </p>
                                  </Link>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </Table>

                    {cart && cart.length === 0 && !loading && (
                      <h5 className="text-primary text-center mt-5 mb-5 m-auto">
                        Your cart is empty
                      </h5>
                    )}
                  </div>
                  <Row className="mt-4">
                    <Col sm="6">
                      <Link to="/material" className="btn btn-success">
                        <i className="mdi mdi-arrow-left me-1" /> Continue
                        Adding Products
                      </Link>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col xl={4}>
              {/* <Card>
                <CardBody>
                  <CardTitle className="mb-4">Card Details</CardTitle>
                  <Card color="primary" className="text-white visa-card mb-0">
                    <CardBody>
                      <div>
                        <i className="bx bxl-visa visa-pattern" />
                        <div className="float-end">
                          <i className="bx bxl-visa visa-logo display-3" />
                        </div>
                        <div>
                          <i
                            className="bx bx-chip h1 text-warning"
                            style={{ lineHeight: 1 }}
                          />
                        </div>
                      </div>

                      <Row className="mt-5">
                        <Col xs={4}>
                          <p>
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                          </p>
                        </Col>
                        <Col xs={4}>
                          <p>
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                          </p>
                        </Col>
                        <Col xs={4}>
                          <p>
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                            <i className="fas fa-star-of-life m-1" />
                          </p>
                        </Col>
                      </Row>

                      <div className="mt-5">
                        <h5 className="text-white float-end mb-0">12/22</h5>
                        <h5 className="text-white mb-0">Fredrick Taylor</h5>
                      </div>
                    </CardBody>
                  </Card>
                </CardBody>
              </Card> */}
              {(cart || []).length > 0 && (
                <Card>
                  <CardBody>
                    {/* <CardTitle className="mb-3">Order Summary</CardTitle> */}
                    <div className="table-responsive">
                      <Table className="table mb-0">
                        <thead>
                          <tr>
                            <th className="align-top">Order Summary</th>
                            <th className="align-top">Price (INR)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Bag Price :</td>
                            <td>{total}</td>
                          </tr>
                          <tr>
                            <td>Discount : </td>
                            <td className="text-success">
                              - {total - discountAmount || ""}
                            </td>
                          </tr>

                          <tr>
                            <td>Final Price : </td>
                            <td> {discountAmount || ""}</td>
                          </tr>
                          <tr>
                            <td>Shipping Charge (Fixed) :</td>
                            <td>{shippingCharges || ""}</td>
                          </tr>
                          <tr>
                            <td>Estimated Tax (18% of final Price): </td>
                            <td>{taxAmount}</td>
                          </tr>
                          <tr>
                            <th>Total :</th>
                            <th>
                              {Math.floor(
                                discountAmount + shippingCharges + taxAmount
                              )}
                            </th>
                          </tr>
                          <tr>
                            {cart && cart.length > 0 && (
                              <Col>
                                <div className="mt-2">
                                  <button
                                    className="btn btn-primary"
                                    id="rzp-button1"
                                    type="button"
                                    disabled={paymentLoading}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      onCartCheckout(
                                        Math.floor(
                                          // discountAmount +
                                          shippingCharges + taxAmount + total
                                        )
                                      );
                                    }}
                                  >
                                    {paymentLoading ? (
                                      <i className="bx bx-loader bx-spin "></i>
                                    ) : (
                                      <i className="mdi mdi-cart-arrow-right me-1" />
                                    )}{" "}
                                    Proceed to Pay{" "}
                                  </button>
                                </div>
                              </Col>
                            )}
                          </tr>
                        </tbody>
                      </Table>
                    </div>
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

export default EcommerceCart;
