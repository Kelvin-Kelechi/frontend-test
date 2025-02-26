import { render, screen } from "@testing-library/react";
import Transfers from "./page";
import "@testing-library/jest-dom";

describe("Transfers Component", () => {
  test("renders the Transfers page", () => {
    render(<Transfers />);
    expect(screen.getByText("Transfers")).toBeInTheDocument();
  });
});
