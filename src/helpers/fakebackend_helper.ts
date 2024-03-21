import { APIClient } from "./api_helper";

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
export const getProducts = () => api.get(url.GET_PRODUCTS, null);

// api.get ProductDetails-----
export const getProductDetail = (id: number) =>
  api.get(`${url.GET_PRODUCTS_DETAIL}/${id}`, { params: { id } });

// get shops--
export const getShops = () => api.get(url.GET_SHOPS, null);

// api.get Orders--
export const getOrders = () => api.get(url.GET_ORDERS, null);

// add Order--
export const addNewOrder = (order: any) => api.create(url.ADD_NEW_ORDER, order);

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
export const addToCart = (product: any) =>
  api.create(url.ECOMMERCE_ADD_MATERIAL_TO_CART, product);

export const getCart = () => api.get(url.GET_CART, null);

export const deleteCart = (data: any) =>
  api.delete(url.DELETE_CART, { headers: { data } });

//BD Module

export const requestCallback = (data: any) =>
  api.create(url.REQUEST_CALLBACK, data);
