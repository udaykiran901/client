import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Col } from "reactstrap";

const CarouselPage = () => {
  return (
    <React.Fragment>
      <Col xl={8} className="transparent-bg">
        <div className="auth-full-bg pt-lg-5 p-4">
          <div className="w-100">
            <div className="bg-overlay"></div>
            <div className="d-flex h-100 flex-column">
              <div className="p-4 mt-auto">
                <div className="row justify-content-center quotes-login-page shadow-lg">
                  <div className="col-lg-7">
                    <div className="text-center">
                      <h4 className="mb-3">
                        <i className="bx bxs-quote-alt-left text-primary h1 align-middle me-3"></i>
                        <span className="text-primary">5k</span>+ Satisfied
                        clients
                      </h4>
                      <div dir="ltr">
                        <Carousel
                          className="owl-carousel owl-theme auth-review-carousel slider_css"
                          showThumbs={false}
                        >
                          <div>
                            <div className="item">
                              <div className="pb-5 pt-3">
                                <p className="font-size-16 mb-4">
                                  &quot;The only way to do great work is to love
                                  what you do. If you haven’t found it yet, keep
                                  looking. Don’t settle. As with all matters of
                                  the heart, you’ll know when you find it
                                  &ldquo;
                                </p>

                                <div>
                                  <h4 className="font-size-16 text-primary">
                                    Srinivasulu Kunchala
                                  </h4>
                                  <p className="font-size-14 mb-0">
                                    - Managing Director KDM Engineers Group
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="item">
                              <div className="pb-5 pt-3">
                                <p className="font-size-16 mb-4">
                                  &quot;Your work is going to fill a large part
                                  of your life, and the only way to be truly
                                  satisfied is to do what you believe is great
                                  work. And the only way to do great work is to
                                  love what you do. &ldquo;
                                </p>

                                <div>
                                  <h4 className="font-size-16 text-primary">
                                    Subhashini Kunchala
                                  </h4>
                                  <p className="font-size-14 mb-0">
                                    - Director Of Finance KDM Engineers Group
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="item">
                              <div className="pb-5 pt-3">
                                <p className="font-size-16 mb-4">
                                  &quot;The only way to do great work is to love
                                  what you do. If you haven’t found it yet, keep
                                  looking. Don’t settle. As with all matters of
                                  the heart, you’ll know when you find it
                                  &ldquo;
                                </p>

                                <div>
                                  <h4 className="font-size-16 text-primary">
                                    Srinivasulu Kunchala
                                  </h4>
                                  <p className="font-size-14 mb-0">
                                    - Managing Director KDM Engineers Group
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <div className="item">
                              <div className="pb-5 pt-3">
                                <p className="font-size-16 mb-4">
                                  &quot;The only way to do great work is to love
                                  what you do. If you haven’t found it yet, keep
                                  looking. Don’t settle. As with all matters of
                                  the heart, you’ll know when you find it
                                  &ldquo;
                                </p>

                                <div>
                                  <h4 className="font-size-16 text-primary">
                                    Srinivasulu Kunchala
                                  </h4>
                                  <p className="font-size-14 mb-0">
                                    - Managing Director KDM Engineers Group
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="item">
                              <div className="pb-5 pt-3">
                                <p className="font-size-16 mb-4">
                                  &quot;Your work is going to fill a large part
                                  of your life, and the only way to be truly
                                  satisfied is to do what you believe is great
                                  work. And the only way to do great work is to
                                  love what you do. &ldquo;
                                </p>

                                <div>
                                  <h4 className="font-size-16 text-primary">
                                    Subhashini Kunchala
                                  </h4>
                                  <p className="font-size-14 mb-0">
                                    - Director Of Finance KDM Engineers Group
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Carousel>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};
export default CarouselPage;
