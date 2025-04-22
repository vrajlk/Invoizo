const express = require("express");
const router = express.Router();
const { getRevenueData } = require("../controller/getRevenueData");

router.get("/revenue-data", getRevenueData);

module.exports = router;
