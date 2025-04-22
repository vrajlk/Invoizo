const express = require("express");
const router = express.Router();
const getTotalRevenue  = require("../controller/getTotalRevenue");
// const Authmiddleware = require('../middleware/Check.auth');


router.get("/total-revenue", getTotalRevenue);

module.exports = router;
