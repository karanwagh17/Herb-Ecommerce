import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
  isAuth: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
    },
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    },
    signuperror: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    otpVerificationStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    otpVerificationSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },

    otpVerificationerror: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signinStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signinSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
      state.isAuth = true;
    },

    signinerror: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuth = false;
      state.error = null;
    },
    addressUpdateSuccess: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  addressUpdateSuccess,
  signinerror,
  resetAuthState,
  logoutSuccess,
  signupSuccess,
  signinStart,
  signinSuccess,
  signuperror,
  signupStart,
  otpVerificationerror,
  otpVerificationSuccess,
  otpVerificationStart,
} = authSlice.actions;

export default authSlice.reducer;
