"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

function RevenueChart({ data }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!data) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set canvas dimensions with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw the line chart
    ctx.beginPath()
    ctx.moveTo(0, 80)

    // Use actual data points
    const dataPoints = data.chartData
    const maxValue = Math.max(...dataPoints)
    const minValue = Math.min(...dataPoints)
    const range = maxValue - minValue

    dataPoints.forEach((value, index) => {
      const x = (index / (dataPoints.length - 1)) * rect.width
      // Normalize the value to fit in our chart height
      const normalizedValue = ((value - minValue) / range) * 60 + 40
      const y = 120 - normalizedValue

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    // Style the line
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 3
    ctx.stroke()

    // Add gradient fill under the line
    const gradient = ctx.createLinearGradient(0, 0, 0, rect.height)
    gradient.addColorStop(0, "rgba(59, 130, 246, 0.2)")
    gradient.addColorStop(1, "rgba(59, 130, 246, 0)")

    ctx.lineTo(rect.width, rect.height)
    ctx.lineTo(0, rect.height)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Add data points
    dataPoints.forEach((value, index) => {
      const x = (index / (dataPoints.length - 1)) * rect.width
      const normalizedValue = ((value - minValue) / range) * 60 + 40
      const y = 120 - normalizedValue

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = "#3b82f6"
      ctx.fill()
      ctx.strokeStyle = "#fff"
      ctx.lineWidth = 2
      ctx.stroke()
    })
  }, [data])

  if (!data) return null

  return (
    <motion.div
      className="chart-card revenue-chart"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="chart-header">
        <div className="chart-title">
          <div>Revenue</div>
          <div className="chart-subtitle">{data.period}</div>
        </div>
        <div className="chart-value">${data.total.toLocaleString()}</div>
      </div>
      <div className="chart-tabs">
        <button className={data.activeTab === "daily" ? "active" : ""}>Daily</button>
        <button className={data.activeTab === "weekly" ? "active" : ""}>Weekly</button>
        <button className={data.activeTab === "monthly" ? "active" : ""}>Monthly</button>
      </div>
      <div className="chart-body">
        <canvas ref={canvasRef} className="chart-canvas"></canvas>
      </div>
    </motion.div>
  )
}

export default RevenueChart
