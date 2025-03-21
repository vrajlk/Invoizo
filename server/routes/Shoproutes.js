const express = require('express');
const router = express.Router();
const { createShop } = require('../controller/shop.create.js');
const { isAdmin } = require('../middleware/Admin.auth.js');

router.post('/create-shop', isAdmin, createShop);

module.exports = router;