import { render } from "@testing-library/react";
import "@testing-library/jest-dom"; // Ensure this import is present
import Loading from "./index";

describe("Loading Component", () => {
  it("renders the loading spinner", () => {
    const { container } = render(<Loading />);

    // Check if the spinner exists in the DOM
    const spinner = container.querySelector("div.animate-spin");
    expect(spinner).toBeInTheDocument();
  });
});
