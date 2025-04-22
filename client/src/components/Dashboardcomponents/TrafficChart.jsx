
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function TrafficChart({ data }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const isDarkMode = document.documentElement.classList.contains("dark");

    ctx.clearRect(0, 0, rect.width, rect.height);

    const months = data.labels;
    const values = data.values;

    const chartHeight = rect.height - 40;
    const chartWidth = rect.width - 40;
    const barWidth = 10;
    const barSpacing = (chartWidth - barWidth * months.length) / (months.length - 1);
    const startX = 30;
    const startY = 10;

    const yLabels = [0, 25, 50, 75, 100];
    ctx.fillStyle = isDarkMode ? "#d1d5db" : "#9ca3af";
    ctx.font = "10px Arial";
    ctx.textAlign = "right";

    yLabels.forEach((label) => {
      const y = startY + chartHeight - (label / 100) * chartHeight;
      ctx.fillText(label.toString(), startX - 5, y + 3);
      ctx.beginPath();
      ctx.strokeStyle = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.05)";
      ctx.moveTo(startX, y);
      ctx.lineTo(startX + chartWidth, y);
      ctx.stroke();
    });

    values.forEach((value, index) => {
      const x = startX + index * (barWidth + barSpacing);
      const barHeight = (value / 100) * chartHeight;
      const y = startY + chartHeight - barHeight;

      ctx.fillStyle = isDarkMode ? "#60a5fa" : "#3b82f6";
      ctx.fillRect(x, y, barWidth, barHeight);

      ctx.fillStyle = isDarkMode ? "#d1d5db" : "#9ca3af";
      ctx.font = "10px Arial";
      ctx.textAlign = "center";
      ctx.fillText(months[index], x + barWidth / 2, startY + chartHeight + 15);
    });
  }, [data]);

  if (!data) return null;

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
            Traffic
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{data.period}</p>
        </div>
      </div>
      <div className="w-full h-32 sm:h-40">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </motion.div>
  );
}

export default TrafficChart;
