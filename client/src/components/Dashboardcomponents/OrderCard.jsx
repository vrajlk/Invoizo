
"use client";

import { motion } from "framer-motion";
import { CartIcon } from "./icons/CartIcon";
import { ChevronUp } from "./icons/ChevronUp";
import { ChevronDown } from "./icons/ChevronDown";

function OrderCard({ data }) {
  if (!data) return null;

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
          Orders
        </h3>
        <div className="text-gray-500 dark:text-gray-400">
          <CartIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
      </div>
      <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {data.total}
      </div>
      <div
        className={`flex items-center text-sm sm:text-base ${
          data.changePercentage >= 0
            ? "text-green-500 dark:text-green-400"
            : "text-red-500 dark:text-red-400"
        }`}
      >
        <span>
          ({data.changePercentage >= 0 ? "+" : ""}
          {data.changePercentage}%)
        </span>
        {data.changePercentage >= 0 ? (
          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
        ) : (
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
        )}
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          className={`px-3 py-1 text-sm rounded ${
            data.activeTab === "daily"
              ? "bg-blue-600 dark:bg-blue-700 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
          aria-current={data.activeTab === "daily" ? "true" : "false"}
        >
          Daily
        </button>
        <button
          className={`px-3 py-1 text-sm rounded ${
            data.activeTab === "weekly"
              ? "bg-blue-600 dark:bg-blue-700 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
          aria-current={data.activeTab === "weekly" ? "true" : "false"}
        >
          Weekly
        </button>
        <button
          className={`px-3 py-1 text-sm rounded ${
            data.activeTab === "monthly"
              ? "bg-blue-600 dark:bg-blue-700 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
          aria-current={data.activeTab === "monthly" ? "true" : "false"}
        >
          Monthly
        </button>
      </div>
    </motion.div>
  );
}

export default OrderCard;
