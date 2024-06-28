import React from "react";
import withRouter from "../../Components/Common/withRouter";
import { Container } from "reactstrap";
import "nouislider/distribute/nouislider.css";
import OfflineOrderRegistrationForm from "forms/OfflineOrderRegistrationForm";

const OfflineOrdersRegistration = () => {
  document.title = "Offline Order Registration | KDM Engineers Group";
  return (
    <React.Fragment>
      <div className="page-content">
        <OfflineOrderRegistrationForm />
      </div>
    </React.Fragment>
  );
};

export default withRouter(OfflineOrdersRegistration);
