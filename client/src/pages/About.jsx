import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-2xl space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">About Us</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            This is where you can add information about your application.
          </p>
        </div>
        <div className="text-center">
          <Link to="/signup" className="form-button inline-block">
            Back to Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About; 