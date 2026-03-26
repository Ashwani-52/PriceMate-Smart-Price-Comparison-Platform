import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Package, CheckCircle, XCircle, Clock, Truck, Eye, User, CreditCard } from 'lucide-react';

const AdminOrders = () => {
    const { user, token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        confirmed: 0,
        delivered: 0
    });
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
            return;
        }
        fetchOrders();
    }, [user, token, navigate]);

    const fetchOrders = async () => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/v1/orders` : 'http://localhost:3001/api/v1/orders';
            const { data } = await axios.get(API_URL, config);
            setOrders(data.data);
            
            // Calculate stats
            const stats = {
                total: data.data.length,
                pending: data.data.filter(o => o.orderStatus === 'Processing').length,
                confirmed: data.data.filter(o => o.orderStatus === 'Confirmed').length,
                delivered: data.data.filter(o => o.isDelivered).length
            };
            setStats(stats);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const approveOrder = async (orderId) => {
        if (!window.confirm('Approve this order?')) return;
        
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/v1/orders` : 'http://localhost:3001/api/v1/orders';
            await axios.put(`${API_URL}/${orderId}/approve`, {}, config);
            alert('✅ Order approved successfully!');
            fetchOrders();
        } catch (error) {
            alert('Failed to approve order');
            console.error(error);
        }
    };

    const updateOrderStatus = async (orderId, status) => {
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/v1/orders` : 'http://localhost:3001/api/v1/orders';
            await axios.put(`${API_URL}/${orderId}/status`, { status }, config);
            alert(`✅ Order status updated to ${status}`);
            fetchOrders();
        } catch (error) {
            alert('Failed to update status');
            console.error(error);
        }
    };

    const markAsDelivered = async (orderId) => {
        if (!window.confirm('Mark this order as delivered?')) return;
        
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/v1/orders` : 'http://localhost:3001/api/v1/orders';
            await axios.put(`${API_URL}/${orderId}/deliver`, {}, config);
            alert('✅ Order marked as delivered!');
            fetchOrders();
        } catch (error) {
            alert('Failed to mark as delivered');
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading orders...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Order Management</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm">Total Orders</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                        </div>
                        <Package className="w-12 h-12 text-blue-500" />
                    </div>
                </div>
                <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border border-yellow-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-yellow-700 text-sm font-medium">Pending Approval</p>
                            <p className="text-3xl font-bold text-yellow-800">{stats.pending}</p>
                        </div>
                        <Clock className="w-12 h-12 text-yellow-500" />
                    </div>
                </div>
                <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-700 text-sm font-medium">Confirmed</p>
                            <p className="text-3xl font-bold text-blue-800">{stats.confirmed}</p>
                        </div>
                        <CheckCircle className="w-12 h-12 text-blue-500" />
                    </div>
                </div>
                <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-700 text-sm font-medium">Delivered</p>
                            <p className="text-3xl font-bold text-green-800">{stats.delivered}</p>
                        </div>
                        <Truck className="w-12 h-12 text-green-500" />
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-mono text-sm">#{order._id.slice(-8).toUpperCase()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <User className="w-4 h-4 mr-2 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium">{order.user?.name || 'N/A'}</p>
                                                <p className="text-xs text-gray-500">{order.user?.email || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {new Date(order.createdAt).toLocaleDateString('en-IN')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-lg font-bold text-primary">₹{order.totalPrice}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                                            {order.isPaid ? (
                                                <span className="text-green-600 font-medium text-sm">Paid</span>
                                            ) : (
                                                <span className="text-red-600 font-medium text-sm">Unpaid</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={order.orderStatus}
                                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                            className="text-sm border rounded px-2 py-1"
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Out for Delivery">Out for Delivery</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            {order.orderStatus === 'Processing' && (
                                                <button
                                                    onClick={() => approveOrder(order._id)}
                                                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 flex items-center"
                                                >
                                                    <CheckCircle className="w-4 h-4 mr-1" />
                                                    Approve
                                                </button>
                                            )}
                                            {!order.isDelivered && order.orderStatus !== 'Processing' && (
                                                <button
                                                    onClick={() => markAsDelivered(order._id)}
                                                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 flex items-center"
                                                >
                                                    <Truck className="w-4 h-4 mr-1" />
                                                    Deliver
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                                                className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-2xl font-bold">Order Details</h2>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold mb-2">Customer Information</h3>
                                    <p><strong>Name:</strong> {selectedOrder.user?.name}</p>
                                    <p><strong>Email:</strong> {selectedOrder.user?.email}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Payment Information</h3>
                                    <p><strong>Status:</strong> {selectedOrder.isPaid ? '✅ Paid' : '❌ Unpaid'}</p>
                                    <p><strong>Transaction ID:</strong> {selectedOrder.paymentInfo?.id || 'N/A'}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Shipping Address</h3>
                                <p>{selectedOrder.shippingAddress.street}</p>
                                <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}</p>
                                <p>{selectedOrder.shippingAddress.zipCode}, {selectedOrder.shippingAddress.country}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Order Items</h3>
                                <div className="space-y-2">
                                    {selectedOrder.orderItems.map((item, index) => (
                                        <div key={index} className="flex items-center space-x-4 border p-3 rounded">
                                            <img src={item.image} alt={item.name} className="w-16 h-16 object-contain" />
                                            <div className="flex-1">
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity} × ₹{item.price}</p>
                                            </div>
                                            <p className="font-bold">₹{item.quantity * item.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="border-t pt-4">
                                <div className="flex justify-between mb-2">
                                    <span>Subtotal:</span>
                                    <span>₹{selectedOrder.totalPrice - selectedOrder.taxPrice - selectedOrder.shippingPrice}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Tax:</span>
                                    <span>₹{selectedOrder.taxPrice}</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Shipping:</span>
                                    <span>₹{selectedOrder.shippingPrice}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t pt-2">
                                    <span>Total:</span>
                                    <span className="text-primary">₹{selectedOrder.totalPrice}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;