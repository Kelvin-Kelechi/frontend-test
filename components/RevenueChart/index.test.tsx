import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import RevenueChart from "./index";

const mockStore = configureStore([]);

describe("RevenueChart Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      revenue: {
        data: [
          { name: "Day 1", value: 5000 },
          { name: "Day 2", value: 10000 },
          { name: "Day 3", value: 15000 },
        ],
        loading: false,
      },
    });

    store.dispatch = jest.fn();
  });

  it("renders the loading state", () => {
    store = mockStore({
      revenue: { data: [], loading: true },
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
