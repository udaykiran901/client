import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import withRouter from "Components/Common/withRouter";
import { isUserLoggedin } from "../../../helpers/api_helper";

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
  Alert,
} from "reactstrap";
import classnames from "classnames";
import { isEmpty } from "lodash";

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
  getCart as onGetCart,
} from "slices/thunk";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { EcoAction } from "../type";
import Navbar from "pages/Welcome/Navbar/Navbar";
import {
  closeModal,
  loginWarningModal,
  showModal,
} from "slices/e-commerence/reducer";
import { KDM_ECOMMERCE_USER_JWT_TOKEN } from "common/tokens";

// import { productListvar } from "common/data";

const EcommerceProductDetail = (props) => {
  //meta title
  document.title = "Product Details | KDM Engineers Group";
  const dispatch = useDispatch<any>();
  const selectProperties = createSelector(
    (state: EcoAction) => state.ecommerce,

    (ecommerce) => ({
      productDetail: ecommerce.productDetail,
      cart: ecommerce.cart,
      modal: ecommerce.modal,
    })
  );

  const { productDetail, modal, cart } = useSelector(selectProperties);

  const params = props.router.params;

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetProductDetail(params.id));
    } else {
      dispatch(onGetProductDetail(1));
    }
  }, [dispatch, params]);

  useEffect(() => {
    // dispatch(onGetCart());
  }, [dispatch]);

  const onAddToCart = () => {
    const isUserLogin = isUserLoggedin(KDM_ECOMMERCE_USER_JWT_TOKEN);
    if (!isUserLogin) {
      dispatch(showModal(loginWarningModal));
      return;
    }

    const cartItem: any = {
      product_id: productDetail?.id,
    };
    dispatch(addProductToCart(cartItem));
    dispatch(onGetCart());
  };

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  function tog_large() {
    dispatch(closeModal());
    dispatch(onGetProductDetail(params.id));
    removeBodyCss();
  }

  const productIsInCart = cart?.filter(
    (cartItem) => cartItem.id === productDetail?.id
  );

  // const [inCart, setInCart] = useState<boolean>(
  //   (productIsInCart && productIsInCart?.length > 0) || false
  // );
  console.log("in component");
  console.log(modal);

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
                            <Col md={10} sm={9} className="offset-md-1 col-8">
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
                              {productIsInCart &&
                                productIsInCart.length > 0 && (
                                  <Alert
                                    color="danger"
                                    role="alert"
                                    className="mt-2"
                                  >
                                    This product is already in your cart
                                  </Alert>
                                )}
                              <div className="text-center">
                                <Button
                                  type="button"
                                  color={
                                    productIsInCart ? "warning" : "secondary"
                                  }
                                  className="btn mt-2 me-1"
                                  onClick={() => {
                                    onAddToCart();
                                  }}
                                  disabled={
                                    (productIsInCart &&
                                      productIsInCart?.length > 0) ||
                                    false
                                  }
                                >
                                  <i className="bx bx-cart me-2" /> Add to cart
                                </Button>
                              </div>
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
                            <span className="text-muted me-2">
                              <del>Rs. {productDetail.basePrice} </del>
                            </span>{" "}
                            <b className="text-success">
                              Rs. {productDetail.basePrice} /-
                            </b>
                          </h5>
                          <p className="text-muted mb-4">
                            {productDetail.description}
                          </p>
                          <Row lg={12}>
                            <b className="text-success mb-3">
                              Explore the benefits
                            </b>
                          </Row>
                          <Row className="mb-3">
                            <Col md="12">
                              <dl>
                                {productDetail.additionalInfo &&
                                  productDetail.additionalInfo.map(
                                    (info, index) => (
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
                                    )
                                  )}
                              </dl>

                              {/* <dl>
                                {productDetail.additionalInfo &&
                                  productDetail.additionalInfo.forEach(
                                    (item: any, i: number) => (
                                      <React.Fragment key={item.id}>
                                        <dt>
                                          <i
                                            className={classnames(
                                              item.icon,
                                              "font-size-16 align-middle text-primary me-2"
                                            )}
                                          />
                                          {`${item}:`}
                                        </dt>
                                        <dd>{item.value}</dd>
                                      </React.Fragment>
                                    )
                                  )}
                              </dl> */}
                            </Col>
                          </Row>

                          {/* <div className="product-color">
                            <h5 className="font-size-15">Color :</h5>
                            {productDetail.colorOptions &&
                              (productDetail.colorOptions || [])?.map(
                                (option: any, i: number) => (
                                  <Link to="#" className="active" key={i}>
                                    <div className="product-color-item border rounded">
                                      <img
                                        src={option.image}
                                        alt=""
                                        className="avatar-md"
                                      />
                                    </div>
                                    <p>{option.color}</p>
                                  </Link>
                                )
                              )}
                          </div> */}
                        </div>
                      </Col>
                    </Row>
                    {/* Specifications */}
                    <div className="mt-5">
                      <h5 className="mb-3">Specifications :</h5>

                      <div className="table-responsive">
                        <Table className="table mb-0 table-bordered">
                          <tbody>
                            {productDetail.specifications &&
                              productDetail.specifications.map(
                                (specification: any, i: number) => (
                                  <tr key={i}>
                                    <th
                                      scope="row"
                                      style={{ width: "200px" }}
                                      className={"text-capitalize"}
                                    >
                                      {specification.type}
                                    </th>
                                    <td>{specification.value}</td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </Table>
                      </div>
                    </div>

                    {/* <Reviews /> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
          {/* <RecentProduct productDetail={productDetail || []} /> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(EcommerceProductDetail);
