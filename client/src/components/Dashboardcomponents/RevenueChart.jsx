
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function RevenueChart({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions with device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Detect dark mode
    const isDarkMode = document.documentElement.classList.contains("dark");

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw the line chart
    ctx.beginPath();
    ctx.moveTo(0, 80);

    const dataPoints = data.chartData;
    const maxValue = Math.max(...dataPoints);
    const minValue = Math.min(...dataPoints);
    const range = maxValue - minValue;

    dataPoints.forEach((value, index) => {
      const x = (index / (dataPoints.length - 1)) * rect.width;
      const normalizedValue = ((value - minValue) / range) * 60 + 40;
      const y = 120 - normalizedValue;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    // Style the line
    ctx.strokeStyle = isDarkMode ? "#60a5fa" : "#3b82f6"; // Lighter blue in dark mode
    ctx.lineWidth = 3;
    ctx.stroke();

    // Add gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, rect.height);
    gradient.addColorStop(0, isDarkMode ? "rgba(96, 165, 250, 0.3)" : "rgba(59, 130, 246, 0.2)");
    gradient.addColorStop(1, isDarkMode ? "rgba(96, 165, 250, 0)" : "rgba(59, 130, 246, 0)");
    ctx.lineTo(rect.width, rect.height);
    ctx.lineTo(0, rect.height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Add data points
    dataPoints.forEach((value, index) => {
      const x = (index / (dataPoints.length - 1)) * rect.width;
      const normalizedValue = ((value - minValue) / range) * 60 + 40;
      const y = 120 - normalizedValue;

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = isDarkMode ? "#60a5fa" : "#3b82f6";
      ctx.fill();
      ctx.strokeStyle = isDarkMode ? "#1f2937" : "#fff"; // Darker stroke in dark mode
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }, [data]);

  if (!data) return null;

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
            Revenue
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{data.period}</p>
        </div>
        <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
          ${data.total.toLocaleString()}
        </div>
      </div>
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-3 py-1 text-sm rounded ${
            data.activeTab === "daily"
              ? "bg-blue-600 dark:bg-blue-700 text-white dark:text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
          aria-current={data.activeTab === "daily" ? "true" : "false"}
        >
          Daily
        </button>
        <button
          className={`px-3 py-1 text-sm rounded ${
            data.activeTab === "weekly"
              ? "bg-blue-600 dark:bg-blue-700 text-white dark:text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
          aria-current={data.activeTab === "weekly" ? "true" : "false"}
        >
          Weekly
        </button>
        <button
          className={`px-3 py-1 text-sm rounded ${
            data.activeTab === "monthly"
              ? "bg-blue-600 dark:bg-blue-700 text-white dark:text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
          }`}
          aria-current={data.activeTab === "monthly" ? "true" : "false"}
        >
          Monthly
        </button>
      </div>
      <div className="w-full h-32 sm:h-40">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </motion.div>
  );
}

export default RevenueChart;
