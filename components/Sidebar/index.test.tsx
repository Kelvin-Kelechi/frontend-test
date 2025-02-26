import { render, screen } from "@testing-library/react";
import Sidebar from "../Sidebar";
import { usePathname } from "next/navigation";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Sidebar Component", () => {
  it("renders all menu items", () => {
    (usePathname as jest.Mock).mockReturnValue("/");

    render(<Sidebar />);

    const menuItems = [
      "Get Started",
      "Dashboard",
      "Accounts",
      "Transfers",
      "Transactions",
      "Settings",
    ];

    menuItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("highlights the active menu item based on the pathname", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");

    render(<Sidebar />);

    const activeLink = screen.getByText("Dashboard");

    expect(activeLink).toHaveClass("bg-[#3976E8] text-white");
  });

  it("does not highlight inactive menu items", () => {
    (usePathname as jest.Mock).mockReturnValue("/dashboard");

    render(<Sidebar />);

    const inactiveLink = screen.getByText("Accounts");

    expect(inactiveLink).not.toHaveClass("bg-[#3976E8] text-white");
  });
});
