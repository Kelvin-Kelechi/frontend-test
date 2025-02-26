"use client";
import { fetchMockTransactions } from "@/services/transactionService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchTransactions = createAsyncThunk(
  "transactions/fetch",
  async () => {
    const response = await fetchMockTransactions();
    return response;
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = Array.isArray(action.payload) ? action.payload : []; 
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default transactionsSlice.reducer;