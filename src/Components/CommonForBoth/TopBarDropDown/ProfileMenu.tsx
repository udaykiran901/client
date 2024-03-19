import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import withRouter from "../../Common/withRouter";
import { createSelector } from "reselect";

// users
import user1 from "../../../assets/images/users/avatar-1.jpg";

import { useSelector } from "react-redux";
import { KDM_ECOMMERCE_USER_JWT_TOKEN } from "common/tokens";
import { Link, useNavigate } from "react-router-dom";

const ProfileMenu = (props: any) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  const [username, setUsername] = useState("Admin");

  const selectProfileProperties = createSelector(
    (state: any) => state.Profile,
    (profile) => ({
      user: profile.user,
    })
  );

  const { user } = useSelector(selectProfileProperties);

  useEffect(() => {
    if (localStorage.getItem(KDM_ECOMMERCE_USER_JWT_TOKEN)) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser") || "");
        setUsername(obj.displayName);
      }
      {
        setUsername(user?.username);
      }
    }
  }, [user]);

  const navigate = useNavigate();

  const onClickLogout = () => {
    navigate("/ecommerce/login");
    Cookies.remove(KDM_ECOMMERCE_USER_JWT_TOKEN);
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <span className="d-none d-xl-inline-block ms-2 me-1 text-black">
            {"Hi" + username + "!" || "admin"}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
          <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href={process.env.PUBLIC_URL + "#"}>
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </DropdownItem>
          <DropdownItem tag="a" href={process.env.PUBLIC_URL + "#"}>
            <i className="bx bx-wallet font-size-16 align-middle me-1" />
            {props.t("My Orders")}
          </DropdownItem>

          <Link to={"/ecommerce-cart"}>
            <DropdownItem>
              <span className="badge bg-success float-end">11</span>
              <i className="bx bx-wrench font-size-16 align-middle me-1" />
              {props.t("Cart")}
            </DropdownItem>
          </Link>

          <DropdownItem tag="a" href={process.env.PUBLIC_URL + "#"}>
            <i className="bx bx-lock-open font-size-16 align-middle me-1" />
            {props.t("Notification")}
          </DropdownItem>

          <DropdownItem tag="a" href={process.env.PUBLIC_URL + "#"}>
            <i className="bx bx-support font-size-16 align-middle me-1" />
            {props.t("Support")}
          </DropdownItem>
          <div className="dropdown-divider" />
          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-primary w-75 m-auto"
              onClick={onClickLogout}
            >
              <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
              Logout
            </button>
          </div>

          {/* </Link> */}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withRouter(withTranslation()(ProfileMenu));
