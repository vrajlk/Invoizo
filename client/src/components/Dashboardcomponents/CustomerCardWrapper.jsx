

import { useEffect, useState } from "react";
import CustomerCard from "./CustomerCard";

export default function CustomerCardWrapper() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("daily");

  const fetchData = async () => {
    try {
        const res = await fetch(`http://65.2.129.154:3000/api/unique-customers?period=${activeTab},{ cache: "no-store" }`);
        const result = await res.json();
      setData({ ...result, activeTab });
    } catch (err) {
      console.error("Failed to fetch customer data:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [activeTab]);

  if (!data) return <div>Loading...</div>;

  return <CustomerCard data={data} />;
}
