const express = require("express");
const router = express.Router();
const { getPendingBillsSummary } = require("../controller/getPendingBillsSummary");

router.get("/pending-bills", getPendingBillsSummary);

module.exports = router;
