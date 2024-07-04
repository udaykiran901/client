import { APIClient } from "./api_helper";
// import axios from "axios";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
export const postFakeRegister = (data: any) => {
  return api.create(url.POST_FAKE_REGISTER, data).catch((err) => {
    let message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found";
          break;
        case 500:
          message =
            "Sorry! something went wrong, please contact our support team";
          break;
        case 401:
          message = "Invalid credentials";
          break;
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};

// Login Method
export const postFakeLogin = (data: any) =>
  api.create(url.POST_FAKE_LOGIN, data);

// postForgetPwd
export const postFakeForgetPwd = (data: any) =>
  api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
export const postJwtProfile = (data: any) =>
  api.create(url.POST_EDIT_JWT_PROFILE, data);

export const postFakeProfile = (data: any) =>
  api.create(url.POST_EDIT_PROFILE, data);

// Register Method
export const postJwtRegister = (url: any, data: any) => {
  return api.create(url, data).catch((err: any) => {
    var message: any;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found";
          break;
        case 500:
          message =
            "Sorry! something went wrong, please contact our support team";
          break;
        case 400:
          message = "User Already exists";
          break;
        case 401:
          message = "Invalid credentials";
          break;

        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};

// Login Method
export const postJwtLogin = (data: any) =>
  api.create(url.ECOMMERCE_USER_LOGIN, data);

// postForgetPwd
export const postJwtForgetPwd = (data: any) =>
  api.create(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = (data: any) =>
  api.create(url.SOCIAL_LOGIN, data);

// Ecommerce
// api.get Products
export const getProducts = () =>
  api.get(url.ON_GET_MATERIALS_PARTIAL_DATA, null);

// api.get ProductDetails-----
export const getProductDetail = (id: number) =>
  api.get(`${url.GET_PRODUCT_DETAILS}/${id}`, { params: { id } });

// get shops--
export const getShops = () => api.get(url.GET_SHOPS, null);

// api.get Orders--
export const getOrders = () => api.get(url.GET_ORDERS, null);

// add Order--
export const addNewOrder = (order: any) => api.create(url.ADD_NEW_ORDER, order);

export const generateMaterialTestingServiceAPI = (data: any) =>
  api.create(url.GENERATE_MATERIAL_TESTING_SERVICES_QUOTE, data);

// update Order--
export const updateOrder = (order: any) => api.put(url.UPDATE_ORDER, order);

// delete Order--
export const deleteOrder = (order: any) =>
  api.delete(url.DELETE_ORDER, { headers: { order } });

// api.get Customers--
export const getCustomers = () => api.get(url.GET_CUSTOMERS, null);

// add Customers--
export const addNewCustomer = (customer: any) =>
  api.create(url.ADD_NEW_CUSTOMER, customer);

// update Customers--
export const updateCustomer = (customer: any) =>
  api.put(url.UPDATE_CUSTOMER, customer);

// delete Customers--
export const deleteCustomer = (customer: any) =>
  api.delete(url.DELETE_CUSTOMER, { headers: { customer } });

//mine
export const addToCart = (data: any) =>
  api.create(url.ECOMMERCE_ADD_MATERIAL_TO_CART, data);

export const getCart = () => api.get(url.GET_CART, null);

export const deleteCart = (data: any) =>
  api.delete(url.DELETE_CART, { headers: { data } });

export const createOrderInServer = (data: any) => {
  api.create(url.CREATE_ORDER_IN_SERVER, data);
};

export const paymentSuccessfullSaveOrder = (data: any) => {
  api.create(url.PAYMENT_SUCCESS_SAVE_ORDER, data);
};

export const getMyOrdersPartialData = () =>
  api.get(url.GET_MY_ORDERS_PARTIAL, null);

//BD Module
export const getAllParamsApi = () => api.get(url.GET_ALL_PARAMS, null);

export const onGettingCompleteOrderDetails = (id: any) =>
  api.get(`${url.GET_COMPLETE_ORDER_DETAILS}/${id}`, { params: { id } });

export const requestCallback = (data: any) =>
  api.create(url.REQUEST_CALLBACK, data);

export const onSubscribeUpdates = (data: any) =>
  api.create(url.ON_SUBSCRIBE, data);

export const onAddingNewProduct = (data: any) => {
  api.create(url.ON_ADDING_NEW_PRODUCT, data);
};

export const onGettingProductNameId = () => {
  api.get(url.GET_PRODUCT_NAME_ID, null);
};

export const uploadAudio = (data: any) =>
  api.create(url.UPLOAD_CUSTOMER_REQUEST_AUDIO, data);

export const onRegisteringCustomer = (data: any) =>
  api.create(url.REGISTER_CUSTOMER, data);

export const addingParameterBH = (data: any) => api.create(url.ADD_PARAM, data);

export const onCompleteRegistration = (data: any) =>
  api.create(url.COMPLETE_REGISTRATION, data);

export const getRequestCallbacks = () =>
  api.get(url.GET_REQUEST_CALLBACKS, null);

export const ongetAllOrders = () => api.get(url.GET_ALL_ECOMMERCE_ORDERS, null);

export const fetchCustomersList = () => api.get(url.GET_CUSTOMERS_LIST, null);

export const fetchSubscribers = () => api.get(url.GET_SUBSCRIBERS_LIST, null);

export const onGettingOnlineUsersAPI = () =>
  api.get(url.GET_ONLINE_USERS, null);

export const onRegisteringOfflineOrderAPI = (data: any) =>
  api.create(url.OFFLINE_ORDER_REGISTRATION, data);

//BD module , Quotations

export const onGettingDailyQuotationsAPI = () =>
  api.get(url.GET_DAILY_QUOTAIONS_COUNT, null);
export const onGettingMonthlyQuotationsAPI = () =>
  api.get(url.GET_MONTHLY_QUOTATIONS_COUNT, null);
export const onGettingQuotationsAPI = () => api.get(url.GET_QUOTATIONS, null);

//statistics or Graphs
export const onGettingOnlineDailyUsersCount = () =>
  api.get(url.GET_ONLINE_DAILY_USERS_COUNT, null);

export const onGettingOnlineMonthlyUsersCount = () =>
  api.get(url.GET_ONLINE_MONTHLY_USERS_COUNT, null);

export const fetchSubscribersGraph = () =>
  api.get(url.GET_SUBSCRIBERS_GRAPH, null);

export const fetchSubscribersGraphLast30Days = () =>
  api.get(url.GET_SUBSCRIBERS_GRAPH_LAST_30_DAYS, null);

export const onGettingCustomersMonthlyCountAPI = () =>
  api.get(url.CUSTOMERS_MONTHLY_GRAPH, null);

export const onGettingCustomersLast30RecordsAPI = () =>
  api.get(url.CUSTOMER_LAST_30_RECORDS, null);

export const onGettingOrdersMonthlyRecordAPI = () =>
  api.get(url.ORDERS_MONTHLY_RECORD, null);

export const onGettingOrdersDailyRecordAPI = () =>
  api.get(url.ORDERS_DAILY_RECORD, null);

export const onGettingSampleStatisticsAPI = () =>
  api.get(url.SAMPLES_STATISTICS, null);

export const onGettingDisciplineWiseStatisticsAPI = () =>
  api.get(url.GET_DISCIPLINE_WISE_COUNT, null);

//Admin
export const onGettingTop10OrdredAccountAPI = () =>
  api.get(url.GET_TOP_10_ORDERED_ACCOUNT, null);

export const onGettingDailyCountOfAllEntitiesAPI = () =>
  api.get(url.GET_DAILY_COUNT_OF_ALL_ENTITIES, null);

export const onGettingMonthlyCountOfAllEntitiesAPI = () =>
  api.get(url.GET_MONTHLY_COUNT_OF_ALL_ENTITIES, null);

// HR and Admin
export const getRoles = () => api.get(url.GET_ROLES, null);
export const getBranches = () => api.get(url.GET_BRANCHES, null);
export const getEmployees = () => api.get(url.GET_EMPLOYEES, null);
export const getDepartments = () => api.get(url.GET_DEPARTMENTS, null);
export const getAccessKeys = () => api.get(url.GET_ACCESS_KEYS, null);

export const onRegisteringNewEmployee = (data: any) =>
  api.create(url.REGISTER_NEW_EMPLOYEE, data);

export const onEmployeeLogin = (data: any) =>
  api.create(url.EMPLOYEE_LOGIN, data);

//jobs related
// get jobs
export const getJobList = () => api.get(url.GET_JOB_LIST, null);
// delete jobs
export const deleteJobList = (jobs: any) =>
  api.delete(url.DELETE_JOB_LIST, { headers: { jobs } });
// add jobs
export const addNewJobList = (job: any) =>
  api.create(url.ADD_NEW_JOB_LIST, job);

// update jobs
export const updateJobList = (job: any) => api.put(url.UPDATE_JOB_LIST, job);

// get Apply Jobs
export const getApplyJob = () => api.get(url.GET_APPLY_JOB, null);
// Delete Apply Jobs
export const deleteApplyJob = (jobs: any) =>
  api.delete(url.DELETE_APPLY_JOB, { headers: { jobs } });

//grid job
export const getJobGrid = () => api.get(url.GET_JOB_GRID, null);

//job Candidate List
export const getJobCandidateList = () => api.get(url.GET_CANDIDATE0_LIST, null);
