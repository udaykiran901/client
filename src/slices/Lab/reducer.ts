import { createSlice } from "@reduxjs/toolkit";
import { getAnalysts, getPendingAssigningJobs } from "./thunk";
import { Orders } from "pages/BD/types";
import { Employee } from "pages/HRandAdmin/types";

interface InitialState {
  error: object;
  loading?: boolean;
  sampleAllocationPending: Orders[];
  labStaff: Employee[];
}

export const initialState: InitialState = {
  error: {},
  loading: false,
  sampleAllocationPending: [],
  labStaff: [],
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
