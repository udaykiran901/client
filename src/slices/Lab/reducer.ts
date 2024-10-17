import { createSlice } from "@reduxjs/toolkit";
import { getAnalysts, getMyJobs, getPendingAssigningJobs, getSingleJob, submitTestDetails, rejectTestDetails } from "./thunk";
import { Orders } from "pages/BD/types";
import { Employee } from "pages/HRandAdmin/types";
import { Job } from "pages/Laboratory/type";

export interface LabInitialState {
  error: object;
  loading?: boolean;
  sampleAllocationPending: Orders[];
  labStaff: Employee[];
  myJobs: Job[];
  singleJob?: any
}

export const initialState: LabInitialState = {
  error: {},
  loading: false,
  sampleAllocationPending: [],
  labStaff: [],
  myJobs: [],
  singleJob: []
};

const LabSlice = createSlice({
  name: "LabSlice",
  initialState,
  reducers: {
    toggleSubscribeModal(state) {
      return {
        ...state,
      };
    },

    toggleCallbackForm(state) {
      return {
        ...state,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      getPendingAssigningJobs.fulfilled,
      (state: any, action: any) => {
        state.sampleAllocationPending = action.payload.data;
      }
    );

    builder.addCase(getAnalysts.fulfilled, (state: any, action: any) => {
      state.labStaff = action.payload.data;
    });

    builder.addCase(getMyJobs.fulfilled, (state: any, action: any) => {
      state.myJobs = action.payload.data;
    });

    builder.addCase(getSingleJob.fulfilled, (state: any, action: any) => {
      state.singleJob = action.payload.data;
    });

    builder.addCase(rejectTestDetails.fulfilled, (state: any, action: any) => {
      state.singleJob = [];
    });

    // builder.addCase(submitTestDetails.fulfilled, (state: any, action: any) => {
    //   console.log('successfully submitted')
    //   state.singleJob = action.payload.data;
    // });

    //end of quotations
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state, action) => {
        state.loading = true;
      }
    );

    builder.addMatcher(
      (action) => action.type.endsWith("/fulfilled"),
      (state, action) => {
        state.loading = false;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        state.loading = false;
      }
    );
  },
});

export const { toggleSubscribeModal, toggleCallbackForm } = LabSlice.actions;

export default LabSlice.reducer;
