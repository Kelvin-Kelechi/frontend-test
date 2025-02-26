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
interface Transaction {
  id: number;
  amount: number;
  date: string;
  status: string;
}

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    data: [] as Transaction[], 
    loading: false,
    error: null as string | null | undefined,  
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
         state.error = action.error.message || null; 
      });
  },
});

export default transactionsSlice.reducer;