import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TransactionsTable from "./page";
import { fetchTransactions } from "../../features/transactionsSlice";
import "@testing-library/jest-dom";

// jest.mock("lucide-react", () => ({
//   // Mock the icons you use
//   IconName: () => <svg data-testid="mock-icon" />,
// }));
jest.mock("@/features/transactionsSlice", () => ({
  fetchTransactions: jest.fn(),
}));

describe("TransactionsTable Component", () => {
  const mockStore = configureStore([]);

  it("renders loading state", () => {
    const store = mockStore({ transactions: { data: [], loading: true } });
    render(
      <Provider store={store}>
        <TransactionsTable />
      </Provider>
    );
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("renders transactions when data is available", () => {
    const store = mockStore({
      transactions: {
        data: [
          {
            id: "1234",
            amount: "₦100",
            type: "Deposit",
            date: "2023-06-06",
            time: "12:00 PM",
            status: "Processed",
          },
        ],
        loading: false,
      },
    });

    render(
      <Provider store={store}>
        <TransactionsTable />
      </Provider>
    );

    expect(screen.getByText("$100")).toBeInTheDocument();
    expect(screen.getByText("Deposit")).toBeInTheDocument();
    expect(screen.getByText("2023-06-06")).toBeInTheDocument();
    expect(screen.getByText("Processed")).toBeInTheDocument();
  });

  it("dispatches fetchTransactions on mount", () => {
    const store = mockStore({ transactions: { data: [], loading: false } });
    render(
      <Provider store={store}>
        <TransactionsTable />
      </Provider>
    );
    expect(fetchTransactions).toHaveBeenCalled();
  });
});
