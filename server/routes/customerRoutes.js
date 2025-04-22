const express = require("express");
const { getUniqueCustomers } = require("../controller/customerController");
const router = express.Router();

router.get("/unique-customers", getUniqueCustomers);

module.exports = router;
