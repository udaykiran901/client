import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import withRouter from "Components/Common/withRouter";
import { isUserLoggedin } from "../../../helpers/api_helper";
import { ToastContainer } from "react-toastify";
import Select from "react-select";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  TabContent,
  Table,
  TabPane,
  Modal,
  ModalHeader,
} from "reactstrap";
import classnames from "classnames";
import { isEmpty } from "lodash";
import { closeModal, showModal } from "slices/e-commerence/reducer";

// import RecentProduct from "./RecentProducts";
// import Reviews from "./Reviews";

//Import Star Ratings
import StarRatings from "react-star-ratings";

//Import Breadcrumb
import Breadcrumbs from "Components/Common/Breadcrumb";
// import { useState } from "react";

//Import actions
import {
  getProductDetail as onGetProductDetail,
  addProductToCart,
} from "slices/thunk";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { EcoAction, Tests } from "../type";
import Navbar from "pages/Welcome/Navbar/Navbar";
import { loginWarningModal } from "slices/e-commerence/reducer";
import { KDM_ECOMMERCE_USER_JWT_TOKEN } from "common/tokens";

const EcommerceProductDetail = (props) => {
  //meta title
  document.title = "Product Details | KDM Engineers Group";
  const dispatch = useDispatch<any>();
  const selectProperties = createSelector(
    (state: EcoAction) => state.ecommerce,

    (ecommerce) => ({
      productDetail: ecommerce.productDetail,
      modal: ecommerce.modal,
    })
  );
  const { productDetail, modal } = useSelector(selectProperties);
  const params = props.router.params;
  const [selectedTests, setSelectedTests] = useState(null) as any[];
  const [basket, setBasket] = useState<any>();

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetProductDetail(params.id));
    }
  }, [dispatch, params]);

  const onAddToCart = () => {
    console.log(basket);
    const isUserLogin = isUserLoggedin(KDM_ECOMMERCE_USER_JWT_TOKEN);
    if (!isUserLogin) {
      dispatch(showModal(loginWarningModal));
      return;
    }

    const cartItem: any = {
      product_id: productDetail?.id,
    };
    dispatch(addProductToCart(cartItem));
  };

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  function tog_large() {
    dispatch(onGetProductDetail(params.id));
    dispatch(closeModal());
    removeBodyCss();
  }

  function selectingTestToCart(tests: any) {
    setSelectedTests(tests);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Navbar />
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Product Detail" />
          {!isEmpty(productDetail) && (
            <Row>
              <Modal
                size="lg"
                isOpen={modal.modalStatus}
                toggle={() => {
                  tog_large();
                }}
              >
                <ModalHeader
                  toggle={() => {
                    tog_large();
                  }}
                >
                  <div className="modal-title mt-0 h5" id="myLargeModalLabel">
                    {modal.modalHeading}
                  </div>
                </ModalHeader>
                <div className="modal-body">
                  <p>{modal.modalDescription}</p>
                </div>
              </Modal>

              <Col>
                <Card>
                  <CardBody>
                    <Row>
                      <Col xl={4}>
                        <div className="product-detai-imgs">
                          <Row>
                            <Col md={11} sm={12} className="offset-md-1 col-8">
                              <TabContent activeTab={"1"}>
                                <TabPane tabId="1">
                                  <div>
                                    <img
                                      src={productDetail.image_lg}
                                      alt=""
                                      id="expandedImg1"
                                      className="img-fluid mx-auto d-block"
                                    />
                                  </div>
                                </TabPane>
                              </TabContent>

                              {productDetail.completePack && (
                                <div className="text-center">
                                  <Button
                                    type="button"
                                    className="bg-primary w-100 mt-2"
                                    onClick={() => {
                                      onAddToCart();
                                    }}
                                  >
                                    <i className="bx bx-cart me-2" /> Add to
                                    cart
                                  </Button>
                                </div>
                              )}
                            </Col>
                          </Row>
                        </div>
                      </Col>

                      <Col xl="8">
                        <div className="mt-4 mt-xl-3">
                          <Link to="#" className="text-primary">
                            {productDetail.category}
                          </Link>
                          <h4 className="mt-1 mb-3">{productDetail.name}</h4>

                          <div className="text-muted float-start me-3">
                            <StarRatings
                              rating={productDetail.rating}
                              starRatedColor="#F1B44C"
                              starEmptyColor="#74788d"
                              numberOfStars={5}
                              name="rating"
                              starDimension="14px"
                              starSpacing="3px"
                            />
                          </div>
                          <p className="text-muted mb-4">
                            ( {productDetail.reviews} Customers Review )
                          </p>

                          {!!productDetail.isOffer && (
                            <h6 className="text-success text-uppercase">
                              {productDetail.offer} % Off
                            </h6>
                          )}
                          <h5 className="mb-4">
                            Price :{" "}
                            {productDetail.isOffer ? (
                              <>
                                <span className="text-muted me-2">
                                  <del>Rs. {productDetail.basePrice} </del>
                                </span>{" "}
                                <b className="text-success">
                                  Rs.{" "}
                                  {productDetail.basePrice -
                                    ((productDetail.basePrice *
                                      productDetail.offer) as number) /
                                      100}{" "}
                                  /-
                                </b>
                              </>
                            ) : (
                              <b className="text-success">
                                Rs. {productDetail.basePrice} /-
                              </b>
                            )}
                          </h5>
                          <p className="text-muted mb-4">
                            {productDetail.description}
                          </p>
                        </div>
                      </Col>

                      {!productDetail.completePack && (
                        <Row className="mt-5">
                          <Col sm={12} md={8}>
                            <Select
                              placeholder="Please select the tests listed below"
                              value={selectedTests}
                              isMulti={true}
                              onChange={(e: any) => {
                                // console.log("e", e);
                                setBasket(e);
                                selectingTestToCart(e.target);
                              }}
                              options={productDetail.params}
                              className="select2-selection"
                              id="hello"
                            />
                          </Col>
                          <Col sm={12} md={4}>
                            <Button
                              type="button"
                              className="bg-primary w-100"
                              onClick={() => {
                                onAddToCart();
                              }}
                            >
                              <i className="bx bx-cart me-2" />
                              Add to cart
                            </Button>
                          </Col>
                        </Row>
                      )}

                      <Col xl="12">
                        <div className="mt-5">
                          <div className="table-responsive">
                            <Table className="table mb-0 table-bordered">
                              <thead>
                                <tr>
                                  <th
                                    scope="row"
                                    className={"text-capitalize text-primary"}
                                  >
                                    name
                                  </th>
                                  <th
                                    scope="row"
                                    className={"text-capitalize text-primary"}
                                  >
                                    Method
                                  </th>
                                  <th
                                    scope="row"
                                    className={"text-capitalize text-primary"}
                                  >
                                    NABL Accrediation
                                  </th>
                                  {productDetail.completePack ? null : (
                                    <th
                                      scope="row"
                                      className={"text-capitalize text-primary"}
                                    >
                                      Price
                                    </th>
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                {productDetail.params &&
                                  productDetail.params[0].options.map(
                                    (test: Tests, i: number) => (
                                      <tr key={i}>
                                        <th
                                          scope="row"
                                          className={"text-capitalize"}
                                        >
                                          {test.label}
                                        </th>
                                        <td>{test.method}</td>
                                        <td>
                                          {test.isNABL ? "NABL" : "Non-NABL"}
                                        </td>

                                        {productDetail.completePack ? null : (
                                          <td>{test.price}</td>
                                        )}
                                      </tr>
                                    )
                                  )}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      </Col>

                      <Col lg={12}>
                        <div className="mt-5">
                          <b className="text-success">
                            Why you need this test ?
                          </b>
                        </div>
                      </Col>

                      <Col xl="10">
                        <dl className="mt-2">
                          {productDetail.additionalInfo &&
                            productDetail.additionalInfo.map((info, index) => (
                              <React.Fragment key={index}>
                                <dt>
                                  <i
                                    className={classnames(
                                      "fa fa-caret-right",
                                      "font-size-16 align-middle text-primary me-2"
                                    )}
                                  />
                                  <span className="text-primary unbold">
                                    {Object.keys(info)[0]}
                                  </span>
                                </dt>
                                <dd className="mb-2">
                                  {" "}
                                  {Object.values(info)[0]}
                                </dd>
                              </React.Fragment>
                            ))}
                        </dl>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
          <ToastContainer />
          {/* <RecentProduct productDetail={productDetail || []} /> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(EcommerceProductDetail);
