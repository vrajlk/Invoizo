
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import RevenueChart from "./RevenueChart";
import TrafficChart from "./TrafficChart";
import CustomerCard from "./CustomerCard";
import OrderCard from "./OrderCard";
import RecentBills from "./RecentBills";
import PendingBillsCard from "./PendingBillsCard";
import TotalRevenueCard from "./TotalRevenueCard";
import { fetchDashboardData } from "../../api/dashboardApi";
import { fetchBill, fetchBillsBYnumber } from "../../api/billsApi";
import LoadingSpinner from "./LoadingSpinner";
import TrafficChartContainer from "./TrafficChartContainer";
import CustomerCardWrapper from "./CustomerCardWrapper";
import OrderCardWrapper from "./OrderCardWrapper";
import RevenueChartWrapper from "./RevenueChartWrapper";
import PendingBillsSummary from "./PendingBillsSummary";
import TotalRevenueCardWrapper from "./TotalRevenueCardWrapper";

function Dashboard({
  setCurrentView,
  setSelectedBill,
  setSearchResultData,
  searchType,
  setSearchType,
  searchTerm,
  setSearchTerm,
}) {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const data = await fetchDashboardData();
        setDashboardData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError("Failed to load dashboard data. Please try again.");
        setLoading(false);
      }
    };
    loadDashboardData();
  }, []);

  const fetchBills = async (e) => {
    e.preventDefault();
    setSearchLoading(true);
    setSearchError("");
    try {
      let data;
      if (searchType === "mobile") {
        data = await fetchBillsBYnumber(searchTerm);
      } else {
        data = await fetchBill(searchTerm);
      }
      if (!data || (Array.isArray(data) && data.length === 0)) {
        setSearchError("No bills found.");
        return;
      }
      setSearchResultData(Array.isArray(data) ? data : [data]);
      setCurrentView("searchResult");
    } catch (err) {
      console.error("Fetch error:", err);
      setSearchError("An error occurred while fetching the bill.");
    } finally {
      setSearchLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading dashboard data..." />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-100 dark:bg-gray-800">
        <p className="text-red-600 dark:text-red-400 mb-2 text-lg font-semibold">{error}</p>
        <motion.button
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 focus:outline-none"
          onClick={() => window.location.reload()}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          Retry
        </motion.button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      {/* Mobile Search Bar */}
      <div className="sm:hidden mb-4">
        <form onSubmit={fetchBills} className="flex items-center space-x-2 max-w-sm mx-auto">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="p-2 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 w-24"
          >
            <option value="bill">Bill Number</option>
            <option value="mobile">Mobile Number</option>
          </select>
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Enter ${searchType}...`}
            className="flex-1 p-2 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 max-w-[8rem]"
          />
        </form>
        {searchLoading && <p className="text-center text-sm font-medium mt-2">Loading...</p>}
        {searchError && <p className="text-red-600 dark:text-red-400 text-center text-sm font-medium mt-2">{searchError}</p>}
      </div>

      {/* Desktop Search Handled by Header */}
      {searchLoading && <p className="text-center text-sm font-medium hidden sm:block">Loading...</p>}
      {searchError && <p className="text-red-600 dark:text-red-400 text-center text-sm font-medium hidden sm:block">{searchError}</p>}

      <div className="grid grid-cols-1 xl:grid-cols-[3fr_1fr] gap-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <RevenueChartWrapper/>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <TrafficChartContainer/>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <CustomerCardWrapper/>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <OrderCardWrapper/>
            </motion.div>
          </div>
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <RecentBills
              bills={dashboardData.recentBills}
              setCurrentView={setCurrentView}
              setSelectedBill={setSelectedBill}
            />
          </motion.div>
        </div>
        <div className="flex flex-col gap-20">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 h-32"
            whileHover={{ scale: 1.02 }}
          >
            <PendingBillsSummary/>
          </motion.div>
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 h-32"
            whileHover={{ scale: 1.02 }}
          >
            <TotalRevenueCardWrapper/>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;