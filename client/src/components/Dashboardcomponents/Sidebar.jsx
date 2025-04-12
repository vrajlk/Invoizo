"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "./icons/ChevronDown"
import { DashboardIcon } from "./icons/DashboardIcon"
import { BillIcon } from "./icons/BillIcon"
import { CustomerIcon } from "./icons/CustomerIcon"
import { ProductIcon } from "./icons/ProductIcon"
import { ReportIcon } from "./icons/ReportIcon"
import { SettingsIcon } from "./icons/SettingsIcon"
import { LogoutIcon } from "./icons/LogoutIcon"
import { useAuth } from "../../context/AuthContext"

function Sidebar({ collapsed, setCurrentView }) {
  const { logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const handleNavigation = (view) => {
    setCurrentView(view)
  }

  return (
    <motion.aside
      className={`sidebar ${collapsed ? "collapsed" : ""}`}
      initial={false}
      animate={{ width: collapsed ? "60px" : "250px" }}
      transition={{ duration: 0.3 }}
    >
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo">I</div>
          {!collapsed && (
            <div className="logo-text">
              INVOIZO<span className="logo-highlight">BILLING</span>
              <span className="logo-badge">PRO</span>
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <div className="nav-item active" onClick={() => handleNavigation("dashboard")}>
            <DashboardIcon />
            {!collapsed && (
              <>
                <span className="nav-text">Dashboard</span>
              </>
            )}
          </div>

          {!collapsed && <div className="nav-section">BILLING</div>}

          <div className="nav-item" onClick={() => handleNavigation("createBill")}>
            <BillIcon />
            {!collapsed && <span className="nav-text">Create Bill</span>}
          </div>

          <div className="nav-item">
            <CustomerIcon />
            {!collapsed && <span className="nav-text">Customers</span>}
          </div>

          <div className="nav-item">
            <ProductIcon />
            {!collapsed && <span className="nav-text">Products</span>}
          </div>

          {!collapsed && <div className="nav-section">REPORTS</div>}

          <div className="nav-item">
            <ReportIcon />
            {!collapsed && (
              <>
                <span className="nav-text">Reports</span>
                <ChevronDown className="nav-chevron" />
              </>
            )}
          </div>

          {!collapsed && <div className="nav-section">SETTINGS</div>}

          <div className="nav-item">
            <SettingsIcon />
            {!collapsed && (
              <>
                <span className="nav-text">Settings</span>
                <ChevronDown className="nav-chevron" />
              </>
            )}
          </div>

          <div className="nav-item logout-item" onClick={handleLogout}>
            <LogoutIcon />
            {!collapsed && <span className="nav-text">Logout</span>}
          </div>
        </nav>
      </div>
    </motion.aside>
  )
}

export default Sidebar
