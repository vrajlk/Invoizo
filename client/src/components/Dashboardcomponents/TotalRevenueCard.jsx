"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MoreVerticalIcon } from "./icons/MoreVerticalIcon"
import { generatePDF } from "../../utils/pdfGenerator"
import LoadingSpinner from "./LoadingSpinner"

function TotalRevenueCard({ data }) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  if (!data) return null

  const handleGenerateReport = async () => {
    try {
      setIsGeneratingPDF(true)
      await generatePDF(data)
      setIsGeneratingPDF(false)
    } catch (error) {
      console.error("Error generating PDF:", error)
      setIsGeneratingPDF(false)
    }
  }

  return (
    <motion.div
      className="stat-summary-card total-revenue-card"
      style={{ backgroundColor: "#ef4444" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <div className="stat-summary-header">
        <div className="stat-summary-info">
          <div className="stat-summary-title-row">
            {console.log("TotalRevenueCard data:", data)
            }
            {data && data.amount !== undefined ? (
              <div className="stat-summary-title">
                ₹{Number(data.amount).toLocaleString()}
              </div>
            ) : (
              <div className="stat-summary-title">₹0</div> // fallback if no data
            )}

          </div>
          <div className="stat-summary-subtitle">Total Revenue Today</div>
        </div>
        <button className="more-button">
          <MoreVerticalIcon />
        </button>
      </div>
      <div className="stat-summary-chart">
        <div className="revenue-info">
          <div className="bill-count">
            <span>Bills Generated:</span>
            <span className="count-value">{data.billCount}</span>
          </div>
          <motion.button
            className="generate-report-button"
            onClick={handleGenerateReport}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isGeneratingPDF}
          >
            {isGeneratingPDF ? (
              <>
                <LoadingSpinner size="small" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span>Generate Report</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default TotalRevenueCard
