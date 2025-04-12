const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboardController');
// const authMiddleware = require('../middleware/auth');

router.get('/', dashboardController.getDashboard);

module.exports = router;