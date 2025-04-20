// import { useState } from "react";
import React from "react";
import axios from "axios";
import { fetchBill,fetchBillsBYnumber } from "../../api/billsApi";


const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests
});

const BillSearch = ({
  setCurrentView,
  setSearchResultData,
  searchType,
  setSearchType,
  searchTerm,
  setSearchTerm
}) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [results, setResults] = React.useState([]);

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

  
  
  // const Editbill = () => {

  // }
  // const Downloadbill = () => {

  // }
  


return(
    <>
<form onSubmit={fetchBills} className="max-w-lg mx-auto">
  <div className="flex items-center space-x-2">
    <div>
      <label htmlFor="searchType" className="sr-only">Search by</label>
      <select
        id="searchType"
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
        className="py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
      >
        <option value="bill">Bill Number</option>
        <option value="mobile">Mobile Number</option>
      </select>
    </div>

    <div className="relative w-full">
      <input
        type="search"
        id="search-dropdown"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        placeholder={`Enter ${searchType}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        required
      />
      <button
        type="submit"
        className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </div>
  </div>
</form>


{loading && <p>Loading...</p>}
{error && <p className="text-red-500">{error}</p>}

</>
)
}
export default BillSearch;