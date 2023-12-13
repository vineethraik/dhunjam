import { createSlice } from "@reduxjs/toolkit";
import { logInWithEmailPassword } from "src/services/auth";

const initialState = {
  isLoggedIn: false,
  loading: false,
  authData: {},
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logInWithEmailPassword.pending, (state) => {
      state.loading = true;
      state.isLoggedIn = false;
      state.error = null;
    });
    builder.addCase(logInWithEmailPassword.fulfilled, (state, action) => {
      if (action.payload?.response === "Success") {
        state.isLoggedIn = true;
        state.loading = false;
        state.authData = action.payload?.data;
        state.error = null;
        // sessionStorage.setItem("email", action.meta.arg.email);
        // sessionStorage.setItem("password", action.meta.arg.password);
      } else {
        state.isLoggedIn = false;
        state.loading = false;
        state.authData = {};
        state.error = action.payload.ui_err_msg;
      }
    });
    builder.addCase(logInWithEmailPassword.rejected, (state, action) => {
      console.log(action);

      state.isLoggedIn = false;
      state.loading = false;
      state.authData = {};
      state.error = action.payload.ui_err_msg;
    });
  },
});

export const { setAuthError } = authSlice.actions;

export default authSlice.reducer;
