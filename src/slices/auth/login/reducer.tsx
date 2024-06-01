import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: "",
  error: "",
  loading: false,
  isUserLogout: false,
  errorMsg: false,
  userEmail: null,
  userMobile: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.errorMsg = false;
    },
    apiError(state, action) {
      state.error = action.payload;
      state.loading = true;
      state.isUserLogout = false;
      state.errorMsg = true;
    },
    resetLoginFlag(state) {
      state.error = "";
      state.loading = false;
      state.errorMsg = false;
    },
    logoutUserSuccess(state, action) {
      state.isUserLogout = true;
    },

    setLoading(state) {
      state.loading = true;
    },

    stopLoading(state) {
      state.loading = false;
    },
  },
});

export const {
  loginSuccess,
  apiError,
  resetLoginFlag,
  logoutUserSuccess,
  setLoading,
  stopLoading,
} = loginSlice.actions;

export default loginSlice.reducer;
