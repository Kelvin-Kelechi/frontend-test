"use client";
import { fetchMockRevenue } from "@/services/revenueService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRevenueData = createAsyncThunk(
  "revenue/fetchRevenueData",
  async () => {
    const response = await fetchMockRevenue();
    return response;
  }
);

const revenueSlice = createSlice({
  name: "revenue",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRevenueData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRevenueData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRevenueData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default revenueSlice.reducer;
