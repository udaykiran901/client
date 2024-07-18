import { createSlice } from "@reduxjs/toolkit";
import { EMPLOYEE_LOCAL_STORAGE_KEY } from "common/tokens";
import Cookies from "js-cookie";

interface CurrentLoggedInUser {
  jwt_token: string;
  emp_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  address: string;
  gender: string;
  married: boolean;
  spouse_name: string;
  spouse_contact: string;
  father_name: string;
  emergency_contact: string;
  blood: string;
  aadhar: string | null;
  pan: string | null;
  ssc: string | null;
  intermediate: string | null;
  degree: string | null;
  bankbook: string | null;
  department: string | null;
  role: number;
  doa: string;
  dob: string;
  salary: string;
  branch: string;
  reporting_manager: string;
  access_key: string;
  username: string;
  profile_photo: string;
}

interface CurrentUser {
  error: object;
  loading?: boolean;
  employee: CurrentLoggedInUser;
}

export const initialState: CurrentUser = {
  error: {},
  loading: false,
  employee: {} as CurrentLoggedInUser,
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
        state.employee = userData;
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
