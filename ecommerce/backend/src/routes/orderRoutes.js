const express = require('express');
const {
    createOrder,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
    approveOrder,
    updateOrderStatus
} = require('../controller/orderController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/')
    .post(protect, createOrder)
    .get(protect, authorize('admin'), getOrders);

router.route('/myorders').get(protect, getMyOrders);

router.route('/:id')
    .get(protect, getOrderById);

router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, authorize('admin'), updateOrderToDelivered);
router.route('/:id/approve').put(protect, authorize('admin'), approveOrder);
router.route('/:id/status').put(protect, authorize('admin'), updateOrderStatus);

module.exports = router;