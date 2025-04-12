"use client"

import { useEffect, useRef } from "react"

function SaleChart() {
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

    // Draw the line chart
    ctx.beginPath()
    ctx.moveTo(0, 80)
    ctx.bezierCurveTo(
      rect.width * 0.2,
      60, // Control point 1
      rect.width * 0.4,
      40, // Control point 2
      rect.width * 0.5,
      80, // End point 1
    )
    ctx.bezierCurveTo(
      rect.width * 0.6,
      120, // Control point 3
      rect.width * 0.8,
      100, // Control point 4
      rect.width,
      80, // End point 2
    )

    // Style the line
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 3
    ctx.stroke()
  }, [])

  return (
    <div className="chart-card sale-chart">
      <div className="chart-header">
        <div className="chart-title">
          <div>Sale</div>
          <div className="chart-subtitle">January - July 2023</div>
        </div>
        <div className="chart-value">$613.200</div>
      </div>
      <div className="chart-body">
        <canvas ref={canvasRef} className="chart-canvas"></canvas>
      </div>
    </div>
  )
}

export default SaleChart
