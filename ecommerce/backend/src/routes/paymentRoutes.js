const express = require('express');
const { 
    createPaymentOrder, 
    verifyPayment, 
    getRazorpayKey,
    getUPIDetails,
    processManualPayment
} = require('../controller/paymentController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/create-order', protect, createPaymentOrder);
router.post('/verify', protect, verifyPayment);
router.get('/razorpay-key', protect, getRazorpayKey);
router.get('/upi-details', protect, getUPIDetails);
router.post('/manual-payment', protect, processManualPayment);

module.exports = router;