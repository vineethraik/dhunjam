import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "src/constants/constants";

export const logInWithEmailPassword = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const res = await fetch(`${API_BASE_URL}admin/login`, {
      method: "POST",
      body: JSON.stringify({ username: email, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    const data = await res;
    return data;
  }
);
