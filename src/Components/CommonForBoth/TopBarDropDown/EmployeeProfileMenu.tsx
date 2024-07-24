import React, { useState } from "react";
import Cookies from "js-cookie";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import undefinedProfile from "../../../assets/images/undefined-profile.jpg";

//i18n
import { withTranslation } from "react-i18next";
// Redux
import withRouter from "../../Common/withRouter";
import { createSelector } from "reselect";

// users
import user1 from "../../../assets/images/undefined-profile.svg";

import { useSelector } from "react-redux";
import { EMPLOYEE_LOCAL_STORAGE_KEY } from "common/tokens";
import { useNavigate } from "react-router-dom";

const EmployeeProfileMenu = (props: any) => {
  const [menu, setMenu] = useState(false);

  const navigate = useNavigate();

  const selectProfileProperties = createSelector(
    (state: any) => state.CurrentUserSlice,
    (CurrentUserSlice) => ({
      employee: CurrentUserSlice.employee,
    })
  );

  const { employee } = useSelector(selectProfileProperties);

  const onClickLogout = () => {
    navigate("/app");
    Cookies.remove(EMPLOYEE_LOCAL_STORAGE_KEY);
  };

  const { last_name, profile_photo } = employee;

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
            {"Hi " + last_name + " !" || "User"}
          </span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />

          <img
            src={profile_photo ? profile_photo : undefinedProfile}
            alt=""
            className="rounded avatar-sm"
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

export default withRouter(withTranslation()(EmployeeProfileMenu));
