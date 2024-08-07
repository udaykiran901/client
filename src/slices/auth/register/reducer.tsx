import { createSlice } from "@reduxjs/toolkit";

export interface RegisterSlice {
  registrationError: null | string;
  message: null | string;
  loading: boolean;
  user: null | string;
  success: boolean | string;
  error: boolean | string;
  isUserLogout: boolean | string;
}

export const initialState: RegisterSlice = {
  registrationError: null,
  message: null,
  loading: false,
  user: null,
  success: false,
  error: false,
  isUserLogout: true,
};

const registerSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    registerUserSuccessful(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.success = true;
      state.registrationError = null;
    },
    registerUserFailed(state, action) {
      state.user = null;
      state.loading = false;
      state.registrationError = action.payload;
      state.error = true;
    },
    resetRegisterFlagChange(state) {
      state.success = false;
      state.error = false;
    },
    apiErrorChange(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.isUserLogout = false;
    },
  },
});

export const {
  registerUserSuccessful,
  registerUserFailed,
  resetRegisterFlagChange,
  apiErrorChange,
} = registerSlice.actions;

export default registerSlice.reducer;
