import React from "react";
import { Row, Col } from "reactstrap";

//Import Images
import logolight from "../../../assets/images/logo-light.png";

const FooterLink = () => {
  return (
    <React.Fragment>
      <Row>
        <Col lg="6">
          <div className="mb-4">
            <img src={logolight} alt="" height="40" />
          </div>

          <p className="mb-2">
            {new Date().getFullYear()} © KDM Engineers Group. Design & Developed
            by <span className="text-success">Team IT</span>
          </p>
          <i>
            Delivering Complete Civil Engineering Solutions with Innovation and
            Excellence
          </i>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FooterLink;
