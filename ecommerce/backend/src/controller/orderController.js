const Order = require('../model/order');

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private
exports.createOrder = async (req, res) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentInfo,
            taxPrice,
            shippingPrice,
            totalPrice,
            isPaid,
            paidAt
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ success: false, message: 'No order items' });
        }

        const order = await Order.create({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentInfo,
            taxPrice,
            shippingPrice: shippingPrice || 0,
            totalPrice,
            isPaid: isPaid || false,
            paidAt: paidAt || null
        });

        res.status(201).json({ success: true, data: order });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, data: order });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update order to paid
// @route   PUT /api/v1/orders/:id/pay
// @access  Private
exports.updateOrderToPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentInfo = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address
        };

        const updatedOrder = await order.save();

        res.status(200).json({ success: true, data: updatedOrder });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/v1/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Get all orders
// @route   GET /api/v1/orders
// @access  Private/Admin
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name email').sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update order to delivered
// @route   PUT /api/v1/orders/:id/deliver
// @access  Private/Admin
exports.updateOrderToDelivered = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        order.isDelivered = true;
        order.deliveredAt = Date.now();
        order.orderStatus = 'Delivered';

        const updatedOrder = await order.save();

        res.status(200).json({ success: true, data: updatedOrder });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Approve order (change from Processing to Confirmed)
// @route   PUT /api/v1/orders/:id/approve
// @access  Private/Admin
exports.approveOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        order.orderStatus = 'Confirmed';
        const updatedOrder = await order.save();

        res.status(200).json({ success: true, data: updatedOrder });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

// @desc    Update order status
// @route   PUT /api/v1/orders/:id/status
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        order.orderStatus = req.body.status;
        
        if (req.body.status === 'Delivered') {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        }

        const updatedOrder = await order.save();

        res.status(200).json({ success: true, data: updatedOrder });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
