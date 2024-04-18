import { createSlice } from "@reduxjs/toolkit";
import {
  getRoles,
  getBranches,
  getEmployees,
  getDepartments,
  getAccessKeys,
} from "./thunk";

import {
  Employee,
  Role,
  Department,
  Branch,
  AccessKey,
} from "pages/HRandAdmin/types";

interface InitialState {
  error: object;
  loading?: boolean;

  employees: Employee[];
  roles: Role[];
  departments: Department[];
  branches: Branch[];
  accessKeys: AccessKey[];
}

export const initialState: InitialState = {
  employees: [],
  roles: [],
  departments: [],
  branches: [],
  accessKeys: [],
  loading: true,
  error: {},
};

const HRandAdmin = createSlice({
  name: "HRandAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRoles.fulfilled, (state: any, action: any) => {
      state.roles = action.payload;
      state.loading = true;
    });

    builder.addCase(getRoles.rejected, (state: any, action: any) => {
      state.error = action.payload ? action.payload?.error : null;
    });

    builder.addCase(getBranches.fulfilled, (state: any, action: any) => {
      state.branches = action.payload;
    });

    builder.addCase(getBranches.rejected, (state: any, action: any) => {
      state.error = action.payload ? action.payload?.error : null;
    });

    builder.addCase(getEmployees.fulfilled, (state: any, action: any) => {
      state.employees = action.payload;
    });

    builder.addCase(getEmployees.rejected, (state: any, action: any) => {
      state.error = action.payload ? action.payload?.error : null;
    });

    builder.addCase(getDepartments.fulfilled, (state: any, action: any) => {
      state.departments = action.payload;
    });

    builder.addCase(getDepartments.rejected, (state: any, action: any) => {
      state.error = action.payload || null;
    });

    builder.addCase(getAccessKeys.fulfilled, (state: any, action: any) => {
      state.accessKeys = action.payload;
    });

    builder.addCase(getAccessKeys.rejected, (state: any, action: any) => {
      state.error = action.payload || null;
    });

    // builder.addCase(deleteOrder.fulfilled, (state: any, action: any) => {
    //   state.orders = state.orders.filter(
    //     (order: any) => order.id !== action.payload
    //   );
    // });

    // builder.addCase(deleteOrder.rejected, (state: any, action: any) => {
    //   state.error = action.payload.error || null;
    // });

    // builder.addCase(getCustomers.fulfilled, (state: any, action: any) => {
    //   state.customers = action.payload;
    //   state.isCustomerCreated = false;
    //   state.isCustomerSuccess = true;
    //   state.loading = true;
    // });

    // builder.addCase(getCustomers.rejected, (state: any, action: any) => {
    //   state.error = action.payload ? action.payload?.error : null;
    //   state.isCustomerCreated = false;
    //   state.isCustomerSuccess = false;
    // });

    // builder.addCase(addNewCustomer.fulfilled, (state: any, action: any) => {
    //   state.customers.unshift(action.payload);
    //   state.isCustomerCreated = true;
    // });

    // builder.addCase(addNewCustomer.rejected, (state: any, action: any) => {
    //   state.error = action.payload.error || null;
    // });

    // builder.addCase(updateCustomer.fulfilled, (state: any, action: any) => {
    //   state.customers = state.customers.map((customer: any) =>
    //     customer.id === action.payload.id
    //       ? { ...customer, ...action.payload }
    //       : customer
    //   );
    // });

    // builder.addCase(updateCustomer.rejected, (state: any, action: any) => {
    //   state.error = action.payload || null;
    // });

    // builder.addCase(deleteCustomer.fulfilled, (state: any, action: any) => {
    //   state.customers = state.customers.filter(
    //     (customer: any) => customer.id !== action.payload
    //   );
    // });

    // builder.addCase(deleteCustomer.rejected, (state: any, action: any) => {
    //   state.error = action.payload.error || null;
    // });

    // builder.addCase(getShops.fulfilled, (state: any, action: any) => {
    //   state.shops = action.payload;
    //   state.loading = true;
    // });

    // builder.addCase(getShops.rejected, (state: any, action: any) => {
    //   state.error = action.payload ? action.payload?.error : null;
    // });

    // builder.addCase(onRegisterEmployee.fulfilled, (state: any, action: any) => {
    //   console.log("hello world");
    // });
  },
});

export default HRandAdmin.reducer;
