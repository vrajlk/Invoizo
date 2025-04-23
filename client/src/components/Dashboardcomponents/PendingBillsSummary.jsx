import { useEffect, useState } from "react";
import PendingBillsCard from "./PendingBillsCard";

function PendingBillsSummary() {
  const [pendingBillsData, setPendingBillsData] = useState(null);

  useEffect(() => {
    const fetchPendingBillsSummary = async () => {
      try {
        const response = await fetch("http://65.2.129.154:3000/api/pending-bills");
        const data = await response.json();
        setPendingBillsData(data);
      } catch (error) {
        console.error("Error fetching pending bills summary:", error);
      }
    };

    fetchPendingBillsSummary();
  }, []);

  if (!pendingBillsData) {
    return <div>Loading...</div>;
  }

  return <PendingBillsCard data={pendingBillsData} />;
}

export default PendingBillsSummary;
