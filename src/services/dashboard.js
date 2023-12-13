import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "src/constants/constants";

export const getDashboardData = createAsyncThunk(
  "dashboard/data",
  async ({ id }) => {
    const res = await fetch(`${API_BASE_URL}admin/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    const data = await res;
    return data;
  }
);

export const updateDashboardData = createAsyncThunk(
  "dashboard/updateData",
  async ({ id, changeData, dispatch }) => {
    console.log(changeData);
    const res = await fetch(`${API_BASE_URL}admin/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: changeData,
      }),
    }).then((res) => res.json());
    const data = await res;
    console.log(data);
    return data;
  }
);
