import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/productSlice';
import { TrendingUp, Shield, Zap, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const { products, isLoading } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const categories = [
        { name: 'Electronics', icon: '📱', color: 'from-blue-500 to-indigo-500', link: '/products?category=Electronics' },
        { name: 'Office Supplies', icon: '📝', color: 'from-purple-500 to-pink-500', link: '/products?category=Office Supplies' },
        { name: 'Furniture', icon: '🪑', color: 'from-emerald-500 to-teal-500', link: '/products?category=Furniture' },
        { name: 'IT Peripherals', icon: '⌨️', color: 'from-orange-500 to-red-500', link: '/products?category=IT Peripherals' },
        { name: 'Appliances', icon: '🔌', color: 'from-cyan-500 to-blue-500', link: '/products?category=Appliances' },
        { name: 'Sports', icon: '⚽', color: 'from-green-500 to-emerald-500', link: '/products?category=Sports' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
                {/* Floating Elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="animate-slide-up">
                            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-6">
                                <Sparkles className="w-4 h-4 text-yellow-500" />
                                <span className="text-sm font-semibold text-gray-700">Trusted by Government Agencies</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                Compare <span className="gradient-text">Prices</span> Instantly
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Compare prices across Amazon, Flipkart, GeM & more. Make smarter procurement decisions and save money efficiently.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/products" className="btn-primary flex items-center gap-2">
                                    Start Comparing <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link to="/products?category=Electronics" className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition">
                                    Browse Products
                                </Link>
                            </div>
                            
                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mt-12">
                                <div className="text-center">
                                    <div className="text-3xl font-bold gradient-text">20+</div>
                                    <div className="text-sm text-gray-600 mt-1">Products</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold gradient-text">3+</div>
                                    <div className="text-sm text-gray-600 mt-1">Marketplaces</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold gradient-text">100%</div>
                                    <div className="text-sm text-gray-600 mt-1">Verified</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="relative animate-fade-in">
                            <div className="glass rounded-3xl p-8 card-3d">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
                                            <Shield className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900">PriceMate</div>
                                            <div className="text-xs text-gray-500">Best Price Guaranteed</div>
                                        </div>
                                    </div>
                                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                        Verified
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                                        <span className="text-sm text-gray-600">Laptop HP ProBook</span>
                                        <span className="font-bold text-blue-600">₹45,999</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                                        <span className="text-sm text-gray-600">Office Chair Premium</span>
                                        <span className="font-bold text-blue-600">₹8,499</span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                                        <span className="text-sm font-semibold text-green-700">Average Savings</span>
                                        <span className="font-bold text-green-600 text-lg">₹2,500</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="glass rounded-2xl p-8 card-3d text-center">
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <TrendingUp className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Real-Time Comparison</h3>
                            <p className="text-gray-600">Compare prices across multiple marketplaces instantly with live data updates.</p>
                        </div>
                        <div className="glass rounded-2xl p-8 card-3d text-center">
                            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Verified Prices</h3>
                            <p className="text-gray-600">All prices are verified and sourced directly from official government portals.</p>
                        </div>
                        <div className="glass rounded-2xl p-8 card-3d text-center">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Smart Savings</h3>
                            <p className="text-gray-600">Instantly identify the best deals and maximize your procurement budget.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">Browse by <span className="gradient-text">Category</span></h2>
                        <p className="text-gray-600 text-lg">Explore products across different departments</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((cat, idx) => (
                            <Link key={idx} to={cat.link} className="glass rounded-2xl p-6 card-3d text-center group">
                                <div className={`text-4xl mb-3 transform group-hover:scale-110 transition`}>{cat.icon}</div>
                                <div className="font-semibold text-gray-800 text-sm">{cat.name}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h2 className="text-4xl font-bold mb-2">Trending <span className="gradient-text">Products</span></h2>
                            <p className="text-gray-600">Most compared products this week</p>
                        </div>
                        <Link to="/products" className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
                            View All <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                            <p className="mt-4 text-gray-600">Loading products...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.slice(0, 8).map((product) => (
                                <div key={product._id} className="glass rounded-2xl overflow-hidden card-3d group">
                                    <div className="relative h-56 bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
                                        <img 
                                            src={product.images[0]?.url || 'https://via.placeholder.com/300'} 
                                            alt={product.name} 
                                            className="max-h-full max-w-full object-contain transform group-hover:scale-110 transition duration-500" 
                                        />
                                        {product.gemPrice < product.lowestMarketplacePrice && (
                                            <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                                                <Tag className="w-3 h-3" />
                                                Save ₹{(product.lowestMarketplacePrice - product.gemPrice).toFixed(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 h-12">{product.name}</h3>
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <div className="text-2xl font-bold gradient-text">₹{product.gemPrice}</div>
                                                <div className="text-xs text-gray-500">GeM Price</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-semibold text-gray-700">₹{product.lowestMarketplacePrice}</div>
                                                <div className="text-xs text-gray-500">Market Price</div>
                                            </div>
                                        </div>
                                        <Link to={`/products/${product._id}`} className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition">
                                            Compare Now
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
