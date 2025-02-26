"use client";

import AccountCard from "../../components/AccountCard";
import RevenueChart from "../../components/RevenueChart";

export default function Dashboard() {
  return (
    <div className="min-h-screen  flex flex-col p-6">
      <div className="w-full border-b border-gray-200  ">
        <h2 className="text-sm font-semibold text-black">Online Payments</h2>
        <div className="w-[125px] h-0.5 bg-blue-500 mt-1"></div>
      </div>

      <AccountCard bankName="STERLING BANK" accountNumber="8000000000" />
      <div className="mt-10">
        <RevenueChart />
      </div>
    </div>
  );
}
