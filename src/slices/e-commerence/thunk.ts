import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getProducts as getProductsApi,
  getProductDetail as getProductDetailApi,
  getShops as getShopsApi,
  getOrders as getOrdersApi,
  deleteOrder as deleteOrderApi,
  addNewOrder as addNewOrderApi,
  updateOrder as updateOrderApi,
  getCustomers as getCustomersApi,
  addNewCustomer as addNewCustomerApi,
  updateCustomer as updateCustomerApi,
  deleteCustomer as deleteCustomerApi,
  getCart as getCartApi,
  deleteCart as deleteCartApi,
  addToCart as addToCartAPI,
  onGettingProductNameId as onGettingProductNameIdAPI,
} from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GET_PRODUCT_NAME_ID,
  ON_GET_MATERIALS_PARTIAL_DATA,
} from "../../helpers/url_helper";

export const getProducts = createAsyncThunk(
  ON_GET_MATERIALS_PARTIAL_DATA,
  async () => {
    try {
      const response = await getProductsApi();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getProductDetail = createAsyncThunk(
  "ecommerence/getProductDetail",
  async (productId: any) => {
    try {
      const response = await getProductDetailApi(productId);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getOrders = createAsyncThunk("ecommerence/getorder", async () => {
  try {
    const response = getOrdersApi();
    return response;
  } catch (error) {
    return error;
  }
});

export const deleteOrder = createAsyncThunk(
  "ecommerence/deleteorder",
  async (orderId: any) => {
    try {
      const response = deleteOrderApi(orderId);
      toast.success("Order Delete Successfully", { autoClose: 2000 });
      return response;
    } catch (error) {
      toast.error("Order Delete Failed", { autoClose: 2000 });
      return error;
    }
  }
);

export const addNewOrder = createAsyncThunk(
  "ecommerence/addorder",
  async (order: any) => {
    try {
      const response = addNewOrderApi(order);
      toast.success("Order Added Successfully", { autoClose: 2000 });
      return response;
    } catch (error) {
      toast.error("Order Added Failed", { autoClose: 2000 });
      return error;
    }
  }
);

export const updateOrder = createAsyncThunk(
  "ecommerence/updateorder",
  async (order: any) => {
    try {
      const response = updateOrderApi(order);
      toast.success("Order Update Successfully", { autoClose: 2000 });
      return response;
    } catch (error) {
      toast.error("Order Update Failed", { autoClose: 2000 });
      return error;
    }
  }
);

export const getCustomers = createAsyncThunk(
  "ecommerence/getcustomer",
  async () => {
    try {
      const response = getCustomersApi();
      return response;
    } catch (error) {
      return error;
    }
  }
);

export const addNewCustomer = createAsyncThunk(
  "ecommerence/addcustomer",
  async (customer: any) => {
    try {
      const response = addNewCustomerApi(customer);
      const data = await response;
      toast.success("Customer Added Successfully", { autoClose: 2000 });
      return data;
    } catch (error) {
      toast.error("Customer Added Failed", { autoClose: 2000 });
      return error;
    }
  }
);

export const updateCustomer = createAsyncThunk(
  "ecommerence/updatcustomer",
  async (customer: any) => {
    try {
      const response = updateCustomerApi(customer);
      const data = await response;
      toast.success("Customer Update Successfully", { autoClose: 2000 });
      return data;
    } catch (error) {
      toast.error("Customer Update Failed", { autoClose: 2000 });
      return error;
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "ecommerence/deletecustomer",
  async (customer: any) => {
    try {
      const response = deleteCustomerApi(customer);
      toast.success("Customer Delete Successfully", { autoClose: 2000 });
      return response;
    } catch (error) {
      toast.error("Customer Delete Failed", { autoClose: 2000 });
      return error;
    }
  }
);

export const getShops = createAsyncThunk("ecommerence/getshops", async () => {
  try {
    const response = getShopsApi();
    return response;
  } catch (error) {
    return error;
  }
});

//cart
export const getCart = createAsyncThunk("/ecommerce/getCart", async () => {
  try {
    const response = await getCartApi();
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const deleteCart = createAsyncThunk(
  "/ecommerce/delete-cart",
  async (cart_id: string) => {
    try {
      const response = await deleteCartApi(cart_id);
      toast.success("Item removed from your cart", { autoClose: 5000 });
      return response;
    } catch (error) {
      return error;
    }
  }
);

//mine
// /addtocart
export const addProductToCart = createAsyncThunk(
  "/ecommerce/addtocart",
  async (cart: any) => {
    try {
      const response = await addToCartAPI(cart);
      toast.success(response.data.message, { autoClose: 5000 });
      return response;
    } catch (error: any) {
      toast.error(error.data.message, { autoClose: 5000 });
      return error;
    }
  }
);

export const getProductsNameId = createAsyncThunk(
  GET_PRODUCT_NAME_ID,
  async () => {
    try {
      const response = await onGettingProductNameIdAPI();
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  }
);
