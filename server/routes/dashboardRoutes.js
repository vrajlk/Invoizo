const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboardController');
// const authMiddleware = require('../middleware/auth');
// const authMiddleware = require('../middleware/Admin.auth');


router.get('/', dashboardController.getDashboard);

module.exports = router;