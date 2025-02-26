import { configureStore } from "@reduxjs/toolkit";
import revenueReducer from "../features/revenueSlice";
import transactionsReducer from "../features/transactionsSlice";

export const store = configureStore({
  reducer: {
    revenue: revenueReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
