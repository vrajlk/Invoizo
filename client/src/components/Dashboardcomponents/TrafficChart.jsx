"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

function TrafficChart({ data }) {
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

    // Chart data
    const months = data.labels
    const values = data.values

    // Chart dimensions
    const chartHeight = rect.height - 40 // Leave space for labels
    const chartWidth = rect.width - 40 // Leave space for y-axis
    const barWidth = 10
    const barSpacing = (chartWidth - barWidth * months.length) / (months.length - 1)
    const startX = 30
    const startY = 10

    // Draw y-axis labels and grid lines
    const yLabels = [0, 25, 50, 75, 100]
    ctx.fillStyle = "#9ca3af"
    ctx.font = "10px Arial"
    ctx.textAlign = "right"

    yLabels.forEach((label) => {
      const y = startY + chartHeight - (label / 100) * chartHeight

      // Draw label
      ctx.fillText(label.toString(), startX - 5, y + 3)

      // Draw grid line (very faint)
      ctx.beginPath()
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)"
      ctx.moveTo(startX, y)
      ctx.lineTo(startX + chartWidth, y)
      ctx.stroke()
    })

    // Draw bars
    values.forEach((value, index) => {
      const x = startX + index * (barWidth + barSpacing)
      const barHeight = (value / 100) * chartHeight
      const y = startY + chartHeight - barHeight

      // Draw bar
      ctx.fillStyle = "#3b82f6"
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw month label
      ctx.fillStyle = "#9ca3af"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.fillText(months[index], x + barWidth / 2, startY + chartHeight + 15)
    })
  }, [data])

  if (!data) return null

  return (
    <motion.div
      className="chart-card traffic-chart"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="chart-header">
        <div className="chart-title">
          <div>Traffic</div>
          <div className="chart-subtitle">{data.period}</div>
        </div>
      </div>
      <div className="chart-body">
        <canvas ref={canvasRef} className="chart-canvas"></canvas>
      </div>
    </motion.div>
  )
}

export default TrafficChart
