import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  onGettingPendingAssigningSamplesAPI,
  getAllAnalystAPI,
  assigningParamsToAnlystsAPI,
  getMyJobsAPI, getSingleJobAPI, submitJobData, rejectJobData
} from "../../helpers/be_helpers";

import "react-toastify/dist/ReactToastify.css";
import {
  GET_PENDING_ASSIGNING_JOBS,
  GET_ALL_ANALYSTS,
  ASSIGN_PARAMS_TO_ANALYST,
  GET_MY_JOBS, GET_SINGLE_JOB, SUBMIT_TEST_DETAILS, REJECT_TEST_DETAILS
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

export const getMyJobs = createAsyncThunk(GET_MY_JOBS, async (arg: any) => {
  // console.log(arg, 'arggggggg')
  try {
    const response = await getMyJobsAPI(arg);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const getSingleJob = createAsyncThunk(GET_SINGLE_JOB, async (jobId: any) => {
  // console.log(arg, 'arggggggg')
  try {
    const response = await getSingleJobAPI(jobId);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const submitTestDetails = createAsyncThunk(SUBMIT_TEST_DETAILS, async (testData: any) => {
  console.log(testData, 'testData')
  try {
    const response = await submitJobData(testData);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const rejectTestDetails = createAsyncThunk(REJECT_TEST_DETAILS, async (requirement: any) => {
  try {
    const response = await rejectJobData(requirement);
    return response.data;
  } catch (error) {
    return error;
  }
});
