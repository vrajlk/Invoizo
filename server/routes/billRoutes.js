const express = require('express');
const router = express.Router();
const billController = require('../controller/billController');
const authMiddleware = require('../middleware/Check.auth');

router.get('/', authMiddleware, billController.getBills);
router.get('/:id', authMiddleware, billController.getBill);
router.post('/', authMiddleware, billController.createBill);
router.put('/:id', authMiddleware, billController.updateBill);
router.delete('/:id', authMiddleware, billController.deleteBill);

module.exports = router;