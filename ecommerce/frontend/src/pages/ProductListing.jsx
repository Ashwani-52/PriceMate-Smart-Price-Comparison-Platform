import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Filter, X, Tag, TrendingUp, TrendingDown } from 'lucide-react';

const ProductListing = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [minPrice, setMinPrice] = useState(minPriceParam || '');
    const [maxPrice, setMaxPrice] = useState(maxPriceParam || '');
    const [sortBy, setSortBy] = useState('newest');
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
        setMinPrice(minPriceParam || '');
        setMaxPrice(maxPriceParam || '');
    }, [minPriceParam, maxPriceParam]);

    const navigate = useNavigate();

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams);
        if (minPrice) params.set('minPrice', minPrice);
        else params.delete('minPrice');
        if (maxPrice) params.set('maxPrice', maxPrice);
        else params.delete('maxPrice');
        navigate(`/products?${params.toString()}`);
        setShowMobileFilters(false);
    };

    const clearFilters = () => {
        setSearchParams({});
        setMinPrice('');
        setMaxPrice('');
        setShowMobileFilters(false);
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = {};
                if (category) params.category = category;
                if (search) params.keyword = search;
                if (minPriceParam) params['gemPrice[gte]'] = minPriceParam;
                if (maxPriceParam) params['gemPrice[lte]'] = maxPriceParam;
                if (sortBy === 'price_low') params.sort = 'gemPrice';
                if (sortBy === 'price_high') params.sort = '-gemPrice';
                if (sortBy === 'newest') params.sort = '-createdAt';

                const API_URL = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/v1/products` : 'http://localhost:3001/api/v1/products';
                const { data } = await axios.get(API_URL, { params });
                setProducts(data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category, search, minPriceParam, maxPriceParam, sortBy]);

    const categories = ['Appliances', 'Automotive', 'Baby', 'Clothing', 'Electronics', 'Furniture', 'Grocery', 'Health & Beauty', 'Home', 'Jewellery', 'Office', 'Office Supplies', 'Sports', 'Toys', 'IT Peripherals'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 py-8">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-8">
                    <button
                        className="lg:hidden glass px-4 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                    >
                        <Filter className="w-5 h-5" /> {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>

                    <div className={`w-full lg:w-80 flex-shrink-0 ${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
                        <div className="glass rounded-2xl p-6 sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2 font-bold text-gray-900">
                                    <Filter className="w-5 h-5 text-blue-600" /> Filters
                                </div>
                                {(category || search || minPriceParam || maxPriceParam) && (
                                    <button onClick={clearFilters} className="text-sm text-red-500 hover:text-red-600 font-semibold flex items-center gap-1">
                                        <X className="w-4 h-4" /> Clear
                                    </button>
                                )}
                            </div>

                            <div className="mb-8">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <div className="w-1 h-5 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
                                    Departments
                                </h3>
                                <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                                    {categories.map(cat => (
                                        <Link 
                                            key={cat} 
                                            to={`/products?category=${cat}`} 
                                            className={`block px-4 py-2.5 rounded-xl transition ${
                                                category === cat 
                                                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg' 
                                                    : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                                            }`}
                                        >
                                            {cat}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <div className="w-1 h-5 bg-gradient-to-b from-emerald-600 to-teal-600 rounded-full"></div>
                                    Price Range
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm text-gray-600 mb-1 block">Min Price</label>
                                        <input
                                            type="number"
                                            placeholder="₹ 0"
                                            value={minPrice}
                                            onChange={(e) => setMinPrice(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-600 mb-1 block">Max Price</label>
                                        <input
                                            type="number"
                                            placeholder="₹ 100000"
                                            value={maxPrice}
                                            onChange={(e) => setMaxPrice(e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition"
                                        />
                                    </div>
                                    <button onClick={applyFilters} className="w-full btn-primary">
                                        Apply Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="glass rounded-2xl p-6 mb-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold mb-2">
                                        {search ? (
                                            <>Search: <span className="gradient-text">{search}</span></>
                                        ) : category ? (
                                            <span className="gradient-text">{category}</span>
                                        ) : (
                                            <>All <span className="gradient-text">Products</span></>
                                        )}
                                    </h1>
                                    <p className="text-gray-600">{products.length} products found</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-medium text-gray-600">Sort by:</label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none bg-white font-medium"
                                    >
                                        <option value="newest">Newest First</option>
                                        <option value="price_low">Price: Low to High</option>
                                        <option value="price_high">Price: High to Low</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-20">
                                <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
                                <p className="mt-4 text-gray-600 font-medium">Loading products...</p>
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <div key={product._id} className="glass rounded-2xl overflow-hidden card-3d group">
                                        <div className="relative h-56 bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
                                            <img 
                                                src={product.images[0]?.url || 'https://via.placeholder.com/300'} 
                                                alt={product.name} 
                                                className="max-h-full max-w-full object-contain transform group-hover:scale-110 transition duration-500" 
                                            />
                                            {product.gemPrice < product.lowestMarketplacePrice && (
                                                <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                                                    <Tag className="w-3 h-3" />
                                                    Save ₹{(product.lowestMarketplacePrice - product.gemPrice).toFixed(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 h-12 group-hover:text-blue-600 transition">{product.name}</h3>
                                            <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                                                <div>
                                                    <div className="text-2xl font-bold gradient-text">₹{product.gemPrice}</div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                                        <TrendingDown className="w-3 h-3 text-green-500" />
                                                        PriceMate
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-semibold text-gray-700">₹{product.lowestMarketplacePrice}</div>
                                                    <div className="text-xs text-gray-500 flex items-center gap-1">
                                                        <TrendingUp className="w-3 h-3 text-red-500" />
                                                        Market
                                                    </div>
                                                </div>
                                            </div>
                                            <Link to={`/products/${product._id}`} className="block w-full text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition">
                                                Compare Now
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="glass rounded-2xl p-12 text-center">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h3>
                                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                                <Link to="/" className="inline-block btn-primary">
                                    Back to Home
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListing;
