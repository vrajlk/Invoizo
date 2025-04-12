"use client"

import { useState, useEffect } from "react"
import RevenueChart from "./RevenueChart"
import TrafficChart from "./TrafficChart"
import CustomerCard from "./CustomerCard"
import OrderCard from "./OrderCard"
import RecentBills from "./RecentBills"
import PendingBillsCard from "./PendingBillsCard"
import TotalRevenueCard from "./TotalRevenueCard"
import { fetchDashboardData } from "../../api/dashboardApi"
import LoadingSpinner from "./LoadingSpinner"

function Dashboard({ setCurrentView, setSelectedBill }) {
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true)
        const data = await fetchDashboardData()
        setDashboardData(data)
        setLoading(false)
      } catch (err) {
        console.error("Error loading dashboard data:", err)
        setError("Failed to load dashboard data. Please try again.")
        setLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  if (loading) {
    return <LoadingSpinner message="Loading dashboard data..." />
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="retry-button" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="dashboard-grid">
      <div className="charts-container">
        <div className="charts-row">
          <RevenueChart data={dashboardData.revenue} />
          <TrafficChart data={dashboardData.traffic} />
        </div>
        <div className="stats-row">
          <CustomerCard data={dashboardData.customers} />
          <OrderCard data={dashboardData.orders} />
        </div>
        <RecentBills
          bills={dashboardData.recentBills}
          setCurrentView={setCurrentView}
          setSelectedBill={setSelectedBill}
        />
      </div>
      <div className="stat-cards-container">
        <PendingBillsCard data={dashboardData.pendingBills} />
        <TotalRevenueCard data={dashboardData.todayRevenue} />
      </div>
    </div>
  )
}

export default Dashboard
