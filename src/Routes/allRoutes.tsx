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

import UserLoginForm from "../pages/Authentication/UserLoginForm";
import UserRegister from "pages/Authentication/UserRegister";
import AppLogin from "pages/Authentication/AppLogin";

import AddEmp from "forms/AddEmp";
import Profile from "pages/Dashboard";
import EmpList from "pages/HRandAdmin/EmpList";
import AddProduct from "forms/AddProduct";

//jobs

import AddParam from "forms/AddParam";
import MyOrders from "pages/Ecommerce/MyOrders";
import CallBacksList from "pages/BD/CallBacksList";
import OrdersList from "pages/BD/OrdersList";
import CustomersList from "pages/BD/CustomersList";
import SubscribersList from "pages/BD/SubscribersList";
import SampleMaterials from "pages/BD/SampleMaterials";
import OnlineUsers from "pages/BD/OnlineUsers";
import EntitysCount from "pages/BD/EntitysCount";
import OrderInfo from "forms/OrderInfo";
import OfflineOrdersRegistration from "pages/BD/OfflineOrdersRegistration";
import MaterialTesting from "pages/Welcome/Quotes/MaterialTesting";
import Quotations from "pages/BD/Quotations";
import LabHome from "pages/Laboratory/LabHome";
import MyJobs from "pages/Laboratory/Analyst/MyJobs";
import Scope from "pages/BD/Scope";
import AddCustomer from "forms/AddCustomer";

const commonRoutes = [{ path: "/profile", component: <Profile /> }];

const BDRoutes = [
  ...commonRoutes,
  { path: "/bd/cust", component: <AddCustomer /> },
  { path: `/bd/cust/:id`, component: <AddCustomer /> },
  { path: "/bd/product", component: <UserLoginForm /> },
  { path: "/bd/orders-list", component: <UserLoginForm /> },
  { path: "/bd/add-product", component: <AddProduct /> },
  { path: '/bd/add-product/:id', component: <AddProduct /> },
  { path: "/bd/add-param", component: <AddParam /> },
  { path: "/bd/add-param/:id", component: <AddParam /> },
  { path: "/bd/call-backs", component: <CallBacksList /> },
  { path: "/bd/orders", component: <OrdersList /> },
  { path: "/bd/subscribers", component: <SubscribersList /> },
  { path: "/bd/samples-statistics", component: <SampleMaterials /> },
  { path: "/bd/users", component: <OnlineUsers /> },
  { path: "/bd/orders/:id", component: <OrderInfo /> },
  {
    path: "/bd/ecommerce-product-detail/:id?",
    component: <EcommerceProductDetail />,
  },
  {
    path: "/bd/customer",
    component: <CustomersList />,
  },
  {
    path: "/bd/all-entities",
    component: <EntitysCount />,
  },
  {
    path: "/bd/offline-order-registration",
    component: <OfflineOrdersRegistration />,
  },
  {
    path: "/bd/quotations",
    component: <Quotations />,
  },
  { path: "/bd/scope", component: <Scope /> },
  // { path: "/lab", component: <LabHome /> },
];

const LaboratoryRoutes = [
  { path: "/lab", component: <LabHome /> },
  ...commonRoutes,
];

const HRandAdminRoutes = [
  { path: "/hr/add-emp", component: <AddEmp /> },
  { path: "/hr/emp-list", component: <EmpList /> },
  ...commonRoutes,
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
  { path: "/app", component: <AppLogin /> },
  { path: "/myorders", component: <MyOrders /> },
  { path: "/material-testing-quote", component: <MaterialTesting /> },
];

const analystRoutes = [
  { path: "/analyst/my-jobs", component: <MyJobs /> },
  { path: "/analyst/my-jobs/:jobId", component: <LabHome /> },
  ...commonRoutes,
];

export {
  BDRoutes,
  publicRoutes,
  HRandAdminRoutes,
  LaboratoryRoutes,
  analystRoutes,
  commonRoutes,
};
