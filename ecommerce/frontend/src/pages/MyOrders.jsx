import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Package, Truck, CheckCircle, Clock, MapPin, CreditCard, Calendar } from 'lucide-react';

const MyOrders = () => {
    const { user, token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchOrders();
    }, [user, token, navigate]);

    const fetchOrders = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/v1/orders/myorders` : 'http://localhost:3001/api/v1/orders/myorders';
            const { data } = await axios.get(API_URL, config);
            setOrders(data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getOrderStatusColor = (status) => {
        const statusColors = {
            'Processing': 'bg-yellow-100 text-yellow-800',
            'Confirmed': 'bg-blue-100 text-blue-800',
            'Shipped': 'bg-purple-100 text-purple-800',
            'Out for Delivery': 'bg-indigo-100 text-indigo-800',
            'Delivered': 'bg-green-100 text-green-800',
            'Cancelled': 'bg-red-100 text-red-800'
        };
        return statusColors[status] || 'bg-gray-100 text-gray-800';
    };

    const getOrderStatusIcon = (status) => {
        switch(status) {
            case 'Processing': return <Clock className="w-5 h-5" />;
            case 'Confirmed': return <CheckCircle className="w-5 h-5" />;
            case 'Shipped': return <Package className="w-5 h-5" />;
            case 'Out for Delivery': return <Truck className="w-5 h-5" />;
            case 'Delivered': return <CheckCircle className="w-5 h-5" />;
            default: return <Package className="w-5 h-5" />;
        }
    };

    const getTrackingSteps = (order) => {
        const steps = [
            { status: 'Processing', label: 'Order Placed', completed: true },
            { status: 'Confirmed', label: 'Order Confirmed', completed: order.orderStatus !== 'Processing' },
            { status: 'Shipped', label: 'Shipped', completed: ['Shipped', 'Out for Delivery', 'Delivered'].includes(order.orderStatus) },
            { status: 'Out for Delivery', label: 'Out for Delivery', completed: ['Out for Delivery', 'Delivered'].includes(order.orderStatus) },
            { status: 'Delivered', label: 'Delivered', completed: order.isDelivered }
        ];
        return steps;
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading your orders...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 flex items-center">
                <Package className="w-8 h-8 mr-3 text-primary" />
                My Orders
            </h1>

            {orders.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
                    <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
                    <p className="text-gray-500 mb-6">Start shopping to see your orders here!</p>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                            {/* Order Header */}
                            <div className="bg-gray-50 p-4 border-b">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-center space-x-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Order ID</p>
                                            <p className="font-semibold">#{order._id.slice(-8).toUpperCase()}</p>
                                        </div>
                                        <div className="h-8 w-px bg-gray-300"></div>
                                        <div>
                                            <p className="text-sm text-gray-500 flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                Placed on
                                            </p>
                                            <p className="font-semibold">
                                                {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 ${getOrderStatusColor(order.orderStatus)}`}>
                                            {getOrderStatusIcon(order.orderStatus)}
                                            <span>{order.orderStatus}</span>
                                        </span>
                                        <button
                                            onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                                            className="text-primary hover:underline text-sm font-medium"
                                        >
                                            {selectedOrder?._id === order._id ? 'Hide Details' : 'Track Order'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-4">
                                <div className="flex flex-wrap gap-4 mb-4">
                                    {order.orderItems.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-3">
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="w-16 h-16 object-contain rounded"
                                            />
                                            <div>
                                                <p className="font-medium text-sm">{item.name}</p>
                                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                                <p className="text-sm font-semibold text-primary">₹{item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4 border-t">
                                    <div className="flex items-center space-x-6">
                                        <div>
                                            <p className="text-sm text-gray-500">Total Amount</p>
                                            <p className="text-2xl font-bold text-primary">₹{order.totalPrice}</p>
                                        </div>
                                        {order.isPaid && (
                                            <div className="flex items-center space-x-2 text-green-600">
                                                <CheckCircle className="w-5 h-5" />
                                                <span className="text-sm font-medium">Payment Successful</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Delivery Address</p>
                                        <p className="text-sm font-medium flex items-center">
                                            <MapPin className="w-4 h-4 mr-1" />
                                            {order.shippingAddress.city}, {order.shippingAddress.state}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Order Tracking Details */}
                            {selectedOrder?._id === order._id && (
                                <div className="bg-blue-50 p-6 border-t">
                                    <h3 className="font-bold text-lg mb-6 flex items-center">
                                        <Truck className="w-5 h-5 mr-2" />
                                        Order Tracking
                                    </h3>

                                    {/* Tracking Timeline */}
                                    <div className="relative">
                                        {getTrackingSteps(order).map((step, index) => (
                                            <div key={index} className="flex items-start mb-8 last:mb-0">
                                                <div className="flex flex-col items-center mr-4">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                        step.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                                                    }`}>
                                                        {step.completed ? <CheckCircle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                                                    </div>
                                                    {index < getTrackingSteps(order).length - 1 && (
                                                        <div className={`w-1 h-16 ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                                    )}
                                                </div>
                                                <div className="flex-1 pt-2">
                                                    <p className={`font-semibold ${step.completed ? 'text-green-700' : 'text-gray-500'}`}>
                                                        {step.label}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {step.completed ? 'Completed' : 'Pending'}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Delivery Details */}
                                    <div className="mt-6 p-4 bg-white rounded-lg border">
                                        <h4 className="font-semibold mb-3">Delivery Information</h4>
                                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-500">Shipping Address</p>
                                                <p className="font-medium">
                                                    {order.shippingAddress.street}<br />
                                                    {order.shippingAddress.city}, {order.shippingAddress.state}<br />
                                                    {order.shippingAddress.zipCode}, {order.shippingAddress.country}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 mb-2">Payment Details</p>
                                                <div className="flex items-center space-x-2">
                                                    <CreditCard className="w-4 h-4 text-gray-500" />
                                                    <span className="font-medium">
                                                        {order.paymentInfo?.id ? `ID: ${order.paymentInfo.id.slice(0, 20)}...` : 'N/A'}
                                                    </span>
                                                </div>
                                                {order.paidAt && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Paid on {new Date(order.paidAt).toLocaleString('en-IN')}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expected Delivery */}
                                    {!order.isDelivered && (
                                        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                            <p className="text-sm font-medium text-yellow-800">
                                                📦 Expected Delivery: {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;