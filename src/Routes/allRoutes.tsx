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
import AppLogin from "pages/Authentication/AppLogin";

import AddEmp from "forms/AddEmp";
import Profile from "pages/Dashboard";
import EmpList from "pages/HRandAdmin/EmpList";
import AddProduct from "forms/AddProduct";

//jobs
import JobList from "pages/JobPages/JobList";
import ApplyJobs from "pages/JobPages/ApplyJobs";
import JobGrid from "pages/JobPages/JobGrid";
import JobDetails from "pages/JobPages/JobDetails";
import JobCategories from "pages/JobPages/JobCategories";
import CandidateList from "pages/JobPages/CandidateList";
import CandidateOverview from "pages/JobPages/CandidateOverview";
import AddParam from "forms/AddParam";

const BDRoutes = [
  { path: "/bd/product", component: <UserLoginForm /> },
  { path: "/bd/customer", component: <UserLoginForm /> },
  { path: "/bd/orders-list", component: <UserLoginForm /> },
  { path: "/bd/add-product", component: <AddProduct /> },
  { path: "/bd/add-param", component: <AddParam /> },
];

const HRandAdminRoutes = [
  { path: "/hr/add-emp", component: <AddEmp /> },
  { path: "/hr/emp-list", component: <EmpList /> },
  { path: "/profile", component: <Profile /> },
  { path: "/hr/job-list", component: <JobList /> },
  // { path: "/hr/job-overview", component: <JobDetails /> },
];

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
  { path: "/app", component: <AppLogin /> },

  //jobs
  { path: "/job-apply", component: <ApplyJobs /> },
  { path: "/job-grid", component: <JobGrid /> },
  { path: "/job-details", component: <JobDetails /> },
  { path: "/job-categories", component: <JobCategories /> },
  { path: "/candidate-list", component: <CandidateList /> },
  { path: "/candidate-overview", component: <CandidateOverview /> },
];
export { BDRoutes, publicRoutes, HRandAdminRoutes };
