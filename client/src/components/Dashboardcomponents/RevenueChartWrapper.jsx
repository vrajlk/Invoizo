"use client";

import { useEffect, useState } from "react";
import RevenueChart from "./RevenueChart";

const RevenueChartWrapper = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/revenue-data"); // 🔁 Change this to your actual route
        const data = await res.json();
        setChartData(data);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {chartData && <RevenueChart data={chartData} />}
    </div>
  );
};

export default RevenueChartWrapper;
