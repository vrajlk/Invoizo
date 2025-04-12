"use client"

import { useEffect, useRef } from "react"
import { MoreVerticalIcon } from "./icons/MoreVerticalIcon"
import { ChevronUp } from "./icons/ChevronUp"
import { ChevronDown } from "./icons/ChevronDown"

function StatCard({ title, subtitle, change, isPositive, bgColor, chartData, chartType = "line" }) {
  const canvasRef = useRef(null)

  useEffect(() => {
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

    // Chart dimensions
    const chartWidth = rect.width
    const chartHeight = rect.height
    const dataPoints = chartData.length
    const maxValue = Math.max(...chartData)

    // Draw chart
    ctx.strokeStyle = "white"
    ctx.fillStyle = "white"
    ctx.lineWidth = 2

    if (chartType === "line") {
      // Draw line chart
      ctx.beginPath()

      chartData.forEach((value, index) => {
        const x = (index / (dataPoints - 1)) * chartWidth
        const y = chartHeight - (value / maxValue) * chartHeight

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()
    } else if (chartType === "bar") {
      // Draw bar chart
      const barWidth = chartWidth / dataPoints - 4

      chartData.forEach((value, index) => {
        const x = index * (barWidth + 4)
        const barHeight = (value / maxValue) * chartHeight
        const y = chartHeight - barHeight

        ctx.fillRect(x, y, barWidth, barHeight)
      })
    }
  }, [chartData, chartType])

  return (
    <div className="stat-summary-card" style={{ backgroundColor: bgColor }}>
      <div className="stat-summary-header">
        <div className="stat-summary-info">
          <div className="stat-summary-title-row">
            <div className="stat-summary-title">{title}</div>
            <div className="stat-summary-change">
              ({change}
              {isPositive ? <ChevronDown className="change-icon" /> : <ChevronUp className="change-icon" />})
            </div>
          </div>
          <div className="stat-summary-subtitle">{subtitle}</div>
        </div>
        <button className="more-button">
          <MoreVerticalIcon />
        </button>
      </div>
      <div className="stat-summary-chart">
        <canvas ref={canvasRef} className="summary-chart-canvas"></canvas>
      </div>
    </div>
  )
}

export default StatCard
