import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import Sidebar from "../components/Dashboardcomponents/Sidebar"
import Header from "../components/Dashboardcomponents/Header"
import Dashboard from "../components/Dashboardcomponents/Dashboard"
import BillCreationPanel from "../components/Dashboardcomponents/BillCreationPanel"
import LoadingSpinner from "../components/Dashboardcomponents/LoadingSpinner"
import { useToast } from "../hooks/useToast"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchResultPanel from "../components/Dashboardcomponents/SearchResultPanel"


function AppContainer() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentView, setCurrentView] = useState("dashboard")
  const [selectedBill, setSelectedBill] = useState(null)
  const { loading } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { ToastContainer } = useToast()
  const [searchResultData, setSearchResultData] = useState([]);
  const [searchType, setSearchType] = useState("mobile");
  const [searchTerm, setSearchTerm] = useState("");

  // Reset to dashboard when logging in
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const Dashauth = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/dashauth", {
          withCredentials: true,
        });

        if (response.data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
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
      <div className="app-loading">
        <LoadingSpinner size="large" message="Loading application..." />
      </div>
    )
  }
  

  return (
    <div className={`app-container ${theme}`}>
      <Sidebar collapsed={sidebarCollapsed} setCurrentView={setCurrentView} />
      <div className="main-content">
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
        <div className="dashboard-content">
          <AnimatePresence mode="wait">
            {currentView === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Dashboard setCurrentView={setCurrentView} setSelectedBill={setSelectedBill} />
              </motion.div>
            )}
                      {currentView === "searchResult" && (
            <motion.div
              key="searchResult"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="dashboard-content"
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
                <BillCreationPanel setCurrentView={setCurrentView} selectedBill={selectedBill} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AppContainer
