import { EMPLOYEE_LOCAL_STORAGE_KEY } from "common/tokens";
import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const HRroutes = (props) => {
  if (!Cookies.get(EMPLOYEE_LOCAL_STORAGE_KEY)) {
    return <Navigate to="/app" />;
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default HRroutes;
