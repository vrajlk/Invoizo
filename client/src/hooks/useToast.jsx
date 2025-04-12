"use client"

import { useState, useEffect, useCallback } from "react"

export function useToast() {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now()

    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration }])

    return id
  }, [])

  const hideToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prevToasts) => prevToasts.slice(1))
      }, toasts[0].duration)

      return () => clearTimeout(timer)
    }
  }, [toasts])

  const ToastContainer = () => (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`} onClick={() => hideToast(toast.id)}>
          {toast.message}
        </div>
      ))}
    </div>
  )

  return { showToast, hideToast, ToastContainer }
}
