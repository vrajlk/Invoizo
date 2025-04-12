import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/Login';
import About from './pages/About';
import ThemeToggle from './components/ThemeToggle';
import HeroSection from './pages/HeroSection';
import ShopSelection from './pages/Shopselection';
import Shopcreate from './pages/Shopcreate';
import Sidebar from "./components/Dashboardcomponents/Sidebar"
import Header from "./components/Dashboardcomponents/Header"
import Dashboard from "./components/Dashboardcomponents/Dashboard"
import BillCreationPanel from "./components/Dashboardcomponents/BillCreationPanel"
import AppContainer from './pages/Dashboard';



import './App.css';

function AppContent() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentView, setCurrentView] = useState("dashboard")
  const [selectedBill, setSelectedBill] = useState(null)
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading-screen">
        <motion.div
          className="loader"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <p>Loading Invoizo...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <div className="app-container">
      <Sidebar collapsed={sidebarCollapsed} setCurrentView={setCurrentView} />
      <div className="main-content">
        <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} currentView={currentView} />
        <AnimatePresence mode="wait">
          {currentView === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="dashboard-content"
            >
              <Dashboard setCurrentView={setCurrentView} setSelectedBill={setSelectedBill} />
            </motion.div>
          )}
          {currentView === "createBill" && (
            <motion.div
              key="createBill"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="dashboard-content"
            >
              <BillCreationPanel setCurrentView={setCurrentView} selectedBill={selectedBill} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

const App = () => {
  
  return (
    <Router>
      <div className="min-h-screen w-full inset-0 bg-white dark:bg-gray-900 transition-colors duration-300">
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />

          <Route path="/shopcreate" element={<Shopcreate />} />
          <Route path="/shopselection" element={<ShopSelection />} />
          <Route path="/dashboard" element={<AppContainer />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
