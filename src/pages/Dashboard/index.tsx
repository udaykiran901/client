import React from "react";
import { Col, Container, Row } from "reactstrap";

import WelComeback from "./WelComeback";

import Breadcrumb from "Components/Common/Breadcrumb";

const Dashboard = () => {
  document.title = "Dashboards | KDM Engineers Group";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumb title="Dashboards" breadcrumbItem="Dashboard" />
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
