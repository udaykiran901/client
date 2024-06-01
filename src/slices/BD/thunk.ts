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
  onGettingCustomersMonthlyCountAPI,
  onGettingCustomersLast30RecordsAPI,
  onGettingOrdersMonthlyRecordAPI,
  onGettingOrdersDailyRecordAPI,
  onGettingSampleStatisticsAPI,
  onGettingDisciplineWiseStatisticsAPI,
  onGettingOnlineUsersAPI,
  onGettingOnlineDailyUsersCount,
  onGettingOnlineMonthlyUsersCount,
  onGettingTop10OrdredAccountAPI,
  onGettingDailyCountOfAllEntitiesAPI,
  onGettingMonthlyCountOfAllEntitiesAPI,
  onGettingCompleteOrderDetails,
} from "../../helpers/fakebackend_helper";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ADD_PARAM,
  CUSTOMERS_MONTHLY_GRAPH,
  CUSTOMER_LAST_30_RECORDS,
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
  ORDERS_DAILY_RECORD,
  ORDERS_MONTHLY_RECORD,
  SAMPLES_STATISTICS,
  GET_DISCIPLINE_WISE_COUNT,
  GET_ONLINE_USERS,
  GET_ONLINE_DAILY_USERS_COUNT,
  GET_ONLINE_MONTHLY_USERS_COUNT,
  GET_TOP_10_ORDERED_ACCOUNT,
  GET_DAILY_COUNT_OF_ALL_ENTITIES,
  GET_MONTHLY_COUNT_OF_ALL_ENTITIES,
  GET_COMPLETE_ORDER_DETAILS,
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
      const response = await getRequestCallbacksAPI();
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

export const getCompleteOrderDetails = createAsyncThunk(
  GET_COMPLETE_ORDER_DETAILS,
  async (data: any) => {
    try {
      const response = await onGettingCompleteOrderDetails(data);
      console.log("In response thunk");
      console.log(response);
      return response.data;
    } catch (error) {
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

export const getCustomersMonthlyCount = createAsyncThunk(
  CUSTOMERS_MONTHLY_GRAPH,
  async () => {
    try {
      const response = await onGettingCustomersMonthlyCountAPI();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getCustomersLast30records = createAsyncThunk(
  CUSTOMER_LAST_30_RECORDS,
  async () => {
    try {
      const response = await onGettingCustomersLast30RecordsAPI();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getOrdersDailyRecord = createAsyncThunk(
  ORDERS_DAILY_RECORD,
  async () => {
    try {
      const response = await onGettingOrdersDailyRecordAPI();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getOrdersMonthlyRecord = createAsyncThunk(
  ORDERS_MONTHLY_RECORD,
  async () => {
    try {
      const response = await onGettingOrdersMonthlyRecordAPI();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getSamplesStatistics = createAsyncThunk(
  SAMPLES_STATISTICS,
  async () => {
    try {
      const response = await onGettingSampleStatisticsAPI();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getDisciplineGraph = createAsyncThunk(
  GET_DISCIPLINE_WISE_COUNT,
  async () => {
    try {
      const response = await onGettingDisciplineWiseStatisticsAPI();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

//online users
export const getOnlineUsers = createAsyncThunk(GET_ONLINE_USERS, async () => {
  try {
    const response = await onGettingOnlineUsersAPI();
    return response.data;
  } catch (error) {
    return error;
  }
});
export const getDailyOnlineUsersCount = createAsyncThunk(
  GET_ONLINE_DAILY_USERS_COUNT,
  async () => {
    try {
      const response = await onGettingOnlineDailyUsersCount();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const getMonthlyUsersOnlineCount = createAsyncThunk(
  GET_ONLINE_MONTHLY_USERS_COUNT,
  async () => {
    try {
      const response = await onGettingOnlineMonthlyUsersCount();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getTop10OrderedAccount = createAsyncThunk(
  GET_TOP_10_ORDERED_ACCOUNT,
  async () => {
    try {
      const response = await onGettingTop10OrdredAccountAPI();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getDailyCountOfAllEntities = createAsyncThunk(
  GET_DAILY_COUNT_OF_ALL_ENTITIES,
  async () => {
    try {
      const response = await onGettingDailyCountOfAllEntitiesAPI();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getCountOfAllEntitiesMonthly = createAsyncThunk(
  GET_MONTHLY_COUNT_OF_ALL_ENTITIES,
  async () => {
    try {
      const response = await onGettingMonthlyCountOfAllEntitiesAPI();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
