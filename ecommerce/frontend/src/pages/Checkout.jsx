import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, QrCode, Building, ArrowLeft } from 'lucide-react';
import { clearCart } from '../redux/cartSlice';
import axios from 'axios';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { user, token } = useSelector((state) => state.auth);

    const [paymentMethod, setPaymentMethod] = useState('razorpay');
    const [loading, setLoading] = useState(false);
    const [upiDetails, setUpiDetails] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India'
    });

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    const tax = subtotal * 0.18;
    const shipping = subtotal > 500 ? 0 : 50;
    const total = subtotal + tax + shipping;

    useEffect(() => {
        if (!user) {
            navigate('/login?redirect=checkout');
            return;
        }
        if (cartItems.length === 0) {
            navigate('/cart');
            return;
        }

        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        // Fetch UPI details
        fetchUPIDetails();
    }, [user, cartItems, navigate]);

    const fetchUPIDetails = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const { data } = await axios.get(`http://localhost:3001/api/v1/payment/upi-details?amount=${total}`, config);
            setUpiDetails(data.data);
        } catch (error) {
            console.error('Error fetching UPI details:', error);
        }
    };

    const handleAddressChange = (e) => {
        setShippingAddress({
            ...shippingAddress,
            [e.target.name]: e.target.value
        });
    };

    const validateAddress = () => {
        return shippingAddress.street && shippingAddress.city && 
               shippingAddress.state && shippingAddress.zipCode;
    };

    const processRazorpayPayment = async () => {
        if (!validateAddress()) {
            alert('Please fill in all shipping address fields');
            return;
        }

        setLoading(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const { data } = await axios.post('http://localhost:3001/api/v1/payment/create-order', 
                { amount: total }, config);

            const options = {
                key: data.key_id,
                amount: data.order.amount,
                currency: "INR",
                name: "GEM Store",
                description: "Purchase from GEM Store",
                order_id: data.order.id,
                handler: async function (response) {
                    try {
                        await axios.post('http://localhost:3001/api/v1/payment/verify', response, config);
                        await createOrder(response.razorpay_payment_id, 'razorpay', 'completed');
                        
                        dispatch(clearCart());
                        alert('✅ Payment Successful! Your order has been placed.');
                        navigate('/my-orders');
                    } catch (error) {
                        alert('Payment verification failed');
                        console.error(error);
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                theme: {
                    color: "#0071dc"
                },
                modal: {
                    ondismiss: function() {
                        setLoading(false);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const processUPIPayment = async () => {
        if (!validateAddress()) {
            alert('Please fill in all shipping address fields');
            return;
        }

        const transactionId = prompt('Please enter your UPI transaction ID after payment:');
        if (!transactionId) return;

        setLoading(true);
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            await axios.post('http://localhost:3001/api/v1/payment/manual-payment', {
                transaction_id: transactionId,
                payment_method: 'upi',
                amount: total
            }, config);

            await createOrder(transactionId, 'upi', 'pending_verification');
            
            dispatch(clearCart());
            alert('✅ Payment Submitted! Your order will be confirmed after verification.');
            navigate('/my-orders');
        } catch (error) {
            console.error('UPI payment error:', error);
            alert('Failed to submit payment. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const createOrder = async (paymentId, method, status) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const orderData = {
            orderItems: cartItems.map(item => ({
                product: item.product,
                name: item.name,
                quantity: item.qty,
                price: item.price,
                image: item.image
            })),
            shippingAddress,
            paymentInfo: {
                id: paymentId,
                status: status,
                update_time: new Date().toISOString(),
                email_address: user.email
            },
            taxPrice: tax,
            shippingPrice: shipping,
            totalPrice: total,
            isPaid: status === 'completed',
            paidAt: status === 'completed' ? new Date() : null
        };

        await axios.post('http://localhost:3001/api/v1/orders', orderData, config);
    };

    const handlePayment = () => {
        if (paymentMethod === 'razorpay') {
            processRazorpayPayment();
        } else if (paymentMethod === 'upi') {
            processUPIPayment();
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <button 
                onClick={() => navigate('/cart')}
                className="flex items-center text-primary hover:underline mb-6"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cart
            </button>

            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Shipping & Payment */}
                <div className="space-y-6">
                    {/* Shipping Address */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                        <div className="grid grid-cols-1 gap-4">
                            <input
                                type="text"
                                name="street"
                                placeholder="Street Address"
                                value={shippingAddress.street}
                                onChange={handleAddressChange}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={shippingAddress.city}
                                    onChange={handleAddressChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="State"
                                    value={shippingAddress.state}
                                    onChange={handleAddressChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="zipCode"
                                    placeholder="ZIP Code"
                                    value={shippingAddress.zipCode}
                                    onChange={handleAddressChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                                <input
                                    type="text"
                                    name="country"
                                    value={shippingAddress.country}
                                    onChange={handleAddressChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                        
                        <div className="space-y-4">
                            {/* Razorpay Option */}
                            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="razorpay"
                                    checked={paymentMethod === 'razorpay'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mr-3"
                                />
                                <CreditCard className="w-5 h-5 mr-3 text-blue-600" />
                                <div>
                                    <div className="font-semibold">Credit/Debit Card</div>
                                    <div className="text-sm text-gray-500">Pay securely with Razorpay</div>
                                </div>
                            </label>

                            {/* UPI Option */}
                            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="upi"
                                    checked={paymentMethod === 'upi'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mr-3"
                                />
                                <Smartphone className="w-5 h-5 mr-3 text-green-600" />
                                <div>
                                    <div className="font-semibold">UPI Payment</div>
                                    <div className="text-sm text-gray-500">Pay using UPI apps like GPay, PhonePe, Paytm</div>
                                </div>
                            </label>
                        </div>

                        {/* UPI Details */}
                        {paymentMethod === 'upi' && upiDetails && (
                            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <h3 className="font-semibold mb-3 flex items-center">
                                    <QrCode className="w-5 h-5 mr-2" />
                                    UPI Payment Details
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">UPI ID:</p>
                                        <p className="font-mono bg-white p-2 rounded border text-sm break-all">{upiDetails.upi_id}</p>
                                        <p className="text-sm text-gray-600 mt-3 mb-2">Amount to Pay:</p>
                                        <p className="font-bold text-2xl text-green-600">₹{total.toFixed(2)}</p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            💡 Pay using any UPI app (GPay, PhonePe, Paytm)
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 mb-2">Scan QR Code to Pay:</p>
                                        {/* YOUR REAL QR CODE - Place your QR code image in public/assets/payment-qr.png */}
                                        <img 
                                            src="/assets/payment-qr.png"
                                            alt="Payment QR Code" 
                                            className="mx-auto border-2 border-green-500 rounded-lg shadow-lg w-48 h-48 object-contain"
                                            onError={(e) => {
                                                // Fallback to generated QR if image not found
                                                e.target.src = upiDetails.qr_code_url;
                                            }}
                                        />
                                        <p className="text-xs text-green-700 font-semibold mt-3 bg-green-50 p-2 rounded">
                                            ✅ Scan & Pay ₹{total.toFixed(2)}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            After payment, enter transaction ID below
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className="bg-white p-6 rounded-lg shadow-sm border h-fit">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    
                    {/* Order Items */}
                    <div className="space-y-3 mb-6">
                        {cartItems.map((item) => (
                            <div key={item.product} className="flex items-center space-x-3">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-12 h-12 object-contain rounded bg-gray-50"
                                />
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{item.name}</p>
                                    <p className="text-gray-500 text-xs">Qty: {item.qty}</p>
                                </div>
                                <p className="font-semibold">₹{(item.price * item.qty).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>

                    {/* Price Breakdown */}
                    <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                            <span>₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>GST (18%)</span>
                            <span>₹{tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Shipping</span>
                            <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Place Order Button */}
                    <button
                        onClick={handlePayment}
                        disabled={loading || !validateAddress()}
                        className="w-full mt-6 bg-primary text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing...' : `Place Order - ₹${total.toFixed(2)}`}
                    </button>

                    <div className="mt-4 text-xs text-center text-gray-500">
                        🔒 Your payment information is secure and encrypted
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;