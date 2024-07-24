import { createSlice } from "@reduxjs/toolkit";
import { EMPLOYEE_LOCAL_STORAGE_KEY } from "common/tokens";
import Cookies from "js-cookie";
import { Employee } from "pages/HRandAdmin/types";

export interface CurrentUser {
  error: object;
  loading?: boolean;
  employee: Employee;
}

export const initialState: CurrentUser = {
  error: {},
  loading: false,
  employee: {} as Employee,
};

const CurrentUserSlice = createSlice({
  name: "CurrentUserSlice",
  initialState,

  reducers: {
    employeeLoginSuccess(state, action) {
      const { employee, jwt_token } = action.payload;
      state.employee = { ...employee, jwt_token };
      Cookies.set(
        EMPLOYEE_LOCAL_STORAGE_KEY,
        JSON.stringify({ ...employee, jwt_token })
      );
    },

    restoreCurrentUserInfo(state) {
      const loggedInUser = Cookies.get(EMPLOYEE_LOCAL_STORAGE_KEY);
      if (loggedInUser) {
        const userData = JSON.parse(loggedInUser);

        state.employee = { ...userData };
      } else {
        state.employee = {} as Employee;
      }
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(employeeLoginSuccess, (state, action) => {
    //   const { employee, jwt_token } = action.payload;
    //   state.employee = { ...employee, jwt_token };
    //   // Store user details in cookies
    //   Cookies.set("loggedInUser", JSON.stringify(state.employee));
    // });
  },
});

export const { employeeLoginSuccess, restoreCurrentUserInfo } =
  CurrentUserSlice.actions;

export default CurrentUserSlice.reducer;
