import React from "react";

const SearchResultPanel = ({ searchResultData, searchType, searchTerm }) => {
  if (!searchResultData || searchResultData.length === 0) {
    return (
      <div className="p-6 text-center text-red-500 dark:text-red-400 font-semibold animate-pulse">
        No results found for {searchType}: {searchTerm}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {searchResultData.map((bill) => (
        <div
          key={bill._id}
          className="relative border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-gray-100/50 dark:from-blue-900/30 dark:to-gray-800/30 pointer-events-none" />
          
          <div className="p-6 space-y-4 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="text-sm font-medium">
                <span className="text-blue-600 dark:text-blue-400">Bill Number:</span> {bill.billNumber}
              </p>
              <p className="text-sm font-medium">
                <span className="text-blue-600 dark:text-blue-400">Name:</span> {bill.name}
              </p>
              <p className="text-sm font-medium">
                <span className="text-blue-600 dark:text-blue-400">Customer:</span> {bill.customer}
              </p>
              <p className="text-sm font-medium">
                <span className="text-blue-600 dark:text-blue-400">Number:</span> {bill.number}
              </p>
              <p className="text-sm font-medium">
                <span className="text-blue-600 dark:text-blue-400">Amount:</span> ₹{bill.amount}
              </p>
              <p className="text-sm font-medium">
                <span className="text-blue-600 dark:text-blue-400">Status:</span>{" "}
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    bill.status === "Delivered"
                      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                      : bill.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                      : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {bill.status}
                </span>
              </p>
              <p className="text-sm font-medium">
                <span className="text-blue-600 dark:text-blue-400">Delivery Date:</span>{" "}
                {new Date(bill.deliveryDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex space-x-4 pt-4">
              <button
                className="relative px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold overflow-hidden transform transition-all duration-300 hover:scale-105 hover:bg-blue-700 dark:hover:bg-blue-500 group"
                style={{ perspective: "1000px" }}
              >
                <span className="absolute inset-0 bg-blue-700 dark:bg-blue-500 transform rotate-x-90 translate-y-full group-hover:rotate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10">Edit Bill</span>
              </button>
              <button
                className="relative px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold overflow-hidden transform transition-all duration-300 hover:scale-105 hover:bg-gray-700 dark:hover:bg-gray-500 group"
                style={{ perspective: "1000px" }}
              >
                <span className="absolute inset-0 bg-gray-700 dark:bg-gray-500 transform rotate-x-90 translate-y-full group-hover:rotate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10">Download Bill</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResultPanel;