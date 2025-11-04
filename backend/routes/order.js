const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// 1. Place new order (user)
router.post('/place', orderController.placeOrder);

// 2. Get ALL orders (merchant/admin dashboard)
router.get('/', orderController.getAllOrders);

// 3. Get orders for a specific user (user dashboard)
router.get('/user/:userId', orderController.getOrdersByUser);

module.exports = router;
