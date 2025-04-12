"use client"

import { motion } from "framer-motion"
import { CartIcon } from "./icons/CartIcon"
import { ChevronUp } from "./icons/ChevronUp"
import { ChevronDown } from "./icons/ChevronDown"

function OrderCard({ data }) {
  if (!data) return null

  return (
    <motion.div
      className="stat-card order-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <div className="stat-card-header">
        <div className="stat-card-title">Orders</div>
        <div className="stat-card-icon">
          <CartIcon />
        </div>
      </div>
      <div className="stat-card-value">{data.total}</div>
      <div className={`stat-card-change ${data.changePercentage >= 0 ? "positive" : "negative"}`}>
        <span>
          ({data.changePercentage >= 0 ? "+" : ""}
          {data.changePercentage}%
        </span>
        {data.changePercentage >= 0 ? (
          <ChevronDown className="stat-card-arrow" />
        ) : (
          <ChevronUp className="stat-card-arrow" />
        )}
        <span>)</span>
      </div>
      <div className="stat-card-tabs">
        <button className={data.activeTab === "daily" ? "active" : ""}>Daily</button>
        <button className={data.activeTab === "weekly" ? "active" : ""}>Weekly</button>
        <button className={data.activeTab === "monthly" ? "active" : ""}>Monthly</button>
      </div>
    </motion.div>
  )
}

export default OrderCard
