const express = require('express');
const router = express.Router();
const aiController = require('../controller/aiController');
const authMiddleware = require('../middleware/Check.auth');

router.post('/generate-bill', authMiddleware, aiController.generateBill);

module.exports = router;