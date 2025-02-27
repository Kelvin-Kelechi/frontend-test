"use client";
import { useState } from "react";
import { FiBell } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { IoChevronDown, IoMenu } from "react-icons/io5";
import Image from "next/image";
import { usePathname } from "next/navigation";
import fundR from "/public/images/fundR.png";
import Link from "next/link";
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
export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="w-full bg-[#fcfcfc] h-16 flex items-center justify-between px-4 md:px-6 border-b border-gray-200 pt-1 sticky top-0 z-50">
        <div className="md:hidden">
          <IoMenu
            className="text-gray-600 cursor-pointer"
            size={24}
            onClick={() => setIsSidebarOpen(true)}
          />
        </div>

        <div className="flex-1 flex justify-center md:justify-start">
          <Image src={fundR} alt="FundR Logo" width={90} height={35} />
        </div>

        <div className="flex items-center space-x-3 md:space-x-4">
          <FiBell
            className="text-gray-600 cursor-pointer hover:text-black"
            size={18}
          />

          <div className="flex items-center space-x-1 md:space-x-2 cursor-pointer">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#0CBC8B] text-white flex items-center justify-center rounded-full font-bold text-sm md:text-base">
              GA
            </div>
            <IoChevronDown
              className="text-gray-600 hidden md:block"
              size={14}
            />
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-[19.5px] border-b ">
          <Image src={fundR} alt="FundR Logo" width={90} height={35} />
          <MdClose
            className="text-gray-600 cursor-pointer"
            size={24}
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

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
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
