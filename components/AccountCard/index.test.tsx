import { render, screen, fireEvent } from "@testing-library/react";
import AccountCard from "./index";
import "@testing-library/jest-dom";

describe("AccountCard Component", () => {
  const bankName = "Test Bank";
  const accountNumber = "1234567890";

  beforeEach(() => {
    jest.clearAllMocks();
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(),
      },
    });
  });

  it("renders account details correctly", () => {
    render(<AccountCard bankName={bankName} accountNumber={accountNumber} />);

    expect(screen.getByText("ACCOUNT DETAILS")).toBeInTheDocument();
    expect(screen.getByText(bankName)).toBeInTheDocument();
    expect(screen.getByText(accountNumber)).toBeInTheDocument();
    expect(screen.getByText("Copy")).toBeInTheDocument();
  });

  it("copies account number when copy button is clicked", () => {
    render(<AccountCard bankName={bankName} accountNumber={accountNumber} />);

    const copyButton = screen.getByText("Copy");
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(accountNumber);
    expect(screen.getByText("Copied")).toBeInTheDocument();
  });

  it("resets copy state after timeout", () => {
    jest.useFakeTimers();

    render(<AccountCard bankName={bankName} accountNumber={accountNumber} />);

    fireEvent.click(screen.getByText("Copy"));
    expect(screen.getByText("Copied")).toBeInTheDocument();

    jest.advanceTimersByTime(2000);
    expect(screen.getByText("Copy")).toBeInTheDocument();

    jest.useRealTimers();
  });
});
