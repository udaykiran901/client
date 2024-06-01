import React, { useEffect } from "react";

import { Col, Container, Row, Card, CardBody, CardTitle } from "reactstrap";

import { useSelector, useDispatch } from "react-redux";

import { createSelector } from "reselect";
import Spinners from "Components/Common/Spinner";

import { EcoActionBD } from "./types";
import {
  getDisciplineGraph,
  getSamplesStatistics,
} from "../../slices/BD/thunk";

import BarChart from "../Allcharts/apex/barchart";
import Pie from "pages/Allcharts/echart/piechart";

const SampleMaterials = () => {
  document.title = "Samples Statistics | KDM Engineers Group";

  const selectedProperties = createSelector(
    (state: EcoActionBD) => state.bd,
    (bd) => ({
      loading: bd.loading,
      samplesGraph: bd.samplesGraph,
      disciplineGraph: bd.disciplineGraph,
    })
  );

  const { loading, samplesGraph, disciplineGraph }: any =
    useSelector(selectedProperties);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getSamplesStatistics());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDisciplineGraph());
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
                <Col xl={6}>
                  <Card>
                    <CardBody>
                      <p>Sample wise</p>
                      <BarChart
                        dataColors='["--bs-success"]'
                        data={samplesGraph}
                      />
                    </CardBody>
                  </Card>
                </Col>
                <Col xl={6}>
                  <Card>
                    <CardBody>
                      <div id="pie-chart" className="e-chart">
                        <Pie
                          dataColors='[ "--bs-danger","--bs-warning"]'
                          data={disciplineGraph}
                        />
                      </div>
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

export default SampleMaterials;
