
"use client";

import { SearchIcon } from "./icons/SearchIcon";
import { BellIcon } from "./icons/BellIcon";
import { GridIcon } from "./icons/GridIcon";
import { MailIcon } from "./icons/MailIcon";
import { MoonIcon } from "./icons/MoonIcon";
import { SunIcon } from "./icons/SunIcon";
import { MenuIcon } from "./icons/MenuIcon";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import BillSearch from "./BillSearch";

function Header({
  onToggleSidebar,
  toggleTheme,
  theme,
  setCurrentView,
  setSearchResultData,
  searchType,
  setSearchType,
  searchTerm,
  setSearchTerm,
}) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className={`bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-2 flex justify-between items-center z-30 shadow-lg h-12 sm:h-14`}>
      <div className="header-left flex items-center">
        <motion.button
          className="menu-button p-1 sm:p-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-2xl transition-all duration-300 focus:outline-none"
          onClick={onToggleSidebar}
          whileHover={{ scale: 1.1, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          <MenuIcon />
        </motion.button>
        <div className="search-container ml-2">
          <BillSearch
            setCurrentView={setCurrentView}
            setSearchResultData={setSearchResultData}
            searchType={searchType}
            setSearchType={setSearchType}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </div>
      <div className="header-right flex items-center space-x-1 sm:space-x-2">
        <motion.button
          className="header-icon-button p-1 sm:p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 focus:outline-none"
          whileHover={{ scale: 1.1, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          <BellIcon />
          <span className="notification-badge absolute -top-1 -right-1 bg-red-500 dark:bg-red-400 text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </motion.button>
        <motion.button
          className="header-icon-button p-1 sm:p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 focus:outline-none"
          whileHover={{ scale: 1.1, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          <GridIcon />
        </motion.button>
        <motion.button
          className="header-icon-button p-1 sm:p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 focus:outline-none"
          whileHover={{ scale: 1.1, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          <MailIcon />
        </motion.button>
        <motion.button
          className="header-icon-button p-1 sm:p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 focus:outline-none"
          onClick={toggleTheme}
          whileHover={{ scale: 1.1, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </motion.button>
        <motion.div
          className="user-avatar w-6 h-6 sm:w-8 sm:h-8 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300"
          whileHover={{ scale: 1.1, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/avatar.jpg" alt={user?.name || "User avatar"} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </header>
  );
}

export default Header;
