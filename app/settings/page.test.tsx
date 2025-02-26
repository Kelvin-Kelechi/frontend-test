import { render, screen } from "@testing-library/react";
import Settings from "./page";
import "@testing-library/jest-dom";

describe("Settings Component", () => {
  test("renders the settings page", () => {
    render(<Settings />);
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });
});
