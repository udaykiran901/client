import React from "react";
import { Container, Row, Col, Card, CardBody, CardHeader } from "reactstrap";
import { Link } from "react-router-dom";

//Import Countdown
import Countdown from "react-countdown";

const Section = () => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span>You are good to go!</span>;
    } else {
      return (
        <>
          <div className="counter-number ico-countdown">
            <div id="days" className="coming-box">
              {days}
              <span>Days</span>
            </div>
            <div id="hours" className="coming-box">
              {hours}
              <span>Hours</span>
            </div>
            <div id="mins" className="coming-box">
              {minutes}
              <span>Hours</span>
            </div>
            <div id="secs" className="coming-box">
              {seconds}
              <span>Seconds</span>
            </div>
            <div id="end" className="h1"></div>
          </div>
        </>
      );
    }
  };

  return (
    <React.Fragment>
      <section className="section hero-section bg-ico-hero" id="home">
        <div className="bg-overlay bg-primary"></div>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div className="text-white-50">
                <h3>Welcome to</h3>
                <h1 className="text-white fw-semibold mb-3 hero-title">
                  KDM Engineers Group
                </h1>
                <p className="font-size-14">
                  Where innovation meets excellence in the world of civil
                  engineering. We are dedicated to creating sustainable
                  solutions that not only shape skylines but also transform
                  communities. With a passion for precision and a commitment to
                  quality, we take pride in every project we undertake. Explore
                  the possibilities with us as we build a future that stands the
                  test of time.
                </p>

                <div className="d-flex flex-wrap gap-2 mt-4">
                  <Link to="#" className="btn btn-success">
                    Get Started
                  </Link>
                  <Link to="#" className="btn btn-light">
                    Request a Phone call
                  </Link>
                </div>
              </div>
            </Col>
            {/* <Col lg={5} md={8} sm={10} className="ms-lg-auto">
              <Card className="overflow-hidden mb-0 mt-5 mt-lg-0">
                <CardHeader className="text-center">
                  <h5 className="mb-0">ICO Countdown time</h5>
                </CardHeader>
                <CardBody>
                  <div className="text-center">
                    <h5>Time left to Ico :</h5>
                    <div className="mt-4">
                      <div className="counter-number ico-countdown"></div>
                      <Countdown date="2025/10/31" renderer={renderer} />
                    </div>

                    <div className="mt-4">
                      <button type="button" className="btn btn-success w-md">
                        Get Token
                      </button>
                    </div>

                    <div className="mt-5">
                      <h4 className="fw-semibold">1 ETH = 2235 SKT</h4>
                      <div className="clearfix mt-4">
                        <h5 className="float-end font-size-14">5234.43</h5>
                      </div>
                      <div className="progress p-1 progress-xl softcap-progress">
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          style={{ width: "15%" }}
                        >
                          <div className="progress-label">15 %</div>
                        </div>
                        <div
                          className="progress-bar progress-bar-striped progress-bar-animated"
                          role="progressbar"
                          style={{ width: "30%" }}
                        >
                          <div className="progress-label">30 %</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col> */}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Section;
