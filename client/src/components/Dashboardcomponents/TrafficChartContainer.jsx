import { useEffect, useState } from "react";
import axios from "axios";

const TrafficChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/traffic-data"); // your route
        const { labels, values } = res.data;

        const scaledData = labels.map((label, i) => ({
          label,
          value: Math.round(values[i]), // scale for display
        }));

        setChartData(scaledData);
      } catch (err) {
        console.error("Chart fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow w-full">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Monthly Revenue</h2>

      <div className="flex items-end space-x-4 h-48">
        {chartData.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-6 bg-blue-600 dark:bg-blue-400 rounded-t"
              style={{ height: `${item.value}px` }}
              title={`₹${item.value * 1000}`}
            />
            <span className="mt-2 text-sm text-gray-600 dark:text-gray-300">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficChart;

// http://localhost:3000/api/traffic-data
