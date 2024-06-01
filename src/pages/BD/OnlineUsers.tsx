import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  Card,
  CardTitle,
  Table,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { EcoActionBD, SiteUser } from "./types";
import { ToastContainer } from "react-toastify";
import Spinners from "Components/Common/Spinner";

import {
  getDailyOnlineUsersCount,
  getMonthlyUsersOnlineCount,
  getOnlineUsers,
  getTop10OrderedAccount,
} from "slices/thunk";

import LinerGraph from "pages/Allcharts/apex/LinerGraph";
import { getDateAndTime } from "./CallBacksList";
import BarChart from "../Allcharts/apex/barchart";

const OnlineUsers = () => {
  document.title = "Orders | KDM Engineers Group";

  const selectProperties = createSelector(
    (state: EcoActionBD) => state.bd,
    (bd) => ({
      loading: bd.loading,
      onlineUsersDaily: bd.onlineUsersDaily,
      onlineUsersMonthly: bd.onlineUsersMonthly,
      onlineUsers: bd.onlineUsers,
      top10OrderdAccounts: bd.top10OrderdAccounts,
    })
  );

  const {
    loading,
    onlineUsersDaily,
    onlineUsersMonthly,
    onlineUsers,
    top10OrderdAccounts,
  } = useSelector(selectProperties);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getOnlineUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDailyOnlineUsersCount());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getMonthlyUsersOnlineCount());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTop10OrderedAccount());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle tag="h6" className="mb-4">
                    Online Daily Record
                  </CardTitle>
                  <LinerGraph
                    data={onlineUsersDaily || []}
                    dataColors='["--bs-primary"]'
                    titles={["Orders", "Month"]}
                  />
                </CardBody>
              </Card>
            </Col>

            <Col lg={6}>
              <Card>
                <CardBody>
                  <CardTitle tag="h6" className="mb-4">
                    Online Monthly users
                  </CardTitle>
                  <LinerGraph
                    data={onlineUsersMonthly || []}
                    dataColors='["--bs-success"]'
                    titles={["Orders", "Day"]}
                  />
                </CardBody>
              </Card>
            </Col>
            <Col className="col-12">{loading && <Spinners />}</Col>

            <Col xl={12}>
              <Card>
                <CardBody>
                  <p>Top 10 accounts ordered</p>
                  <BarChart
                    dataColors='["--bs-success"]'
                    data={top10OrderdAccounts}
                  />
                </CardBody>
              </Card>
            </Col>

            {/* <Col lg={7}>
              <Card>
                <CardBody>
                  <CardTitle tag="h6" className="mb-4">
                    Top 10 users who placed more orders
                  </CardTitle>
                  <LinerGraph
                    data={top10OrderdAccounts || []}
                    dataColors='["--bs-success"]'
                    titles={["Users", "No.of Orders"]}
                  />
                </CardBody>
              </Card>
            </Col> */}

            {onlineUsers && (
              <Col xl={12}>
                <Card>
                  <CardBody>
                    <div className="table-responsive">
                      <Table
                        className="table table-bordered"
                        style={{ borderColor: "#eff2f7" }}
                      >
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Registered On</th>
                            <th>Mobile</th>
                          </tr>
                        </thead>
                        <tbody>
                          {onlineUsers.map(
                            (eachUser: SiteUser, idx: number) => (
                              <tr>
                                <th scope="row">{idx + 1}</th>
                                <td>{eachUser.email}</td>
                                <td>
                                  {getDateAndTime(eachUser.registeredDate)}
                                </td>
                                <td>{eachUser.mobile}</td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            )}
          </Row>

          <ToastContainer />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default OnlineUsers;
