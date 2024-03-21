import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestCallback as requestCallbackAPI } from "../../helpers/fakebackend_helper";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { REQUEST_CALLBACK } from "../../helpers/url_helper";

export const onRequestCallbackThunk = createAsyncThunk(
  REQUEST_CALLBACK,
  async (details: any) => {
    try {
      const response = requestCallbackAPI(details);
      const data = await response;
      console.log(data);
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
