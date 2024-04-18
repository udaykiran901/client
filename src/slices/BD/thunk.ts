import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  onSubscribeUpdates,
  requestCallback as requestCallbackAPI,
  onAddingNewProduct as onAddingNewProductApi,
  addingParameterBH,
} from "../../helpers/fakebackend_helper";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ADD_PARAM,
  ON_ADDING_NEW_PRODUCT,
  ON_SUBSCRIBE,
  REQUEST_CALLBACK,
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
    console.log("am here and this is data");
    console.log(details);
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
