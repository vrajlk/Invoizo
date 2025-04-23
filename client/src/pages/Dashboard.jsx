
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Sidebar from "../components/Dashboardcomponents/Sidebar";
import Header from "../components/Dashboardcomponents/Header";
import Dashboard from "../components/Dashboardcomponents/Dashboard";
import BillCreationPanel from "../components/Dashboardcomponents/BillCreationPanel";
import LoadingSpinner from "../components/Dashboardcomponents/LoadingSpinner";
import { useToast } from "../hooks/useToast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchResultPanel from "../components/Dashboardcomponents/SearchResultPanel";

function AppContainer() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true); // Default to collapsed on mobile
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedBill, setSelectedBill] = useState(null);
  const { loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { ToastContainer } = useToast();
  const [searchResultData, setSearchResultData] = useState([]);
  const [searchType, setSearchType] = useState("mobile");
  const [searchTerm, setSearchTerm] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const Dashauth = async () => {
      try {
        const response = await axios.get("http://65.2.129.154:3000/api/admin/dashauth", {
          withCredentials: true,
        });
        setIsAuthenticated(response.data.authenticated);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      }
    };
    Dashauth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      alert("You must be logged in as an admin to visit dashboard.");
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className={`app-loading ${theme === "dark" ? "dark" : ""} flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800`}>
        <LoadingSpinner size="large" message="Loading application..." />
      </div>
    );
  }

  return (
    <div className={`app-container ${theme === "dark" ? "dark" : ""} flex h-screen text-gray-900 dark:text-gray-100 font-sans bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar collapsed={sidebarCollapsed} setCurrentView={setCurrentView} theme={theme} />
      <div className="main-content flex-1 flex flex-col" style={{ marginLeft: sidebarCollapsed ? "3.75rem" : "16rem", transition: "margin-left 0.3s" }}>
        <Header
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          toggleTheme={toggleTheme}
          theme={theme}
          setSearchResultData={setSearchResultData}
          searchType={searchType}
          setSearchType={setSearchType}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          currentView={currentView}
          setCurrentView={setCurrentView}
        />
        <div className="dashboard-content flex-1 overflow-auto p-4 sm:p-6">
          <AnimatePresence mode="wait">
            {currentView === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Dashboard
                  setCurrentView={setCurrentView}
                  setSelectedBill={setSelectedBill}
                  setSearchResultData={setSearchResultData}
                  searchType={searchType}
                  setSearchType={setSearchType}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </motion.div>
            )}
            {currentView === "searchResult" && (
              <motion.div
                key="searchResult"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SearchResultPanel
                  searchResultData={searchResultData}
                  searchType={searchType}
                  searchTerm={searchTerm}
                />
              </motion.div>
            )}
            {currentView === "createBill" && (
              <motion.div
                key="createBill"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BillCreationPanel
                  setCurrentView={setCurrentView}
                  selectedBill={selectedBill}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AppContainer;
