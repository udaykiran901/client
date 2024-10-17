import React, { useEffect } from "react";

import { Col, Container, Row, Card, CardBody, CardTitle } from "reactstrap";

import DailyEntityCount from "../Allcharts/apex/DailyEntityCount";

import { useSelector, useDispatch } from "react-redux";

import { createSelector } from "reselect";
import Spinners from "Components/Common/Spinner";

import { EcoActionBD } from "./types";
import {
  getCountOfAllEntitiesMonthly,
  getDailyCountOfAllEntities,
} from "slices/thunk";

const EntitysCount = () => {
  document.title = "Samples Statistics | KDM Engineers Group";

  const selectedProperties = createSelector(
    (state: EcoActionBD) => state.bd,
    (bd) => ({
      dailyCountAllEntities: bd.dailyCountAllEntities,
      MonthlyAllEntities: bd.MonthlyAllEntities,
      loading: bd.loading,
    })
  );

  const { loading, dailyCountAllEntities, MonthlyAllEntities }: any =
    useSelector(selectedProperties);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getDailyCountOfAllEntities());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCountOfAllEntitiesMonthly());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {loading ? (
            <Spinners />
          ) : (
            <React.Fragment>
              <Row>
                <Col xl={12}>
                  <Card>
                    <CardBody>
                      <CardTitle tag="h4" className="mb-4">
                        Daily statistics
                      </CardTitle>
                      <DailyEntityCount
                        data={dailyCountAllEntities || []}
                        dataColors='["--bs-primary", "--bs-success","--bs-warning","--bs-danger","--bs-secondary"]'
                      />
                    </CardBody>
                  </Card>
                </Col>

                <Col xl={12}>
                  <Card>
                    <CardBody>
                      <CardTitle tag="h4" className="mb-4">
                        Monthly Statistics
                      </CardTitle>
                      <DailyEntityCount
                        data={MonthlyAllEntities || []}
                        dataColors='["--bs-primary", "--bs-success","--bs-warning","--bs-danger","--bs-secondary"]'
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </React.Fragment>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EntitysCount;
