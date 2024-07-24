import React from "react";

import { Row, Col, Card, CardBody } from "reactstrap";

import undefinedProfile from "../../assets/images/undefined-profile.jpg";
import profileImg from "../../assets/images/profile-img.png";

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Link } from "react-router-dom";
// import avatar1 from "../../assets/images/users/avatar-1.jpg";

const WelComeback: React.FC = () => {
  const selectedProperties = createSelector(
    (state: any) => state.CurrentUserSlice,
    (CurrentUserSlice) => ({
      employee: CurrentUserSlice.employee,
    })
  );

  const { employee } = useSelector(selectedProperties);
  const { first_name, last_name, profile_photo } = employee;
  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-primary-subtle">
          <Row>
            <Col xs={7}>
              <div className="text-primary p-3">
                <h5 className="text-primary">Hey,Welcome Back !</h5>
                <p>Greetings from KDM Engineers Group</p>
              </div>
            </Col>
            <Col xs={5} className="align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm={6}>
              <div className="avatar-xl profile-user-wid mb-4">
                <img
                  src={profile_photo ? profile_photo : undefinedProfile}
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div>
              <h5 className="font-size-30 text-truncate">
                {first_name + " " + last_name}
              </h5>
              <p className="text-muted mb-0 text-truncate">
                Software Developer
              </p>
            </Col>

            <Col sm={6}>
              <div className="pt-4">
                <Row>
                  <Col xs={6}>
                    <h5 className="font-size-15">125</h5>
                    <p className="text-muted mb-0">Projects</p>
                  </Col>
                  <Col xs={6}>
                    <h5 className="font-size-15">$1245</h5>
                    <p className="text-muted mb-0">Revenue</p>
                  </Col>
                </Row>
                <div className="mt-4">
                  <Link to="#" className="btn btn-primary  btn-sm">
                    View Profile <i className="mdi mdi-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
export default WelComeback;
