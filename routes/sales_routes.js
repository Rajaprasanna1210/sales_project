const express = require('express');
const router = express.Router();
const salesController = require('../controller/sales_controller.js');

router.post('/refresh', salesController.uploadCSV); // to reload CSV into DB
router.get('/revenue/by-category', salesController.getRevenueByCategory);

module.exports = router;
