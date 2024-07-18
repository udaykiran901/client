import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  onGettingPendingAssigningSamplesAPI,
  getAllAnalystAPI,
} from "../../helpers/fakebackend_helper";

import "react-toastify/dist/ReactToastify.css";
import {
  GET_PENDING_ASSIGNING_JOBS,
  GET_ALL_ANALYSTS,
} from "../../helpers/url_helper";

export const getPendingAssigningJobs = createAsyncThunk(
  GET_PENDING_ASSIGNING_JOBS,
  async () => {
    try {
      const response = await onGettingPendingAssigningSamplesAPI();
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getAnalysts = createAsyncThunk(GET_ALL_ANALYSTS, async () => {
  try {
    const response = await getAllAnalystAPI();
    return response.data;
  } catch (err) {
    return err;
  }
});
