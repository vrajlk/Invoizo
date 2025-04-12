"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { formatDate, formatTime } from "../../utils/dateUtils"

function RecentBills({ bills, setCurrentView, setSelectedBill }) {
  const [hoveredBill, setHoveredBill] = useState(null)

  const handleCreateBill = (bill) => {
    setSelectedBill(bill)
    setCurrentView("createBill")
  }

  return (
    <motion.div
      className="recent-bills-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="recent-bills-header">
        <div className="recent-bills-title">
          <div>Recent Bills</div>
          <div className="recent-bills-subtitle">{bills.length} bills generated today</div>
        </div>
      </div>
      <div className="recent-bills-container">
        <table className="recent-bills-table">
          <thead>
            <tr>
              <th>Bill Name</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {bills.map((bill) => (
                <motion.tr
                  key={bill._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setHoveredBill(bill._id)}
                  onMouseLeave={() => setHoveredBill(null)}
                  className={hoveredBill === bill._id ? "hovered-row" : ""}
                >
                  <td>
                    <div className="bill-cell">
                      <div className="bill-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
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
                      </div>
                      <div className="bill-info">
                        <div className="bill-name">{bill.name}</div>
                        <div className="bill-number">#{bill.number}</div>
                      </div>
                    </div>
                  </td>
                  <td>{bill.customer}</td>
                  <td>${bill.amount.toFixed(2)}</td>
                  <td>
                    <div className="time-cell">
                      <div>{formatDate(bill.createdAt)}</div>
                      <div className="time-detail">{formatTime(bill.createdAt)}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge status-${bill.status.toLowerCase()}`}>{bill.status}</span>
                  </td>
                  <td>
                    <motion.button
                      className="create-bill-button"
                      onClick={() => handleCreateBill(bill)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
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
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                      </svg>
                      <span>Create Bill</span>
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default RecentBills
