import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getJobList as getJobListApi,
  deleteJobList as getDeleteJobListApi,
  getApplyJob as getApplyJobApi,
  deleteApplyJob as deleteApplyJobApi,
  addNewJobList as addNewJobListApi,
  updateJobList as updateJobListApi,
  getJobGrid as getJobGridApi,
  getJobCandidateList as getJobCandidateListApi,
} from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

export const getJobList = createAsyncThunk("jobs/getJobsList", async () => {
  try {
    const response = await getJobListApi();
    return response.data;
  } catch (error) {
    return error;
  }
});

export const addNewJobList = createAsyncThunk(
  "jobs/addNewJob",
  async (jobs: any) => {
    try {
      const response = await addNewJobListApi(jobs);
      toast.success("Job List Added Successfully", { autoClose: 2000 });
      return response.data;
    } catch (error) {
      toast.error("Job List Added Failed", { autoClose: 2000 });
      return error;
    }
  }
);

export const updateJobList = createAsyncThunk(
  "jobs/updateJob",
  async (jobs: any) => {
    try {
      const response = await updateJobListApi(jobs);
      toast.success("Job List Updated Successfully", { autoClose: 2000 });
      return response.data;
    } catch (error) {
      toast.error("Job List Updated Failed", { autoClose: 2000 });
      return error;
    }
  }
);

export const deleteJobList = createAsyncThunk(
  "jobs/deleteJobList",
  async (jobs: any) => {
    try {
      const response = await getDeleteJobListApi(jobs);
      toast.success("Job List Deleted Successfully", { autoClose: 2000 });
      return response.data;
    } catch (error) {
      toast.error("Job List Deleted Failed", { autoClose: 2000 });
      return error;
    }
  }
);

export const getApplyJob = createAsyncThunk("jobs/getApplyJob", async () => {
  try {
    const response = await getApplyJobApi();
    console.log("in get apply jobs");
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const deleteApplyJob = createAsyncThunk(
  "jobs/deleteApplyJob",
  async (jobs: any) => {
    try {
      const response = await deleteApplyJobApi(jobs);
      toast.success("Deleted Apply Job List Successfully", { autoClose: 2000 });
      return response.data;
    } catch (error) {
      toast.error("Deleted Apply Job List Failed", { autoClose: 2000 });
      return error;
    }
  }
);

//job grid
export const getJobGrid = createAsyncThunk("jobs/getJobsGrid", async () => {
  try {
    const response = await getJobGridApi();
    console.log("in jobs grid");
    console.log(response);
    return response.data;
  } catch (error) {
    return error;
  }
});

//job Candidate List
export const getJobCandidateList = createAsyncThunk(
  "jobs/getJobsCandidateList",
  async () => {
    try {
      const response = await getJobCandidateListApi();
      console.log("in get job candidate list");
      console.log(response);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
