import { createSlice } from "@reduxjs/toolkit";
import { getDashboardData, updateDashboardData } from "src/services/dashboard";

const initialState = {
  loading: false,
  dashboardData: {},
  error: null,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDashboardData.pending, (state) => {
      state.loading = true;
      state.dashboardData = {};
      state.error = null;
    });
    builder.addCase(getDashboardData.fulfilled, (state, action) => {
      console.log(action);
      if (action.payload?.response === "Success") {
        state.loading = false;
        state.dashboardData = action.payload?.data;
        state.error = null;
      } else {
        state.isLoggedIn = false;
        state.loading = false;
        state.dashboardData = {};
        state.error =
          action.payload.ui_err_msg || action.payload.server_err_msg;
      }
    });
    builder.addCase(getDashboardData.rejected, (state, action) => {
      console.log(action);

      state.loading = false;
      state.dashboardData = {};
      state.error = action.payload.ui_err_msg;
    });
    builder.addCase(updateDashboardData.pending, (state) => {
      console.log(state);

      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateDashboardData.fulfilled, (state, action) => {
      console.log(state, action);
      if (action.payload?.response === "Success") {
        state.loading = false;
        state.error = null;
        state.dashboardData = {
          ...state.dashboardData,
          ...action.payload?.data,
        };
        // console.log(state.dashboardData, action.payload?.data.amount);
        // const { id, dispatch } = action?.meta?.arg;
        // dispatch(getDashboardData({ id }));
      } else {
        state.error =
          action.payload.ui_err_msg || action.payload.server_err_msg;
      }
    });

    builder.addCase(updateDashboardData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.ui_err_msg || action.payload.server_err_msg;
    });
  },
});

// export const {  } = dashboardSlice.actions;

export default dashboardSlice.reducer;
