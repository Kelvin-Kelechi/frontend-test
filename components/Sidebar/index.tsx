"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { CiGlobe } from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoWalletOutline } from "react-icons/io5";
import { LuRepeat } from "react-icons/lu";
import { BsFileText } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
const menuItems = [
  { name: "Get Started", icon: <CiGlobe size={20} />, href: "/" },
  {
    name: "Dashboard",
    icon: <LuLayoutDashboard size={20} />,
    href: "/dashboard",
  },
  { name: "Accounts", icon: <IoWalletOutline size={20} />, href: "/accounts" },
  { name: "Transfers", icon: <LuRepeat size={20} />, href: "/transfers" },
  {
    name: "Transactions",
    icon: <BsFileText size={20} />,
    href: "/transactions",
  },
  {
    name: "Settings",
    icon: <IoSettingsOutline size={20} />,
    href: "/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[263px] h-screen bg-white border-r border-gray-200">
      <nav className="flex flex-col mt-6 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-6 py-3 text-sm font-medium ${
              pathname === item.href
                ? "bg-[#3976E8] text-white"
                : "text-gray-900 hover:bg-gray-100"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
