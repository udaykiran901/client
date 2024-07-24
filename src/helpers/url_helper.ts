//laboratory

export const GET_PENDING_ASSIGNING_JOBS = "/lab/get-pending-Assigned-samples";
export const GET_ALL_ANALYSTS = "/lab/get-all-analysts";
export const ASSIGN_PARAMS_TO_ANALYST = "/lab/assign-samples-to-analyst";
export const GET_MY_JOBS = "/lab/get-my-jobs";

//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register";

//LOGIN
export const POST_FAKE_LOGIN = "/post-fake-login";
// export const USER_LOGIN = "/user/login";
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/post-fake-profile";

// ================================================== Ecommerce ==============================================

// Product
export const GET_PRODUCTS = "/apps/product";
export const GET_PRODUCTS_DETAIL = "/apps/productDetail";

// Orders
export const GET_ORDERS = "/apps/order";
export const ADD_NEW_ORDER = "/apps/order";
export const UPDATE_ORDER = "/apps/order";
export const DELETE_ORDER = "/apps/order";

// Customers
export const GET_CUSTOMERS = "/apps/customer";
export const ADD_NEW_CUSTOMER = "/apps/customer";
export const UPDATE_CUSTOMER = "/apps/customer";
export const DELETE_CUSTOMER = "/apps/customer";

//SHOPS
export const GET_SHOPS = "/shops";

//cart

export const UPDATE_PROJECT = "/update/project";
export const DELETE_PROJECT = "/delete/project";
export const DELETE_MAIL = "/mail/delete";

//mine
//
//
//
//
//
//
//
//
//

//auth
export const ECOMMERCE_USER_REGISTER = "/ecommerce/user/register";
export const ECOMMERCE_USER_LOGIN = "/ecommerce/user/login";
export const ECOMMERCE_ADD_MATERIAL_TO_CART = "/ecommerce/addtocart";
export const ON_GET_MATERIALS_PARTIAL_DATA = "/ecommerce/get-partial-data";
export const GET_PRODUCT_DETAILS = "/ecommerce/get-product-details";
export const GENERATE_MATERIAL_TESTING_SERVICES_QUOTE =
  "/reports/material-testing-quotation";
//cart
export const GET_CART = "/ecommerce/getCart";
export const DELETE_CART = "/ecommerce/delete-cart";
export const CREATE_ORDER_IN_SERVER = "/ecommerce/cart/create-order-on-server";
export const PAYMENT_SUCCESS_SAVE_ORDER = "/ecommerce/create-order";
export const GET_MY_ORDERS_PARTIAL = "/ecommerce/get-my-orders";
export const GET_ALL_PARAMS = "/bd/get-all-params";

//BD Module

export const REQUEST_CALLBACK = "/bd/on-request-callback";
export const ON_SUBSCRIBE = "/bd/subscribe";
export const ON_ADDING_NEW_PRODUCT = "/bd/adding-new-product";
export const GET_PRODUCT_NAME_ID = "/bd/name-id";
export const ADD_PARAM = "/bd/add-param";
export const GET_REQUEST_CALLBACKS = "/bd/get-request-callbacks";
export const UPLOAD_CUSTOMER_REQUEST_AUDIO =
  "/bd/upload-customer-request-audio";
export const GET_ALL_ECOMMERCE_ORDERS = "/bd/get-ecommerce-orders";
export const COMPLETE_REGISTRATION =
  "/bd/complete-ecommerce-order-registration";

export const GET_COMPLETE_ORDER_DETAILS = "/bd/order";

export const GET_CUSTOMERS_LIST = "/bd/get-customers-list";
export const GET_SUBSCRIBERS_LIST = "/bd/get-subscribers-list";
export const GET_SUBSCRIBERS_GRAPH = "/bd/get-subscribers-graph";

export const REGISTER_CUSTOMER = "/bd/reg-customer";
export const GET_SUBSCRIBERS_GRAPH_LAST_30_DAYS =
  "/bd/get-subscribers-graph-last30days";

export const GET_ONLINE_USERS = "/bd/get-online-users";
export const GET_ONLINE_DAILY_USERS_COUNT = "/bd/get-online-users-daily";
export const GET_ONLINE_MONTHLY_USERS_COUNT = "/bd/get-online-users-monthly";

export const GET_ALL_SAMPLES = "/bd/get-all-samples";

//quotations
export const GET_QUOTATIONS = "/bd/get-quotations";
export const GET_DAILY_QUOTAIONS_COUNT = "/bd/get-quotations-daily";
export const GET_MONTHLY_QUOTATIONS_COUNT = "/bd/get-quotations-monthly";

export const CUSTOMERS_MONTHLY_GRAPH = "/bd/get-customers-graph";
export const CUSTOMER_LAST_30_RECORDS = "/bd/get-customers-graph-last30days";

export const ORDERS_DAILY_RECORD = "/bd/order-daily-record";
export const ORDERS_MONTHLY_RECORD = "/bd/orders-monthly-record";
export const SAMPLES_STATISTICS = "/bd/samples-statistics";
export const GET_DISCIPLINE_WISE_COUNT = "/bd/discipline-wise";
export const OFFLINE_ORDER_REGISTRATION = "/bd/register-offline-order";
export const TAX_CONVERSION_REQUESTED = "/bd/request-convert-to-tax";

//Admin
export const GET_TOP_10_ORDERED_ACCOUNT = "/admin/top-10-accounts-ordered";
export const GET_DAILY_COUNT_OF_ALL_ENTITIES =
  "/admin/daily-counts-of-all-entities";

export const GET_MONTHLY_COUNT_OF_ALL_ENTITIES =
  "/admin/monthly-counts-of-all-entities";

// HR and Admin
export const GET_ROLES = "/hr-admin/get-roles";
export const GET_EMPLOYEES = "/hr-admin/get-employees";
export const GET_BRANCHES = "/hr-admin/get-branch";
export const GET_DEPARTMENTS = "/hr-admin/get-departments";
export const GET_ACCESS_KEYS = "/hr-admin/get-accesskeys";
export const REGISTER_NEW_EMPLOYEE = "/hr-admin/register-employee";

// jobs

export const GET_JOB_LIST = "/jobs";
export const DELETE_JOB_LIST = "/delete/job";
export const ADD_NEW_JOB_LIST = "/job/add";
export const UPDATE_JOB_LIST = "/job/update";
export const GET_JOB_GRID = "/job-grid";

//job condidate list
export const GET_CANDIDATE0_LIST = "/condidate-list";
//Apply Jobs
export const GET_APPLY_JOB = "/jobApply";
export const DELETE_APPLY_JOB = "/delete/applyjob";

//Employee
export const EMPLOYEE_LOGIN = "/employee/login";
