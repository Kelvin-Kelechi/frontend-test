import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
 // Ensure correct path
import RevenueChart from "./index";
import { RootState } from "@/redux/store";
interface RevenueData {
  name: string;
  value: number;
}
const mockStore = configureStore<RootState>(); // Correctly type the store

describe("RevenueChart Component", () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
    store = mockStore({
      revenue: {
        data: [
          { name: "Day 1", value: 5000 },
          { name: "Day 2", value: 10000 },
          { name: "Day 3", value: 15000 },
        ] as RevenueData[],
        loading: false,
        error: null, // Ensure all properties from Redux state are included
      },
      transactions: {
        data: [],
        loading: false,
        error: null,
      },
    });

    store.dispatch = jest.fn();
  });

  it("renders the loading state", () => {
    store = mockStore({
      revenue: { data: [], loading: true, error: null },
      transactions: { data: [], loading: false, error: null },
    });

    render(
      <Provider store={store}>
        <RevenueChart />
      </Provider>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("renders the chart when data is available", () => {
    render(
      <Provider store={store}>
        <RevenueChart />
      </Provider>
    );

    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("Last 7 days")).toBeInTheDocument();
  });

  it("changes the selected period when a button is clicked", () => {
    render(
      <Provider store={store}>
        <RevenueChart />
      </Provider>
    );

    const todayButton = screen.getByText("Today");
    fireEvent.click(todayButton);

    expect(todayButton).toHaveClass("bg-[#00C6FB0F]");
  });
});
