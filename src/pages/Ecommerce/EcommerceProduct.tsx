import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
import {
  // Card,
  // CardBody,
  // CardTitle,
  Col,
  Container,
  Form,
  // FormGroup,
  Input,
  // Label,
  Row,
} from "reactstrap";
import classnames from "classnames";
import { isEmpty } from "lodash";

// import { Discount, EcoAction, FilterClothes, Product } from "./type";
import { EcoAction, ProductPartialInfo } from "./type";

import Spinners from "Components/Common/Spinner";
import { handleSearchData } from "Components/Common/SearchFile";
//Import Star Ratings
import StarRatings from "react-star-ratings";

// RangeSlider
// import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

//Import Breadcrumb
// import Breadcrumbs from "../../Components/Common/Breadcrumb";

//Import data
// import { discountData } from "../../common/data";

//Import actions
import { getProducts as onGetProducts } from "../../slices/e-commerence/thunk";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import Navbar from "pages/Welcome/Navbar/Navbar";

const EcommerceProducts = (props: any) => {
  //meta title
  document.title = "Materials | KDM Engineers Group";
  const [key, setKey] = useState<string>("");
  const dispatch: any = useDispatch();
  const selectProperties = createSelector(
    (state: EcoAction) => state.ecommerce,
    (ecommerce) => ({
      loading: ecommerce.loading,
      productPartialInfo: ecommerce.productPartialInfo,
    })
  );

  const { productPartialInfo, loading } = useSelector(selectProperties);
  const { navigate } = props.router;
  // const [productList, setProductList] = useState<ProductPartialInfo[]>();

  // useEffect(() => {
  //   setProductList(productPartialInfo);
  // }, [productPartialInfo]);

  useEffect(() => {
    dispatch(onGetProducts());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch]);

  // search
  // const handleSearch = (ele: any) => {
  //   const query = ele.value.toLowerCase();
  // console.log(ele.value);
  // handleSearchData({
  //   setState: setProductList,
  //   data: productList,
  //   item: query,
  // });
  // };

  return (
    <React.Fragment>
      <div className="page-content">
        <Navbar />
        <Container>
          <Row>
            <Col lg={12}>
              <Row className="mb-3">
                <Col xl={4} sm={6}>
                  <div className="mt-2">
                    <h5>Materials</h5>
                  </div>
                </Col>
                <Col lg={8} sm={6}>
                  <Form className="mt-4 mt-sm-0 shadow ">
                    <div className="search-box">
                      <div className="position-relative">
                        <Input
                          readOnly={loading}
                          type="text"
                          className="border-0"
                          placeholder="Search here.."
                          onChange={(e: any) => setKey(e.target.value)}
                        />
                        <i className="bx bx-search-alt search-icon" />
                      </div>
                    </div>
                  </Form>
                </Col>
              </Row>

              {loading && <Spinners />}

              <>
                <Row>
                  {!isEmpty(productPartialInfo) &&
                    (productPartialInfo || [])
                      .filter((eachProduct) =>
                        eachProduct.name
                          .toLowerCase()
                          .includes(key.toLowerCase())
                      )
                      .map((product: ProductPartialInfo, key: number) => (
                        <Col
                          className="mb-3 product-item"
                          xl={4}
                          sm={6}
                          key={"_col_" + key}
                        >
                          <div
                            className="shadow-lg  h-100"
                            onClick={() =>
                              navigate(
                                `/ecommerce-product-detail/${product.id}`
                              )
                            }
                          >
                            <div>
                              <div className="product-img position-relative">
                                {product.isOffer ? (
                                  <div className="avatar-xs m-2 product-ribbon">
                                    <span className="product-avatar-title rounded-circle bg-primary">
                                      {`-${product.offer}%`}
                                    </span>
                                  </div>
                                ) : null}

                                <img
                                  style={{ height: "auto" }}
                                  src={product.image}
                                  alt={product.name}
                                  className="d-block w-100 div-h-200"
                                />
                              </div>
                              <div className="mt-4 p-2">
                                <h5>
                                  <Link
                                    to={
                                      "/ecommerce-product-detail/" + product.id
                                    }
                                    className="text-dark"
                                  >
                                    {product.name}
                                  </Link>
                                </h5>
                                <div className="text-muted mb-3">
                                  <StarRatings
                                    rating={4}
                                    starRatedColor="#F1B44C"
                                    starEmptyColor="#74788d"
                                    numberOfStars={5}
                                    name="rating"
                                    starDimension="14px"
                                    starSpacing="1px"
                                  />
                                </div>
                                {/* {product.isOffer && (
                                  <small>
                                    Limited Offer{" "}
                                    <b className="text-success">
                                      {" " + product.offer} % Off
                                    </b>
                                  </small>
                                )} */}
                                {/* <h6 className="my-0 mb-4">
                                  {product.isOffer ? (
                                    <>
                                      <span className="text-muted me-2">
                                        <small className="text-muted me-2">
                                          <del>Rs.{product.base_price} /-</del>
                                        </small>
                                      </span>
                                      <span>
                                        Rs.
                                        {product.base_price -
                                          (product.base_price * product.offer) /
                                            100}
                                        /-
                                      </span>
                                    </>
                                  ) : (
                                    <span>Rs.{product.base_price}/-</span>
                                  )}
                                </h6> */}
                                <p className="text-success mt-3">
                                  Benifits of this Test
                                </p>

                                {product.features.map((info, index) => (
                                  <div key={index}>
                                    <p className="text-muted">
                                      <i
                                        className={classnames(
                                          "fa fa-caret-right",
                                          "font-size-16 align-middle text-primary me-2"
                                        )}
                                      />
                                      {info}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Col>
                      ))}
                </Row>
                {/* <Row>
                    <Col lg={12}>
                      <div className="text-center mt-2 mb-5">
                        <Link to="#" className="text-success">
                          <i className="bx bx-loader bx-spin font-size-18 align-middle me-2"></i>{" "}
                          Load more{" "}
                        </Link>
                      </div>
                    </Col>
                  </Row> */}
              </>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(EcommerceProducts);
