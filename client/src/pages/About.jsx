import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Scene, PerspectiveCamera, WebGLRenderer, TorusKnotGeometry, MeshBasicMaterial, Mesh } from 'three';

const AboutUs = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [visibleSections, setVisibleSections] = useState([]);

  // Toggle between dark and light mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Scroll animation observer
  useEffect(() => {
    const sections = document.querySelectorAll('[data-scroll-section]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Three.js animation for 3D effect
  useEffect(() => {
    const canvas = document.getElementById('threeCanvas');
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    const renderer = new WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(300, 300);

    const geometry = new TorusKnotGeometry(10, 3, 100, 16);
    const material = new MeshBasicMaterial({ color: 0x2563eb, wireframe: true });
    const torusKnot = new Mesh(geometry, material);
    scene.add(torusKnot);

    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      torusKnot.rotation.x += 0.01;
      torusKnot.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    return () => renderer.dispose();
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-all duration-300 font-sans`}>
      {/* Header */}
      <header className="fixed top-0 w-full z-10 shadow-lg">
        <div className={`flex justify-between items-center p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-blue-500'} transition-all duration-300`}>
          <h1 className="text-2xl font-bold">Invoizo</h1>
          <button
            onClick={toggleTheme}
            className="relative px-4 py-2 rounded-lg bg-blue-600 text-white transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-blue-700 [transform-style:preserve-3d]"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div
        id="hero"
        data-scroll-section
        className={`pt-24 pb-16 text-center ${visibleSections.includes('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} transition-all duration-700 ease-out`}
      >
        <h2 className="text-5xl font-extrabold mb-4">About Invoizo</h2>
        <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-all duration-300`}>
          Invoizo is a cutting-edge digital billing system designed to simplify invoicing, track payments, and provide insightful analytics through an intuitive dashboard.
        </p>
        <canvas id="threeCanvas" className="mt-8 mx-auto" width="300" height="300"></canvas>
      </div>

      {/* Features Section */}
      <div
        id="features"
        data-scroll-section
        className={`py-16 px-4 ${visibleSections.includes('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} transition-all duration-700 ease-out`}
      >
        <h3 className="text-3xl font-bold text-center mb-12">Why Choose Invoizo?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="relative p-6 rounded-lg bg-blue-600 text-white transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl [transform-style:preserve-3d]">
            <h4 className="text-xl font-semibold mb-2">Digital Invoicing</h4>
            <p>Create and send professional invoices in seconds with our user-friendly interface.</p>
          </div>
          <div className="relative p-6 rounded-lg bg-blue-600 text-white transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl [transform-style:preserve-3d]">
            <h4 className="text-xl font-semibold mb-2">Payment Tracking</h4>
            <p>Keep track of all your payments and overdue invoices effortlessly.</p>
          </div>
          <div className="relative p-6 rounded-lg bg-blue-600 text-white transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl [transform-style:preserve-3d]">
            <h4 className="text-xl font-semibold mb-2">Analytics Dashboard</h4>
            <p>Gain insights with graphs and analytics to make informed business decisions.</p>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div
        id="mission"
        data-scroll-section
        className={`py-16 px-4 ${visibleSections.includes('mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} transition-all duration-700 ease-out`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} transition-all duration-300`}>
            At Invoizo, we aim to empower businesses by providing a seamless, efficient, and modern solution for managing invoices and finances. Our goal is to save you time so you can focus on growing your business.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 text-center">
        <Link to="/">
          <button className="relative inline-block px-8 py-4 rounded-lg bg-blue-600 text-white text-lg font-semibold transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-blue-700 [transform-style:preserve-3d]">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;