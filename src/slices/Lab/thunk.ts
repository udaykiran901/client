import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  onGettingPendingAssigningSamplesAPI,
  getAllAnalystAPI,
  assigningParamsToAnlystsAPI,
  getMyJobsAPI,
} from "../../helpers/be_helpers";

import "react-toastify/dist/ReactToastify.css";
import {
  GET_PENDING_ASSIGNING_JOBS,
  GET_ALL_ANALYSTS,
  ASSIGN_PARAMS_TO_ANALYST,
  GET_MY_JOBS,
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

export const assigningParamsToAnlysts = createAsyncThunk(
  ASSIGN_PARAMS_TO_ANALYST,
  async (data: any, { dispatch }) => {
    try {
      const response = await assigningParamsToAnlystsAPI(data);
      dispatch(getPendingAssigningJobs());
    } catch (error) {
      return error;
    }
  }
);

export const getMyJobs = createAsyncThunk(GET_MY_JOBS, async () => {
  try {
    const response = await getMyJobsAPI();
    return response.data;
  } catch (error) {
    return error;
  }
});
