import { KDM_ECOMMERCE_USER_JWT_TOKEN } from "common/tokens";
import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthProtected = (props) => {
  if (Cookies.get(KDM_ECOMMERCE_USER_JWT_TOKEN)) {
    return <Navigate to={{ pathname: "/ecommerce/login" }} />;
  }
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default AuthProtected;
