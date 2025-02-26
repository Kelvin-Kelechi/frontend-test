"use client";

import { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { VscCloudDownload } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchTransactions } from "@/features/transactionsSlice";
import Loading from "@/components/Loader";
interface Transaction {
  id: string;
  amount: string;
  type: string;
  date: string;
  time: string;
  status: string;
}
export default function TransactionsTable() {
  // const [dateRange, setDateRange] = useState("June 6, 2023 - Jun 15, 2025");
  const dispatch = useDispatch<AppDispatch>();
  const { data: transactions = [], loading } = useSelector(
    (state: RootState) => state.transactions || { data: [] }
  ) as { data: Transaction[]; loading: boolean };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    dispatch(fetchTransactions());

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1080);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <>
      {!isMobile ? (
        <div className="p-6 min-h-screen  flex flex-col  ">
          <div className="flex w-full border-b border-gray-200   justify-between items-center pb-2 mb-10">
            <select className="text-gray-700 bg-[#fcfcfc]   px-4 py-2  ">
              <option>All Accounts</option>
            </select>
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-[#71717A] space-x-2">
                Select Date Range:
                <div className="relative border ml-3 rounded-md px-4 py-2 text-[#71717A] bg-white flex items-center space-x-2">
                  <FaCalendarAlt />
                  <span>June 6, 2025 - June 15, 2025</span>
                </div>
              </div>
              <button className="flex items-center border rounded-md px-4 py-2 bg-white text-gray-700">
                <VscCloudDownload size={25} className="mr-2" /> Export
              </button>
            </div>
          </div>

          <table className="w-full   ">
            <thead>
              <tr className="  text-[#84919A] text-left text-sm">
                <th className="p-3">
                  <input type="checkbox" />
                </th>
                <th className="p-3">AMOUNT</th>
                <th className="p-3">TRANSACTION ID</th>
                <th className="p-3">TRANSACTION TYPE</th>
                <th className="p-3">DATE</th>
                <th className="p-3">TIME</th>
                <th className="p-3">STATUS</th>
              </tr>
            </thead>
            <tbody className="  border bg-white rounded-lg shadow">
              {loading ? (
                <p className="text-black">Loading</p>
              ) : (
                transactions.map((txn, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3">
                      <input type="checkbox" />
                    </td>
                    <td className="p-3  text-[#000505] font-medium">
                      {txn.amount}
                    </td>
                    <td className="p-3 text-[#535379]">{txn.id}</td>
                    <td className="p-3 text-[#535379]">{txn.type}</td>
                    <td className="p-3 text-[#535379]">{txn.date}</td>
                    <td className="p-3 text-[#535379]">{txn.time}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 text-center py-0.5 rounded-full text-sm flex items-center gap-1 ${
                          txn.status === "Processed"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            txn.status === "Processed"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></span>
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">
              Showing 6 of 20 results
            </span>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border rounded-md bg-white text-gray-600">
                <IoIosArrowBack />
              </button>
              <button className="px-3 py-1 border rounded-md bg-blue-500 text-white">
                1
              </button>
              <button className="px-3 py-1 border rounded-md bg-white text-gray-600">
                2
              </button>
              <span className="px-3 py-1">...</span>
              <button className="px-3 py-1 border rounded-md bg-white text-gray-600">
                9
              </button>
              <button className="px-3 py-1 border rounded-md bg-white text-gray-600">
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-white px-4 py-6 md:px-6">
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center text-[#2E2E2E] space-x-2 text-sm font-medium    py-2 ">
              <span>All Accounts</span>
              <IoChevronDown size={16} />
            </div>

            <button className="flex items-center text-[#71717A] space-x-2  border px-3 py-2 rounded-md text-sm">
              <VscCloudDownload size={16} />
              <span>Export</span>
            </button>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">
              Select Date Range:
            </label>
            <button className="w-full text-[#71717A] flex items-center justify-between mt-1 border px-3 py-2 rounded-md text-sm">
              June 6, 2023 - Jun 15, 2025
              <IoChevronDown size={16} />
            </button>
          </div>

          <h2 className="mt-6 text-[#111827] text-lg font-semibold">
            Transactions
          </h2>
          <div className="mt-4 space-y-4 h-[500px] overflow-y-auto   rounded-lg  ">
            {loading ? (
              <Loading />
            ) : (
              transactions.map((txn, index) => (
                <div
                  key={index}
                  className="border text-[#252C32] rounded-lg px-4 shadow-sm"
                >
                  <p className="text-sm   py-2  flex border-b justify-between font-medium">
                    <span> AMOUNT:</span>{" "}
                    <span className="font-normal">{txn.amount}</span>
                  </p>
                  <p className="text-sm  py-2 flex border-b justify-between font-medium mt-1">
                    <span> TRANSACTION TYPE:</span>
                    <span className="font-normal">{txn.type}</span>
                  </p>
                  <p className="text-sm  py-2 flex border-b justify-between font-medium mt-1">
                    <span> DATE:</span>{" "}
                    <span className="font-normal">{txn.date}</span>
                  </p>
                  <p className="text-sm    py-2  justify-between font-medium mt-1 flex items-center">
                    <span> STATUS: </span>
                    <span
                      className={`ml-2 text-xs font-medium   px-2 py-1 rounded-md ${
                        txn.status === "Processed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}
