const express = require('express');
const router = express.Router();
const pdfController = require('../controller/pdfController');
const authMiddleware = require('../middleware/Check.auth');

router.post('/generate-pdf', authMiddleware, pdfController.generatePDF);

module.exports = router;