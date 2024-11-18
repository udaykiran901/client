import React from "react";
import { Container, Row, Col } from "reactstrap";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "../../../../node_modules/swiper/swiper.scss";

const RoadMap = () => {
  return (
    <React.Fragment>
      <section className="section bg-white" id="roadmap">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <div className="small-title">Timeline</div>
                <p>
                  Embark on a journey through our rich timeline, where each
                  milestone marks a significant chapter in our commitment to
                  excellence. From our humble beginnings to becoming a
                  trailblazer in our industry, every step reflects our
                  dedication to innovation and quality.
                </p>
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col lg="12">
              <div className="hori-timeline">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  navigation
                  pagination={{ clickable: true }}
                  breakpoints={{
                    678: { slidesPerView: 2 },
                    992: { slidesPerView: 3 },
                    1400: { slidesPerView: 4 },
                  }}
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  loop={true}
                  modules={[Pagination, Navigation, Autoplay]}
                  className="owl-carousel owl-theme events navs-carousel"
                  id="timeline-carousel"
                >
                  <SwiperSlide className="item event-list">
                    <div>
                      <div className="event-date">
                        <div className="text-primary fw-bold para mb-1">
                          2012
                        </div>
                        <h5 className="mb-4">
                          ESTABLISHED KDM ENGINEERS (IND) Pvt Ltd.
                        </h5>
                      </div>
                      <div className="event-down-icon">
                        <i className="bx bx-down-arrow-circle h1 text-primary down-arrow-icon"></i>
                      </div>
                      <div className="mt-3 px-3">
                        <p className="text-muted">
                          Founded with a vision to revolutionize the engineering
                          sector, KDM Engineers (IND) Pvt Ltd. laid the
                          groundwork by embracing advanced methodologies and a
                          strong commitment to quality.
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide className="item event-list">
                    <div>
                      <div className="event-date">
                        <div className="text-primary fw-bold mb-1">2018</div>
                        <h5 className="mb-4">
                          ESTABLISHED KDM ENGINEERS AND CONSULTANTS Pvt Ltd.
                        </h5>
                      </div>
                      <div className="event-down-icon">
                        <i className="bx bx-down-arrow-circle h1 text-primary down-arrow-icon"></i>
                      </div>
                      <div className="mt-3 px-3">
                        <p className="text-muted">
                          Expanding our horizons, we launched KDM Engineers and
                          Consultants Pvt Ltd., offering comprehensive
                          consultancy services that pushed boundaries and set
                          new standards in engineering excellence.
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide className="item event-list active">
                    <div>
                      <div className="event-date">
                        <div className="text-primary fw-bold mb-1">2021</div>
                        <h5 className="mb-4">
                          COMPLETED 26+ DETAILED ENGINEERING PROJECTS
                        </h5>
                      </div>
                      <div className="event-down-icon">
                        <i className="bx bx-down-arrow-circle h1 text-primary down-arrow-icon"></i>
                      </div>
                      <div className="mt-3 px-3">
                        <p className="text-muted">
                          Reaching a significant milestone, our team
                          successfully delivered over 26 intricate engineering
                          projects, demonstrating our capability to handle
                          complex demands with precision.
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide className="item event-list">
                    <div>
                      <div className="event-date">
                        <div className="text-primary  fw-bold mb-1">2025</div>
                        <h5 className="mb-4">
                          TO BE A PREMIER ORGANIZATION AT NATIONAL LEVEL
                        </h5>
                      </div>
                      <div className="event-down-icon">
                        <i className="bx bx-down-arrow-circle h1 text-primary down-arrow-icon"></i>
                      </div>
                      <div className="mt-3 px-3">
                        <p className="text-muted">
                          We aspire to establish our presence as a leading
                          organization nationwide, setting benchmarks in
                          quality, innovation, and sustainable engineering
                          practices.
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>

                  <SwiperSlide className="item event-list">
                    <div>
                      <div className="event-date">
                        <div className="text-primary  fw-bold mb-1">2030</div>
                        <h5 className="mb-4">
                          TO CREATE AN INTERNATIONAL IMAGE
                        </h5>
                      </div>
                      <div className="event-down-icon">
                        <i className="bx bx-down-arrow-circle h1 text-primary down-arrow-icon"></i>
                      </div>
                      <div className="mt-3 px-3">
                        <p className="text-muted fs-6">
                          Committed to global excellence, we are taking steps to
                          make our mark internationally, leveraging partnerships
                          and cutting-edge technology to build a worldwide
                          reputation.
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default RoadMap;
