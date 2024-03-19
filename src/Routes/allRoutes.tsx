// import { Navigate } from "react-router-dom";
// import Dashboard from "../pages/Dashboard";

// Auth
// import Login from "pages/Authentication/login"
// import Logout from "pages/Authentication/Logout";
// import UserProfile from "pages/Authentication/user-profile";
// import ForgotPassword from "pages/Authentication/ForgotPassword";
// import SignUp from "pages/Authentication/Register";
import Welcome from "pages/Welcome";

//Ecommerse
import EcommerenceProducts from "../pages/Ecommerce/EcommerceProduct";
import EcommerceProductDetail from "pages/Ecommerce/EcommerceProductDetail";
import EcommerceCart from "pages/Ecommerce/EcommerceCart";
import EcommerceCheckout from "pages/Ecommerce/EcommerceCheckout";
import UserLoginForm from "../pages/Authentication/UserLoginForm";
import UserRegister from "pages/Authentication/UserRegister";
// import UserLoginForm from "pages/Authentication/UserLoginForm";

// const authProtectedRoutes = [
//   //Ecommerce
// ];

const publicRoutes = [
  { path: "/ecommerce/login", component: <UserLoginForm /> },
  { path: "/ecommerce/register", component: <UserRegister /> },
  { path: "/", exact: true, component: <Welcome /> },
  {
    path: "/ecommerce-product-detail/:id?",
    component: <EcommerceProductDetail />,
  },
  {
    path: "/material",
    exact: true,
    component: <EcommerenceProducts />,
  },

  { path: "/ecommerce-cart", component: <EcommerceCart /> },
  { path: "/ecommerce-checkout", component: <EcommerceCheckout /> },
];
// export { authProtectedRoutes, publicRoutes };
export { publicRoutes };
//
