import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  onSubscribeUpdates,
  requestCallback as requestCallbackAPI,
  onAddingNewProduct as onAddingNewProductApi,
  addingParameterBH,
  getRequestCallbacks as getRequestCallbacksAPI,
  uploadAudio as uploadAudioApi,
  ongetAllOrders as onGetAllOrdersApi,
  fetchCustomersList as onGettingCustomersListAPI,
  onRegisteringCustomer as registerCustomerAPI,
  fetchSubscribers as onGettingSubscribers,
  fetchSubscribersGraph as onGettingSubscribersGraphAPI,
  fetchSubscribersGraphLast30Days as onGettingSubscribersGraphLast30DaysAPI,
} from "../../helpers/fakebackend_helper";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ADD_PARAM,
  GET_ALL_ECOMMERCE_ORDERS,
  GET_CUSTOMERS_LIST,
  GET_REQUEST_CALLBACKS,
  GET_SUBSCRIBERS_GRAPH,
  GET_SUBSCRIBERS_GRAPH_LAST_30_DAYS,
  GET_SUBSCRIBERS_LIST,
  ON_ADDING_NEW_PRODUCT,
  ON_SUBSCRIBE,
  REGISTER_CUSTOMER,
  REQUEST_CALLBACK,
  UPLOAD_CUSTOMER_REQUEST_AUDIO,
} from "../../helpers/url_helper";

export const onRequestCallbackThunk = createAsyncThunk(
  REQUEST_CALLBACK,
  async (details: any) => {
    try {
      const response = requestCallbackAPI(details);
      const data = await response;
      toast.success("Request Submitted, Our help desk will contact you soon", {
        autoClose: 5000,
      });
      return data;
    } catch (error: any) {
      toast.error(error.data.message, {
        autoClose: 10000,
      });
      return error;
    }
  }
);

export const onSubscribe = createAsyncThunk(
  ON_SUBSCRIBE,
  async (details: any) => {
    try {
      const response = await onSubscribeUpdates(details);

      if (response.status === 200) {
        toast.success(response.data.message, {
          autoClose: 5000,
        });
      } else {
        toast.error(response.data.message, {
          autoClose: 10000,
        });
      }
      return response;
    } catch (error: any) {
      toast.error(error.data.error, {
        autoClose: 10000,
      });
      return error;
    }
  }
);

export const onAddingNewProduct = createAsyncThunk(
  ON_ADDING_NEW_PRODUCT,
  async (data: any, { dispatch, rejectWithValue }) => {
    try {
      const response: any = await onAddingNewProductApi(data);
      toast.success(response.data.message, {
        autoClose: 5000,
      });
      return data;
    } catch (error: any) {
      toast.error(error.data.message, {
        autoClose: 10000,
      });
      return error;
    }
  }
);

export const addingParam = createAsyncThunk(ADD_PARAM, async (details: any) => {
  try {
    const response = await addingParameterBH(details);
    toast.success("Parameter added Successfully", {
      autoClose: 5000,
    });
    return response;
  } catch (error: any) {
    toast.error(error.data.message, {
      autoClose: 10000,
    });
    return error;
  }
});

export const getRequestCallBacks = createAsyncThunk(
  GET_REQUEST_CALLBACKS,
  async () => {
    try {
      console.log("before sending request");
      const response = await getRequestCallbacksAPI();
      console.log("on fetchng request.callbacks");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const uploadCustomerRequestAudio = createAsyncThunk(
  UPLOAD_CUSTOMER_REQUEST_AUDIO,
  async (data: any) => {
    try {
      const response: any = await uploadAudioApi(data);
      toast.success(response.data.message, {
        autoClose: 5000,
      });

      return response.data;
    } catch (error: any) {
      toast.error(error.data.error, {
        autoClose: 10000,
      });
      return error;
    }
  }
);

export const getAllOrders = createAsyncThunk(
  GET_ALL_ECOMMERCE_ORDERS,
  async () => {
    try {
      const response = await onGetAllOrdersApi();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getCustomersList = createAsyncThunk(
  GET_CUSTOMERS_LIST,
  async () => {
    try {
      const response = await onGettingCustomersListAPI();

      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const registerCustomer = createAsyncThunk(
  REGISTER_CUSTOMER,
  async (data: any) => {
    try {
      const response = await registerCustomerAPI(data);
      toast.success(response.data.message, {
        autoClose: 5000,
      });
      return response.data;
    } catch (error: any) {
      toast.error(error.data.message, {
        autoClose: 10000,
      });
      return error;
    }
  }
);

export const getSubscribers = createAsyncThunk(
  GET_SUBSCRIBERS_LIST,
  async () => {
    try {
      const response = await onGettingSubscribers();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getGraphSubscribers = createAsyncThunk(
  GET_SUBSCRIBERS_GRAPH,
  async () => {
    try {
      const response = await onGettingSubscribersGraphAPI();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getSubscribersLast30Records = createAsyncThunk(
  GET_SUBSCRIBERS_GRAPH_LAST_30_DAYS,
  async () => {
    try {
      const response = await onGettingSubscribersGraphLast30DaysAPI();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
