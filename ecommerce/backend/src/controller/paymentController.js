const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../model/order');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc    Create Razorpay Order
// @route   POST /api/v1/payment/create-order
// @access  Private
exports.createPaymentOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: Math.round(amount * 100), // Amount in paise
            currency: 'INR',
            receipt: `receipt_order_${Date.now()}`,
            payment_capture: 1
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            order,
            key_id: process.env.RAZORPAY_KEY_ID
        });
    } catch (err) {
        console.error('Razorpay order creation error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Verify Razorpay Payment
// @route   POST /api/v1/payment/verify
// @access  Private
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + '|' + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === razorpay_signature) {
            res.status(200).json({
                success: true,
                message: 'Payment verified successfully',
                payment_id: razorpay_payment_id
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid signature'
            });
        }
    } catch (err) {
        console.error('Payment verification error:', err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Get Razorpay Key
// @route   GET /api/v1/payment/razorpay-key
// @access  Private
exports.getRazorpayKey = async (req, res) => {
    res.status(200).json({ 
        success: true,
        key: process.env.RAZORPAY_KEY_ID 
    });
};

// @desc    Get UPI Payment Details
// @route   GET /api/v1/payment/upi-details
// @access  Private
exports.getUPIDetails = async (req, res) => {
    try {
        const { amount } = req.query;
        
        const upiDetails = {
            upi_id: process.env.UPI_ID,
            qr_code_url: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(process.env.QR_CODE_URL + amount)}`,
            payment_link: process.env.QR_CODE_URL + amount
        };

        res.status(200).json({
            success: true,
            data: upiDetails
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// @desc    Process Manual Payment (UPI/Bank Transfer)
// @route   POST /api/v1/payment/manual-payment
// @access  Private
exports.processManualPayment = async (req, res) => {
    try {
        const { transaction_id, payment_method, amount } = req.body;

        // In a real application, you would verify the transaction with your payment provider
        // For now, we'll create a pending payment record
        
        res.status(200).json({
            success: true,
            message: 'Payment submitted for verification',
            data: {
                transaction_id,
                payment_method,
                amount,
                status: 'pending_verification'
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};