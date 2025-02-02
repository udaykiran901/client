import React, { useState, useEffect } from "react";
import { Collapse, Container, NavbarToggler, NavLink } from "reactstrap";
import Scrollspy from "react-scrollspy";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

// Import Images
import logoDark from "../../../assets/images/logo-dark.png";
import logoLight from "../../../assets/images/logo-light.png";
import { KDM_ECOMMERCE_USER_JWT_TOKEN } from "common/tokens";
import ProfileMenu from "Components/CommonForBoth/TopBarDropDown/ProfileMenu";

const Navbar = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [navClass, setNavClass] = useState("");
  const token = Cookies.get(KDM_ECOMMERCE_USER_JWT_TOKEN);

  const toggle = () => setIsOpenMenu(!isOpenMenu);

  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true);
  });

  const scrollNavigation = () => {
    var scrollUp = document.documentElement.scrollTop;
    if (scrollUp > 50) {
      setNavClass("sticky nav-sticky");
    } else {
      setNavClass("");
    }

    const element = document.querySelectorAll(".nav-item");
    element.forEach((item: any) => {
      item.firstChild.classList.remove("active");
      if (item.classList.contains("active")) {
        item.firstChild.classList.add("active");
      }
    });
  };

  return (
    <React.Fragment>
      <nav
        className={
          "navbar navbar-expand-lg navigation fixed-top sticky " + navClass
        }
        id="navbar"
      >
        <Container>
          <Link className="navbar-logo" to="/">
            <img
              src="https://res.cloudinary.com/dkxnygkto/image/upload/v1689250804/Picsart_23-07-13_09-58-34-572_i6qsjj.png"
              alt=""
              height="36"
              className="logo logo-dark"
            />
            <img
              src="https://res.cloudinary.com/dkxnygkto/image/upload/v1689250804/Picsart_23-07-13_09-58-34-572_i6qsjj.png"
              alt=""
              height="36"
              className="logo logo-light"
            />
          </Link>

          <NavbarToggler
            className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light"
            onClick={toggle}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-fw fa-bars"></i>
          </NavbarToggler>

          <Collapse
            isOpen={isOpenMenu}
            className="navbar-collapse"
            id="navbarSupportedContent"
          >
            <Scrollspy
              offset={-18}
              items={[
                "home",
                "about",
                "features",
                "roadmap",
                "team",
                "Our Services",
                "faqs",
              ]}
              currentClassName="active"
              className="ms-auto navbar-nav nav"
              id="navbar-example"
            >
              <li className="nav-item">
                <NavLink>
                  <Link className="text-black" to={"/"}>
                    Home
                  </Link>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink>
                  <Link className="text-black" to={"/about"}>
                    About
                  </Link>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink>
                  <Link className="text-black" to={"/repo"}>
                    Projects
                  </Link>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink>
                  <Link className="text-black" to={"/"}>
                    Our Team
                  </Link>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink href="#careers">Careers</NavLink>
              </li>
            </Scrollspy>

            {token ? (
              <ProfileMenu />
            ) : (
              <div className="my-2 ms-lg-2">
                <Link
                  to="/ecommerce/login"
                  className="btn btn-outline-success w-xs"
                >
                  Sign in
                </Link>
              </div>
            )}
          </Collapse>
        </Container>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
