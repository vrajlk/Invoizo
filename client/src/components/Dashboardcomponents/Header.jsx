"use client"

import { SearchIcon } from "./icons/SearchIcon"
import { BellIcon } from "./icons/BellIcon"
import { GridIcon } from "./icons/GridIcon"
import { MailIcon } from "./icons/MailIcon"
import { MoonIcon } from "./icons/MoonIcon"
import { SunIcon } from "./icons/SunIcon"
import { MenuIcon } from "./icons/MenuIcon"
import { motion } from "framer-motion"
import { useAuth } from "../../context/AuthContext"

function Header({ onToggleSidebar, toggleTheme, theme }) {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={onToggleSidebar}>
          <MenuIcon />
        </button>
        <div className="search-container">
          <SearchIcon className="search-icon" />
          <input type="text" className="search-input" placeholder="Search..." />
        </div>
      </div>
      <div className="header-right">
        <button className="header-icon-button">
          <BellIcon />
          <span className="notification-badge">3</span>
        </button>
        <button className="header-icon-button">
          <GridIcon />
        </button>
        <button className="header-icon-button">
          <MailIcon />
        </button>
        <motion.button
          className="header-icon-button theme-toggle"
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </motion.button>
        <div className="user-avatar">
          <img src="/avatar.jpg" alt={user?.name || "User avatar"} />
        </div>
      </div>
    </header>
  )
}

export default Header
