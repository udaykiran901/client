import { EMPLOYEE_LOCAL_STORAGE_KEY } from "common/tokens";
import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const AnalystRoutes = (props) => {
  const currentUser = Cookies.get(EMPLOYEE_LOCAL_STORAGE_KEY);
  if (!currentUser) {
    return <Navigate to="/app" />;
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default AnalystRoutes;
