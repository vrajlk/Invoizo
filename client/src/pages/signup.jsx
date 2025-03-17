import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/admin/signup", {
        username,
        number,
        password,
      });

      alert("Signup Successful!");
      console.log(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Login here
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div>
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-input"
              placeholder="Enter your username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="number" className="form-label">Phone Number</label>
            <input
              type="tel"
              id="number"
              name="number"
              className="form-input"
              placeholder="Enter your phone number"
              required
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              I agree to the{' '}
              <a href="#" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Terms and Conditions
              </a>
            </label>
          </div>

          <button type="submit" className="form-button" onClick={handleSignup}>
            Sign Up
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/about" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Learn more about us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
