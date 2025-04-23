import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const Login = () => {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://65.2.129.154:3000/api/admin/login", {
        number,
        password,
      }, 
      { withCredentials: true });
      

      alert("Login Successful!");

      navigate("/shopselection");


      console.log(res.data);
      // Store JWT Token (Optional)
      localStorage.setItem("token", res.data.token);
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Login</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Sign up here
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6">
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

          <button type="submit" className="form-button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 