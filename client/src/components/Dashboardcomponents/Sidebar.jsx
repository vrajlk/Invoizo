
"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { ChevronDown } from "./icons/ChevronDown";
import { DashboardIcon } from "./icons/DashboardIcon";
import { BillIcon } from "./icons/BillIcon";
import { CustomerIcon } from "./icons/CustomerIcon";
import { ProductIcon } from "./icons/ProductIcon";
import { ReportIcon } from "./icons/ReportIcon";
import { SettingsIcon } from "./icons/SettingsIcon";
import { LogoutIcon } from "./icons/LogoutIcon";
import { useAuth } from "../../context/AuthContext";

function Sidebar({ collapsed, setCurrentView, theme }) {
  const { logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !collapsed) {
        setCurrentView("dashboard"); // Reset view on mobile collapse
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [collapsed, setCurrentView]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  const sidebarVariants = {
    open: { width: "16rem" },
    collapsed: { width: "3.75rem" },
  };

  return (
    <motion.aside
      className={`bg-gray-800 ${theme === "dark" ? "dark:bg-gray-100" : "dark:bg-gray-800"} text-white ${theme === "dark" ? "dark:text-gray-900" : "dark:text-white"} h-screen absolute top-0 left-0 z-40 shadow-lg`}
      initial={false}
      animate={collapsed ? "collapsed" : "open"}
      variants={sidebarVariants}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 dark:bg-blue-400 text-white dark:text-gray-900 flex items-center justify-center rounded-lg">
            I
          </div>
          {!collapsed && (
            <div className="ml-2">
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                INVOIZO<span className="text-blue-700 dark:text-blue-500">BILLING</span>
              </span>
              <span className="ml-1 text-xs bg-blue-600 dark:bg-blue-400 text-white dark:text-gray-900 px-1 rounded">
                PRO
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="px-4 py-2 overflow-y-auto">
        <nav className="space-y-1">
          <motion.div
            className={`flex items-center p-2 rounded-lg bg-gray-700 ${theme === "dark" ? "dark:bg-gray-300" : "dark:bg-gray-700"} text-white ${theme === "dark" ? "dark:text-gray-900" : "dark:text-white"} shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer`}
            onClick={() => handleNavigation("dashboard")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <DashboardIcon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3 text-sm">Dashboard</span>}
          </motion.div>
          {!collapsed && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-4 mb-2">BILLING</div>
          )}
          <motion.div
            className={`flex items-center p-2 rounded-lg bg-gray-700 ${theme === "dark" ? "dark:bg-gray-300" : "dark:bg-gray-700"} text-white ${theme === "dark" ? "dark:text-gray-900" : "dark:text-white"} shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer`}
            onClick={() => handleNavigation("createBill")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <BillIcon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3 text-sm">Create Bill</span>}
          </motion.div>
          <motion.div
            className={`flex items-center p-2 rounded-lg bg-gray-700 ${theme === "dark" ? "dark:bg-gray-300" : "dark:bg-gray-700"} text-white ${theme === "dark" ? "dark:text-gray-900" : "dark:text-white"} shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <CustomerIcon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3 text-sm">Customers</span>}
          </motion.div>
          <motion.div
            className={`flex items-center p-2 rounded-lg bg-gray-700 ${theme === "dark" ? "dark:bg-gray-300" : "dark:bg-gray-700"} text-white ${theme === "dark" ? "dark:text-gray-900" : "dark:text-white"} shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <ProductIcon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3 text-sm">Products</span>}
          </motion.div>
          {!collapsed && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-4 mb-2">REPORTS</div>
          )}
          <motion.div
            className={`flex items-center p-2 rounded-lg bg-gray-700 ${theme === "dark" ? "dark:bg-gray-300" : "dark:bg-gray-700"} text-white ${theme === "dark" ? "dark:text-gray-900" : "dark:text-white"} shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <ReportIcon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="ml-3 text-sm">Reports</span>
                <ChevronDown className="ml-auto w-4 h-4 hidden sm:block" />
              </>
            )}
          </motion.div>
          {!collapsed && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-4 mb-2">SETTINGS</div>
          )}
          <motion.div
            className={`flex items-center p-2 rounded-lg bg-gray-700 ${theme === "dark" ? "dark:bg-gray-300" : "dark:bg-gray-700"} text-white ${theme === "dark" ? "dark:text-gray-900" : "dark:text-white"} shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <SettingsIcon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="ml-3 text-sm">Settings</span>
                <ChevronDown className="ml-auto w-4 h-4 hidden sm:block" />
              </>
            )}
          </motion.div>
          <motion.div
            className={`flex items-center p-2 rounded-lg bg-gray-700 ${theme === "dark" ? "dark:bg-gray-300" : "dark:bg-gray-700"} text-white ${theme === "dark" ? "dark:text-gray-900" : "dark:text-white"} shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer mt-4`}
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogoutIcon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3 text-sm">Logout</span>}
          </motion.div>
        </nav>
      </div>
    </motion.aside>
  );
}

export default Sidebar;
