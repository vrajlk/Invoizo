import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [visibleSections, setVisibleSections] = useState([]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const sections = document.querySelectorAll('.scroll-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            setVisibleSections((prev) => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-all duration-300 font-sans`}>
      {/* Header */}
      <header className="fixed top-0 w-full z-10 shadow-md">
        <div className={`flex justify-between items-center p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-blue-500'} transition-all duration-300`}>
          <h1 className="text-2xl font-bold">Invoizo</h1>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-blue-700 [transform-style:preserve-3d]"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className={`pt-24 pb-16 text-center scroll-section ${visibleSections.includes('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-600 ease-out`}
      >
        <h2 className="text-4xl font-extrabold mb-4">About Invoizo</h2>
        <p className={`text-lg max-w-xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-all duration-300`}>
          Invoizo is a modern digital billing system that simplifies invoicing, tracks payments, and offers insightful analytics via an intuitive dashboard.
        </p>
        <div className="mt-8 w-24 h-24 mx-auto bg-blue-600 rounded-full animate-pulse-custom"></div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className={`py-16 px-4 scroll-section ${visibleSections.includes('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-600 ease-out`}
      >
        <h3 className="text-3xl font-bold text-center mb-10">Why Choose Invoizo?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="p-6 rounded-lg bg-blue-600 text-white transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl [transform-style:preserve-3d]">
            <h4 className="text-lg font-semibold mb-2">Digital Invoicing</h4>
            <p>Create professional invoices in seconds with ease.</p>
          </div>
          <div className="p-6 rounded-lg bg-blue-600 text-white transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl [transform-style:preserve-3d]">
            <h4 className="text-lg font-semibold mb-2">Payment Tracking</h4>
            <p>Effortlessly monitor payments and overdue invoices.</p>
          </div>
          <div className="p-6 rounded-lg bg-blue-600 text-white transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl [transform-style:preserve-3d]">
            <h4 className="text-lg font-semibold mb-2">Analytics Dashboard</h4>
            <p>Gain insights with graphs and analytics.</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        id="mission"
        className={`py-16 px-4 scroll-section ${visibleSections.includes('mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-600 ease-out`}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-all duration-300`}>
            At Invoizo, we empower businesses with seamless, efficient tools for managing invoices and finances, saving you time to focus on growth.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 text-center">
        <Link
          to="/"
          className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white text-lg font-semibold transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-blue-700 [transform-style:preserve-3d]"
        >
          Back to Home
        </Link>
      </section>
    </div>
  );
};

export default AboutUs;