"use client"

import { motion } from "framer-motion"
import { MoreVerticalIcon } from "./icons/MoreVerticalIcon"
import { ChevronUp } from "./icons/ChevronUp"
import { ChevronDown } from "./icons/ChevronDown"

function PendingBillsCard({ data }) {
  if (!data) return null

  return (
    <motion.div
      className="stat-summary-card pending-bills-card"
      style={{ backgroundColor: "#eab308" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <div className="stat-summary-header">
        <div className="stat-summary-info">
          <div className="stat-summary-title-row">
            <div className="stat-summary-title">{data.count}</div>
            <div className="stat-summary-change">
              ({data.changePercentage >= 0 ? "+" : ""}
              {data.changePercentage}%
              {data.changePercentage >= 0 ? (
                <ChevronDown className="change-icon" />
              ) : (
                <ChevronUp className="change-icon" />
              )}
              )
            </div>
          </div>
          <div className="stat-summary-subtitle">Pending Bills</div>
        </div>
        <button className="more-button">
          <MoreVerticalIcon />
        </button>
      </div>
      <div className="stat-summary-chart">
        <div className="pending-bills-info">
          <div className="pending-amount">
            <span>Total Amount:</span>
            <span className="amount-value">${data.totalAmount.toLocaleString()}</span>
          </div>
          <motion.button className="view-details-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default PendingBillsCard
