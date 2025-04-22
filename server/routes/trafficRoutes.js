const express = require("express");
const router = express.Router();
const { getTrafficData } = require("../controller/trafficController");

router.get("/traffic-data", getTrafficData);

module.exports = router;
