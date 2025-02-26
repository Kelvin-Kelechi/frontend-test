import { fetchRevenueData } from "@/features/revenueSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Loading from "../Loader";

const RevenueChart = () => {
 const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.revenue);
  const [selectedPeriod, setSelectedPeriod] = useState("Last 7 days");
  const [isMobile, setIsMobile] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    dispatch(fetchRevenueData());
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) {
      const handleResize = () => {
        const mobileView = window.innerWidth <= 768;
        setIsMobile(mobileView);
        setFilteredData(mobileView ? data.slice(-6) : data);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [data]);

  if (loading) return <Loading />;
  return (
    <>
      {!isMobile && (
        <div className="bg-[#fcfcfc] p-6 rounded-xl border border-gray-200 w-full">
          <div className="flex justify-between items-center mb-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-500 mr-4 text-sm">Showing data for</p>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border text-[#71717A] border-gray-300 rounded-md p-2 text-sm"
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Today</option>
              </select>
            </div>
            <div className="flex space-x-4 pb-2">
              {["Today", "Last 7 days", "Last 30 days"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-md text-sm ${
                    selectedPeriod === period
                      ? "bg-[#00C6FB0F] text-black"
                      : "text-gray-500"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="mb-6 text-[#424242]">
              <p className="font-semibold">
                Revenue{" "}
                <span className="text-green-500 font-extralight">
                  +0.00% <span className="text-[#424242]"> vs Last 7 days</span>
                </span>
              </p>
              <p className="text-2xl font-bold flex items-center">
                ₦0.00{" "}
                <span className="text-gray-500 ml-2 font-extralight text-sm">
                  in total value
                </span>
              </p>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={filteredData}>
                <CartesianGrid vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fill: "#666" }} />
                <YAxis tickFormatter={(value) => `${value / 1000}K`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#424242",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                  itemStyle={{
                    color: "#FBBF24",
                  }}
                  formatter={(value) => `₦${value.toLocaleString()}`}
                />
                <Bar
                  dataKey="value"
                  fill="#FFC145"
                  radius={[4, 4, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {isMobile && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <p className="text-[#292D32] mr-4 text-md">Revenue</p>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border text-[#71717A] border-gray-300 rounded-md p-2 text-sm"
            >
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Today</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={filteredData}>
              <CartesianGrid vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fill: "#666" }} />
              <YAxis tickFormatter={(value) => `${value / 1000}K`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#424242",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px",
                }}
                itemStyle={{
                  color: "#FBBF24",
                }}
                formatter={(value) => `₦${value.toLocaleString()}`}
              />
              <Bar
                dataKey="value"
                fill="#FFC145"
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default RevenueChart;
