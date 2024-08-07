import React from "react";
import { Col, Container, Row } from "reactstrap";

import WelComeback from "./WelComeback";

const Dashboard = () => {
  document.title = "Dashboards | KDM Engineers Group";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col xl={4}>
              <WelComeback />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
