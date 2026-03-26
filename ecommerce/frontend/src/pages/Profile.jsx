import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Package, Calendar, CreditCard } from 'lucide-react';

const Profile = () => {
    const { user, token } = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user || !token) return;
            
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
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

        fetchOrders();
    }, [user, token]);

    if (!user) return <div className="p-10 text-center">Please log in to view profile.</div>;

    return (
        <div className="container mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>
            
            {/* Profile Info */}
            <div className="bg-white p-6 rounded shadow-sm border mb-8">
                <h2 className="text-xl font-bold mb-4">Profile Information</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Name</label>
                        <p className="text-lg font-semibold">{user.name}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <p className="text-lg font-semibold">{user.email}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Role</label>
                        <p className="text-lg font-semibold capitalize bg-gray-100 inline-block px-2 py-1 rounded">{user.role}</p>
                    </div>
                </div>
            </div>

            {/* Order History */}
            <div className="bg-white p-6 rounded shadow-sm border">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                    <Package className="w-5 h-5 mr-2" />
                    Order History
                </h2>
                
                {loading ? (
                    <div className="text-center py-8">Loading orders...</div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No orders found. Start shopping to see your orders here!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order._id} className="border rounded-lg p-4 hover:shadow-md transition">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                                    <div className="flex items-center space-x-4">
                                        <div>
                                            <p className="font-semibold">Order #{order._id.slice(-8)}</p>
                                            <p className="text-sm text-gray-500 flex items-center">
                                                <Calendar className="w-4 h-4 mr-1" />
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4 mt-2 md:mt-0">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {order.isPaid ? 'Paid' : 'Unpaid'}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            order.isDelivered ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {order.isDelivered ? 'Delivered' : order.orderStatus}
                                        </span>
                                        <span className="font-bold text-lg">₹{order.totalPrice}</span>
                                    </div>
                                </div>
                                
                                <div className="border-t pt-3">
                                    <p className="text-sm text-gray-600 mb-2">
                                        {order.orderItems.length} item(s)
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {order.orderItems.slice(0, 3).map((item, index) => (
                                            <div key={index} className="flex items-center space-x-2 bg-gray-50 rounded px-2 py-1">
                                                <img src={item.image} alt={item.name} className="w-8 h-8 object-contain" />
                                                <span className="text-sm">{item.name.slice(0, 20)}...</span>
                                                <span className="text-xs text-gray-500">x{item.quantity}</span>
                                            </div>
                                        ))}
                                        {order.orderItems.length > 3 && (
                                            <div className="flex items-center justify-center bg-gray-100 rounded px-2 py-1 text-sm text-gray-600">
                                                +{order.orderItems.length - 3} more
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {order.isPaid && order.paymentInfo && (
                                    <div className="border-t pt-3 mt-3">
                                        <p className="text-sm text-gray-600 flex items-center">
                                            <CreditCard className="w-4 h-4 mr-1" />
                                            Payment ID: {order.paymentInfo.id}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
