import { fetchMockRevenue } from "@/services/revenueService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRevenueData = createAsyncThunk<RevenueData[]>(
  "revenue/fetchRevenueData",
  async () => {
    const response = await fetchMockRevenue();
    return response;
  }
);

interface RevenueData {
  name: string;
  value: number;
}

const revenueSlice = createSlice({
  name: "revenue",
  initialState: {
    data: [] as RevenueData[],
    loading: false,
    error: null as string | null,
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
        state.error = action.error.message || null;
      });
  },
});

export default revenueSlice.reducer;
