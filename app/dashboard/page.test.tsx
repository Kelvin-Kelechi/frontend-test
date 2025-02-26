import { render, screen } from "@testing-library/react";
import Dashboard from "./page";
import "@testing-library/jest-dom";

jest.mock("../../components/AccountCard", () => {
  const MockAccountCard = () => <div data-testid="account-card"></div>;
  MockAccountCard.displayName = "MockAccountCard";
  return MockAccountCard;
});

jest.mock("../../components/RevenueChart", () => {
  const MockRevenueChart = () => <div data-testid="revenue-chart"></div>;
  MockRevenueChart.displayName = "MockRevenueChart";
  return MockRevenueChart;
});

describe("Dashboard Component", () => {
  test("renders the online payments header", () => {
    render(<Dashboard />);
    expect(screen.getByText("Online Payments")).toBeInTheDocument();
  });

  test("renders the AccountCard component", () => {
    render(<Dashboard />);
    expect(screen.getByTestId("account-card")).toBeInTheDocument();
  });

  test("renders the RevenueChart component", () => {
    render(<Dashboard />);
    expect(screen.getByTestId("revenue-chart")).toBeInTheDocument();
  });
});
