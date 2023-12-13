import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "src/redux/slices/auth";
import dashboardReducer from "src/redux/slices/dashboard";

const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
