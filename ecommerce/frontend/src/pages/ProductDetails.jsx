import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../redux/cartSlice';
import { Check, X, ShieldCheck, TrendingDown, TrendingUp, ExternalLink, Award, Package } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`http://localhost:3001/api/v1/products/${id}`);
                setProduct(data.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        dispatch(addToCart({
            product: product._id,
            name: product.name,
            image: product.images[0]?.url,
            price: product.gemPrice,
            countInStock: 10,
            qty: 1
        }));
        navigate('/cart');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading comparison...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
                    <p className="text-gray-600">The product you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    const gemSavings = product.lowestMarketplacePrice - product.gemPrice;
    const isGemCheaper = gemSavings > 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 py-12">
            <div className="container mx-auto px-6">
                {/* Product Overview */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Image */}
                    <div className="glass rounded-3xl p-8 card-3d">
                        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
                            <img 
                                src={product.images[0]?.url} 
                                alt={product.name} 
                                className="max-w-full max-h-[400px] object-contain transform hover:scale-105 transition duration-500" 
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                                    {product.category}
                                </span>
                                <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                                    {product.brand}
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
                            <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
                        </div>

                        {/* PriceMate Price Card */}
                        <div className="glass rounded-2xl p-6 border-2 border-blue-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
                                        <ShieldCheck className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-600">PriceMate Official Price</div>
                                        <div className="text-3xl font-bold gradient-text">₹{product.gemPrice}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-600">Market Price</div>
                                    <div className="text-2xl font-bold text-gray-700">₹{product.lowestMarketplacePrice}</div>
                                </div>
                            </div>
                            
                            {isGemCheaper ? (
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 mb-4">
                                    <div className="flex items-center gap-2 text-green-700 font-bold">
                                        <Award className="w-5 h-5" />
                                        You save ₹{gemSavings.toFixed(2)} with PriceMate!
                                    </div>
                                    <div className="text-sm text-green-600 mt-1">
                                        That's {((gemSavings / product.lowestMarketplacePrice) * 100).toFixed(1)}% cheaper than market
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-4 mb-4">
                                    <div className="flex items-center gap-2 text-orange-700 font-bold">
                                        <TrendingUp className="w-5 h-5" />
                                        Market price is ₹{Math.abs(gemSavings).toFixed(2)} lower
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={addToCartHandler}
                                className="w-full btn-primary flex items-center justify-center gap-2"
                            >
                                <Package className="w-5 h-5" />
                                Buy Now from PriceMate
                            </button>
                        </div>

                        {/* Specifications */}
                        {product.specs && Object.keys(product.specs).length > 0 && (
                            <div className="glass rounded-2xl p-6">
                                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                                    <div className="w-1 h-6 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                                    Technical Specifications
                                </h3>
                                <div className="space-y-3">
                                    {Object.entries(product.specs).map(([key, value]) => (
                                        <div key={key} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                                            <span className="font-semibold text-gray-700">{key}</span>
                                            <span className="text-gray-900">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="glass rounded-3xl p-8">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <div className="w-2 h-8 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                        Marketplace <span className="gradient-text">Comparison</span>
                    </h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2 border-gray-200">
                                    <th className="text-left py-4 px-6 font-bold text-gray-700">Marketplace</th>
                                    <th className="text-left py-4 px-6 font-bold text-gray-700">Price</th>
                                    <th className="text-left py-4 px-6 font-bold text-gray-700">Difference</th>
                                    <th className="text-left py-4 px-6 font-bold text-gray-700">Status</th>
                                    <th className="text-left py-4 px-6 font-bold text-gray-700">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* PriceMate Row */}
                                <tr className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                                    <td className="py-5 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                                                <ShieldCheck className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">PriceMate</div>
                                                <div className="text-xs text-gray-500">Best Price Guaranteed</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="text-2xl font-bold gradient-text">₹{product.gemPrice}</div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                                            Base Price
                                        </span>
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="flex items-center gap-2 text-green-600 font-semibold">
                                            <Check className="w-5 h-5" /> Available
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <button onClick={addToCartHandler} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition">
                                            Buy Now
                                        </button>
                                    </td>
                                </tr>

                                {/* Other Marketplaces */}
                                {product.marketplacePrices.map((mp, index) => {
                                    const diff = mp.price - product.gemPrice;
                                    const isHigher = diff > 0;
                                    return (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition">
                                            <td className="py-5 px-6">
                                                <div className="font-semibold text-gray-900">{mp.marketplace}</div>
                                            </td>
                                            <td className="py-5 px-6">
                                                <div className="text-xl font-bold text-gray-900">₹{mp.price}</div>
                                            </td>
                                            <td className="py-5 px-6">
                                                {isHigher ? (
                                                    <div className="flex items-center gap-2 text-red-600 font-semibold">
                                                        <TrendingUp className="w-4 h-4" />
                                                        +₹{diff.toFixed(0)}
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                                                        <TrendingDown className="w-4 h-4" />
                                                        -₹{Math.abs(diff).toFixed(0)}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-5 px-6">
                                                {mp.isAvailable ? (
                                                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                                                        <Check className="w-5 h-5" /> In Stock
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-red-500 font-semibold">
                                                        <X className="w-5 h-5" /> Out of Stock
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-5 px-6">
                                                <a 
                                                    href={mp.productUrl} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer" 
                                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition"
                                                >
                                                    View <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
