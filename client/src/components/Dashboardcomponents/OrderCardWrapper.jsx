"use client";

import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";

const OrderCardWrapper = () => {
  const [orderData, setOrderData] = useState(null);

  const fetchOrderData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/bills", {
        credentials: "include", // if using cookies
      });

      const bills = await response.json();

      const totalOrders = bills.length;
      console.log("totalbills:",totalOrders)
      setOrderData({
        total: totalOrders,
        changePercentage: 8, // You can calculate this if needed
        activeTab: "daily",
      });
    } catch (err) {
      console.error("Failed to fetch order data:", err);
    }
  };

  useEffect(() => {
    fetchOrderData();

    const interval = setInterval(fetchOrderData, 10000); // Polling every 10s
    return () => clearInterval(interval);
  }, []);

  return <OrderCard data={orderData} />;
};

export default OrderCardWrapper;
