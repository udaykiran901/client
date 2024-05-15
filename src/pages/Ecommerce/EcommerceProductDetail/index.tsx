import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import withRouter from "Components/Common/withRouter";
import { isUserLoggedin } from "../../../helpers/api_helper";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";

import StarRatings from "react-star-ratings";

import {
  getProductDetail as onGetProductDetail,
  addProductToCart,
} from "slices/thunk";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { EcoAction, offerDetails } from "../type";
import Navbar from "pages/Welcome/Navbar/Navbar";
import { KDM_ECOMMERCE_USER_JWT_TOKEN } from "common/tokens";
import SelectTable from "./SelectTable";
import Spinners from "Components/Common/Spinner";

const EcommerceProductDetail = (props) => {
  document.title = "Product Details | KDM Engineers Group";
  const dispatch = useDispatch<any>();
  const selectProperties = createSelector(
    (state: EcoAction) => state.ecommerce,

    (ecommerce) => ({
      // modal: ecommerce.modal,
      backendParams: ecommerce.backendParams,
      backendProductDes: ecommerce.backendProductDes,
      loading: ecommerce.loading,
    })
  );

  const { backendParams, backendProductDes, loading } =
    useSelector(selectProperties);

  const params = props.router.params;

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetProductDetail(params.id));
    }
  }, [dispatch, params]);

  const onAddToCart = () => {
    const formattedCartItems = listOfParams
      .filter((eachSelectedItem) => eachSelectedItem.selected)
      .map((eachFilteredItem) => ({
        subgroup: backendProductDes.id,
        paramId: eachFilteredItem.paramId,
      }));

    if (formattedCartItems.length === 0) {
      toast.error(
        "Please select at least one parameter before adding to cart",
        {
          position: "top-center",
          // autoClose: true,
        }
      );
      return;
    }

    const isUserLogin = isUserLoggedin(KDM_ECOMMERCE_USER_JWT_TOKEN);
    if (!isUserLogin) {
      toast.error(
        "Please log in to your account. If you don't have an account,You can create a free account by visiting: http://localhost:3000/ecommerce/login ",
        {
          position: "top-center",
          autoClose: false,
        }
      );
      return;
    }

    dispatch(addProductToCart({ data: formattedCartItems }));
  };

  const [listOfParams, setListOfParams] = useState<any>(null);

  useEffect(() => {
    setListOfParams(backendParams);
  }, [dispatch, backendParams]);

  const handleTestTriggered = (id) => {
    setListOfParams((prevState) =>
      prevState.map((eachParam) => {
        if (eachParam.paramId == id) {
          return {
            ...eachParam,
            selected: !eachParam.selected,
          };
        }
        return eachParam;
      })
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dispatch]);

  const offerDetails: offerDetails = {
    isOffer: backendProductDes.isOffer,
    offerPercentage: backendProductDes.offer,
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Navbar />
          {loading && <Spinners />}
          <Row>
            {!loading && backendProductDes.id == params.id && (
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
                                      src={backendProductDes.image_lg}
                                      alt=""
                                      id="expandedImg1"
                                      className="img-fluid mx-auto d-block"
                                    />
                                  </div>
                                </TabPane>
                              </TabContent>
                              {backendProductDes.sample_count &&
                              backendProductDes.sample_count > 0 ? (
                                <p className="text-warning mt-4">
                                  Heey... their are already{" "}
                                  {backendProductDes.sample_count} Sample /
                                  Sample's in your cart
                                </p>
                              ) : null}
                            </Col>
                          </Row>
                        </div>
                      </Col>

                      <Col xl="8">
                        <div className="mt-4 mt-xl-3">
                          <Link to="#" className="text-primary">
                            {backendProductDes.category}
                          </Link>
                          <h4 className="mt-1 mb-3">
                            {backendProductDes.name}
                          </h4>

                          <div className="text-muted float-start me-3">
                            <StarRatings
                              rating={backendProductDes.rating || 4}
                              starRatedColor="#F1B44C"
                              starEmptyColor="#74788d"
                              numberOfStars={5}
                              name="rating"
                              starDimension="14px"
                              starSpacing="3px"
                            />
                          </div>
                          <p className="text-muted mb-4">
                            ( {500} Customers Review )
                          </p>

                          {!!backendProductDes.isOffer && (
                            <h6 className="text-success ">
                              {backendProductDes.offer} % Off on all Parameters
                            </h6>
                          )}
                          <p className="text-muted mb-4">
                            {backendProductDes.description}
                          </p>
                        </div>
                      </Col>

                      {listOfParams && (
                        <SelectTable
                          data={listOfParams || []}
                          offerDetails={offerDetails || ({} as offerDetails)}
                          toggleTest={handleTestTriggered}
                        />
                      )}

                      <div>
                        <Button
                          type="button"
                          className="bg-primary "
                          onClick={() => {
                            onAddToCart();
                          }}
                        >
                          <i className="bx bx-cart me-2" /> Add to cart
                        </Button>
                      </div>

                      <Col lg={12}>
                        <div className="mt-5">
                          <b className="text-success">
                            Why you need this test ?
                          </b>
                        </div>
                      </Col>

                      <Col xl="10">
                        <dl className="mt-2">
                          {JSON.parse(backendProductDes.features).map(
                            (info, index) => (
                              <React.Fragment key={index}>
                                <dt>
                                  <i
                                    className={classnames(
                                      "fa fa-caret-right",
                                      "font-size-16 align-middle text-primary me-2"
                                    )}
                                  />
                                  <span className="text-primary unbold mb-2">
                                    {info.short_feature}
                                  </span>
                                </dt>
                                <dd className="mb-2 ml-3">
                                  {info.description}
                                </dd>
                              </React.Fragment>
                            )
                          )}
                        </dl>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            )}
          </Row>

          <ToastContainer />
          {/* <RecentProduct productDetail={productDetail || []} /> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(EcommerceProductDetail);
