import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/Login';
import About from './pages/About';
import ThemeToggle from './components/ThemeToggle';
import HeroSection from './pages/HeroSection';
import ShopSelection from './pages/Shopselection';
import Shopcreate from './pages/Shopcreate';
// import AuthPage from './pages/Authpage';
// import Testlogin from './pages/testlogin'
// import Lastlogin from './pages/lastlogintest'

import './App.css';

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

        </Routes>
      </div>
    </Router>
  );
};

export default App;
