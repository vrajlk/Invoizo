const express = require("express");
const Shop = require("../models/Shop.create.model");
const Admin = require("../models/Admin.model"); // Import Admin model




// Route: Create a new shop
const createShop = async (req, res) => {
  try {
    const { shopname } = req.body;
    const adminId = req.user.adminId; // Extract adminId from authenticated user

    if (!shopname) {
      return res.status(400).json({ message: "Shop name is required" });
    }

    // Ensure the admin exists
    const admin = await Admin.findOne({ adminId });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Create new shop entry
    const newShop = new Shop({ adminId, shopname });
    await newShop.save();

    res.status(201).json({ message: "Shop created successfully", shop: newShop });
  } catch (error) {
    console.error("Error creating shop:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createShop };
