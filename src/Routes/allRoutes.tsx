// import { Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

// Auth
import Login from "pages/Authentication/login";
import Logout from "pages/Authentication/Logout";
import UserProfile from "pages/Authentication/user-profile";
import ForgotPassword from "pages/Authentication/ForgotPassword";
import SignUp from "pages/Authentication/Register";
import Welcome from "pages/Welcome";

//Ecommerse
import EcommerenceProducts from "../pages/Ecommerce/EcommerceProduct";
import EcommerceProductDetail from "pages/Ecommerce/EcommerceProductDetail";
import EcommerceCart from "pages/Ecommerce/EcommerceCart";
import EcommerceCheckout from "pages/Ecommerce/EcommerceCheckout";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  { path: "/profile", component: <UserProfile /> },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/forgot-password", component: <ForgotPassword /> },
  { path: "/register", component: <SignUp /> },
  { path: "/", exact: true, component: <Welcome /> },
  {
    path: "/material",
    exact: true,
    component: <EcommerenceProducts />,
  },
  {
    path: "/ecommerce-product-detail/:id?",
    component: <EcommerceProductDetail />,
  },
  { path: "/ecommerce-cart", component: <EcommerceCart /> },
  { path: "/ecommerce-checkout", component: <EcommerceCheckout /> },
];
export { authProtectedRoutes, publicRoutes };
