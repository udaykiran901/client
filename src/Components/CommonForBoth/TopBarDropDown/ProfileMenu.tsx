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

import user1 from "../../../assets/images/undefined-profile.jpg";

import { useSelector } from "react-redux";
import { KDM_ECOMMERCE_USER_JWT_TOKEN, LOGGED_IN_USER } from "common/tokens";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProfile } from "slices/auth/profile/reducer";

import { RootState } from "slices";
import { getCart } from "slices/thunk";

const ProfileMenu = (props: any) => {
  const [menu, setMenu] = useState(false);

  const selectProfileProperties = createSelector(
    (state: RootState) => state.Profile,
    (profile: any) => ({
      user: profile.user,
    })
  );

  const selectedProps2 = createSelector(
    (state: any) => state.ecommerce,
    (ecommerce) => ({
      cart: ecommerce.cart,
    })
  );

  const { user } = useSelector(selectProfileProperties);
  const { cart } = useSelector(selectedProps2);
  // const { cart } = useSelector(selectedProps2);

  const { email } = user;

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // useEffect(() => {
  //   if (localStorage.getItem(KDM_ECOMMERCE_USER_JWT_TOKEN)) {
  //     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
  //       const obj = JSON.parse(localStorage.getItem("authUser") || "");
  //       setUsername(obj.displayName);
  //     }
  //     {
  //       setUsername(user?.username);
  //     }
  //   }
  // }, [user]);

  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      dispatch(getCart());
    }
  }, [cart]);

  const onClickLogout = () => {
    navigate("/ecommerce/login");
    Cookies.remove(KDM_ECOMMERCE_USER_JWT_TOKEN);
    Cookies.remove(LOGGED_IN_USER);
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
            {"Hi " + email + " !" || "User"}
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

          <Link to={"/myorders"}>
            <DropdownItem tag="a" href={process.env.PUBLIC_URL + "#"}>
              <i className="bx bx-wallet font-size-16 align-middle me-1" />
              {props.t("My Orders")}
            </DropdownItem>
          </Link>

          <Link to={"/ecommerce-cart"}>
            <DropdownItem>
              <span className="badge bg-success float-end">{cart.length}</span>
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
