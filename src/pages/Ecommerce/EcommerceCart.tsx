import React, { useEffect, useState } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Table,
  // Input,
  CardTitle,
  // InputGroup,
  // Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import Navbar from "pages/Welcome/Navbar/Navbar";

//Import Breadcrumb
import Breadcrumbs from "../../Components/Common/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { deleteCart as onDeleteCart, getCart as onGetCart } from "slices/thunk";
import { cart } from "./type";

const EcommerceCart = () => {
  //meta title
  document.title = "Cart | KDM Engineers Group";

  const selectProperties = createSelector(
    (state: any) => state.ecommerce,
    (ecommerce) => ({
      cart: ecommerce.cart,
    })
  );

  const { cart } = useSelector(selectProperties);

  const dispatch = useDispatch<any>();
  const [productList, setproductList] = useState<cart[]>();
  const [dic, setDic] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [charge, setCharge] = useState<number>(0);

  const assigned = (productList || [])?.map((item: any) => item.basePrice);
  let subTotal = 0;
  for (let i = 0; i < assigned.length; i++) {
    subTotal += Math.round(assigned[i]);
  }

  useEffect(() => {
    let dic = 0.15 * subTotal;
    let tax = 0.125 * subTotal;
    if (subTotal !== 0) {
      setCharge(65);
    } else {
      setCharge(0);
    }
    setDic(dic);
    setTax(tax);
  }, [subTotal]);

  function removeCartItem(id: any) {
    dispatch(onDeleteCart(id));
  }

  // function countUP(id: any, prev_data_attr: any, price: any) {
  //   setproductList(
  //     (productList || [])?.map((count: any) => {
  //       return count.id === id
  //         ? {
  //             ...count,
  //             data_attr: prev_data_attr + 1,
  //             total: (prev_data_attr + 1) * price,
  //           }
  //         : count;
  //     })
  //   );
  // }

  // function countDown(id: any, prev_data_attr: any, price: any) {
  //   setproductList(
  //     (productList || [])?.map((count: any) =>
  //       count.id === id && count.data_attr > 0
  //         ? {
  //             ...count,
  //             data_attr: prev_data_attr - 1,
  //             total: (prev_data_attr - 1) * price,
  //           }
  //         : count
  //     )
  //   );
  // }

  useEffect(() => {
    dispatch(onGetCart());
  }, [dispatch]);

  useEffect(() => {
    setproductList(cart);
  }, [cart]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Navbar />
        <Container>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Cart" />
          <Row>
            <Col xl={8}>
              <Card>
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table align-middle mb-0 table-nowrap">
                      <thead className="table-light">
                        <tr>
                          <th>Product</th>
                          <th>Product Desc</th>
                          <th>Price</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(productList || [])?.map((product: cart) => {
                          return (
                            <tr key={product.id}>
                              <td>
                                <img
                                  src={product.img}
                                  alt="product-img"
                                  title="product-img"
                                  className="avatar-md"
                                />
                              </td>
                              <td>
                                <h5 className="font-size-14 text-truncate">
                                  <Link
                                    to={
                                      "/ecommerce-product-detail/" + product.id
                                    }
                                    className="text-primary"
                                  >
                                    {product.name}
                                  </Link>
                                </h5>
                                <p className="mb-0">
                                  {" "}
                                  Group :
                                  <span className="fw-medium">
                                    {product.category}{" "}
                                  </span>
                                </p>
                              </td>

                              <td>
                                <span> ₹ {product.basePrice}</span>
                                {product.isOffer && (
                                  <p className="text-success"> Offer Applied</p>
                                )}
                              </td>
                              <td>
                                <Link
                                  to="#"
                                  onClick={() => removeCartItem(product.id)}
                                  className="action-icon text-danger"
                                >
                                  <i className="mdi mdi-trash-can font-size-18" />
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                  <Row className="mt-4">
                    <Col sm="6">
                      <Link to="/material" className="btn btn-secondary">
                        <i className="mdi mdi-arrow-left me-1" /> Continue
                        Shopping
                      </Link>
                    </Col>
                    <Col sm="6">
                      <div className="text-sm-end mt-2 mt-sm-0">
                        <Link
                          to="/ecommerce-checkout"
                          className="btn btn-success"
                        >
                          <i className="mdi mdi-cart-arrow-right me-1" />{" "}
                          Checkout
                        </Link>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card>
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
              </Card>
              <Card>
                <CardBody>
                  <CardTitle className="mb-3">Order Summary</CardTitle>
                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <tbody>
                        <tr>
                          <td>Grand Total :</td>
                          <td>$ {subTotal || ""}</td>
                        </tr>
                        <tr>
                          <td>Discount : </td>
                          <td>- $ {dic.toFixed(2) || ""}</td>
                        </tr>
                        <tr>
                          <td>Shipping Charge :</td>
                          <td>$ {charge || ""}</td>
                        </tr>
                        <tr>
                          <td>Estimated Tax : </td>
                          <td>$ {tax.toFixed(2) || ""}</td>
                        </tr>
                        <tr>
                          <th>Total :</th>
                          <th>
                            $ {(subTotal + charge + tax - dic).toFixed(2) || ""}
                          </th>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceCart;
