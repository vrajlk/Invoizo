
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate, formatTime } from "../../utils/dateUtils";

function RecentBills({ setCurrentView, setSelectedBill }) {
  const [bills, setBills] = useState([]); // State to store latest 5 bills
  const [hoveredBill, setHoveredBill] = useState(null);
  const [loading, setLoading] = useState(true); // Handle loading state
  const [error, setError] = useState(null); // Handle errors

  // Function to fetch and process bills
  const fetchBills = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/bills", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for JWT authentication
      });

      console.log("Response status:", response.status);
      console.log("Content-Type:", response.headers.get("content-type"));
      const text = await response.text(); // Get raw response body
      console.log("Raw response body:", text);

      // Handle 401 Unauthorized
      if (response.status === 401) {
        setError("Authentication required. Please log in.");
        setLoading(false);
        return;
      }

      // Attempt to parse JSON
      let data;
      const contentType = response.headers.get("content-type");
      try {
        data = JSON.parse(text); // Try parsing regardless of Content-Type
      } catch (jsonError) {
        throw new Error(
          `Failed to parse JSON: ${jsonError.message}, Content-Type: ${
            contentType || "none"
          }, Body: ${text}`
        );
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${text}`);
      }

      if (!Array.isArray(data)) {
        throw new Error("Expected an array of bills");
      }

      // Sort by createdAt (descending) and take the latest 5 bills
      const latestBills = data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setBills(latestBills);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Set up polling with useEffect
  useEffect(() => {
    fetchBills(); // Initial fetch when component mounts

    const interval = setInterval(() => {
      fetchBills(); // Fetch bills every 10 seconds
    }, 10000); // Polling interval: 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleCreateBill = (bill) => {
    setSelectedBill(bill);
    setCurrentView("createBill");
  };

  // Render loading or error states
  if (loading) {
    return <div>Loading bills...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
            Recent Bills
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing latest {bills.length} bills
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-700 dark:text-gray-300">
              <th className="p-2">Bill Name</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Time</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {bills.map((bill) => (
                <motion.tr
                  key={bill._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setHoveredBill(bill._id)}
                  onMouseLeave={() => setHoveredBill(null)}
                  className={`border-t border-gray-200 dark:border-gray-700 ${
                    hoveredBill === bill._id ? "bg-gray-100 dark:bg-gray-900" : ""
                  }`}
                >
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="mr-2 text-gray-500 dark:text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </div>
                      <div>
                        <div className="text-gray-900 dark:text-gray-100">{bill.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          #{bill.number}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">{bill.customer}</td>
                  <td className="p-2 text-gray-900 dark:text-gray-100">
                    ${bill.amount.toFixed(2)}
                  </td>
                  <td className="p-2">
                    <div className="text-gray-900 dark:text-gray-100">
                      {formatDate(bill.createdAt)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {formatTime(bill.createdAt)}
                    </div>
                  </td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        bill.status.toLowerCase() === "paid"
                          ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                          : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                      }`}
                    >
                      {bill.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <motion.button
                      className="flex items-center px-3 py-1 bg-blue-600 dark:bg-blue-700 text-white rounded text-sm"
                      onClick={() => handleCreateBill(bill)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={loading}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      Create Bill
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default RecentBills;
