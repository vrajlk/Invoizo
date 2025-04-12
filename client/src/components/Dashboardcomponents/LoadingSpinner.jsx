"use client"

import { motion } from "framer-motion"

function LoadingSpinner({ size = "medium", message = "" }) {
  const spinnerSize = size === "small" ? "w-4 h-4" : size === "large" ? "w-12 h-12" : "w-8 h-8"

  return (
    <div className={`loading-spinner-container ${message ? "with-message" : ""}`}>
      <motion.div
        className={`loading-spinner ${spinnerSize}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
      {message && <p className="loading-message">{message}</p>}
    </div>
  )
}

export default LoadingSpinner
