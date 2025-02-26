import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./index";
import { usePathname } from "next/navigation";
import "@testing-library/jest-dom";
import Image from "next/image";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: { src: string; alt?: string }) => {
    return <Image {...props} alt={props.alt || "Image"} />;
  },
}));
describe("Header Component", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/");
  });

  test("renders logo, bell icon, and user profile", () => {
    render(<Header />);

    expect(screen.getByAltText("FundR Logo")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /FundR Logo/i })
    ).toBeInTheDocument();
    expect(screen.getByText("GA")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /bell/i })).toBeInTheDocument();
  });

  test("opens and closes sidebar on menu and close button click", () => {
    render(<Header />);

    const menuButton = screen.getByRole("button", { name: /menu/i });
    fireEvent.click(menuButton);

    expect(screen.getByRole("navigation")).toBeVisible();

    const closeButton = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeButton);

    expect(screen.queryByRole("navigation")).not.toBeVisible();
  });

  test("clicking outside sidebar closes it", () => {
    render(<Header />);

    fireEvent.click(screen.getByRole("button", { name: /menu/i }));
    expect(screen.getByRole("navigation")).toBeVisible();

    fireEvent.click(screen.getByTestId("overlay"));
    expect(screen.queryByRole("navigation")).not.toBeVisible();
  });

  test("renders all navigation links", () => {
    render(<Header />);

    const links = [
      "Get Started",
      "Dashboard",
      "Accounts",
      "Transfers",
      "Transactions",
      "Settings",
    ];
    links.forEach((link) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });
});
