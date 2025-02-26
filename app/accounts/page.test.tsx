import { render, screen } from "@testing-library/react";
import Dashboard from "./page";
import "@testing-library/jest-dom";

describe("Dashboard Component", () => {
  test("renders the dashboard text", () => {
    render(<Dashboard />);

    expect(screen.getByText("Accounts")).toBeInTheDocument();
  });
});
