
import React, { useState } from "react";
import { motion } from "framer-motion"; // For animations
import axios from "axios";
import { fetchBill, fetchBillsBYnumber } from "../../api/billsApi";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const BillSearch = ({
  setCurrentView,
  setSearchResultData,
  searchType,
  setSearchType,
  searchTerm,
  setSearchTerm,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);

  const fetchBills = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let data;

      if (searchType === "mobile") {
        data = await fetchBillsBYnumber(searchTerm);
      } else {
        data = await fetchBill(searchTerm);
      }

      console.log("API response:", data);

      if (!data || (Array.isArray(data) && data.length === 0)) {
        setError("No bills found.");
        return;
      }

      setSearchResultData(Array.isArray(data) ? data : [data]);
      setCurrentView("searchResult");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("An error occurred while fetching the bill.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={fetchBills}
        className="search-container max-w-lg mx-auto p-2 sm:p-3 w-full hidden sm:block"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
          {/* Dropdown */}
          <div className="w-full sm:w-auto">
            <label htmlFor="searchType" className="sr-only">
              Search by
            </label>
            <motion.select
              id="searchType"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full sm:w-auto py-1.5 px-2 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-gray-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <option value="bill">Bill Number</option>
              <option value="mobile">Mobile Number</option>
            </motion.select>
          </div>

          {/* Search Input and Button */}
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block w-full p-1.5 sm:p-2 text-sm text-gray-900 bg-gray-50 rounded-l-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder={`Enter ${searchType}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
            <motion.button
              type="submit"
              className="absolute top-0 right-0 p-1.5 sm:p-2 h-full text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 shadow-md hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500"
              aria-label="Search"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </form>

      {loading && <p className="text-center text-sm">Loading...</p>}
      {error && <p className="text-red-500 dark:text-red-400 text-center text-sm">{error}</p>}
    </>
  );
};

export default BillSearch;
