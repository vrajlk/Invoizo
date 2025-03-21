import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/Login';
import About from './pages/About';
import ThemeToggle from './components/ThemeToggle';
import HeroSection from './pages/hero-section';
import Shopcreate from './pages/Shopcreate';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen w-full fixed inset-0 bg-white dark:bg-gray-900 transition-colors duration-300">
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/shopcreate" element={<Shopcreate />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
