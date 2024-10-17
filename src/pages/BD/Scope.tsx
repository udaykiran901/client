import React, { useEffect } from "react";

import { createSelector } from "reselect";
import { RootState } from "slices";
import { BDInitialState } from "slices/BD/reducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getScope, getParams } from "slices/thunk";
import Spinners from "Components/Common/Spinner";
import { Table, Col, Row, Container, Card, Button } from "reactstrap";
import { Product, Parameter } from "./types";
import { renderParameter } from "./TrackSample";
import { CHEMICAL } from "common/tokens";
import { greenBadge, infoBadge } from "./OrdersList";
import { useNavigate, Link } from "react-router-dom";

const Scope = () => {
  document.title = "Scope | KDM Engineers Group";

  const selectedProperties = createSelector(
    (state: RootState) => state.bd,
    (bd: BDInitialState) => ({
      scope: bd.scope,
      loading: bd.loading,
    })
  );



  const { scope, loading } = useSelector(selectedProperties);

  const dispatch = useDispatch<any>();

  console.log(scope, 'scope data in scope screen')

  useEffect(() => {
    dispatch(getScope());
    dispatch(getParams());
  }, [dispatch]);

  const renderEachRow = (rowData: Product, index: number) => {
    const { id, name, image, category, params } = rowData;
    // const navigate = useNavigate();
    console.log(rowData, 'rowData in scope');
    console.log(params, 'material params');
    // console.log(index, ' idex')

    if (params.length <= 0) {
      return <tr></tr>;
    }

    return (
      <>
        <tr>
          <td style={{ width: "50px" }} rowSpan={params.length}>
            {index + 1} {""}
          </td>
          <td style={{ width: "100px" }} rowSpan={params.length}>
            <img src={image} alt="" className="rounded avatar-lg" />
          </td>

          <td rowSpan={params.length} style={{ width: "200px" }}>
            {name}
          </td>

          <td style={{ width: "50px" }} rowSpan={params.length}>
            <Link to={`/bd/add-product/${id}`}>
              {" "}
              <i className="mdi mdi-pencil-outline"></i>
            </Link>
          </td>

          <td rowSpan={params.length} style={{ width: "200px" }}>
            {category}
          </td>

          <td style={{ width: "500px" }}>
            {params.length > 0 && renderParameter(params[0].params)}
          </td>

          <td style={{ width: "50px" }}>
            <Link to={`/bd/add-param/${params[0].param_id}`}>
              <i className="mdi mdi-pencil-outline"></i>
            </Link>
          </td>

          <td style={{ width: "100px" }}>
            {params.length > 0 && params[0].discipline === CHEMICAL
              ? greenBadge("Chemical")
              : infoBadge("Physical")}
          </td>

          <td>{params.length > 0 && params[0].price}</td>
        </tr>
        {params.slice(1).map((param, paramIndex) => (
          <tr key={paramIndex}>
            <td style={{ width: "250px" }}>{renderParameter(param.params)}</td>
            <td style={{ width: "50px" }}>
              <Link to={`/bd/add-param/${params[paramIndex + 1].param_id}`}>
                <i className="mdi mdi-pencil-outline"></i>
              </Link>
            </td>
            <td style={{ width: "100px" }}>
              {param.discipline === CHEMICAL
                ? greenBadge("Chemical")
                : infoBadge("Physical")}
            </td>
            <td>{param.price}</td>
          </tr>
        ))}
      </>
    );
  };

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {loading && <Spinners />}
          <Row>
            <Col lg={12}>
              <Card className="p-3">
                <div className="text-right">
                  <Button
                    color="primary"
                    className="mr-2"
                    style={{ backgroundColor: "#2a3042" }}
                    onClick={() => navigate("/bd/add-product")}
                  >
                    <i className="mdi mdi-plus-circle-outline mr-2"></i> Add
                    Product
                  </Button>
                  <Button
                    style={{ backgroundColor: "#2a3042" }}
                    onClick={() => navigate("/bd/add-param")}
                  >
                    {" "}
                    <i className="mdi mdi-plus-circle-outline mr-2"></i>Add
                    Parameter
                  </Button>
                </div>
                <div className="table-responsive mt-2">
                  <Table
                    className="table table-bordered"
                    style={{ borderColor: "#eff2f7" }}
                  >
                    <thead
                      style={{
                        backgroundColor: "#2a3042",
                      }}
                    >
                      <tr>
                        <td style={{ color: "#a6b0cf" }}>S.No</td>
                        <td style={{ color: "#a6b0cf" }}>Image</td>
                        <td style={{ color: "#a6b0cf" }}>Name</td>
                        <td style={{ color: "#a6b0cf" }}>Edit</td>
                        <td style={{ color: "#a6b0cf" }}>Category</td>

                        <td style={{ color: "#a6b0cf" }}>Parameters</td>
                        <td style={{ color: "#a6b0cf" }}>Edit</td>

                        <td style={{ color: "#a6b0cf" }}>Discipline</td>
                        <td style={{ color: "#a6b0cf" }}>Price</td>
                      </tr>
                    </thead>
                    <tbody>
                      {(scope || []).map((eachScope: Product, index: number) =>
                        renderEachRow(eachScope, index)
                      )}
                    </tbody>
                  </Table>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Scope;
