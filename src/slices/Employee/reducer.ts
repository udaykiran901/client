import { createSlice } from "@reduxjs/toolkit";
import //   getRoles,
//   getBranches,
//   getEmployees,
//   getDepartments,
//   getAccessKeys,
"./thunk";

import {
  Employee,
  Role,
  Department,
  Branch,
  AccessKey,
} from "pages/HRandAdmin/types";

export interface EmployeeInitialState {
  error: object;
  loading?: boolean;

  employees: Employee[];
  roles: Role[];
  departments: Department[];
  branches: Branch[];
  accessKeys: AccessKey[];
}

export const initialState: EmployeeInitialState = {
  employees: [],
  roles: [],
  departments: [],
  branches: [],
  accessKeys: [],
  loading: true,
  error: {},
};

const EmployeeSlice = createSlice({
  name: "EmployeeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(getRoles.fulfilled, (state: any, action: any) => {
    //   state.roles = action.payload;
    //   state.loading = true;
    // });
    // builder.addCase(getRoles.rejected, (state: any, action: any) => {
    //   state.error = action.payload ? action.payload?.error : null;
    // });
    // builder.addCase(getBranches.fulfilled, (state: any, action: any) => {
    //   state.branches = action.payload;
    // });
    // builder.addCase(getBranches.rejected, (state: any, action: any) => {
    //   state.error = action.payload ? action.payload?.error : null;
    // });
    // builder.addCase(getEmployees.fulfilled, (state: any, action: any) => {
    //   state.employees = action.payload;
    // });
    // builder.addCase(getEmployees.rejected, (state: any, action: any) => {
    //   state.error = action.payload ? action.payload?.error : null;
    // });
    // builder.addCase(getDepartments.fulfilled, (state: any, action: any) => {
    //   state.departments = action.payload;
    // });
    // builder.addCase(getDepartments.rejected, (state: any, action: any) => {
    //   state.error = action.payload || null;
    // });
    // builder.addCase(getAccessKeys.fulfilled, (state: any, action: any) => {
    //   state.accessKeys = action.payload;
    // });
    // builder.addCase(getAccessKeys.rejected, (state: any, action: any) => {
    //   state.error = action.payload || null;
    // });
  },
});

export default EmployeeSlice.reducer;
