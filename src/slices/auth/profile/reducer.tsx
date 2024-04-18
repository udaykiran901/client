import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { LOGGED_IN_USER } from "common/tokens";

export const initialState = {
  error: "",
  success: "",
  user: {},
};

const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    profileSuccess(state, action) {
      state.user = action.payload;
      state.success = "";
    },
    profileError(state, action) {
      state.error = action.payload;
    },
    editProfileChange(state) {
      state = { ...state };
    },
    resetProfileFlagChange(state) {
      state.success = "";
    },
    saveProfile(state, action) {
      Cookies.set(LOGGED_IN_USER, JSON.stringify(action.payload));
    },

    getProfile(state) {
      const profile = Cookies.get(LOGGED_IN_USER);
      let parsedProfile;
      if (profile) {
        parsedProfile = JSON.parse(profile);
        state.user = parsedProfile;
      } else {
        state.user = {};
      }
    },
  },
});

export const {
  profileSuccess,
  profileError,
  editProfileChange,
  resetProfileFlagChange,
  getProfile,
  saveProfile,
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
