// components/dashboard-widgets/TotalRevenueCardWrapper.jsx

"use client"

import { useEffect, useState } from "react"
import TotalRevenueCard from "./TotalRevenueCard"

function TotalRevenueCardWrapper() {
  const [data, setData] = useState(null)
  const adminId = localStorage.getItem("adminId");
  console.log("Admin ID from localStorage:", adminId);
  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        
       
        const res = await fetch(`http://localhost:3000/api/total-revenue?adminId=${adminId}`) // update route if needed
        const data = await res.json()
        setData(data);
        console.log("Total Revenue data:", data);
      } catch (err) {
        console.error("Failed to fetch total revenue today:", err)
      }
    }

    if (adminId) fetchRevenue();
  }, [])

  return <TotalRevenueCard data={data} />
}

export default TotalRevenueCardWrapper
