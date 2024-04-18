import React from "react";
import { Container, Row } from "reactstrap";

import Overview from "./Overview";
import DetailsSection from "./DetailsSection";

const JobDetails = () => {
  document.title = "Job Description | KDM Engineers Group";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Overview />
            <DetailsSection />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default JobDetails;
