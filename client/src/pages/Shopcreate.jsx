import React, { useEffect, useState } from "react";
import { Store } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Shopcreate = () => {
  const [shopName, setShopName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://65.2.129.154:3000/api/admin/check-auth", {
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

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      alert("You must be logged in as an admin to create a shop.");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleShopCreate = async () => {
    try {
      const response = await axios.post(
        "http://65.2.129.154:3000/api/shop/create-shop",
        { shopname: shopName },
        { withCredentials: true } // Ensures cookies are sent
      );

      console.log("Shop created successfully:", response.data);
      alert("Shop created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating shop:", error.response?.data?.message);
      alert(error.response?.data?.message || "Failed to create shop.");
    }
  };

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // Prevents showing page before authentication check
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-sm p-6 shadow-lg border rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-center mb-4">
          <Store className="w-16 h-16 text-gray-600 dark:text-gray-300" />
        </div>
        <div className="flex flex-col items-center">
          <h5 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            Create Your Shop
          </h5>
          <input
            type="text"
            placeholder="Enter shop name"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-full mb-4 p-2 border rounded-lg focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            onClick={handleShopCreate}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Create Shop
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shopcreate;
